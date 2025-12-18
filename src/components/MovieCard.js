import { IMG_CDN_URL } from "../utils/constants";
const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="relative flex-shrink-0">
      <div
        className="
          w-28 sm:w-36 md:w-48
          transition-all duration-300 ease-out
          hover:scale-110
          hover:z-50
        "
      >
        <img
          className="rounded-md shadow-lg hover:brightness-110"
          src={IMG_CDN_URL + posterPath}
          alt="Movie"
        />
      </div>
    </div>
  );
};

export default MovieCard;
