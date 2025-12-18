import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames, error } = useSelector(
    (store) => store.gpt
  );

  // 🔴 Error / No result card
  if (error) {
    return (
      <div className="flex justify-center mt-16">
        <div className="bg-black bg-opacity-70 text-white p-8 rounded-lg shadow-xl max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">
            Oopsss Sorrryyy..😥🫥 Something Went Wrong
          </h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!movieNames) return null;

  return (
    <div className="mt-12">
      {movieNames.map(
        (movieName, index) =>
          movieResults[index]?.length > 0 && (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          )
      )}
    </div>
  );
};

export default GptMovieSuggestions;
