import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button, Space } from 'antd';

// Dummy data to simulate movie data (replace with real data from an API)
const { Panel } = Collapse;

const cityData = ['Hà Nội', 'Ho Chi Minh City', 'Da Nang', 'Bà Rịa - Vũng Tàu', 'An Giang'];
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
];
const cinemaData = [
    {
        name: 'Galaxy Nguyễn Du',
        showtimes: {
            'Friday 21/03': ['10:15', '14:45', '19:15'],
            'Saturday 22/03': ['12:30', '17:00'],
            'Sunday 23/03': ['13:30', '17:45'],
        },
    },
    {
        name: 'Galaxy Tân Bình',
        showtimes: {
            'Friday 21/03': ['11:30', '15:45', '20:00'],
            'Saturday 22/03': ['12:15', '16:45'],
            'Sunday 23/03': ['11:00', '14:00', '18:00'],
        },
    },
];
const dateOptions = ['Friday 21/03', 'Saturday 22/03', 'Sunday 23/03'];

export default function BookingPage({bookingmovie}) {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [activeKey, setActiveKey] = useState(['1']); // Keep track of which panels are expanded

    // Reset selections when city or movie changes, but keep cinema selected
    useEffect(() => {
        setSelectedDate('');
        setSelectedShowtime('');
    }, [selectedCity, selectedMovie]);

    const handleCityChange = (city) => {
        setSelectedCity(city);
        setSelectedCinema('');
        setSelectedMovie('');
        setSelectedDate('');
        setSelectedShowtime('');
        setActiveKey(['1', '2']); // Automatically open the cinema step after selecting city
    };

    const handleCinemaChange = (cinema) => {
        setSelectedCinema(cinema);
        setSelectedShowtime('');
        setActiveKey((prev) => [...prev, '3']); // Automatically open the movie step after selecting cinema
    };

    const handleMovieChange = (movie) => {
        setSelectedMovie(movie);
        setActiveKey((prev) => [...prev, '4']); // Automatically open the date step after selecting movie
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setActiveKey((prev) => [...prev, '5']); // Automatically open the showtime step after selecting date
    };

    const handleShowtimeChange = (showtime) => {
        setSelectedShowtime(showtime);
    };
  const getShowtimesForSelectedCinemaAndMovie = () => {
        if (selectedCinema && selectedMovie && selectedDate) {
            const cinema = cinemaData.find((cinema) => cinema.name === selectedCinema);
            if (cinema) {
                const showtimes = cinema.showtimes[selectedDate];
                if (showtimes) {
                    return showtimes[selectedMovie] || [];
                }
            }
        }
        return [];
    };
    return (
        <div className="container mx-auto p-6 flex justify-center">
            <div className="w-full max-w-4xl space-y-8">
                {/* Step 1: Location Selector */}
                <Collapse activeKey={activeKey} expandIconPosition="start">
                    <Panel header="Select Location" key="1">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {cityData.map((city) => (
                                <Button
                                    key={city}
                                    type={selectedCity === city ? 'primary' : 'default'}
                                    onClick={() => handleCityChange(city)}
                                >
                                    {city}
                                </Button>
                            ))}
                        </div>
                    </Panel>
                </Collapse>

                {/* Step 2: Cinema Selector */}
                <Collapse activeKey={activeKey} expandIconPosition="start">
                    <Panel header="Select Cinema" key="2">
                        {selectedCity && (
                            <div className="flex flex-wrap gap-4 justify-center">
                                {cinemaData.map((cinema) => (
                                    <Button
                                        key={cinema.name}
                                        type={selectedCinema === cinema.name ? 'primary' : 'default'}
                                        onClick={() => handleCinemaChange(cinema.name)}
                                    >
                                        {cinema.name}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </Panel>
                </Collapse>

                {/* Step 3: Movie Selector */}
                <Collapse activeKey={activeKey} expandIconPosition="start">
                    <Panel header="Select Movie" key="3">
                        {selectedCinema && (
                            <div className="flex flex-wrap gap-4 justify-center">
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
                    </Panel>
                </Collapse>

                {/* Step 4: Date Selector */}
                <Collapse activeKey={activeKey} expandIconPosition="start">
                    <Panel header="Select Date" key="4">
                        {selectedMovie && (
                            <div className="flex space-x-4 justify-center">
                                {dateOptions.map((date) => (
                                    <Button
                                        key={date}
                                        type={selectedDate === date ? 'primary' : 'default'}
                                        onClick={() => handleDateChange(date)}
                                    >
                                        {date}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </Panel>
                </Collapse>

                {/* Step 5: Showtime Selector */}
                <Collapse activeKey={activeKey} expandIconPosition="start">
                    <Panel header="Select Showtime" key="5">
                        {selectedDate && (
                            <div className="grid grid-cols-4 gap-2 justify-center">
                                {cinemaData
                                    .find((cinema) => cinema.name === selectedCinema)
                                    .showtimes[selectedDate].map((showtime) => (
                                        <Button
                                            key={showtime}
                                            type={selectedShowtime === showtime ? 'primary' : 'default'}
                                            onClick={() => handleShowtimeChange(showtime)}
                                        >
                                            {showtime}
                                        </Button>
                                    ))}
                            </div>
                        )}
                    </Panel>
                </Collapse>

                {/* Step 6: Proceed to Booking Button */}
                {selectedShowtime && (
                    <Link to="/booking/bookingseat">
                        <Button type="primary" size="large" style={{ width: '100%' }}>
                            Next
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
