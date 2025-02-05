"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import lookup from "@/data/lookup";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useParams } from "next/navigation";
import { useConvex, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserDetailContext } from "@/context/UserDetailContext";
import SandpackPreviewwClient from "./SandpackPreviewwClient";
import { Actioncontext } from "@/context/ActionContext";

const CodeView = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const convex = useConvex();
  const [loading, setLoading] = useState(false); // Track AI generation loading state
  const [fileLoading, setFileLoading] = useState(false); // Track file update loading state
  const { userDetail } = useContext(UserDetailContext); // Get user details
  const UpdateTokens = useMutation(api.users.UpdateToken);
  const { action, setAction } = useContext(Actioncontext);

  useEffect(() => {
    setAction("preview");
  }, [action]);
  // Auto-fetch workspace files from Convex
  const workspaceData = useQuery(api.workspace.GetWorkspace, {
    workspaceId: id,
  });

  // Mutation to update files in Convex
  const updateFiles = useMutation(api.workspace.UpdateFiles);

  // Default to stored files or fallback
  const files = workspaceData?.fileData || lookup.DEFAULT_FILE;

  const { messages } = useContext(MessagesContext);

  // Detect if user sent a new message, then generate AI code
  useEffect(() => {
    if (messages?.length > 0 && messages[messages.length - 1].role === "user") {
      GenerateAiCode();
    }
  }, [messages]);

  // Function to generate AI code using API
  const GenerateAiCode = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(messages) + "" + Prompt.CODE_GEN_PROMPT;
      console.log("Sending AI Prompt:", PROMPT);

      const result = await axios.post("/api/gen-ai-code", {
        prompt: PROMPT,
      });

      console.log("AI Response:", result.data);
      const aiResp = result.data;
      const mergedFiles = { ...lookup.DEFAULT_FILE, ...aiResp.files };

      // Set loading for file updates
      setFileLoading(true);

      // Save updated files to Convex
      await updateFiles({ workspaceId: id, files: mergedFiles });

      console.log("Files updated successfully in Convex.");
      l;
      setFileLoading(false); // Turn off file loading
    } catch (error) {
      console.error(
        "Error generating AI code:",
        error.response?.data || error.message
      );
      setFileLoading(false); // Turn off file loading on error
    }
    setLoading(false); // Turn off AI loading
  };

  return (
    <div>
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab === "code" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab === "preview" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Preview
          </h2>
        </div>
      </div>

      {/* Show loading indicator for AI response and file updates */}
      {(loading || fileLoading) && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-lg">
            {loading && !fileLoading
              ? "Generating AI code..."
              : "Updating files..."}
          </div>
        </div>
      )}

      <SandpackProvider
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        theme={"dark"}
        template="react"
        files={files}
        customSetup={{
          dependencies: {
            ...lookup.DEPENDANCY,
          },
        }}
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreviewwClient />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
