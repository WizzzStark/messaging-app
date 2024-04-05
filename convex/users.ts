import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server"

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log(identity);
        if (!identity) {
            throw new ConvexError("Not authenticated");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => 
                q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (user !== null) {
            return user._id;
        }

        const userId = await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier,
            email: identity.email!,
            fullname: identity.name!,
            imageUrl: identity.profileUrl,
        });

        return userId;
    }
})

export const listOtherUsers = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Not authenticated");
        }

        return await ctx.db
            .query("users")
            .filter((q) => q.neq(q.field("tokenIdentifier"), identity.tokenIdentifier))
            .collect();
    }
})

export const getCurrentUser = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return null;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        return user;
    }
});

export const get = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, {userId}) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Not authenticated");
        }

        return await ctx.db.get(userId);
          
    }
});