import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_BEARER_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Function to fetch genres
const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  const data = await response.json();
  return data.genres; // Return genres list
};

// Function to fetch movies or series with pagination, search query, and genre filter
const fetchMoviesAndSeries = async (
  page = 1,
  type = "movie",
  searchQuery = "",
  genreIds = []
) => {
  let url = searchQuery
    ? `${BASE_URL}/search/${type}?page=${page}&query=${searchQuery}`
    : `${BASE_URL}/discover/${type}?page=${page}`;

  if (genreIds.length > 0) {
    url += `&with_genres=${genreIds.join(",")}`;
  }

  try {
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
  } catch (error) {
    throw new Error(error.message || "Failed to fetch content.");
  }
};

function MoviesAndSeries() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("movie"); // movie or tv
  const [selectedGenres, setSelectedGenres] = useState([]); // Selected genres IDs
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // Fetch genres using React Query
  const { data: genres, isError: genresError } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  // Fetch content (movies/series) using React Query
  const {
    data,
    isError,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: [
      "moviesAndSeries",
      currentPage,
      contentType,
      searchQuery,
      selectedGenres,
    ],
    queryFn: () =>
      fetchMoviesAndSeries(
        currentPage,
        contentType,
        searchQuery,
        selectedGenres
      ),
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  // Reset to page 1 when search query or genre changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenres]);

  // Handle search input change (this updates the state)
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Set search query but do not trigger the fetch here
  };

  // Handle pressing Enter to trigger the search
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1); // Reset to page 1 when starting a new search
      // No need to trigger the query here as React Query will automatically refetch when the query key changes
    }
  };

  // Clear the search input field
  const handleClearSearch = () => {
    setSearchQuery(""); // Reset search query
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= data?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle content type toggle (movie/series)
  const handleToggleContentType = () => {
    setContentType(contentType === "movie" ? "tv" : "movie");
    setSearchQuery(""); // Reset search query when switching content type
  };

  // Toggle genre selection
  const toggleGenre = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId]
    );
  };

  // Show loading or error state while fetching data
  if (queryLoading)
    return (
      <p className="text-center text-lg text-gray-600">Loading content...</p>
    );
  if (isError || !data)
    return (
      <p className="text-center text-lg text-red-600">
        Failed to load content.
      </p>
    );

  return (
    <div className="relative">
      {/* Loader */}
      {queryLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-50 backdrop-blur-sm flex items-center justify-center">
          <ClipLoader color="#3498db" loading={queryLoading} size={150} />
        </div>
      )}

      <div
        className={`container mx-auto px-4 py-8 ${
          queryLoading ? "blur-sm" : ""
        }`}
      >
        <div className="flex flex-row items-center justify-between mb-8">
          {/* Search Bar */}
          <div className="relative w-1/2 md:w-1/3">
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={handleSearch} // Only updates the state
              onKeyDown={handleSearchEnter} // Triggers search on Enter key
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <ClearIcon />
              </button>
            )}
          </div>
          <div className={"flex gap-10"}>
            {/* Genre Filter Dropdown */}
            <div className="relative">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                Filter by Genre
              </button>
              {isDropdownOpen && (
                <div className="absolute top-12 left-[-50px] bg-white shadow-lg rounded-lg border border-gray-300 w-[200px] p-4 z-10">
                  {genres?.length > 0 && (
                    <div>
                      {genres?.map((genre) => (
                        <label
                          key={genre.id}
                          className="flex items-center space-x-2 mb-2"
                        >
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
              )}
            </div>
            {/* Toggle Between Movies and TV */}
            <div className="relative">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
                onClick={handleToggleContentType}
              >
                {contentType === "movie"
                  ? "Switch to TV Series"
                  : "Switch to Movies"}
              </button>
            </div>
          </div>
        </div>

        {/* Displaying Movies or Series */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data?.content?.map((item) => (
            <div
              key={item.id}
              className="min-w-[200px] bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1">
                <Link
                  to={
                    contentType === "movie"
                      ? `/movie/${item.id}`
                      : `/tv/${item.id}`
                  }
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

        {/* Pagination Controls */}
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
