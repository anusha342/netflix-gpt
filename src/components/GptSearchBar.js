import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import {
  addGptMovieResult,
  setGptError,
} from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  //  Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  // Handle GPT Search
  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();

    // Empty input
    if (!query) {
      dispatch(
        setGptError("Please enter a movie name, genre, or mood.")
      );
      return;
    }

    try {
      const gptQuery =
        "Act as a movie recommendation system and suggest 5 movies for: " +
        query +
        ". Return only comma separated movie names.";

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-4o-mini",
      });

      if (!gptResults.choices?.length) {
        dispatch(setGptError("No recommendations found."));
        return;
      }

      //  Parse GPT movies safely
      const gptMovies = gptResults.choices[0].message.content
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      if (gptMovies.length === 0) {
        dispatch(setGptError("No movie suggestions found."));
        return;
      }

      //  Search TMDB for each movie
      const promiseArray = gptMovies.map((movie) =>
        searchMovieTMDB(movie)
      );

      const tmdbResults = await Promise.all(promiseArray);

      //  No TMDB results at all
      const hasAnyResults = tmdbResults.some(
        (result) => result && result.length > 0
      );

      if (!hasAnyResults) {
        dispatch(
          setGptError(
            "We couldn’t find any matching movies. Try a different search."
          )
        );
        return;
      }

      //  Success
      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      dispatch(
        setGptError(
          "If you want it to suggest movies to you ,then use your openai's secret key...😣🥲"
        )
      );
    }
  };

  return (
    <div className="flex justify-center px-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="
          w-[92%] sm:w-[600px]
          bg-black bg-opacity-80
          rounded-md
          p-4
          flex flex-col sm:flex-row
          gap-3
          shadow-2xl
        "
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="
            flex-1
            p-4
            bg-gray-700
            text-white
            rounded
            outline-none
            focus:ring-2 focus:ring-red-600
          "
        />

        <button
          type="button"
          onClick={handleGptSearchClick}
          className="
            px-6
            py-3
            bg-red-600
            hover:bg-red-700
            text-white
            rounded
            font-semibold
            text-lg
            transition
          "
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
