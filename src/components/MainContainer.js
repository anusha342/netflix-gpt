import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-screen min-h-[100svh] bg-black overflow-hidden">
      {/* 🎬 Video Trailer */}
      <VideoBackground movieId={id} />

      {/* 🎥 Netflix-style cinematic gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />

      {/* 📝 Movie Title & Buttons */}
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
