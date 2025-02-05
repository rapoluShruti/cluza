// import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
// import React from "react";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

// const SideBarFooter = () => {
//   const router = useRouter();
//   const options = [
//     {
//       name: "Settings",
//       icon: Settings,
//     },
//     {
//       name: "Help Center",
//       icon: HelpCircle,
//     },
//     {
//       name: "My Subscription",
//       icon: Wallet,
//       path: "/pricing",
//     },
//     {
//       name: "Sign Out",
//       icon: LogOut,
//     },
//   ];
//   const onOptionClick = (option) => {
//     router.push(option.path);
//   };

//   return (
//     <div className="flex flex-col gap-2 p-2">
//       {options.map((option, index) => (
//         <Button
//           key={index}
//           variant="ghost"
//           onClick={() => onOptionClick(option)}
//           className="flex items-center gap-2 w-full "
//         >
//           <option.icon className="w-5 h-5" />{" "}
//           {/* Ensure proper component rendering */}
//           {option.name}
//         </Button>
//       ))}
//     </div>
//   );
// };

// export default SideBarFooter;
import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SideBarFooter = () => {
  const router = useRouter();

  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help Center",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];

  const onOptionClick = (option) => {
    if (option.name === "Sign Out") {
      // Google OAuth Sign-Out Logic
      if (window.google && window.google.accounts) {
        // Revoke the user's token (sign out from Google)
        window.google.accounts.id.revoke(
          localStorage.getItem("google_token"),
          () => {
            // Clear the stored token from localStorage or cookies
            localStorage.removeItem("google_token"); // or wherever the token is stored

            // Optionally, clear any other session details
            // localStorage.clear(); // If you're storing other session details

            // Redirect to home page ("/") after successful sign-out
            router.push("/");
          }
        );
      }
    } else if (option.path) {
      router.push(option.path); // Navigate if path is defined
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="ghost"
          onClick={() => onOptionClick(option)}
          className="flex items-center gap-2 w-full "
        >
          <option.icon className="w-5 h-5" />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
