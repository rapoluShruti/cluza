"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex, useMutation } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import lookup from "@/data/lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";

// ✅ Token counting function
export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // ✅ Auto-scroll ref
  const { toggleSidebar } = useSidebar();

  // ✅ Convex Mutations
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const UpdateTokens = useMutation(api.users.UpdateToken);

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  // ✅ Fetch Workspace Data
  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id,
      });
      setMessages(result?.messages || []);
      console.log("Workspace Data:", result);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1]?.role;
      if (role === "user") {
        GetAiResponse();
      }
    }
    scrollToBottom(); // ✅ Auto-scroll
  }, [messages]);

  // ✅ Fetch AI Response
  // const GetAiResponse = async () => {
  //   try {
  //     setLoading(true);
  //     const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
  //     console.log("Sending prompt to API:", PROMPT);

  //     const result = await axios.post("/api/ai-chat", { prompt: PROMPT });

  //     console.log("AI Response:", result.data.result);

  //     const aiResp = {
  //       role: "ai",
  //       content: result.data.result,
  //     };

  //     setMessages((prev) => {
  //       const updatedMessages = [...prev, aiResp];

  //       // ✅ Ensure latest token calculation with async state update
  //       const newToken =
  //         Number(userDetail?.token) -
  //         Number(countToken(JSON.stringify(aiResp)));

  //       console.log("Updating token:", {
  //         userId: userDetail?._id,
  //         token: newToken,
  //       });

  //       // ✅ Update Tokens in Convex
  //       UpdateTokens({
  //         userId: userDetail?._id,
  //         token: newToken,
  //       })
  //         .then((res) => console.log("Token updated successfully:", res))
  //         .catch((err) => console.error("Failed to update token:", err));

  //       return updatedMessages;
  //     });

  //     await UpdateMessages({
  //       messages: [...messages, aiResp],
  //       workspaceId: id,
  //     });
  //   } catch (error) {
  //     console.error("Error in GetAiResponse:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const GetAiResponse = async () => {
    try {
      setLoading(true);
      const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;

      const result = await axios.post("/api/ai-chat", { prompt: PROMPT });

      const aiResp = {
        role: "ai",
        content: result.data.result,
      };

      // ✅ Correct token counting logic
      const aiRespTokens = countToken(aiResp.content); // Make sure this is accurate
      const newTokenCount = Math.max(
        0,
        Number(userDetail?.token) - aiRespTokens
      );

      console.log("Updating token:", {
        userId: userDetail?._id,
        token: newTokenCount,
      });

      // ✅ First update the token in Convex
      await UpdateTokens({
        userId: userDetail?._id,
        token: newTokenCount,
      });

      // ✅ Then update messages to ensure state updates correctly
      setMessages((prev) => [...prev, aiResp]);

      // ✅ Finally, update the workspace messages
      await UpdateMessages({
        messages: [...messages, aiResp], // Ensure correct messages are passed
        workspaceId: id,
      });
    } catch (error) {
      console.error("Error in GetAiResponse:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle User Input
  const onGenerate = (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  // ✅ Scroll to Bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      {/* Messages Section */}
      <div
        className="flex-1 overflow-y-scroll scrollbar-hide pl-5"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages?.length > 0 &&
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-start"
              style={{
                backgroundColor: Colors.CHAT_BACKGROUND,
              }}
            >
              {msg?.role === "user" && (
                <Image
                  src={userDetail?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full "
                />
              )}
              <ReactMarkdown className="flex flex-col">
                {msg.content}
              </ReactMarkdown>
            </div>
          ))}

        {/* ✅ Loader when response is generating */}
        {loading && (
          <div
            className="p-3 rounded-lg flex gap-2 items-center justify-center mt-3"
            style={{ backgroundColor: Colors.LOADER_BACKGROUND }}
          >
            <Loader2 className="animate-spin text-white" size={20} />
            <h2 className="text-white">Generating Response...</h2>
          </div>
        )}

        {/* ✅ Dummy div to help scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box - Stays at Bottom */}
      <div className="flex gap-2 items-end">
        {userDetail && (
          <Image
            src={userDetail?.picture}
            alt="user"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
        <div
          className="p-5 border rounded-xl max-w-2xl w-full mt-auto"
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <div className="flex gap-2">
            <textarea
              placeholder={lookup.INPUT_PLACEHOLDER}
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            />
            {userInput && (
              <Search
                onClick={() => onGenerate(userInput)}
                className="bg-[#480082] p-2 h-10 w-10 rounded-md cursor-pointer text-white"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
