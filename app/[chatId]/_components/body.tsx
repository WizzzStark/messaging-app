import { useEffect, useRef } from "react";
import MessageBox from "./messageBox";
import { Doc } from "@/convex/_generated/dataModel";

type MessageWithUserType = Doc<"messages"> & {
    user: Doc<"users">;
};

interface BodyProps {
    messages: MessageWithUserType[];
}

export const Body = ({
    messages
}: BodyProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="h-full overflow-y-auto">
            {messages.map((message: any) => (
                <MessageBox
                    key={message._id}
                    message={message}
                />
            ))}
            <div className="pt-24" ref={bottomRef} />
        </div>
    );
}