// components/Popup/Popup.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePopup } from "../../hooks/usePopup";

export default function PopupModal() {
    const { data } = usePopup();

    const popupFromAPI = Array.isArray(data) ? data[0] : null;

    const [popup, setPopup] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [canClose, setCanClose] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => { }, [data]);

    useEffect(() => {
        if (!popupFromAPI) return;

        // ✅ لو فيه flag في sessionStorage يبقى الـ popup مش هيظهر
        const hasBeenViewedSession = sessionStorage.getItem("popup_viewed");
        if (hasBeenViewedSession === "true") return;

        if (!popupFromAPI.should_show) return;
        if (popupFromAPI.has_been_viewed) return;

        setPopup(popupFromAPI);
        setCountdown(popupFromAPI.delay_seconds ?? 5);
        setCanClose(false);
        setIsVisible(true);
    }, [popupFromAPI]);

    useEffect(() => {
        if (!popup || countdown === null) return;

        if (countdown <= 0) {
            setCanClose(true);
            return;
        }

        const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown, popup]);

    const handleClose = () => {
        // ✅ حفظ حالة إن الـ popup اتشافت في sessionStorage
        sessionStorage.setItem("popup_viewed", "true");
        setIsVisible(false);
    };

    if (!popup || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ backgroundColor: "rgba(11, 11, 11, 0.9)" }}
                onClick={() => {
                    if (canClose) handleClose();
                }}
            >
                <motion.div
                    className="relative bg-[#0B0B0B] border border-[#FF1E1E]/50 shadow-[0_0_50px_rgba(255,30,30,0.3),inset_0_0_30px_rgba(255,30,30,0.05)] max-w-4xl w-[95%] h-[75vh] rounded-2xl flex flex-col overflow-hidden"
                    initial={{ scale: 0.85, opacity: 0, rotateX: -15 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    exit={{ scale: 0.85, opacity: 0, rotateX: 15 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Animated border effect */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-[-2px] bg-gradient-to-r from-[#FF1E1E] via-[#D30000] to-[#FF1E1E] animate-gradient-border opacity-50" />
                    </div>

                    {/* Top accent bar with pattern */}
                    <div className="relative h-1 bg-gradient-to-r from-[#D30000] via-[#FF1E1E] to-[#D30000] animate-gradient-x">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgMTAgMCBMIDAgMCBNIDEwIDQwIEwgNDAgMTAgTCA0MCA0MCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                    </div>

                    {/* Image Section with enhanced styling */}
                    {popup.image && (
                        <div className="relative h-[55%] w-full flex justify-center items-center bg-gradient-to-b from-[#0B0B0B] to-transparent overflow-hidden group">
                            {/* Tech pattern overlay */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNpcmN1aXQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI0ZGMUUxRSIgb3BhY2l0eT0iMC4zIi8+PHBhdGggZD0iTSAzMCAwIEwgMzAgNjAgTSAwIDMwIEwgNjAgMzAiIHN0cm9rZT0iI0ZGMUUxRSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNjaXJjdWl0KSIvPjwvc3ZnPg==')]" />
                            </div>

                            {/* Gradient overlays */}
                            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0B0B0B] to-transparent z-[5]" />
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0B0B0B] to-transparent z-[5]" />

                            <img
                                src={popup.image}
                                alt={popup.title}
                                className="relative z-10 max-h-full max-w-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#FF1E1E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
                        </div>
                    )}

                    {/* Content Section with gaming aesthetics */}
                    <div className="relative flex-1 p-6 flex flex-col justify-between bg-gradient-to-b from-transparent via-[#0B0B0B]/50 to-[#0B0B0B]">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZGlhZ29uYWwiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMCwwIEwxMDAsMTAwIE0wLDEwMCBMMTAwLDAiIHN0cm9rZT0iI0ZGMUUxRSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkaWFnb25hbCkiLz48L3N2Zz4=')]" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-white mb-3 tracking-wide uppercase relative">
                                <span className="relative z-10">{popup.title}</span>
                                <div className="absolute -bottom-1 left-0 h-0.5 w-20 bg-gradient-to-r from-[#FF1E1E] to-transparent" />
                            </h3>
                            <p className="text-[#A1A1A1] text-lg leading-relaxed">
                                {popup.content}
                            </p>
                        </div>

                        <div className="relative z-10 flex items-center justify-between mt-6">
                            {!canClose ? (
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        {/* Countdown glow effect */}
                                        <div className="absolute inset-0 bg-[#FF1E1E] blur-xl opacity-40 animate-pulse" />
                                        <div className="relative px-5 py-3 bg-[#0B0B0B] border-2 border-[#D30000] rounded-lg shadow-[inset_0_0_20px_rgba(255,30,30,0.1)]">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-[#FF1E1E] text-2xl tabular-nums">
                                                    {countdown}
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-[#A1A1A1] text-xs uppercase tracking-wider leading-tight">seconds</span>
                                                    <span className="text-[#A1A1A1] text-xs uppercase tracking-wider leading-tight">remaining</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-[#FF1E1E] animate-pulse">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-semibold uppercase tracking-wider">Click anywhere to continue</span>
                                </div>
                            )}

                            {canClose && (
                                <motion.button
                                    onClick={handleClose}
                                    className="relative px-8 py-4 font-bold text-white uppercase tracking-wider overflow-hidden group rounded-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Button background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#D30000] to-[#FF1E1E] transition-all duration-300" />

                                    {/* Hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF1E1E] to-[#D30000] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Inner glow */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] rounded-lg" />

                                    {/* Button border */}
                                    <div className="absolute inset-0 border border-white/10 rounded-lg" />

                                    {/* Button text */}
                                    <span className="relative z-10 flex items-center gap-3 text-sm">
                                        <span>Continue Shopping</span>
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>

                                    {/* Side accent */}
                                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <style jsx>{`
                @keyframes gradient-x {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                
                @keyframes gradient-border {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                .animate-gradient-x {
                    animation: gradient-x 3s ease infinite;
                    background-size: 200% 200%;
                }
                
                .animate-gradient-border {
                    animation: gradient-border 8s linear infinite;
                }
            `}</style>
        </AnimatePresence>
    );
}
