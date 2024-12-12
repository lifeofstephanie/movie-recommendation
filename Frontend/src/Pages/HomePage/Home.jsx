import {useEffect, useState} from "react";
import movies from "../components/Movies";
import Navbar from "../components/Navbar";

export const Home = () => {
    const [currentMovie, setCurrentMovie] = useState({title:'', description:''})
    const [backgroundImage, setBackgroundImage] = useState('')

    useEffect(()=>{
        const getRandomMovie = ()=>{
            const randomIndex = Math.floor((Math.random()*movies.length))
            return(
                movies[randomIndex]
            )
        }
        const movie = getRandomMovie()
        setBackgroundImage(movie.posterUrl)
        setCurrentMovie({title:movie.title, description: movie.description})
        // setMovieTitle(getRandomTitle())
    },[])
    return (

        <div style={{backgroundImage:`url(${backgroundImage})`, backgroundSize:'cover', height:'100vh'}}>
            <Navbar/>
            <div className={'description'} style={{color:"white", width:'500px', marginLeft:'30px', marginTop:'150px'}}>
                <h1 style={{fontSize:50, fontWeight:600, fontFamily:'sans-serif'}}>{currentMovie.title}</h1>
                <p style={{fontWeight:400, fontFamily:'sans-serif'}}>{currentMovie.description}</p>
                <div className="buttons">
                    <button>Watch Now</button>
                    <button>Details</button>
                </div>
            </div>

        </div>
    )
}