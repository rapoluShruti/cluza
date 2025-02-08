// import Image from "next/image";
// import React, { useContext } from "react";
// import { Button } from "../ui/button";
// import Colors from "@/data/Colors";
// import { UserDetailContext } from "@/context/UserDetailContext";
// import { Actioncontext } from "@/context/ActionContext";

// const Header = () => {
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const { action, setAction } = useContext(Actioncontext);
//   const onActionBtn = (action) => {
//     setAction({
//       actionType: action,
//       timeStamp: Date.now(),
//     });
//   };
//   return (
//     <div className="p-4 flex justify-between items-center">
//       <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />

//       {/* If user is not logged in */}
//       {!userDetail?.name && (
//         <div className="flex gap-5">
//           <Button>Sign In</Button>
//           <Button
//             className="text-white"
//             style={{
//               backgroundColor: Colors.BLUE,
//             }}
//           >
//             Get Started
//           </Button>
//         </div>
//       )}

//       {/* If user is logged in, show additional buttons */}
//       {userDetail?.name && (
//         <div className="flex gap-5">
//           <Button onClick={() => onActionBtn("export")}>Export</Button>
//           <Button onClick={() => onActionBtn("deploy")}>Deploy</Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Actioncontext } from "@/context/ActionContext";
import SignInDialog from "./SignInDialog";
// Import your Sign In dialog

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { setAction } = useContext(Actioncontext);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Load user from local storage on page load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
  }, []);

  const onActionBtn = (actionType) => {
    setAction({
      actionType,
      timeStamp: Date.now(),
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem("user"); // Clear stored user
    setUserDetail(null); // Reset user state
    window.location.reload(); // Refresh to reflect logout
  };

  return (
    <div className="p-4 flex justify-between items-center">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />

      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          <Button
            className="text-white"
            style={{ backgroundColor: Colors.BLUE }}
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex gap-5">
          <Button onClick={() => onActionBtn("export")}>Export</Button>
          <Button onClick={() => onActionBtn("deploy")}>Deploy</Button>
          <Button onClick={handleSignOut} className="bg-red-500 text-white">
            Sign Out
          </Button>
        </div>
      )}

      {/* Sign In Dialog */}
      <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
    </div>
  );
};

export default Header;
