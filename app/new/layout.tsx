interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <main className="w-full h-full bg-[#212121] ">
            {children}
        </main>
    );
}