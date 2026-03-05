export default function GoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-y-auto">
            {children}
        </div>
    );
}
