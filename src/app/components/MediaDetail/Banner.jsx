import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalContext } from "../../context/ModalProvider";
import { CircularProgressBar } from "../MediaList/CircularProgressBar";
import { faPlay, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Banner = ({ mediaInfo }) => {
  const { openModal } = useModalContext();

  const handleTrailerClick = () => {
    const trailer = mediaInfo?.videos?.results?.find(
      (video) => video.type === "Trailer"
    );

    const trailerVideoKey = trailer?.key || null;

    const videoUrl = trailerVideoKey
      ? `https://www.youtube.com/embed/${trailerVideoKey}`
      : "https://example.com/default-trailer.mp4";

    const modalContent = (
      <div className="w-full max-w-6xl mx-auto h-[500px] rounded-lg overflow-hidden">
        <iframe
          src={videoUrl}
          title="Trailer"
          allow="autoplay; fullscreen"
          className="w-full h-full"
        ></iframe>
      </div>
    );
    openModal(modalContent);
  };

  // Kiểm tra nếu dữ liệu chưa sẵn sàng
  const isLoading = !mediaInfo;

  return (
    <div className="relative bg-black text-white">
      {isLoading ? (
        // Skeleton Loader khi đang tải
        <div className="animate-pulse">
          <div className="absolute inset-0 bg-gray-800 opacity-40"></div>
          <div className="relative flex flex-col lg:flex-row p-4 lg:p-10">
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-72 h-96 bg-gray-700 rounded-lg"></div>
            </div>
            <div className="lg:w-2/3 flex flex-col justify-center p-4 space-y-4">
              <div className="h-8 w-2/3 bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-600 rounded"></div>
              <div className="h-4 w-full bg-gray-600 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-600 rounded"></div>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-12 bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Nội dung chính khi dữ liệu đã sẵn sàng
        <>
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: mediaInfo?.backdrop_path
                ? `url('https://image.tmdb.org/t/p/original/${mediaInfo.backdrop_path}')`
                : `url('https://example.com/default-backdrop.jpg')`,
            }}
          ></div>

          {/* Content Section */}
          <div className="pr-10 pl-10 pt-10  relative flex flex-col lg:flex-row justify-between items-center ">

            {/*  tên phim */}
            <h1 className="  text-3xl lg:text-5xl font-bold ">
              {mediaInfo?.title || "Title Not Available"}
            </h1>

          </div>
          <div className="relative flex flex-col lg:flex-row  lg:p-10">

            {/* poster */}
            <div className="">
              <div className="relative inline-block w-48">
                <img className=" w-full rounded-lg shadow-lg"
                  src={
                    mediaInfo?.poster_path
                      ? `https://image.tmdb.org/t/p/original/${mediaInfo.poster_path}`
                      : "https://example.com/default-poster.jpg"
                  }
                  alt={mediaInfo?.title || "Movie Poster"}
                />
                <div className="absolute top-1 right-1 w-10 h-10 ">


                  <CircularProgressBar
                    percent={Math.round(mediaInfo.vote_average * 10)}
                    strokeColor={
                      mediaInfo.vote_average >= 7
                        ? "green"
                        : mediaInfo.vote_average >= 5
                          ? "orange"
                          : "red"
                    }
                  />
                </div>
              </div>

            </div>
            <div className="flex  justify-center p-4">
              <div className="lg:w-2/3 flex flex-col justify-center p-4">

                <p className="text-xl text-white mb-4">
                  {mediaInfo?.tagline || ""}
                </p>
                <div className="text-gray-400 text-sm lg:text-base mb-4">
                  <span>
                    {mediaInfo?.release_date || "N/A"}
                  </span>{" "}
                  |{" "}
                  <span className="font-semibold">{mediaInfo?.runtime
                    ? `${mediaInfo.runtime} minutes`
                    : "Not Available"} </span>{" "}
                  |{" "}
                  <span className="font-semibold">{mediaInfo?.spoken_languages?.length > 0
                    ? mediaInfo.spoken_languages
                      .map((lang) => lang.name)
                      .join(", ")
                    : "N/A"} </span>
                </div>

                {/* <h2 className="text-xl font-semibold mb-2">Overview</h2> */}
                <p className="text-white mb-4 leading-relaxed">
                  {mediaInfo?.overview || "No overview available."}
                </p>
                <div className="text-gray-400 text-sm lg:text-base mb-4">
                  <span>
                    Budget: $
                    {mediaInfo?.budget
                      ? mediaInfo.budget.toLocaleString()
                      : "N/A"}
                  </span>{" "}
                  |{" "}
                  <span>
                    Revenue: $
                    {mediaInfo?.revenue
                      ? mediaInfo.revenue.toLocaleString()
                      : "N/A"}
                  </span>
                  <div className="flex space-x-4 m-5">
                    {mediaInfo?.genres?.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 border border-white text-white text-sm rounded-full bg-white/10 backdrop-blur-md"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                </div>
                </div>
                <div className="flex pb-1 flex-col justify-end h-full ">

                  <div>
                    {mediaInfo?.homepage && (
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleTrailerClick}
                          className="flex items-center px-5 py-3  text-white font-bold rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                        >
                          <FontAwesomeIcon icon={faPlay} className="mr-2" />
                          <span>Watch Trailer</span>
                        </button>
                        <Link to="/booking">
                          <button
                            className="flex items-center px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                          >
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            <span>BOOK TICKET</span>
                          </button>

                        </Link>
                      </div>
                    )}
                  </div>
                </div>
            
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;