"use client"

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { UserCard } from "./_components/user-card";
import { Loading } from "@/components/auth/loading";
import { Sidebar } from "@/components/sidebar";

const New = () => {
    const otherUsers = useQuery(api.users.listOtherUsers);

    if (otherUsers === undefined) return (
        <div className="h-[100vh] flex w-full">
            <Loading />
        </div>
    );
    return (
        <div className="flex h-full">
            <Sidebar />
            <main className="flex flex-col ml-10 ">
                <h1 className="text-4xl font-bold w-full text-center py-12 text-[#ECECEC]">
                    Select a user to start a chat with.
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 xl:grid-cols-5 gap-10">
                    {otherUsers.map((user: any) => (
                    <UserCard key={user._id} user={user} />
                    ))}
                </div>
            </main>
        </div>
    )
};

export default New;