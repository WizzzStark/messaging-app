interface ChatLayoutProps {
    children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
    return (
        <main className="overflow-y-hidden bg-[#212121] h-full">
            {children}
        </main>
    );
};