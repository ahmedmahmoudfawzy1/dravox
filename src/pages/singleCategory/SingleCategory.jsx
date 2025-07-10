import { useParams } from "react-router-dom";
import { useSingleCategorie } from "../../hooks/useCategories";

export default function SingleCategory() {
    const { slug } = useParams();
    const { data, isLoading, isError, error } = useSingleCategorie(slug);

    if (isLoading) return <div className="text-white text-center mt-20">Loading...</div>;
    if (isError) return <div className="text-red-500 text-center mt-20">Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-[#0F1117] pt-[100px] px-4 md:px-12 text-white font-inter">
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-[#1A1D24] to-[#20242C] shadow-2xl p-6 md:p-10 ">


                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#FF1E1E] tracking-tight">
                            {data.localized_name || data.name}
                        </h1>
                        <p className="text-gray-400 text-lg">
                            {data.localized_description || data.description}
                        </p>
                    </div>


                    <div className="flex-1">
                        <img
                            src={data.category_image}
                            alt={data.name}
                            className="rounded-xl shadow-lg object-contain w-full h-72 md:h-96"
                        />
                    </div>
                </div>


                <div className="mt-10 border-t border-gray-700" />


                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-[#1C1F26] rounded-xl shadow-inner">
                        <h2 className="text-xl font-semibold text-white">Noise Cancellation</h2>
                        <p className="text-sm text-gray-400 mt-2">Experience clear communication even in loud environments.</p>
                    </div>
                    <div className="p-4 bg-[#1C1F26] rounded-xl shadow-inner">
                        <h2 className="text-xl font-semibold text-white">7.1 Surround Sound</h2>
                        <p className="text-sm text-gray-400 mt-2">Precision audio engineered for immersive gaming.</p>
                    </div>
                    <div className="p-4 bg-[#1C1F26] rounded-xl shadow-inner">
                        <h2 className="text-xl font-semibold text-white">Memory Foam Comfort</h2>
                        <p className="text-sm text-gray-400 mt-2">Stay comfortable during long gaming sessions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
