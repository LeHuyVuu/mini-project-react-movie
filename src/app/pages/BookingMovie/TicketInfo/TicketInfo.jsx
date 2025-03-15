import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Dummy data to simulate movie data (replace with real data from an API)
const cityData = ['Hà Nội', 'TP Hồ Chí Minh', 'Đà Nẵng', 'Bà Rịa - Vũng Tàu', 'An Giang'];
const movieData = [
    {
        id: 1,
        name: 'Mickey 17',
        image: 'https://cdn.galaxycine.vn/media/2025/2/11/mickey-17-750_1739261262236.jpg',
        rate: '8.8',
        duration: 137,
    },
    {
        id: 2,
        name: 'Interstellar',
        image: 'https://cdn.galaxycine.vn/media/2025/2/24/interstellar-2_1740384209787.jpg',
        rate: '8.8',
        duration: 169,
    },
    // Add more movies here...
];
const cinemaData = [
    {
        name: 'Galaxy Nguyễn Du',
        showtimes: {
            'Thứ Sáu 21/03': ['10:15', '14:45', '19:15'],
            'Thứ Bảy 22/03': ['12:30', '17:00'],
            'Chủ Nhật 23/03': ['13:30', '17:45'],
        },
    },
    {
        name: 'Galaxy Tân Bình',
        showtimes: {
            'Thứ Sáu 21/03': ['11:30', '15:45', '20:00'],
            'Thứ Bảy 22/03': ['12:15', '16:45'],
            'Chủ Nhật 23/03': ['11:00', '14:00', '18:00'],
        },
    },
    // Add more cinemas here...
];

const dateOptions = ['Thứ Sáu 21/03', 'Thứ Bảy 22/03', 'Chủ Nhật 23/03'];

export default function BookingPage() {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedShowtime, setSelectedShowtime] = useState('');

    // Reset selections when city or movie changes, but keep cinema selected
    useEffect(() => {
        setSelectedDate('');
        setSelectedShowtime('');
    }, [selectedCity, selectedMovie]);

    const handleCityChange = (city) => {
        setSelectedCity(city);
        setSelectedCinema(''); // Reset cinema when city changes
    };

    const handleMovieChange = (movie) => {
        setSelectedMovie(movie);
    };

    const handleShowtimeChange = (showtime) => {
        setSelectedShowtime(showtime);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedShowtime(''); // Reset showtime when date changes
    };

    const handleCinemaChange = (cinema) => {
        setSelectedCinema(cinema);
        setSelectedShowtime(''); // Reset showtime when cinema changes
    };

    return (
        <div className="container mx-auto p-6">
            <div className="space-y-8">
                {/* Step 1: Location Selector */}

                <div className="flex flex-col space-y-2 shadow-lg p-4  rounded-md">
                    <label className="font-bold text-lg">Chọn vị trí</label>
                    <div className="flex flex-wrap gap-2">
                        {cityData.map((city) => (
                            <button
                                key={city}
                                className={`px-4 py-2 border rounded-md ${selectedCity === city ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleCityChange(city)}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>


                {/* Step 2: Cinema Selector */}

                <div className="flex flex-col space-y-2 shadow-lg p-4  rounded-md">
                    <label className="font-bold text-lg">Chọn rạp</label>
                    {selectedCity && (
                        <div className="flex flex-wrap gap-4">
                            {cinemaData.map((cinema) => (
                                <div
                                    key={cinema.name}
                                    className={`cursor-pointer p-4 border rounded-md ${selectedCinema === cinema.name ? 'border-blue-500' : 'border-gray-300'}`}
                                    onClick={() => handleCinemaChange(cinema.name)}
                                >
                                    {cinema.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {/* Step 3: Movie Selector */}

                <div className="flex flex-col space-y-2 shadow-lg p-4  rounded-md">
                    <label className="font-bold text-lg">Chọn phim</label>
                    {selectedCinema && (
                        <div className="flex flex-wrap gap-4">
                            {movieData.map((movie) => (
                                <div
                                    key={movie.id}
                                    className={`relative cursor-pointer ${selectedMovie === movie.name ? 'border-4 border-blue-500' : 'border-2 border-gray-300'} rounded-md overflow-hidden`}
                                    onClick={() => handleMovieChange(movie.name)}
                                >
                                    <img
                                        src={movie.image}
                                        alt={movie.name}
                                        className="w-48 h-72 object-cover"
                                    />
                                    {selectedMovie === movie.name && (
                                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 text-xs">
                                            Selected
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {/* Step 4: Date Selector */}

                <div className="flex flex-col space-y-2 shadow-lg p-4  rounded-md">
                    <label className="font-bold text-lg">Chọn ngày chiếu</label>
                    {selectedMovie && (
                        <div className="flex space-x-4">
                            {dateOptions.map((date) => (
                                <button
                                    key={date}
                                    className={`px-4 py-2 border rounded-md ${selectedDate === date ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    onClick={() => handleDateChange(date)}
                                >
                                    {date}
                                </button>
                            ))}
                        </div>
                    )}
                </div>


                {/* Step 5: Showtime Selector */}

                <div className="flex flex-col space-y-2 shadow-lg p-4  rounded-md">
                    <label className="font-bold text-lg">Chọn suất chiếu</label>
                    {selectedDate && (
                        <div className="grid grid-cols-4 gap-2">
                            {cinemaData
                                .find((cinema) => cinema.name === selectedCinema)
                                .showtimes[selectedDate].map((showtime) => (
                                    <button
                                        key={showtime}
                                        className={`px-4 py-2 border rounded-md ${selectedShowtime === showtime ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        onClick={() => handleShowtimeChange(showtime)}
                                    >
                                        {showtime}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>


                {/* Step 6: Proceed to Booking Button */}
                {selectedShowtime && (
                    <Link to="/booking/bookingseat">
                        <button className="w-full  bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Proceed to Booking
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}


// Component này để hiển thị thông tin về vé: Chọn địa phương, chọn rạp, chọn phim, chọn ngày chiếu, suất chiếu. Hết ! 🔥
// Sau khi đầy đủ thông tin và bắt buộc đi theo flow như trên thì hiển thị ra 1 button link to booking seat page