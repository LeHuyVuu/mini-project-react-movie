import PaginateIndicator from './PaginateIndicator';
import Movie from './Movie';
import { useEffect, useState } from 'react';

const FeatureMovies = () => {
  const [movies, setMovies] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState();
  const [transitionClass, setTransitionClass] = useState('opacity-100'); // Lớp hiệu ứng mặc định

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    }).then(async (res) => {
      const data = await res.json();
      const popularMovies = data.results.slice(0, 4);
      setMovies(popularMovies);

      // Set activeMovieId ban đầu
      setActiveMovieId(popularMovies[0].id);

      // Tạo interval để tự động chuyển movie mỗi 4 giây
      const intervalId = setInterval(() => {
        setTransitionClass('opacity-0'); // Bắt đầu hiệu ứng fade-out
        setTimeout(() => {
          setActiveMovieId((prevId) => {
            const currentIndex = popularMovies.findIndex((movie) => movie.id === prevId);
            const nextIndex = (currentIndex + 1) % popularMovies.length; // Quay lại đầu nếu đến cuối
            return popularMovies[nextIndex].id;
          });
          setTransitionClass('opacity-100'); // Kết thúc hiệu ứng fade-in
        }, 500); // Thời gian hiệu ứng fade-out
      }, 4000);

      // Cleanup: Clear interval khi component unmount hoặc khi movie list thay đổi
      return () => clearInterval(intervalId);
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-black">
      <div
        className={`transition-opacity duration-500 ${transitionClass}`}
      >
        {movies
          .filter((movie) => movie.id === activeMovieId)
          .map((movie) => <Movie key={movie.id} data={movie} />)}
      </div>
      <PaginateIndicator movies={movies} activeMovieId={activeMovieId} setActiveMovieId={setActiveMovieId} />
    </div>
  );
};

export default FeatureMovies;
