import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="relative bg-black z-20 -mt-40 md:-mt-56">
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Trending" movies={movies.nowPlayingMovies} />
        <MovieList title="Popular" movies={movies.popularMovies} />
        <MovieList title="Upcoming" movies={movies.nowPlayingMovies} />
      </div>
    )
  );
};

export default SecondaryContainer;
