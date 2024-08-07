"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { TipTapEditorExtensions } from "./lib/extensions-editor";
import { TipTapEditorProps } from "../Editor/lib/props";
import axios, { AxiosError } from "axios";
import { UpdateDocumentPayload } from "./validators/Documents";
import { toastError } from "./hooks/use-toast";
import { useSaving } from "./store/use-saving";
import Skeleton from "./components/Skeleton";
import TextMenu from "./BubbleMenu/TextMenu";

export default function Editor({
  editorJson,
  id,
}: {
  editorJson: any;
  id: string;
}) {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [_, startTransition] = useTransition();
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [content, setContent] = useState<JSONContent | null>(null);

  const { setIsSaving } = useSaving();



  const updateEditorJson = useCallback(
    async (editorJson: JSONContent) => {
      try {
        setIsSaving(true);
        const payload: UpdateDocumentPayload = { id, editorJson };

        await axios.patch(`/api/documents/${id}`, payload);

        startTransition(() => {
          // Force a cache invalidation.
          router.refresh();
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 422) {
            toastError({
              title: "Invalid payload axios.",
              axiosPayloadDesc: "Please provide id and editorJson",
              error,
            });
            return;
          }
        }

        toastError({ error, title: "Failed update document" });
      } finally {
        startTransition(() => {
          setIsSaving(false);
        });
      }
    },
    [id, router, setIsSaving]
  );

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON() as JSONContent;
    setContent(json);
    await updateEditorJson(json);
  }, 1000);




  const editor = useEditor({
    extensions: TipTapEditorExtensions,
    editorProps: TipTapEditorProps,
    onUpdate: (e) => debouncedUpdates(e),
    content,
  });

  
  useEffect(() => {
    const handleCtrlS = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s" && editor) {
        event.preventDefault(); // Prevent the default Ctrl+S behavior (save)
        // Your function logic here
        setIsSaving(true);

        const json = editor.getJSON() as JSONContent;
        updateEditorJson(json);
      }
    };

    window.addEventListener("keydown", handleCtrlS);
    return () => {
      window.removeEventListener("keydown", handleCtrlS);
    };
  }, [setIsSaving, updateEditorJson, editor]);

  // Hydrate the editor with the content from the database.
  useEffect(() => {
    if (editor && editorJson) {
      editor.commands.setContent(editorJson);
      setHydrated(true);
    }
  }, [editor, hydrated, editorJson]);

  return (
    <div>
        <TextMenu editor={editor} />
        <EditorContent editor={editor} />
      {/* {hydrated ? (<>
      
        
          </>
      ) : (
    
        <div >
          <Skeleton />
        </div>
      )} */}
    </div>
  );
}