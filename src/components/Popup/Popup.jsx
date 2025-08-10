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


    useEffect(() => {
        console.log("usePopup data:", data);
    }, [data]);


    useEffect(() => {
        if (!popupFromAPI) return;


        if (!popupFromAPI.should_show) return;
        if (popupFromAPI.has_been_viewed) return;

        // const viewedKey = `popup_viewed_${popupFromAPI.id}`;
        // if (localStorage.getItem(viewedKey)) {

        //     return;
        // }


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
        setIsVisible(false);
    };


    if (!popup || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                onClick={() => {
                    if (canClose) handleClose();
                }}
            >
                <motion.div
                    className="relative bg-[#0B0B0B] border-2 border-red-500 shadow-[0_0_25px_#FF1E1E] max-w-4xl w-[95%] h-[70vh] rounded-2xl flex flex-col overflow-hidden"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image Section */}
                    {popup.image && (
                        <div className="h-[60%] w-full flex justify-center items-center bg-black">
                            <img
                                src={popup.image}
                                alt={popup.title}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-wide ">
                                {popup.title}
                            </h3>
                            <p className="text-gray-300  leading-relaxed">
                                {popup.content}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            {!canClose ? (
                                <div className="flex items-center gap-3 text-base text-gray-400">
                                    <span className="font-medium text-red-400">{countdown} S</span>
                                </div>
                            ) : (
                                <div />
                            )}

                            {canClose && (
                                <button
                                    onClick={handleClose}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-[0_0_10px_#FF1E1E] transition"
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>





        </AnimatePresence>
    );
}
