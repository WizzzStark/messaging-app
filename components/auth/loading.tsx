import { Loader2 } from "lucide-react";

export const Loading = () => {
    return (
        <main className="flex w-full h-full items-center justify-center bg-[#212121]">
             <Loader2 className="w-32 h-32 animate-spin text-[white]" />
        </main>
    );
};