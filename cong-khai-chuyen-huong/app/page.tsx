export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-surface border border-border rounded-xl shadow-lg max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Đang chuyển hướng...</h1>
            <p className="text-secondary mb-6">Vui lòng đợi trong giây lát, chúng tôi đang đưa bạn đến trang đích an toàn.</p>

            <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-1/3 animate-pulse rounded-full"></div>
            </div>
        </div>
    );
}
