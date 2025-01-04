import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PopularMovies() {
  const API_KEY = process.env.REACT_APP_BEARER_API_KEY
  const carouselRef = useRef(null);
  const navigate = useNavigate()

  const { isLoading, error, data } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () =>
      fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US",
        {
          headers: {
            Authorization:`Bearer ${API_KEY}`
          },
        }
      ).then((res) => res.json()),
  });
  if (isLoading) return " Loading ....";
  if (error) return "An error has occurred: " + error.message;

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
          Popular Movies
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
            {data.results.map((movie) => (
              <div
                key={movie.id}
                className="min-w-[200px] bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-1">
                  <Link to={`/movie/${movie.id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-left">
                      {movie.title}
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
            <div
              className="min-w-[200px] bg-gray-200 shadow-md rounded-lg flex flex-col justify-center items-center"
            >
              <button
                onClick={() => navigate("/genres")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-center"
              >
                See More
              </button>
            </div>
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
            onClick={scrollRight}
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
