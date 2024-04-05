import { Doc } from "../../../convex/_generated/dataModel";

import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface UserCardProps {
    user: Doc<"users">;
}

export const UserCard = ({ user }: UserCardProps) => {
    const router = useRouter();

    const {
        mutate: chat,
        pending,
    } = useApiMutation(api.chats.getOrCreateChat);

    const handleStartChat = async () => {
        const chatId = await chat({ userId: user._id });
        router.push(`/${chatId}`);
    };

    return (
        <Card className="bg-[#171717] border-[0px] shadow-lg text-white">
            <CardContent className="flex items-center gap-5 mt-8">
                <Avatar className="text-black">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>{user.fullname[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{user.fullname}</CardTitle>
            </CardContent>
            <CardFooter>
                <Button className="bg-[#62F69A] hover:bg-[#53D182] text-black font-bold flex w-full" disabled={pending} onClick={handleStartChat}>Start Chat</Button>
            </CardFooter>
        </Card>
    );
}