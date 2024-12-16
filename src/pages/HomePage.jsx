import Hero from "../components/gen/Hero";
import PopularMovies from "../components/home/PopularMovies";
import TrendingTvShows from "../components/home/TrendingTvShows";

export default function HomePage() {
  // const movies = [
  //   { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  //   { id: 2, title: "The Shawshank Redemption", genre: "Drama", rating: 9.3 },
  //   { id: 3, title: "The Dark Knight", genre: "Action", rating: 9.0 },
  //   { id: 4, title: "Pulp Fiction", genre: "Crime", rating: 8.9 },
  //   { id: 5, title: "Forrest Gump", genre: "Drama", rating: 8.8 },
  //   { id: 6, title: "The Matrix", genre: "Sci-Fi", rating: 8.7 },
  // ];

  // const Card = ({ children }) => (
  //   <div className="bg-white shadow-lg rounded-lg overflow-hidden">
  //     {children}
  //   </div>
  // );

  // const CardContent = ({ children, className }) => (
  //   <div className={`p-4 ${className}`}>{children}</div>
  // );

  // const CardFooter = ({ children, className }) => (
  //   <div className={`p-4 border-t ${className}`}>{children}</div>
  // );

  // const Badge = ({ children }) => (
  //   <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
  //     {children}
  //   </span>
  // );

  // const Button = ({ children, className }) => (
  //   <button
  //     className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full ${className}`}
  //   >
  //     {children}
  //   </button>
  // );

  return (
    <section className="pb-12 bg-gray-100">
        <Hero/>

      {/* <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Recommended Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id}>
              <CardContent>
                <img
                  src={`/placeholder.svg?height=200&width=300&text=${movie.title}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {movie.title}
                </h3>
                <div className="flex justify-between items-center">
                  <Badge>{movie.genre}</Badge>
                  <span className="text-sm text-gray-600">
                    Rating: {movie.rating}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Add to Watchlist</Button>
              </CardFooter>
            </Card>
          ))}
        </div> */}
        {/* <h2>Popular Movies</h2> */}
        <PopularMovies />
        <TrendingTvShows />
      {/* </div> */}
    </section>
  );
}
