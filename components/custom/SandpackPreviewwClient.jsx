// "use client";
// import { Actioncontext } from "@/context/ActionContext";
// import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
// import React, { useContext, useEffect, useRef } from "react";

// const SandpackPreviewwClient = () => {
//   const { action, setAction } = useContext(Actioncontext);
//   const { sandpack } = useSandpack();
//   const previewRef = useRef();
//   useEffect(() => {
//     GetSandpackClient();
//   }, [sandpack && action]);

//   const GetSandpackClient = async () => {
//     const client = previewRef.current?.getClient();
//     if (client) {
//       console.log(client);
//       const result = await client.getCodeSandboxURL();
//       if (action?.actionType == "deploy") {
//         window.open("https://" + result?.sandboxId + ".csb.app/");
//       } else if (action?.actionType == "export") {
//         window?.open(result?.editorUrl);
//       }
//     }
//   };
//   return (
//     <div>
//       <SandpackPreview
//         ref={previewRef}
//         style={{ height: "80vh", width: "80vh" }}
//         showNavigator={true}
//       />
//     </div>
//   );
// };

// export default SandpackPreviewwClient;
"use client";
import { Actioncontext } from "@/context/ActionContext";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";

const SandpackPreviewwClient = () => {
  const { action, setAction } = useContext(Actioncontext);
  const { sandpack } = useSandpack();
  const previewRef = useRef();

  useEffect(() => {
    GetSandpackClient();
  }, [sandpack, action]);

  const GetSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log(client);
      const result = await client.getCodeSandboxURL();
      if (action?.actionType === "deploy") {
        window.open("https://" + result?.sandboxId + ".csb.app/");
      } else if (action?.actionType === "export") {
        window?.open(result?.editorUrl);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <SandpackPreview
        ref={previewRef}
        style={{ width: "100%", height: "90vh" }}
        showNavigator={true}
      />
    </div>
  );
};

export default SandpackPreviewwClient;
