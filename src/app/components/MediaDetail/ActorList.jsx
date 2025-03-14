import { useState } from "react";
import ActorInfo from "./ActorInfo";

const ActorList = ({ actors }) => {
    const [showMore, setShowMore] = useState(false);

    // Hàm xử lý toggle trạng thái showMore


    return (
        <div>
            {/* Title & Actor Grid */}
            <div className="p-6 bg-black text-white">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2">
                    Actors
                </h2>

                {/* Actors Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {actors
                        .slice(0, showMore ? 32 : 5) // Sử dụng slice trực tiếp
                        .map(actor => (
                            <ActorInfo key={actor.id} actor={actor} />
                        ))}
                </div>
            </div>

            {/* Show More/Less Button */}
            {actors != null && (
                <div className="flex justify-center items-center p-6">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="font-bold bg-white text-black rounded px-6 py-2 shadow-md 
                       hover:shadow-lg transition-transform duration-300 transform hover:scale-110 
                       hover:bg-gray-200 cursor-pointer"
                    >
                        {showMore ? "Show less" : "Show more"}
                    </button>
                </div>
            )}

        </div>
    );
};

export default ActorList;
