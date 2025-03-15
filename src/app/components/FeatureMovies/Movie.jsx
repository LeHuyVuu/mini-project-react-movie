import { faShoppingCart, faPlay, faStar, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Movie = (props) => {
    const { data } = props;


    if (!data) {
        return null; // Trả về null nếu data không tồn tại
    }


    const {
        id,
        name,
        age,
        duration,
        startDate,
        endDate,
        imageLandscape,
        imagePortrait,
        slug,
        rate,
        totalVotes,
        views,
        cityIds,
        isImax,
        isSession,
        order,
        createdAt,
        overview
    } = data;


    // // Format duration to display in hours and minutes
    const formatDuration = (mins) => {
        if (!mins) return "N/A";
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return `${hours}h ${minutes}m`;
    };


    // Get year from date string
    const getYear = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).getFullYear();
    };


    // Generate stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating / 2);
        const halfStar = rating % 2 >= 1;
       
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
            } else if (i === fullStars && halfStar) {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 opacity-60" />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-gray-500" />);
            }
        }
        return stars;
    };


    return (
        <Link to={`/movie/${id}`} className="block relative">
            <div className="relative banner-container h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
                {/* Premium gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 z-10"></div>
               
                {/* Background image with parallax effect */}
                <img
                    src={imageLandscape}
                    alt={name}
                    className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-in-out hover:scale-100"
                />
               
                {/* Content overlay */}
                <div className="absolute inset-0 z-20 flex items-end">
                    <div className="container mx-auto px-4 pb-16 md:pb-24">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            {/* Movie Poster */}
                            <div className="hidden md:block w-1/4 lg:w-1/5">
                                <img
                                    src={imagePortrait || imageLandscape}
                                    alt={`${name} poster`}
                                    className="rounded-lg shadow-2xl border-2 border-gray-800 transform transition-all duration-300 hover:scale-105"
                                />
                            </div>
                           
                            {/* Movie Info */}
                            <div className="w-full md:w-2/3 text-white space-y-4">
                                {/* Movie title with professional typography */}
                                <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight text-white mb-2 drop-shadow-lg">
                                    {name} <span className="text-sm font-light align-top">{getYear(startDate)}</span>
                                </h1>
                               
                                {/* Movie metadata badges */}
                                <div className="flex flex-wrap gap-3 items-center">
                                    {age && (
                                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            {age}+
                                        </span>
                                    )}
                                    {duration && (
                                        <span className="text-gray-300 text-sm flex items-center">
                                            <FontAwesomeIcon icon={faClock} className="mr-1" />
                                            {formatDuration(duration)}
                                        </span>
                                    )}
                                    {isImax && (
                                        <span className="bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded">
                                            IMAX
                                        </span>
                                    )}
                                    {isSession && (
                                        <span className="bg-purple-700 text-white text-xs font-bold px-3 py-1 rounded">
                                            LIVE
                                        </span>
                                    )}
                                </div>
                               
                                {/* Rating with star visualization */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 font-bold mr-2">{rate}</span>
                                        <div className="flex">
                                            {renderStars(rate)}
                                        </div>
                                    </div>
                                    <span className="text-gray-400 text-sm">
                                        {totalVotes.toLocaleString()} votes
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {views.toLocaleString()} views
                                    </span>
                                </div>
                               
                                {/* Movie description/overview */}
                                {overview && (
                                    <p className="text-gray-300 text-sm md:text-base line-clamp-3 md:line-clamp-4 max-w-2xl">
                                        {overview}
                                    </p>
                                )}
                               
                                {/* Showing dates */}
                                <div className="flex items-center text-sm text-gray-300">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-red-500" />
                                    <span> {startDate} - {endDate}</span>
                                </div>
                               
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};


export default Movie;







