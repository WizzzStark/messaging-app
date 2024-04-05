'use client';

import { useCallback} from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface ChatBoxProps {
    chat: Doc<"chats">;
    currentUser: Doc<"users">;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
    chat,
    currentUser,
}) => {
    const router = useRouter();
    const otherUserId = chat.participantOneId === currentUser._id ? chat.participantTwoId : chat.participantOneId;
    const otherUser = useQuery(api.users.get, { userId: otherUserId });

    const handleClick = useCallback(() => {
        router.push(`/${chat._id}`);
    }, [router, chat]);

    return (
        <div
            onClick={handleClick}
            className='w-full relative flex items-center space-x-6 p-3 hover:bg-neutral-100/10 rounded-lg transition cursor-pointer'
        >
            <Avatar>
                <AvatarImage src={otherUser?.imageUrl} />
                <AvatarFallback>{otherUser?.fullname[0]}</AvatarFallback>
            </Avatar>
            <p className="text-md text-white font-medium">{otherUser?.fullname}</p>
        </div>
    )
}