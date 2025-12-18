const MovieInfoModal = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="relative bg-black text-white max-w-2xl w-[90%] rounded-lg p-6 shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:opacity-70"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-4">
          {movie.original_title}
        </h1>

        <p className="text-gray-300 mb-4 leading-relaxed">
          {movie.overview}
        </p>

        <div className="text-sm text-gray-400 flex gap-6">
          <span>⭐ {movie.vote_average}</span>
          <span>📅 {movie.release_date}</span>
        </div>

        <button className="mt-6 bg-white text-black px-6 py-2 rounded-md font-semibold">
          ▶ Play
        </button>
      </div>
    </div>
  );
};

export default MovieInfoModal;
