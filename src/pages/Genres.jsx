import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ClearIcon from '@mui/icons-material/Clear'; 

const API_KEY = process.env.REACT_APP_BEARER_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchGenresAndMovies = async () => {
  const genresResponse = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!genresResponse.ok) throw new Error("Failed to fetch genres.");
  const genresData = await genresResponse.json();

  const moviesByGenrePromises = genresData.genres.map(async (genre) => {
    const moviesResponse = await fetch(
      `${BASE_URL}/discover/movie?with_genres=${genre.id}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    if (!moviesResponse.ok)
      throw new Error(`Failed to fetch movies for genre: ${genre.name}`);
    const moviesData = await moviesResponse.json();
    return { genre, movies: moviesData.results };
  });

  return Promise.all(moviesByGenrePromises);
};

function MoviesByGenre() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["genresAndMovies"],
    queryFn: fetchGenresAndMovies,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoading) return <p className="text-center text-lg text-gray-600">Loading genres...</p>;
  if (isError)
    return <p className="text-center text-lg text-red-600">Failed to load genres and movies.</p>;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate loading delay
  };

  const handleClearSearch = () => {
    setSearchQuery("");  // Clear the input field
  };

  const toggleGenre = (genreId) => {
    setLoading(true);
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
    setTimeout(() => setLoading(false), 2000); // Simulate loading delay
  };

  const filteredMovies = data
    .filter(({ genre }) => selectedGenres.length === 0 || selectedGenres.includes(genre.id))
    .map(({ genre, movies }) => ({
      genre,
      movies: movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(({ movies }) => movies.length > 0);

  return (
    <div className="relative">
      {/* Apply blur effect to background when loading */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-50 backdrop-blur-sm flex items-center justify-center">
          <ClipLoader color="#3498db" loading={loading} size={150} />
        </div>
      )}
      
      <div className={`container mx-auto px-4 py-8 ${loading ? "blur-sm" : ""}`}>
        <div className="flex flex-row items-center justify-between mb-8">
          <div className="relative w-1/2 md:w-1/3">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <ClearIcon />
              </button>
            )}
          </div>
          <div className="relative">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              Filter by Genre
            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 left-[-50px] bg-white shadow-lg rounded-lg border border-gray-300 w-[200px] p-4 z-10">
                {data.map(({ genre }) => (
                  <label key={genre.id} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre.id)}
                      onChange={() => toggleGenre(genre.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>{genre.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {filteredMovies.map(({ genre, movies }) => (
          <div key={genre.id} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{genre.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesByGenre;
