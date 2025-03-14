const PaginateIndicator = (props) => {
    return (
        <div>
            <div className="absolute right-20 bottom-[20%]">
                <ul className="flex gap-1">
                    {
                        props.movies.map((movie) => (
                            <li
                            onClick={() =>{
                                props.setActiveMovieId(movie.id);
                            }}
                                key={movie.id}
                                className={`w-4 h-1 cursor-pointer ${props.activeMovieId === movie.id
                                    ? "bg-slate-100"
                                    : "bg-gray-600"
                                    }`}
                            ></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default PaginateIndicator;
