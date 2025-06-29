import { Link } from "react-router-dom";


export default function TrendingProducts() {
    return (
        <section className="py-12 bg-gradient-to-br from-[#0B0B0B] to-[#1f1f1f] text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl font-extrabold mb-10 text-primary-color">
                    🔥 Trending Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg hover:shadow-red-600/40 transition">
                            <img
                                src="https://www.redragonzone.com/cdn/shop/files/keyboards.png?v=1744624741"
                                alt="Keyboard"
                                className="w-full h-40 object-contain mb-4 rounded-md"
                            />
                            <h3 className="text-lg font-semibold mb-2">Mechanical Keyboard K530</h3>
                            <p className="text-sm text-gray-400 mb-4">$79.99</p>
                            <div className="flex justify-between">

                                <button className="text-sm text-primary-color hover:underline">
                                    <Link>Quick View</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}
