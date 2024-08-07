import { reqGroqAI } from "../../groq";

export async function POST(req:any,res:any) {
  const data = await req.json();
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }
  

  // try {

  //   console.log("DATA",data.content)

  //   const chatCompletion = await reqGroqAI(data.content);
  //   return Response.json({
  //     content: chatCompletion
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return Response.json({ message: "Internal Server Error" });
  // }
  try {
  
    let chatCompletion;
    let retryCount = 0;
    const maxRetries = 5;
  
    while (retryCount <= maxRetries) {
      try {
        chatCompletion = await reqGroqAI(data.content);
        break; // Success, exit the loop
      } catch (error) {
        console.error("Error in reqGroqAI:", error);
        retryCount++;

        if (retryCount > maxRetries) {
          // All retries failed
          return Response.json({ message: "Internal Server Error" }, { status: 500 });
        }
      }
    }
  
    if (chatCompletion) {
      return Response.json({ content: chatCompletion });
    }
  } catch (error) {
    console.error("Final Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
  
  
}
