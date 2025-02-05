import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Actioncontext } from "@/context/ActionContext";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(Actioncontext);
  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />

      {/* If user is not logged in */}
      {!userDetail?.name && (
        <div className="flex gap-5">
          <Button>Sign In</Button>
          <Button
            className="text-white"
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
        </div>
      )}

      {/* If user is logged in, show additional buttons */}
      {userDetail?.name && (
        <div className="flex gap-5">
          <Button onClick={() => onActionBtn("export")}>Export</Button>
          <Button onClick={() => onActionBtn("deploy")}>Deploy</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
