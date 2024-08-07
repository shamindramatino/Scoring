"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import type { SVGProps } from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import packageJson from "../../package.json";
import { usePathname } from "next/navigation";
import {
  Search,
  Home,
  Settings,
  Book,
  Music2,
  LayoutTemplate,
  HelpCircle,
  ChevronDownIcon,
  Menu,
} from "lucide-react";

import { Command, CommandInput } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useGlobalState } from "../home/page";

type Menu = {
  label: string;
  name: string;
  icon: React.ReactNode;
  submenu?: Submenu[];
  href: string;
};

type Submenu = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

interface SidebarMenuProps {
  mobile: boolean;
  setAnimation: (open: boolean) => void;
  setMobileView: (open: boolean) => void;
}

interface Collection {
  name: string;
  icon: string;
}

interface GroqResponse {
  collection?: Collection;
  name?: string;
  icon?: string;
}

export function SidebarMenu({
  mobile,
  setAnimation,
  setMobileView,
}: SidebarMenuProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const getAiResponse = useGlobalState("aiResponse");
  const groqResponse = getAiResponse[0] as unknown as GroqResponse;

  // Type guard to check if groqResponse is an object
  const isGroqResponse = (response: any): response is GroqResponse => {
    return (
      response &&
      (response.name !== undefined ||
        response.icon !== undefined ||
        response.collection !== undefined)
    );
  };

  const router = useRouter();

  const [menus, setMenus] = useState([
    {
      label: "",
      name: "Ollie’s Polymath",
      icon: (
        <Avatar className="w-4 h-4">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      ),
      href: "",
      submenu: [
        {
          name: "Search",
          icon: <Search size={18} className="mr-2" />,
          href: "",
        },
        {
          name: "Home",
          icon: <Home size={18} className="mr-2" />,
          href: "/home",
        },
        {
          name: "Settings",
          icon: <Settings size={18} className="mr-2" />,
          href: "",
        },
      ],
    },

    {
      label: "Collections",
      name: "Maths",
      icon: <Book size={15} className="mr-2" />,
      href: "/maths",
    },
    {
      label: "Collections",
      name: "Physics",
      icon: <Music2 size={15} className="mr-2" />,
      href: "",
    },

    {
      label: "Collections",
      name: "Templates",
      icon: <LayoutTemplate size={15} className="mr-2" />,
      href: "",
    },
    {
      label: "Collections",
      name: "Help & Support",
      icon: <HelpCircle size={15} className="mr-2" />,
      href: "",
    },
  ]);

  //     useEffect(() => {
  //         if (groqResponse) {

  //             // if (isGroqResponse(groqResponse)) {
  // //   if (groqResponse?.collection) {
  // //     name = groqResponse?.collection?.name;
  // //     icon = groqResponse?.collection?.icon;
  // //   } else {
  // //     name = groqResponse?.name;
  // //     icon = groqResponse?.icon;
  // //   }
  // // } else {
  // //   console.error("Invalid response format:", groqResponse);
  // // }

  // let name: string | undefined;
  // let icon: string | undefined;

  // const savedResponse = localStorage.getItem('responseArray');

  // if(savedResponse)
  // {

  //   const data = JSON.parse(savedResponse);

  //   console.log("Side BarData",data)

  //   for(let i=0;i<data?.length;i++)
  //   {

  //       name = data[i]?.collection?.name;

  //       icon = data[i]?.collection?.icon;

  //            if(name)
  //            {

  //             const newCollection = {
  //                 label: "Collections",
  //                 name: name,
  //                 icon: icon,
  //                 href: `/${name}`,
  //             };

  //             setMenus(prevMenus => {
  //                 const mathsIndex = prevMenus.findIndex(menu => menu.name === "Maths");

  //                 const updatedMenus = [...prevMenus];
  //                 updatedMenus.splice(mathsIndex + 1, 0, newCollection);
  //                 return updatedMenus;
  //             });

  //         }

  //             router.push(`/${name}`);

  //         }
  //     }
  //     }
  //     }, [groqResponse]);

  const ParseJsonData = (data: any) => {
    try {
      const ParsedJson = JSON.parse(data);
      return ParsedJson;
    } catch (error: any) {
      console.log(`Parse Error :`, error);
    }
  };

  useEffect(() => {
    if (groqResponse || pathname) {
      // Assuming you have a function to get saved response

      const decodedPathname = decodeURIComponent(pathname);

      let savedResponse: any;

      if (typeof window !== "undefined") {
        savedResponse = window.localStorage.getItem("responseArray");
      }

      if (savedResponse) {
        const data = ParseJsonData(savedResponse);

        data.forEach((item: any) => {
          const name = item?.collection?.name;
          const icon = item?.collection?.icon;

          if (name) {
            const newCollection = {
              label: "Collections",
              name: name,
              icon: icon,
              href: `/${name}`,
            };

            setMenus((prevMenus) => {
              // Check if the collection with the same name already exists
              const collectionExists = prevMenus.some(
                (menu) => menu.name === name
              );

              console.log("collectionExists", collectionExists);

              if (!collectionExists) {
                const mathsIndex = prevMenus.findIndex(
                  (menu) => menu.name === "Maths"
                );
                const updatedMenus = [...prevMenus];
                updatedMenus.splice(mathsIndex + 1, 0, newCollection);
                return updatedMenus;
              }

              return prevMenus; // Return unchanged array if collection already exists
            });

            // Navigate to the new route
            router.push(`/${name}`);
          }
        });
      }
    }
  }, [groqResponse]);

  useEffect(() => {
    setAnimation(isSidebarOpen);
  }, [isSidebarOpen, setAnimation]);

  function RadixIconsNotionLogo(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        width="12"
        height="18"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.622 10.042C0.566 10.042 0.51 10.0233 0.454 9.986C0.398 9.94867 0.37 9.89733 0.37 9.832C0.37 9.748 0.421333 9.68267 0.524 9.636C0.617333 9.58 0.710667 9.54267 0.804 9.524C1.18667 9.44 1.45733 9.34667 1.616 9.244C1.77467 9.132 1.90067 8.93133 1.994 8.642L3.968 2.286C4.06133 1.98733 4.05667 1.77733 3.954 1.656C3.86067 1.52533 3.66467 1.42267 3.366 1.348C3.26333 1.32 3.17933 1.278 3.114 1.222C3.058 1.166 3.03933 1.11 3.058 1.054C3.07667 0.988666 3.13267 0.937333 3.226 0.899999C3.32867 0.853333 3.422 0.83 3.506 0.83C3.71133 0.83 3.93533 0.839333 4.178 0.857999C4.43 0.867333 4.67733 0.881333 4.92 0.899999C5.16267 0.909333 5.37733 0.909333 5.564 0.899999C5.71333 0.890666 5.88133 0.881333 6.068 0.872C6.264 0.853333 6.474 0.839333 6.698 0.83C6.922 0.811333 7.16 0.802 7.412 0.802C8.07467 0.802 8.63933 0.918666 9.106 1.152C9.57267 1.38533 9.92267 1.70267 10.156 2.104C10.3987 2.496 10.5107 2.94867 10.492 3.462C10.4733 3.938 10.352 4.38133 10.128 4.792C9.91333 5.19333 9.61467 5.54333 9.232 5.842C8.85867 6.14067 8.41533 6.374 7.902 6.542C7.398 6.71 6.84733 6.794 6.25 6.794C5.998 6.794 5.82533 6.77067 5.732 6.724C5.648 6.668 5.606 6.584 5.606 6.472C5.606 6.40667 5.634 6.35533 5.69 6.318C5.75533 6.28067 5.83 6.25733 5.914 6.248C6.00733 6.22933 6.09133 6.21533 6.166 6.206C6.24067 6.18733 6.33867 6.16867 6.46 6.15C6.88933 6.07533 7.244 5.88867 7.524 5.59C7.81333 5.29133 8.028 4.94133 8.168 4.54C8.31733 4.13867 8.392 3.74667 8.392 3.364C8.392 2.79467 8.32667 2.37 8.196 2.09C8.07467 1.81 7.91133 1.628 7.706 1.544C7.51 1.45067 7.29533 1.404 7.062 1.404C6.96867 1.404 6.88467 1.42733 6.81 1.474C6.73533 1.51133 6.656 1.614 6.572 1.782C6.488 1.94067 6.38533 2.21133 6.264 2.594L4.388 8.628C4.29467 8.91733 4.32267 9.118 4.472 9.23C4.62133 9.342 4.88267 9.44 5.256 9.524C5.33067 9.54267 5.40067 9.57533 5.466 9.622C5.53133 9.65933 5.564 9.72467 5.564 9.818C5.564 9.88333 5.508 9.93467 5.396 9.972C5.29333 10.0093 5.19067 10.028 5.088 10.028C4.892 10.028 4.64467 10.0233 4.346 10.014C4.04733 10.0047 3.75333 9.99533 3.464 9.986C3.17467 9.97667 2.93667 9.972 2.75 9.972C2.47 9.972 2.12 9.98133 1.7 10C1.28933 10.028 0.93 10.042 0.622 10.042ZM9.49953 10.476C9.2382 10.476 9.0142 10.378 8.82753 10.182C8.64086 9.986 8.54753 9.762 8.54753 9.51C8.54753 9.24867 8.61286 9.006 8.74353 8.782C8.88353 8.558 9.06086 8.376 9.27553 8.236C9.49953 8.096 9.7422 8.026 10.0035 8.026C10.3302 8.026 10.5775 8.14267 10.7455 8.376C10.9229 8.6 11.0115 8.83333 11.0115 9.076C11.0115 9.31867 10.9415 9.54733 10.8015 9.762C10.6709 9.97667 10.4889 10.1493 10.2555 10.28C10.0315 10.4107 9.77953 10.476 9.49953 10.476Z"
          fill="black"
        />
      </svg>
    );
  }

  const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));

  const handleRedirect = () => {
    router.push("/home"); // Replace '/new-page' with the path you want to redirect to
  };

  function CommandDemo() {
    return (
      <Command className="rounded-lg">
        <CommandInput placeholder="Search" />
      </Command>
    );
  }

  return isSidebarOpen ? (
    <ScrollArea
      className={`h-screen font-sans rounded-md ${
        mobile ? "" : "border"
      } lg:w-64 sm:w-full transition-width ease-in duration-1000`}
    >
      {mobile === false && (
        <div
          className={`fixed top-0 left-0 w-64 flex justify-between gap-32 items-center py-14 p-5`}
        >
          <div className="pl-3 pb-4 ">
            <Button
              variant="ghost"
              size="icon"
              className="fixed-button"
              onClick={handleRedirect}
            >
              <RadixIconsNotionLogo strokeWidth={1} className="w-4 h-4" />
            </Button>
          </div>
          <div className="pl-5 pb-4">
            <Button
              variant="ghost"
              size="icon"
              className={!isSidebarOpen ? "bg-gray-200" : ""}
              onClick={() => setIsSidebarOpen(false)}
            >
              
              <PanelLeftClose strokeWidth={1} className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className={`${mobile ? "mt-12" : "mt-24 mx-5"} md:px-0 sm:p-0`}>
        {uniqueLabels.map((label, index) => (
          <React.Fragment key={label}>
            {label && (
              <p
                className={`mx-4 mb-3 text-sm font-medium font-sans text-left tracking-wider ${
                  index > 0 ? "mt-10" : ""
                }`}
              >
                {label}
              </p>
            )}
            {menus
              .filter((menu) => menu.label === label)
              .map((menu) => (
                <React.Fragment key={menu.name}>
                  {menu.submenu && menu.submenu.length > 0 ? (
                    <Accordion
                      key={menu.name}
                      type="single"
                      className="mt-[-10px] mb-[-10px] p-0 font-normal"
                      collapsible
                      defaultValue={menu.name}
                    >
                      <AccordionItem
                        value={menu.name}
                        className="m-0 p-0 font-medium font-sans text-sm"
                      >
                        <AccordionTrigger>
                          <a
                            key={menu.name}
                            className="w-full  font-sans text-sm font-medium flex justify-start h-10 bg-background my-2 items-center p-4 hover:bg-[#F5F5F4] hover:text-black dark:hover:bg-primary dark:hover:text-background rounded-md"
                          >
                            <div
                              className={cn(
                                "flex justify-between w-full [&[data-state=open]>svg]:rotate-180"
                              )}
                            >
                              <div className="flex font-sans text-sm font-medium">
                                <div className="w-6 font-sans text-sm font-medium">
                                  {menu.icon}
                                </div>
                                {menu.name}
                                <ChevronDownIcon className="h-4 w-4 shrink-0 mx-3  my-1 text-muted-foreground transition-transform duration-200" />
                              </div>
                            </div>
                          </a>
                        </AccordionTrigger>
                        <AccordionContent>
                          {menu.submenu.map((submenu) =>
                            submenu?.name === "Search" ? (
                              <div key={submenu.name} className="mx-2">
                                <CommandDemo />
                              </div>
                            ) : (
                              <Link
                                key={submenu.name}
                                href={submenu.href}
                                className={`font-sans text-sm font-medium mt-0 mb-0 flex h-10 dark:bg-background dark:hover:bg-primary dark:hover:text-background  items-center  hover:bg-[#F5F5F4] hover:text-black rounded-md  ${
                                  pathname === submenu.href
                                    ? "bg-[#F5F5F4]"
                                    : ""
                                }`}
                              >
                                <Button
                                  variant="ghost"
                                  size="default"
                                  className="gap-1"
                                >
                                  <div className="w-6">{submenu.icon}</div>
                                  {submenu.name}
                                </Button>
                              </Link>
                            )
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div
                      key={menu.name}
                      className={`${menu.name === "Physics" ? "mb-10" : ""}`}
                    >
                      <Link
                        href={menu.href}
                        className={`flex  h-10 font-sans font-medium   ${
                          pathname === menu.href ? "bg-[#F5F5F4]" : ""
                        } text-xs dark:bg-background  items-center  hover:bg-[#F5F5F4] dark:hover:bg-primary dark:hover:text-background hover:text-black rounded-md`}
                      >
                        <Button
                          variant="ghost"
                          size="default"
                          className="gap-1"
                        >
                          <div className="w-6 ">{menu.icon}</div>
                          {menu.name}
                        </Button>
                      </Link>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
      </div>
      {/* {isSidebarOpen && <div className={`font-sans text-sm font-medium flex text-center mt-10 ${mobile? 'mx-5':'mx-10'} sm:p-0`}>V&nbsp;{packageJson.version}</div>} */}
    </ScrollArea>
  ) : (
    <div
      className={`fixed top-0 left-0 flex justify-between gap-4 items-center py-14`}
    >
      {/* <div className="pl-5 pt-0.5 ">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRedirect}
          className="hover:bg-transparent hover:border-transparent "
        >
          <RadixIconsNotionLogo strokeWidth={1} className="w-4 h-4" />
        </Button>
      </div> */}

      <div className="pl-3  ">
        <div className="pl-0.5 ">
          
        <Button
          variant="ghost"
          size="icon"
          className={!isSidebarOpen ? "bg-white shadow-sm" : ""}
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu strokeWidth={1} className="w-4 h-4 " />
        </Button>
        
        </div>
      </div>
    </div>
  );
}
