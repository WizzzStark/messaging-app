import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <nav className="h-[75px] flex justify-end items-center px-8 bg-blue-200">
            <UserButton />
        </nav>
    );
};