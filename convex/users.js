import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    console.log(user);
    if (user?.length == 0) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        picture: args.picture,
        email: args.email,
        uid: args.uid,
        token: 50000,
      });
      console.log(result);
    }
  },
});
export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return user[0];
  },
});
// export const UpdateToken = mutation({
//   args: {
//     token: v.number(),
//     userId: v.id("users"),
//   },
//   handler: async (ctx, args) => {
//     console.log(
//       "Updating token in Convex for:",
//       args.userId,
//       "New Token:",
//       args.token
//     );
//     try {
//       const result = await ctx.db.patch(args.userId, { token: args.token });
//       console.log("Token update success:", result);
//       return result;
//     } catch (error) {
//       console.error("Failed to update token:", error);
//       throw new Error("Token update failed");
//     }
//   },
// });
export const UpdateToken = mutation({
  args: {
    token: v.number(),
    userId: v.id("users"), // Ensure this matches the correct type in your DB schema
  },
  handler: async (ctx, args) => {
    console.log(
      "Updating token in Convex for user ID:",
      args.userId,
      "New Token Value:",
      args.token
    );

    try {
      // Step 1: Check if the user exists in the database
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), args.userId))
        .collect();

      if (user.length === 0) {
        // If the user is not found, log the error and throw a meaningful exception
        console.error("User not found for ID:", args.userId);
        throw new Error("User not found");
      }

      // Step 2: Update the token in the database
      const result = await ctx.db.patch(args.userId, { token: args.token });

      // Step 3: Log the result and success message
      console.log("Token update success:", result);

      // Step 4: Return the result or the updated user information
      return result;
    } catch (error) {
      // Log the error in case of failure
      console.error("Failed to update token:", error);
      throw new Error("Token update failed: " + error.message); // Provide more details in the error
    }
  },
});
