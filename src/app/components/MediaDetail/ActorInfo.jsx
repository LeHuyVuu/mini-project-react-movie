const ActorInfo = ({ actor }) => {
    console.log("Actor Data:", actor); // Kiểm tra dữ liệu actor

    return (
        <div className="flex flex-col items-center p-4 rounded-lg bg-blue-950-800 shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            {/* Ảnh Diễn Viên */}
            <img
                src={
                    actor.profile_path
                        ? `https://media.themoviedb.org/t/p/w276_and_h350_face${actor.profile_path}`
                        : "https://example.com/default-avatar.jpg" // Fallback nếu thiếu ảnh
                }
                alt={actor.name || "Unknown Actor"}
                className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-gray-700"
            />

            {/* Chi Tiết Diễn Viên */}
            <h3 className="text-lg font-semibold text-gray-100 mb-1 text-center">
                {actor.name || "N/A"}
            </h3>
            <p className="text-gray-400 text-sm mb-2 italic text-center">
                {actor.character || "No role specified"}
            </p>
          
        </div>
    );
};

export default ActorInfo;
