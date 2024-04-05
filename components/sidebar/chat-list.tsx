"use client"

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatBox } from "./chat-box";


export const ChatList = () => {

    const chats = useQuery(api.chats.listChats);
    const currentUser = useQuery(api.users.getCurrentUser);
    const router = useRouter();

    if (chats === undefined || currentUser === undefined) return <div>Chats are loading...</div>
    if(currentUser === null) return <div> Current user is not found...</div>

    const userChats = chats.filter((chat: any) => {
        return chat.participantOneId === currentUser._id || chat.participantTwoId === currentUser._id;
    })

    return (
        <>
            <button onClick={() => { router.push("/new") }} className="flex space-x-1 text-white items-center cursor-pointer px-6">
                <SparklesIcon className="text-[#62F69A]"/>
                <p className="text-zinc-300 font-medium pl-4 py-4">All chats</p>
            </button>

            <div className="space-y-3">
                {userChats.map((chat) => (
                    <ChatBox
                        key={chat._id}
                        chat={chat}
                        currentUser={currentUser}
                    />
                ))}
            </div >
        </>
    );
}
