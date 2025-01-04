import Hero from "../components/gen/Hero";
import NewMovieReleases from "../components/home/newMovieRelease";
import PopularMovies from "../components/home/PopularMovies";
import TrendingTvShows from "../components/home/TrendingTvShows";

export default function HomePage() {
  return (
    <section className="pb-12 bg-gray-100">
        <Hero/>
        <NewMovieReleases/>
        <PopularMovies />
        <TrendingTvShows />
    </section>
  );
}
