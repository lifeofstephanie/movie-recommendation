import { useEffect, useState } from "react";
import { db, addMovieToCategory } from "../firebase"; // Ensure addMovieToCategory is imported
import { collection, query, where, getDocs } from "firebase/firestore"; // Modular imports for Firebase v9+

const WatchlistPage = () => {
  // const [movies, setMovies] = useState([]);
  // const [category, setCategory] = useState("Currently Watching");

  // // Fetch movies when category changes
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const q = query(
  //       collection(db, "watchlist"),
  //       where("category", "==", category)
  //     ); // Create a query for Firestore
  //     const snapshot = await getDocs(q);
  //     const movieList = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setMovies(movieList);
  //   };

  //   fetchMovies();
  // }, [category]);

  // // Function to change the category of a movie
  // const changeCategory = async (movieId, newCategory) => {
  //   try {
  //     await addMovieToCategory(movieId, newCategory); // Using your addMovieToCategory function to update the movie
  //     setMovies((prevMovies) =>
  //       prevMovies.filter((movie) => movie.id !== movieId)
  //     ); // Remove the movie from the current list
  //     // Optionally, refetch the movies to reflect the updated category
  //   } catch (err) {
  //     console.error("Error changing movie category:", err);
  //   }
  // };

  // return (
  //   <div>
  //     <h1>{category} Movies</h1>
  //     <div>
  //       <button onClick={() => setCategory("Currently Watching")}>
  //         Currently Watching
  //       </button>
  //       <button onClick={() => setCategory("Watched")}>Watched</button>
  //       <button onClick={() => setCategory("Already Watched")}>
  //         Already Watched
  //       </button>
  //     </div>
  //     <div>
  //       {movies.map((movie) => (
  //         <div key={movie.id}>
  //           <h3>{movie.title}</h3>
  //           <button onClick={() => changeCategory(movie.id, "Watched")}>
  //             Change to Watched
  //           </button>
  //           <button onClick={() => changeCategory(movie.id, "Already Watched")}>
  //             Change to Already Watched
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default WatchlistPage;
