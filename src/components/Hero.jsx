import { useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
// import background from '../assets/hero-bg.jpg'

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams(); // Store search query
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const handleSearch = async (query) => {

    const url = `https://api.themoviedb.org/3/search/tv?query=${query}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTI5OGRhZjkzODE4MDc0Njk3NzAxZGViNTY3YzVmMiIsIm5iZiI6MTcyNzAwMDYzNS4wOTMsInN1YiI6IjY2ZWZmMDNiOTJkMzk2ODUzODNiNjMzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nUaU-2eUNoieiGR7aoanVCy_6TlRgVq6xLaZiu2aQlg", // Replace with your API key
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching TV series:", error);
    }
  };

  return (
    <section className= "bg-[#000] text-[#fff] py-20 poster">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-xl mb-8">
          Get personalized movie recommendations based on your taste
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="search"
            placeholder="Search for movies..."
            className="flex-grow mr-2 h-[50px] rounded-md px-2 text-black"/>
          {searchQuery && searchResults.length > 0 &&(
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Search Results</h2>
              <div className="flex flex-wrap gap-6">
                {searchResults.map((tv) => (
                  <div
                    key={tv.id}
                    className="w-48 bg-gray-100 p-4 rounded cursor-pointer hover:bg-gray-200"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
                      alt={tv.name}
                      className="w-full h-64 object-cover mb-4"
                    />
                    <h3 className="font-semibold text-lg">{tv.name}</h3>
                    <p className="text-gray-500">{tv.first_air_date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button type="submit">Search</button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
