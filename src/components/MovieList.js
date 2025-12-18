import MovieCard from "./MovieCard";
const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 md:px-12 py-6">
      <h1 className="text-lg md:text-2xl font-semibold text-white mb-3">
        {title}
      </h1>

      <div
        className="
          relative
          overflow-x-scroll
          overflow-y-hidden
          scrollbar-hide
        "
      >
        <div className="flex gap-4 items-center">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
