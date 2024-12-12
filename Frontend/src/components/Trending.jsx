import movies from "./Movies";

const TrendingMovies=()=>{
    const trending = movies.slice(0,5)

    return(
        <div className="trending-movies">
            {trending.map((movie, index) => (
                <div key={index} className='movie-poster'>
                    <img src={movie.posterUrl} alt={movie.title} className='poster-image'/>
                </div>
            ))}
        </div>
    )
}
export default TrendingMovies