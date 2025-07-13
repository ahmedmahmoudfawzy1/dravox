import { FaShippingFast, FaHeadset, FaShieldAlt, FaLock } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function WhyChooseUs() {
    const features = [
        {
            icon: <FaShippingFast size={36} />,
            title: "Lightning Fast Delivery",
            description: "Get your gear in 2-3 business days with express shipping",
            color: "from-blue-500 to-blue-600",
            delay: "0ms"
        },
        {
            icon: <FaHeadset size={36} />,
            title: "24/7 Expert Support",
            description: "Gaming specialists ready to help you anytime, anywhere",
            color: "from-purple-500 to-purple-600",
            delay: "100ms"
        },
        {
            icon: <FaShieldAlt size={36} />,
            title: "2-Year Warranty",
            description: "Extended protection for all your gaming peripherals",
            color: "from-green-500 to-green-600",
            delay: "200ms"
        },
        {
            icon: <FaLock size={36} />,
            title: "Secure Checkout",
            description: "Bank-level encryption for safe and secure payments",
            color: "from-orange-500 to-orange-600",
            delay: "300ms"
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-12" />
                        <HiSparkles className="text-[#FF1E1E] text-2xl" />
                        <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-12" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Why Choose <span className="text-[#FF1E1E]">Dravox</span>?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Experience premium gaming with unmatched service and support
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative animate-fadeIn"
                            style={{ animationDelay: feature.delay }}
                        >
                            <div className="relative h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1E1E]/20 hover:border-[#FF1E1E]/30 hover:scale-[1.02]">
                                {/* Icon Container */}
                                <div className="relative mb-6">
                                    <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                        {feature.icon}
                                    </div>
                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF1E1E] transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-[#FF1E1E] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-400 mb-4">Join thousands of satisfied gamers</p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border-2 border-[#0b0b0b] flex items-center justify-center text-xs text-white font-bold"
                                >
                                    {i}
                                </div>
                            ))}
                        </div>
                        <span className="text-white font-medium">
                            <span className="text-[#FF1E1E]">2,000+</span> Happy Customers
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}