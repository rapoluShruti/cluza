// "use client";
// import { UserDetailContext } from "@/context/UserDetailContext";
// import { api } from "@/convex/_generated/api";
// import { useConvex } from "convex/react";
// import Link from "next/link";
// import React, { useContext, useEffect, useState } from "react";
// import { useSidebar } from "../ui/sidebar";
// const WorkspaceHistory = () => {
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const [workspaceList, setWorkspaceList] = useState();
//   const { toggleSidebar } = useSidebar();
//   const convex = useConvex();

//   useEffect(() => {
//     userDetail && GetAllWorkspace();
//   }, [userDetail]);

//   const GetAllWorkspace = async () => {
//     const result = await convex.query(api.workspace.GetAllWorkspace, {
//       userId: userDetail?._id,
//     });
//     setWorkspaceList(result);
//   };
//   return (
//     <div>
//       <h2 className="font-medium text-lg">Your chats</h2>
//       <div>
//         {workspaceList &&
//           workspaceList?.map((workspace, index) => (
//             <Link href={"/workspace/" + workspace?._id} key={index}>
//               <h2
//                 onClick={toggleSidebar}
//                 className="text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer"
//               >
//                 {workspace?.messages[0]?.content}
//               </h2>
//             </Link>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default WorkspaceHistory;
"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

const WorkspaceHistory = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [workspaceList, setWorkspaceList] = useState([]); // Default empty array
  const { toggleSidebar } = useSidebar();
  const convex = useConvex();

  useEffect(() => {
    if (userDetail?._id) {
      GetAllWorkspace();
    }
  }, [userDetail?._id]); // Only runs when userDetail._id changes

  const GetAllWorkspace = async () => {
    try {
      console.log("Fetching workspaces for userId:", userDetail?._id);
      const result = await convex.query(api.workspace.GetAllWorkspace, {
        userId: userDetail._id, // Ensure this is valid
      });
      setWorkspaceList(result || []); // Fallback to empty array
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Your chats</h2>
      <div>
        {workspaceList.length > 0 ? (
          workspaceList.map((workspace, index) => (
            <Link href={`/workspace/${workspace._id}`} key={workspace._id}>
              <h2
                onClick={toggleSidebar}
                className="text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer"
              >
                {workspace?.messages[0]?.content || "Untitled Chat"}
              </h2>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-2">No chats found.</p>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
