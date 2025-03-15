import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalContext } from "../../context/ModalProvider";
import { CircularProgressBar } from "../MediaList/CircularProgressBar";
import { Link } from "react-router-dom";
import { faStar, faCalendar, faClock, faPlay } from '@fortawesome/free-solid-svg-icons';

const Banner = ({ mediaInfo }) => {
  const { openModal } = useModalContext();

  const handleTrailerClick = () => {
    const trailer = mediaInfo?.trailer || mediaInfo?.videos?.results?.find(
      (video) => video.type === "Trailer"
    );

    const videoUrl = trailer
      ? `https://www.youtube.com/embed/${trailer.key || trailer}`
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
              backgroundImage: mediaInfo?.imageLandscape
                ? `url('${mediaInfo.imageLandscape}')`
                : `url('https://example.com/default-backdrop.jpg')`,
            }}
          ></div>

          {/* Content Section */}
          <div className="pr-10 pl-10 pt-10  relative flex flex-col lg:flex-row  items-center ">

            {/* tên phim */}
            <h1 className="text-3xl lg:text-5xl font-bold">
              {mediaInfo?.name || "Title Not Available"}
            </h1>
            <div className=" ml-5 font-semibold bg-yellow-500 text-white p-2 rounded-md">
              {mediaInfo?.age + "+" || "N/A"}
            </div>

          </div>

          <div className="relative flex flex-col lg:flex-row lg:p-10">
            {/* poster */}
            <div className="relative  w-48 flex items-center justify-center">
              <img
                className="w-full rounded-lg shadow-lg object-contain"
                src={
                  mediaInfo?.imagePortrait
                    ? mediaInfo.imagePortrait
                    : "https://example.com/default-poster.jpg"
                }
                alt={mediaInfo?.name || "Movie Poster"}
              />
              {/* <div className="absolute top-1 right-1 w-10 h-10">
                <CircularProgressBar
                  percent={Math.round(mediaInfo?.rate * 10)}
                  strokeColor={
                    mediaInfo?.rate >= 7
                      ? "green"
                      : mediaInfo?.rate >= 5
                        ? "orange"
                        : "red"
                  }
                />
              </div> */}
            </div>

            <div className="flex justify-center p-2">
              <div className="m-5 flex flex-col justify-center">
                <p className="text-xl text-white mb-4">{mediaInfo?.tagline || ""}</p>
                <div>  <FontAwesomeIcon icon={faCalendar} className="text-yellow-500" />
                  {mediaInfo?.startDate
                    ? new Date(mediaInfo.startDate).toLocaleDateString('en-GB') // Converts to date format: DD/MM/YYYY
                    : "N/A"}
                </div>

                <div className="text-white text-sm lg:text-base mb-4">

                  <div className="font-semibold">
                    <FontAwesomeIcon icon={faClock} className="text-yellow-500" />
                    {mediaInfo?.duration ? `${mediaInfo.duration} minutes` : "Not Available"}
                  </div>

                  {/* <div className="font-semibold">
                    {mediaInfo?.slug || "N/A"}
                  </div> */}
                </div>

                <p className="text-white mb-4 leading-relaxed">
                  {mediaInfo?.overview || "No overview available."}
                </p>
                {/* <span>
                  Budget: $
                  {mediaInfo?.budget ? mediaInfo.budget.toLocaleString() : "N/A"}
                </span>{" "}
                |{" "}
                <span>
                  Revenue: $
                  {mediaInfo?.revenue ? mediaInfo.revenue.toLocaleString() : "N/A"}
                </span> */}
                <div className="font-semibold flex items-center space-x-2">
                  <span>Rate:</span>
                  <span>{mediaInfo?.rate || "N/A"}</span>
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                </div>
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
                {/* Trailer and Ticket Section */}
                <div className="flex pb-1 flex-col justify-end h-full">
                  <div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleTrailerClick}
                        className="flex items-center px-5 py-3 text-white font-bold rounded-lg border-2 border-white bg-transparent shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                      >
                        <FontAwesomeIcon icon={faPlay} className="mr-2" />
                        <span>Watch Trailer</span>
                      </button>

                      {/* <Link to={`/book/${mediaInfo?.slug}`}>
                    <button
                      className="flex items-center px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                      <span>BOOK TICKET</span>
                    </button>
                  </Link> */}
                    </div>

                  </div>
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
