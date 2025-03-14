import { useEffect } from "react"
import { MovieCard } from "../MediaList/MovieCard"


const RelatedTVShowList = ({mediaList = []}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="px-8 py-10 bg-black text-white">

            <p className="text-4xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2 text-center">More like this</p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr p-4">
                {mediaList.map((media) => (
                <MovieCard
                    id={media.id}
                    key={media.id}
                    title={media.title}
                    releaseDate={media.release_date}
                    poster={media.poster_path}
                    point={media.vote_average}
                    mediaType={media.media_type}
                />
            ))}
            </div>

        </div>
    )
}

export default RelatedTVShowList