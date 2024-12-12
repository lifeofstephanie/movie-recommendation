import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";

const TVSeriesDetails = () => {
  const { id } = useParams();
  const carouselRef = useRef(null);
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const {
    isLoading: isTvLoading,
    error: tvError,
    data: tvData,
  } = useQuery({
    queryKey: ["tvSeriesDetails", id],
    queryFn: () =>
      fetch(`https://api.themoviedb.org/3/tv/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTI5OGRhZjkzODE4MDc0Njk3NzAxZGViNTY3YzVmMiIsIm5iZiI6MTcyNzAwMDYzNS4wOTMsInN1YiI6IjY2ZWZmMDNiOTJkMzk2ODUzODNiNjMzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nUaU-2eUNoieiGR7aoanVCy_6TlRgVq6xLaZiu2aQlg",
        },
      }).then((res)=>res.json()),
  });
  const {
    isLoading: isRecLoading,
    error: recError,
    data: recData,
  } = useQuery({
    queryKey: ["tvSeriesRecommendation", id],
    queryFn: () =>
      fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTI5OGRhZjkzODE4MDc0Njk3NzAxZGViNTY3YzVmMiIsIm5iZiI6MTcyNzAwMDYzNS4wOTMsInN1YiI6IjY2ZWZmMDNiOTJkMzk2ODUzODNiNjMzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nUaU-2eUNoieiGR7aoanVCy_6TlRgVq6xLaZiu2aQlg",
        },
      }).then((res)=>res.json()),
  });
  if (isRecLoading || isTvLoading) {
    return "Loading...";
  }
  if (tvError || recError)
    return "Error: " + tvError.message || recError.message;

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container px-4">
        <div className="grid gap-6  lg:gap-12 px-4">
          {/* Poster */}
          <div className=" overflow-hidden rounded-lg" />
          <div className="bg-gradient-to-t from-black/50 to-transparent w-[200px]">
            <img
              src={
                tvData.poster_path
                  ? `https://image.tmdb.org/t/p/w300${tvData.poster_path}`
                  : "/placeholder.jpg"
              }
              alt={tvData.name}
              className=""
            />
          </div>
          {/* TV Details */}
        </div>
        <div className="space-y-6 mb-4 px-4">
          <div>
            {tvData.name === tvData.original_name ? (
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {tvData.name}
              </h1>
            ) : (
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {tvData.name}({tvData.original_name})
              </h1>
            )}
            <p className="mt-4 text-lg text-gray-400">{tvData.overview}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tvData.genres && tvData.genres.length > 0
              ? tvData.genres.map((genre) => (
                  <div
                    key={genre.id} // Add a unique key to each element
                    className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 p-2 rounded m-1"
                  >
                    {genre.name}
                  </div>
                ))
              : "N/A"}
          </div>
          <div className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="text-sm text-gray-400">First Air Date</div>
                <div className="font-medium">{tvData.first_air_date}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Rating</div>
                <div className="font-medium">
                  {tvData.vote_average?.toFixed(1)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <div className="font-medium">{tvData.status}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Seasons</div>
                <div className="font-medium">
                  {tvData.number_of_seasons} Seasons
                </div>
              </div>
            </div>
          </div>

          {/* TMDb Button */}
          <hr className="bg-gray-800 w-full" />
          <button className=" flex gap-2  bg-blue-600 text-white hover:bg-blue-500 h-[50px] px-2 rounded-md justify-center items-center">
            <PlusCircle className="h-5 w-5" />
            Add to WatchList
          </button>
        </div>
        {/*Movie Recommendation */}
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            More Like This
          </h2>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
              onClick={scrollLeft}
            >
              &#8592;
            </button>
            <div
              ref={carouselRef}
              className="flex overflow-x-scroll space-x-4 scrollbar-hide"
            >
              {recData.results.map((movie) => (
                <div
                  key={movie.id}
                  className="min-w-[200px] bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1">
                    <Link to={`/tv/${movie.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-left">
                        {movie.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600  text-left">
                      Rating: {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 flex gap-2 justify-center items-center">
                      <PlusCircle className="h-5 w-5" />
                      Add to WatchList
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
              onClick={scrollRight}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVSeriesDetails;
