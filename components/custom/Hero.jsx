"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import lookup from "@/data/lookup";
import { ArrowRight, LineChart, Link, Search } from "lucide-react";
import React, { useContext, useState } from "react";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

const Hero = () => {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);
    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log(workspaceId);
    router.push("/workspace/" + workspaceId);
  };

  // <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
  //   <h2 className="font-bold text-4xl">{lookup.HERO_HEADING}</h2>
  //   <p className="text-gray-400 font-medium ">{lookup.HERO_DESC}</p>
  //   <div
  //     className="p-5 border rounded-xl max-w-2xl w-full mt-3"
  //     style={{
  //       backgroundColor: Colors.BACKGROUND,
  //     }}
  //   >
  //     <div className="flex gap-2">
  //       <textarea
  //         placeholder={lookup.INPUT_PLACEHOLDER}
  //         onChange={(event) => setUserInput(event.target.value)}
  //         className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
  //       />
  //       {/* <ArrowRight className="bg-[#480082] p-2 h-8 w-8 rounded-md cursor-pointer" /> */}
  //       {userInput && (
  //         <Search
  //           onClick={() => onGenerate(userInput)}
  //           className="bg-[#480082] p-2 h-10 w-10 rounded-md cursor-pointer text-white"
  //         />
  //       )}
  //     </div>
  //     <div>
  //       <Link className="h-5 w-5" />
  //     </div>
  //   </div>
  //   <div className="flex mt-8 flex-wrap max-w-xl items-center justify-center gap-1">
  //     {lookup?.SUGGSTIONS.map((suggestion, index) => (
  //       <h2
  //         onClick={() => onGenerate(suggestion)}
  //         className="p-1 px-2 border rounded-full text-sm text-gray-500 hover:text-white cursor-pointer"
  //         key={index}
  //       >
  //         {suggestion}
  //       </h2>
  //     ))}
  //   </div>
  //   <SignInDialog
  //     openDialog={openDialog}
  //     closeDialog={(v) => setOpenDialog(false)}
  //   />
  // </div>
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="text-center">
        <h2 className="font-bold text-4xl">{lookup.HERO_HEADING}</h2>
        <p className="text-gray-400 font-medium">{lookup.HERO_DESC}</p>
      </div>

      <div
        className="p-5 border rounded-xl max-w-2xl w-full mt-3 flex flex-col items-center"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2 w-full">
          <textarea
            placeholder={lookup.INPUT_PLACEHOLDER}
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
        <div className="w-full flex justify-center">
          <Link className="h-5 w-5" />
        </div>
      </div>

      <div className="flex mt-8 flex-wrap max-w-xl items-center justify-center gap-1">
        {lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-500 hover:text-white cursor-pointer"
            key={index}
          >
            {suggestion}
          </h2>
        ))}
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
};

export default Hero;
