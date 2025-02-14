import React, { useEffect, useState} from 'react'
import MovieCard from './MovieCard';
import WatchList from './Watchlist';
import { useDispatch, useSelector } from 'react-redux';
import paginationSlice from '../redux/paginationSlice';
import fetchMoviesMiddleware from '../moviesMiddleware';

const paginationActions = paginationSlice.actions;
function Movies() {
    
    //set up basic pagination
    const {pageNo} = useSelector((state) => {return state.paginationState})
    const {movies} = useSelector((state) => {return state.moviesState})
    const [watchlist, setWatchlist] = useState([]);
    const dispatch = useDispatch();
    
    // //go next handler  //used this before adding react and redux
    // const handleNext = () => {
    //     setPageNo(pageNo+1)
    // };

    // //go back handler
    // const handlePrevious = () => {
    //     if(pageNo == 1){
    //         return;
    //     }
    //     setPageNo(pageNo-1)
    // };

    //go to next handler
    const handleNext = () => {
        dispatch(paginationActions.handleNext())
    };
    //go back handler
    const handlePrevious = () => {
        dispatch(paginationActions.handlePrevious())
    };
    

    // //we will be using this static list of movies then we will
    // //replace it with actual data fetching logic
    // const [movies, setMovies] = useState([]);//REACT

    useEffect(() => {
        // const options = { //used while react
        //     method: 'GET',
        //     headers: {
        //       accept: 'application/json',
        //       Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
        //     }
        // };
          
        // fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageNo}`, options)
        //     .then(res => res.json())
        //     .then(res => {
        //         setMovies(res.results)
        //         console.log(res);
        //     })
        //     .catch(err => console.error(err));

        //redux
        dispatch(fetchMoviesMiddleware(pageNo))
    },[pageNo]);

    const addToWatchList = (movieObj) => {  // Add movieObj parameter here
        console.log("adding movie to watchlist", movieObj);
        let updatedWatchlist = [...watchlist, movieObj];
        localStorage.setItem("watchList", JSON.stringify(updatedWatchlist));
        setWatchlist(updatedWatchlist);
    }
    const removeFromWatchlist = (movieId) => {  
        console.log("removing from watchlist", movieId);
        let updatedWatchList = watchlist.filter(movieObj => movieObj.id != movieId); 
        localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
        setWatchlist(updatedWatchList);  // Make sure this line is here
    }

    useEffect(() => { //same we have to do in watchlist.jsx 
        let stringifiedWatchlist = localStorage.getItem("watchList") ;
        if(!stringifiedWatchlist) return;
        let watchList = JSON.parse(stringifiedWatchlist);
        setWatchlist(watchList);
    }, []);

    return (
        <div>  
            <div className="text-2xl font-bold text-center m-5">
                <h1>Trending Movies</h1> {/* Added heading back */}
            </div>

            {/* Show movies here */}
            <div className="flex justify-evenly flex-wrap gap-8">
                {movies.map((movieObj) => {  // Changed variable name for consistency
                    return(
                        <MovieCard key={movieObj.id}  
                        movieObject={movieObj} addToWatchList={addToWatchList}
                        removeFromWatchlist={removeFromWatchlist} watchList={watchlist}>
       
                        </MovieCard>
                    );
            })}
            </div>

            {/* pagination */}
            <div className="bg-gray-400 p-4 h-[50px] w-full mt-8
                flex justify-center gap-2">
                <div className="px-8" onClick={handlePrevious}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div>{pageNo}</div>
                <div className="px-8" onClick={handleNext}>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        </div>
    )
}


export default Movies