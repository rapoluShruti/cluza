// "use client";
// import lookup from "@/data/lookup";
// import React, { useContext, useState } from "react";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { UserDetailContext } from "@/context/UserDetailContext";
// import { UpdateToken } from "@/convex/users";

// const PricingModel = () => {
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);

//   // const onPaymentSuccess = async (pricing) => {
//   //   if (!userDetail) return;

//   //   const updatedToken = userDetail.token + Number(pricing.value);

//   //   // Update token in the backend
//   //   await UpdateToken({
//   //     token: updatedToken,
//   //     userId: userDetail._id,
//   //   });

//   //   // Update token in the frontend state
//   //   setUserDetail((prev) => ({ ...prev, token: updatedToken }));
//   // };
//   const onPaymentSuccess = async (pricing) => {
//     if (!userDetail) {
//       console.log("User detail is missing");
//       return;
//     }

//     console.log("User Detail before update:", userDetail);

//     const updatedToken = userDetail.token + Number(pricing.value);
//     console.log("Updated Token to be saved:", updatedToken);

//     try {
//       // Update token in the backend
//       const result = await UpdateToken({
//         token: updatedToken,
//         userId: userDetail._id,
//       });
//       console.log("Token update successful:", result);

//       // Update token in the frontend state
//       setUserDetail((prev) => ({ ...prev, token: updatedToken }));
//       console.log("User Detail after update:", {
//         ...userDetail,
//         token: updatedToken,
//       });
//     } catch (error) {
//       console.error("Error updating token:", error);
//     }
//   };

//   return (
//     <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {lookup.PRICING_OPTIONS.map((pricing, index) => (
//         <div
//           key={index}
//           className="border p-6 rounded-xl shadow-lg bg-[#101010] hover:shadow-xl transition duration-300 ease-in-out"
//         >
//           <h2 className="font-semibold text-2xl text-white">{pricing.name}</h2>
//           <h2 className="font-medium text-xl text-gray-300">
//             {pricing.tokens}
//           </h2>
//           <p className="text-gray-400 mt-2">{pricing.desc}</p>
//           <h2 className="font-bold text-4xl text-center mt-6 text-white">
//             ${pricing.price}
//           </h2>
//           <div className="flex justify-center mt-6">
//             <PayPalButtons
//               disabled={!userDetail}
//               style={{ layout: "horizontal" }}
//               onApprove={() => onPaymentSuccess(pricing)}
//               onCancel={() => console.log("Payment canceled")}
//               createOrder={(data, actions) => {
//                 return actions.order.create({
//                   purchase_units: [
//                     {
//                       amount: {
//                         value: pricing.price,
//                         currency_code: "USD",
//                       },
//                     },
//                   ],
//                 });
//               }}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PricingModel;
"use client";
import lookup from "@/data/lookup";
import React, { useContext, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContext } from "@/context/UserDetailContext";
import { UpdateToken } from "@/convex/users";

const PricingModel = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  // Handler for payment success
  const onPaymentSuccess = async (pricing) => {
    if (!userDetail) {
      console.log("User detail is missing");
      return;
    }

    console.log("User Detail before update:", userDetail);

    const updatedToken = userDetail.token + Number(pricing.value); // Adding new tokens from pricing value
    console.log("Updated Token to be saved:", updatedToken);

    try {
      // Update token in the backend
      const result = await UpdateToken({
        token: updatedToken,
        userId: userDetail._id, // Make sure '_id' is a valid user identifier in your system
      });
      console.log("Token update successful:", result);

      // Update token in the frontend state
      setUserDetail((prev) => ({ ...prev, token: updatedToken }));
      console.log("User Detail after update:", {
        ...userDetail,
        token: updatedToken,
      });
    } catch (error) {
      console.error("Error updating token:", error);
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div
          key={index}
          className="border p-6 rounded-xl shadow-lg bg-[#101010] hover:shadow-xl transition duration-300 ease-in-out"
        >
          <h2 className="font-semibold text-2xl text-white">{pricing.name}</h2>
          <h2 className="font-medium text-xl text-gray-300">
            {pricing.tokens} Tokens
          </h2>
          <p className="text-gray-400 mt-2">{pricing.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6 text-white">
            ${pricing.price}
          </h2>
          <div className="flex justify-center mt-6">
            <PayPalButtons
              disabled={!userDetail} // Disable if user detail is not available
              style={{ layout: "horizontal" }}
              onApprove={() => onPaymentSuccess(pricing)} // Trigger the payment success handler
              onCancel={() => console.log("Payment canceled")} // Log if payment is canceled
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: pricing.price, // Price to be paid
                        currency_code: "USD", // Currency code for payment
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
