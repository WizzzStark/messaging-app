"use client"

import { UserButton } from "@clerk/clerk-react"
import { ChatList } from "./chat-list"

export const Sidebar = () => {

    return (
        <div className="fex flex-col w-[300px] h-full bg-[#171717] relative">
            <ChatList />
            <div className="absolute bottom-5 left-[60px]">
                <UserButton showName/>
            </div>
        </div>
    )

}