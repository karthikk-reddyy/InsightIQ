import { useState, useRef, useEffect } from "react";
import API from "../../services/api";

function AIChat({ datasetInfo }) {
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const chatEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Auto-scroll to the latest conversation snippet
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, loading]);

    // Dynamic height calculation for the typing area
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [question]);

    const askAI = async () => {
        if (question.trim() === "") return;

        const userQuery = question.trim();
        setQuestion("");
        
        setChatHistory(prev => [...prev, { type: "user", text: userQuery }]);
        setLoading(true);

        try {
            const response = await API.post("/ask-ai", {
                question: userQuery,
                dataset_summary: datasetInfo.ai_summary
            });
            
            setChatHistory(prev => [
                ...prev, 
                { type: "ai", text: response.data.answer }
            ]);
        } catch (error) {
            console.error(error);
            setChatHistory(prev => [
                ...prev, 
                { type: "ai", text: "I encountered an error processing that request. Please try again." }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        // Submit on Enter, allow new lines with Shift + Enter
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!loading) askAI();
        }
    };

    return (
        <div className="w-full bg-transparent flex flex-col items-center max-w-5xl mx-auto h-[650px]">
            
            {/* Scrollable Conversation Thread Area */}
            <div className="w-full flex-1 overflow-y-auto pr-2 space-y-6 mb-6 scrollbar-thin scrollbar-thumb-zinc-800">
                {chatHistory.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12 text-zinc-500 text-base font-medium tracking-wide">
                        <span className="text-3xl mb-3">💬</span>
                        Ask a custom question below to unlock hidden insights inside your current dataset columns.
                    </div>
                )}

                {chatHistory.map((msg, idx) => (
                    <div key={idx} className="w-full flex flex-col space-y-2">
                        {msg.type === "user" ? (
                            <div className="w-full flex justify-end">
                                <div className="max-w-[75%] bg-zinc-800 text-zinc-100 rounded-2xl px-5 py-3.5 text-sm font-medium tracking-wide shadow-sm border border-zinc-700/40 whitespace-pre-wrap">
                                    {msg.text}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full flex items-start gap-4 mt-2">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                                    <span className="text-white text-sm font-bold">💎</span>
                                </div>
                                <div className="flex-1 text-zinc-300 text-sm leading-relaxed font-medium pt-1 whitespace-pre-wrap">
                                    {msg.text}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="w-full flex items-start gap-4 mt-2">
                        <div className="w-8 h-8 shrink-0 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center animate-spin">
                            <span className="text-xs">✨</span>
                        </div>
                        <div className="flex space-x-1.5 items-center pt-3">
                            <div className="h-2 w-2 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-zinc-600 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
                
                <div ref={chatEndRef} />
            </div>

            {/* Premium Multi-line Gemini Style Typing Dock */}
            <div className="w-full relative shrink-0">
                <div className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl flex items-end pb-3 pt-3 transition-all focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 shadow-xl">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        className="flex-1 bg-transparent text-zinc-100 pl-6 pr-16 outline-none font-medium text-sm tracking-wide placeholder-zinc-600 resize-none max-h-[200px] leading-relaxed py-1.5 custom-scrollbar"
                        placeholder="Ask InsightIQ anything... (Press Enter to send, Shift+Enter for new line)"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />

                    <div className="absolute right-3 bottom-3 flex items-center">
                        <button
                            onClick={askAI}
                            disabled={loading || !question.trim()}
                            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-100 disabled:opacity-30 disabled:hover:text-zinc-400 disabled:hover:bg-zinc-900 transition-all active:scale-95 disabled:cursor-not-allowed"
                            title="Send message"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                className="w-4 h-4 transform rotate-45"
                            >
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.53 60.53 0 0 0 18.836-8.916.75.75 0 0 0 0-1.154 60.53 60.53 0 0 0-18.836-8.916Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <p className="text-[10px] text-zinc-600 font-semibold tracking-wide text-center mt-2.5 uppercase">
                    InsightIQ can make mistakes. Verify critical analytical computations.
                </p>
            </div>

        </div>
    );
}

export default AIChat;