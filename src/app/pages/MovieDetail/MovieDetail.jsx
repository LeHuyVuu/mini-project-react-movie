import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";
import LoadingComponents from "../../components/FeatureMovies/LoadingComponents";
import Banner from "../../components/MediaDetail/Banner";
import ActorList from "../../components/MediaDetail/ActorList";
import InfomationMedia from "../../components/MediaDetail/InfomationMedia";
import RelatedMovieList from "../../components/MediaDetail/RelatedMovieList";

// Import data từ các file JSON
import dataMovies from "../../../mocks/movies.json";
import dataMoviesCooming from "../../../mocks/comming.json";

export const MovieDetail = () => {
    const { id } = useParams();  // Lấy id từ URL params
    const [movieInfo, setMovieInfo] = useState(null);  // State để lưu thông tin bộ phim
    const [isLoading, setIsLoading] = useState(true);  // Trạng thái loading
    const [movieRelated, setMovieRelated] = useState([]);  // Phim liên quan

    useEffect(() => {
        window.scrollTo(0, 0);

        // Tìm bộ phim trong cả hai file JSON: movies.json và comming.json
        const moviesList = dataMovies.data.result || [];
        const comingMoviesList = dataMoviesCooming.data.result || [];

        // Tìm bộ phim theo id trong moviesList và comingMoviesList
        const movieFromNowPlaying = moviesList.find(movie => movie.id === id);
        const movieFromComingSoon = comingMoviesList.find(movie => movie.id === id);

        // Chọn bộ phim nếu tìm thấy
        const movie = movieFromNowPlaying || movieFromComingSoon;

        // In ra thông tin bộ phim (nếu tìm thấy)
        if (movie) {
            console.log(movie);
        } else {
            console.log('Bộ phim không tìm thấy!');
        }

        if (movie) {
            setMovieInfo(movie);
            setIsLoading(false);

            // Tìm các phim liên quan (ví dụ: các phim khác)
            const recommendations = (moviesList || []).filter(m => m.id !== movie.id);
            setMovieRelated(recommendations);
        } else {
            setIsLoading(false);  // Nếu không tìm thấy bộ phim, dừng loading
        }
    }, [id]);

    // Nếu đang tải, hiển thị Loading
    if (isLoading) {
        return <LoadingComponents />;
    }

    // Nếu không tìm thấy bộ phim, hiển thị thông báo lỗi
    if (!movieInfo) {
        return <div>Movie not found</div>;
    }



    return (
        <div>
            <Banner mediaInfo={movieInfo} />
            <div className="flex bg-black text-gray-500 flex-col lg:flex-row gap-10 p-8">
                {/* <div className="flex-[2]">
                    <ActorList actors={movieInfo.credits?.cast || []} />
                </div>
                <div className="flex-[1]">
                    <InfomationMedia information={movieInfo} />
                </div> */}
            </div>
            <div>
                <RelatedMovieList mediaList={movieRelated} />
            </div>
        </div>
    );
};
