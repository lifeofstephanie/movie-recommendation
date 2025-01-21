import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_BEARER_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  const data = await response.json();
  return data.genres;
};

const fetchMoviesAndSeries = async (page = 1, type = "movie", searchQuery = "", genreIds = []) => {
  let url = searchQuery
    ? `${BASE_URL}/search/${type}?page=${page}&query=${searchQuery}`
    : `${BASE_URL}/discover/${type}?page=${page}`;

  if (genreIds.length > 0) {
    url += `&with_genres=${genreIds.join(",")}`;
  }

  const contentResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!contentResponse.ok) {
    throw new Error("Failed to fetch content.");
  }

  const contentData = await contentResponse.json();
  return {
    content: contentData.results,
    totalPages: contentData.total_pages,
  };
};

function MoviesAndSeries() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [contentType, setContentType] = useState("movie");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: genres, isError: genresError } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const { data, isError, isLoading: queryLoading } = useQuery({
    queryKey: ["moviesAndSeries", currentPage, contentType, searchQuery, selectedGenres],
    queryFn: () => fetchMoviesAndSeries(currentPage, contentType, searchQuery, selectedGenres),
    keepPreviousData: true,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenres]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchQuery(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= data?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleToggleContentType = () => {
    setContentType((prevType) => (prevType === "movie" ? "tv" : "movie"));
  };

  const toggleGenre = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId]
    );
  };

  if (queryLoading) {
    return <p className="text-center text-lg text-gray-600">Loading content...</p>;
  }
  if (isError || !data) {
    return <p className="text-center text-lg text-red-600">Failed to load content.</p>;
  }

  return (
    <div className="relative">
      {queryLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-50 backdrop-blur-sm flex items-center justify-center">
          <ClipLoader color="#3498db" loading={queryLoading} size={150} />
        </div>
      )}

      <div className={`container mx-auto px-4 py-8 ${queryLoading ? "blur-sm" : ""}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="relative w-full mb-4 md:mb-0 md:w-1/3 flex flex-row gap-4">
            <input
              type="text"
              placeholder="Search content..."
              value={searchInput}
              onChange={handleSearchInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg "
            />
            <button
              onClick={handleSearchButtonClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 flex gap-2 justify-center items-center"
            >
              Search
            </button>
          </div>
          <div className="flex gap-2 md:gap-10 justify-end md:justify-normal">
            <div className="relative flex justify-center items-center">
              <button
                className="hidden md:inline px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                Filter by Genre
              </button>
              <button
                className="md:hidden px-8 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                Filter
              </button>
              {isDropdownOpen && (
                <div className="absolute top-12 left-[-50px] bg-white shadow-lg rounded-lg border border-gray-300 w-[200px] p-4 z-10">
                  {genres?.length > 0 &&
                    genres.map((genre) => (
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
            <div className="relative">
              <button
                className=" hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
                onClick={handleToggleContentType}
              >
                {contentType === "movie" ? "Switch to TV Series" : "Switch to Movies"}
              </button>
              <button
                className="md:hidden px-8 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
                onClick={handleToggleContentType}
              >
                {contentType === "movie" ? " Series" : "Movies"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4 ">
          {data?.content?.map((item) => (
            <div
              key={item.id}
              className=" w-[150px] md:w-[200px] bg-white shadow-md rounded-lg overflow-hidden flex flex-col mx-auto"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1">
                <Link
                  to={contentType === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-left">
                    {item.title || item.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 text-left">
                  Rating: {item.vote_average.toFixed(1)}
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
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {data.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data.totalPages}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoviesAndSeries;
