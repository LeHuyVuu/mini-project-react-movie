import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Movie = (props) => {
    const { data: { imageLandscape, name, startDate, overview, id, rate, totalVotes } } = props;

    if (!props.data) {
        return null; // Trả về null nếu data không tồn tại
    }

    return (
        <div className="relative">
            {/* Sử dụng imageLandscape từ dữ liệu JSON */}
            <img
                src={imageLandscape}
                alt={name}
                className="aspect-video brightness-50 w-full object-cover"
            />
            <div className="absolute bottom-[20%] left-8 w-1/2 text-white sm:w-1/3 space-y-4">
                {/* Tiêu đề */}
                <p className="font-extrabold text-3xl lg:text-5xl leading-tight tracking-wide sm:text-[3vw] mb-2 drop-shadow-md">
                    {name}
                </p>

                {/* Ngày phát hành */}
                <p className="text-[1.2vw] lg:text-lg font-semibold text-gray-300">
                    {startDate}
                </p>

                {/* Rating và tổng lượt vote */}
                <div className="flex items-center text-[1.2vw] lg:text-base text-gray-300">
                    <p className="font-semibold mr-2">Rating:</p>
                    <p>{rate} / 10 ({totalVotes} votes)</p>
                </div>

                {/* Overview */}
                <div className="hidden sm:block text-[1.2vw] lg:text-base text-gray-200 mb-3 mt-4 leading-relaxed">
                    <p className="font-semibold mb-2">Overview</p>
                    <p className="line-clamp-3">{overview}</p>
                </div>

                {/* Button */}
                <div className="mt-4">
                    <Link to={`/movie/${id}`}>
                        <button className="text-white font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out text-xs lg:text-sm mr-4">
                            View Details
                        </button>
                    </Link>
                    <Link to={`/booking`}>
                        <button className="bg-white text-black font-extrabold py-2 px-6 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out text-xs lg:text-sm">
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            BOOK NOW
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Movie;
