import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function TrendingTvShows() {
  const carouselRef = useRef(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["trendingTvShows"],
    queryFn: () =>
      fetch("https://api.themoviedb.org/3/trending/tv/day", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTI5OGRhZjkzODE4MDc0Njk3NzAxZGViNTY3YzVmMiIsIm5iZiI6MTcyNzAwMDYzNS4wOTMsInN1YiI6IjY2ZWZmMDNiOTJkMzk2ODUzODNiNjMzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nUaU-2eUNoieiGR7aoanVCy_6TlRgVq6xLaZiu2aQlg",
        },
      }).then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error.message}</p>;

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

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Trending TV Shows
        </h2>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
            onClick={scrollLeft}
            aria-label="Scroll Left"
          >
            &#8592;
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-scroll space-x-4 scrollbar-hide"
          >
            {data.results.map((movie) => (
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
                  <p className="text-sm text-gray-600 text-left">
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
            aria-label="Scroll Right"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
