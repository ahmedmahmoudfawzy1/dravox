import { FaShippingFast, FaHeadset, FaShieldAlt, FaLock } from "react-icons/fa";

export default function WhyChooseUs() {
    return (
        <section className="py-16 bg-[#0b0b0b] text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl font-bold mb-12 text-primary-color">
                    Why Shop With Dravox?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {/* Fast Delivery */}
                    <div className="p-6 bg-[#1a1a1a] rounded-xl hover:shadow-lg hover:shadow-red-700/30 transition">
                        <FaShippingFast size={40} className="text-primary-color mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                        <p className="text-sm text-gray-400">
                            Receive your products within 2-3 business days.
                        </p>
                    </div>

                    {/* 24/7 Support */}
                    <div className="p-6 bg-[#1a1a1a] rounded-xl hover:shadow-lg transition">
                        <FaHeadset size={40} className="text-primary-color mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                        <p className="text-sm text-gray-400">
                            Our team is always ready to assist you.
                        </p>
                    </div>

                    {/* Warranty */}
                    <div className="p-6 bg-[#1a1a1a] rounded-xl hover:shadow-lg transition">
                        <FaShieldAlt size={40} className="text-primary-color mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">1-Year Warranty</h3>
                        <p className="text-sm text-gray-400">
                            Peace of mind with all products you buy.
                        </p>
                    </div>

                    {/* Secure Payment */}
                    <div className="p-6 bg-[#1a1a1a] rounded-xl hover:shadow-lg transition">
                        <FaLock size={40} className="text-primary-color mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
                        <p className="text-sm text-gray-400">
                            Protected checkout with all major cards.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
