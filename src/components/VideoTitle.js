const VideoTitle = ({ title, overview, onPlay, onMoreInfo }) => {
  return (
    <div className="absolute top-[22%] sm:top-[28%] md:top-[32%] px-4 sm:px-8 md:px-16 z-20 text-white max-w-xl">
      <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold">
        {title}
      </h1>

      {/* Only 2 lines */}
      <p className="hidden sm:block mt-3 text-sm sm:text-base text-gray-200 line-clamp-2">
        {overview}
      </p>

      <div className="flex flex-wrap gap-3 mt-5">
        <button
          onClick={onPlay}
          className="bg-white text-black px-5 py-2 rounded-md font-semibold text-sm sm:text-lg hover:bg-opacity-80"
        >
          ▶ Play
        </button>

        <button
          onClick={onMoreInfo}
          className="bg-gray-600 bg-opacity-70 text-white px-5 py-2 rounded-md font-semibold text-sm sm:text-lg hover:bg-opacity-50"
        >
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
