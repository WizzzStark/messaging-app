'use client';

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Send } from "lucide-react";
import { useState } from "react";


interface FormProps {
    authorId: Id<"users">;
    chatId: Id<"chats">;
}

export const Form = ({
    authorId,
    chatId,
}: FormProps) => {
    const [content, setContent] = useState<string>("");
    const {
        mutate,
        pending
    } = useApiMutation(api.messages.send);

    const handleSubmit = () => {
        if (content === "") return;
        mutate({
            content,
            authorId,
            chatId,
        })
            .then(() => {
                setContent("");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="fixed bottom-0 p-4 bg-[#212121] flex items-center gap-2 lg:gap-4 w-full">
            <div className="flex items-center gap-2 lg:gap-4 w-[calc(100%-350px)]">
                <div className="relative w-full">
                    <input
                        placeholder={"Enter message..."}
                        className="text-white border-gray-400/30 border-[1px] bg-[#212121] font-light py-2 px-4 w-full rounded-full focus:outline-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />
                </div>

            </div>
            <button
                type="submit"
                className="rounded-full p-2 bg-[#62F69A] cursor-pointer hover:bg-[#53D182] transition"
                onClick={handleSubmit}
                disabled={pending}
            >
                <Send size={18} className="text-black"
                />
            </button>
        </div>
    );
}