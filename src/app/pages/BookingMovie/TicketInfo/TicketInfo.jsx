import { Button, Collapse } from 'antd';
import { eachDayOfInterval, format, parse, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cinemaDataFromFile from '../../../../mocks/cinemas.json';
import cityDataFromFile from '../../../../mocks/locations.json';
import movieDataFromFile from '../../../../mocks/movies.json';
import sessionsDataFromFile from '../../../../mocks/sessions.json';
const { Panel } = Collapse;


export default function BookingPage() {
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
        setSelectedCity(city.id);
        console.log(`Đây là id của city đã chọn: ${city.id}`);
        setSelectedCinema('');
        setSelectedMovie('');
        setSelectedDate('');
        setSelectedShowtime('');
        setActiveKey(['1', '2']); // Automatically open the cinema step after selecting city
    };

    const handleCinemaChange = (cinema) => {
        setSelectedCinema(cinema.id);
        console.log(`Đây là id của cinema đã chọn: ${cinema.id}`);
        setSelectedShowtime('');
        setActiveKey((prev) => [...prev, '3']); // Automatically open the movie step after selecting cinema
    };

    const handleMovieChange = (movie) => {
        setSelectedMovie(movie.id);
        console.log(`Đây là id của phim đã chọn: ${movie.id}`);
        setActiveKey((prev) => [...prev, '4']); // Automatically open the date step after selecting movie
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(`Đây là ngày đã chọn: ${date}`);
        setActiveKey((prev) => [...prev, '5']);
        // Automatically open the showtime step after selecting date
    };

    const handleShowtimeChange = (showtime) => {
        setSelectedShowtime(showtime);
    };

    // Lấy các ngày từ startDate đến endDate của bộ phim đã chọn
    const selectedMovieData = movieDataFromFile.data.result.find(
        (movie) => movie.id === selectedMovie
    );

    // Sử dụng `date-fns` để lấy các ngày từ startDate đến endDate của bộ phim đã chọn
    const availableDates = selectedMovieData
        ? eachDayOfInterval({
            start: parseISO(selectedMovieData.startDate), // Chuyển đổi startDate thành đối tượng Date
            end: parseISO(selectedMovieData.endDate), // Chuyển đổi endDate thành đối tượng Date
        })
        : [];

    return (
        <div className="container mx-auto p-6 flex justify-center">
            <div className="w-full max-w-4xl space-y-8">
                {/* Step 1: Location Selector */}
                <Collapse activeKey={activeKey} expandIconPosition="start">
                    <Panel header="Select Location" key="1">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {cityDataFromFile.data.result.map((city) => (
                                <Button
                                    key={city.id}
                                    type={selectedCity === city.id ? 'primary' : 'default'}
                                    onClick={() => handleCityChange(city)}
                                >
                                    {city.name}
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
                                {cinemaDataFromFile.data.result
                                    .filter((cinema) => cinema.cityId === selectedCity) // Giả sử mỗi cinema có `cityId` để lọc theo city đã chọn
                                    .map((cinema) => (
                                        <Button
                                            key={cinema.id} // Sử dụng `cinema.id` thay vì `cinema.name` để đảm bảo key duy nhất
                                            type={selectedCinema === cinema.id ? 'primary' : 'default'}
                                            onClick={() => handleCinemaChange(cinema)} // Cập nhật hàm để nhận `cinema.id` thay vì `cinema.name`
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
                        {selectedCinema && selectedCity && (
                            <div className="flex flex-wrap gap-4 justify-center">
                                {movieDataFromFile.data.result
                                    .filter((movie) => movie.cityIds.includes(selectedCity)) // Kiểm tra xem `selectedCity` có nằm trong `movie.cityIds`
                                    .map((movie) => (
                                        <div
                                            key={movie.id}
                                            className={`relative cursor-pointer ${selectedMovie === movie.id ? 'border-4 border-blue-500' : 'border-2 border-gray-300'} rounded-md overflow-hidden`}
                                            onClick={() => handleMovieChange(movie)}
                                        >
                                            <img
                                                src={movie.imagePortrait} // Thay đổi thành `imagePortrait` vì ảnh chân dung
                                                alt={movie.name}
                                                className="w-48 h-72 object-cover"
                                            />
                                            {selectedMovie === movie.id && (
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
                            <div className="flex flex-wrap space-x-4 justify-center">
                                {availableDates.map((date, index) => (
                                    <div key={index} className="relative">
                                        <Button
                                            type={selectedDate === format(date, 'dd/MM/yyyy') ? 'primary' : 'default'}
                                            onClick={() => handleDateChange(format(date, 'dd/MM/yyyy'))}
                                        >
                                            {format(date, 'dd/MM/yyyy')}
                                        </Button>
                                        {selectedDate ===format(date, 'dd/MM/yyyy') && (
                                            <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs">
                                                Selected
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Panel>
                </Collapse>

                {/* Step 5: Showtime Selector */}
                <Collapse activeKey={activeKey} expandIconPosition="start">
                    <Panel header="Select Showtime" key="5">
                        {selectedDate && selectedMovie && selectedCinema && (
                            <div>
                                {/* Lọc các suất chiếu theo rạp, phim, và ngày đã chọn */}
                                {sessionsDataFromFile.data.result
                                    .filter((session) => session.cinema.id === selectedCinema) // Lọc theo rạp đã chọn
                                    .filter((session) => session.movie.id === selectedMovie) // Lọc theo phim đã chọn
                                    .filter((session) => {
                                        const sessionDate = format(parseISO(session.showDate), 'dd/MM/yyyy'); // Định dạng ngày của session.showDate
                                        const selectedDateParsed = parse(selectedDate, 'dd/MM/yyyy', new Date()); // Định dạng lại selectedDate
                                        const selectedDateFormatted = format(selectedDateParsed, 'dd/MM/yyyy'); // Định dạng selectedDate thành dd/MM/yyyy
                                        const isMatch = sessionDate === selectedDateFormatted; // So sánh ngày
                                        console.log(`Tạo ở đây: ${session.showDate} - So sánh: ${sessionDate} === ${selectedDateFormatted} => ${isMatch}`);
                                        return isMatch; // Trả về kết quả true/false cho filter
                                    }) // Lọc theo ngày đã chọn
                                    .map((session) => {
                                        return (
                                            <div key={session.id} className="mb-4">
                                                <div className="text-lg font-bold">{session.cinema.name}</div> {/* Tên rạp */}
                                                <div className="text-sm text-gray-600">{`Format: ${session.movieFormat}`}</div> {/* Định dạng phim */}
                                                <div className="text-sm text-gray-600">{`Screen: ${session.screenName}`}</div> {/* Tên màn chiếu */}
                                                <div className="text-sm text-gray-600">{`Time: ${session.showTime}`}</div> {/* Giờ chiếu */}
                                                <div className="text-sm text-gray-600">{`Seats available: ${session.totalSeat - session.bookedSeat}`}</div> {/* Ghế còn lại */}
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    <Button
                                                        type={selectedShowtime === session.showTime ? 'primary' : 'default'}
                                                        onClick={() => handleShowtimeChange(session.showTime)}
                                                    >
                                                        {session.showTime}
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
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
