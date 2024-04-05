"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Body } from "./_components/body";
import { Form } from "./_components/form";
import { Loading } from "@/components/auth/loading";
import { Sidebar } from "@/components/sidebar";

interface ChatProps {
    params: {
        chatId: Id<"chats">;
    }
};

const ChatPage = ({ params }: ChatProps) => {
    const chatWithMessages = useQuery(api.chats.getChat, { chatId: params.chatId });
    const currentUser = useQuery(api.users.getCurrentUser, {});

    if (chatWithMessages === undefined || currentUser === undefined) 
    return (
        <div className="h-[100vh] flex w-full">
            <Loading />
        </div>
    );

    if (currentUser === null)
    return (
        <div className="h-[100vh] flex w-full">
            Unautorithed
        </div>
    );

    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="h-full relative overflow-y-auto bg-[#212121]">
            <div className="h-full flex flex-col bg-[#212121]">
                <Body messages={chatWithMessages.messagesWithUsers} />
                <Form
                    authorId={currentUser._id}
                    chatId={chatWithMessages.chat._id}
                />
            </div>
        </div>
    </div>
    );
};

export default ChatPage;