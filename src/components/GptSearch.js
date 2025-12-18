import { BG_URL } from "../utils/constants";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={BG_URL}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Foreground content */}
      <div className="pt-32">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;

