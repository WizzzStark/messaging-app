import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";


export const getOrCreateChat = mutation({
    args: { userId: v.id("users")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("User is not authenticated.");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) {
            throw new ConvexError("User not found.");
        }

        const chat = await ctx.db
            .query("chats")
            .filter((q) =>
                q.or(
                    q.and(q.eq(q.field("participantOneId"), user._id), q.eq(q.field("participantTwoId"), args.userId)),
                    q.and(q.eq(q.field("participantTwoId"), args.userId), q.eq(q.field("participantOneId"), user._id))
                )
            )
            .unique();

        if (chat) {
            return chat._id;
        }

        const chatId = await ctx.db.insert("chats", {
            participantOneId: user._id,
            participantTwoId: args.userId,
        })

        return chatId;
    }
});

export const listChats = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("User is not authenticated.");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (!user) {
            throw new ConvexError("User not found.");
        }

        const chats = await ctx.db
            .query("chats")
            .filter((q) =>
                q.or(q.eq(q.field("participantOneId"), user._id), q.eq(q.field("participantTwoId"), user._id))
            )
            .collect();

        return chats;
    }
});


export const getChat = query({
    args: { chatId: v.id("chats") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();
        if (!currentUser) {
            throw new Error("Couldn't authenticate user");
        }


        const chat = await ctx.db.get(args.chatId);

        if (!chat) {
            throw new ConvexError("Chat not found");
        }

        const messages = await ctx.db
            .query("messages")
            .withIndex("by_chatId", (q) => q.eq("chatId", chat._id))
            .collect();

        const messagesWithUsersRelation = messages.map(async (message: Doc<"messages">) => {
            const user = await ctx.db.get(message.authorId);
            if (!user) {
                throw new ConvexError("User doesn't exist");
            }
            return {
                ...message,
                user
            }
        });

        const messagesWithUsers = await Promise.all(messagesWithUsersRelation);

        return {
            chat,
            messagesWithUsers
        };
    }
});