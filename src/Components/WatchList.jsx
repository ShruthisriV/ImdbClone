import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import genreids from '../utility';
import { WatchListContext } from './Contexts/WatchListContext';

function WatchList() {
    // const [watchList, setWatchList] = useState([]); // Changed to lowercase for consistency
    const {watchList, removeFromWatchlist, sortWatchList, loadWatchList} = useContext(WatchListContext); //contextAPI and added sortWatchList
    const [search, setSearch] = useState("");
    const [genreList, setGenreList] = useState([])
    const [currGenre, setCurrGenre] = useState("All Genres");

    // useEffect(() =>{
    //     //fetch the watchlist from the local storage
    //     let stringifiedWatchlist = localStorage.getItem("watchList");
    //     if(!stringifiedWatchlist) return;
    //     let watchList = JSON.parse(stringifiedWatchlist);
    //     setWatchList(watchList);
    // }, []);

    
    //compute the genreList once and then only when watchlist state is changed
    // useEffect(() => {
    //     // 1. reduce -> {"action": 1, "romance":3} ->Object.keys
    //     //2. get all genres-> map -> u get distinct genres
    //     const allGenres = watchList.map(movie=>genreids[movie.genre_ids[0]]);
    //     const allDistinctGenres = new Set(allGenres);
    //     setGenreList(["All Genres", ...allDistinctGenres]);
    // },[watchList]);


    //contextAPI
    // Add this useEffect to reload watchlist when component mounts
    useEffect(() => {
        loadWatchList();
    }, []);

    useEffect(() => {
        const allGenres = watchList.map(movie=>genreids[movie.genre_ids[0]]);
        const allDistinctGenres = new Set(allGenres);
        setGenreList(["All Genres", ...allDistinctGenres]);
    },[watchList]);

    const handleAscendingRatings =() => {
        // let lowtohighSortedRatings=watchList.sort((a,b) => a.vote_average-b.vote_average)
        // setWatchList([...lowtohighSortedRatings]); //basic way
        // //do not alter the original source, i.e. watchList
        
        //contextAPI
        sortWatchList('asc');
    }

    const handleDescendingRatings = () => {
        // let hightolowSortedRatings=watchList.sort((a,b)=>b.vote_average-a.vote_average);
        // setWatchList([...hightolowSortedRatings]);
        
        //contextAPI
        sortWatchList('desc');
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = (genre) => {
        setCurrGenre(genre);
    }
    // const removeFromWatchlist = (movieId) => {//written to delete function
    //     let updatedWatchList = watchList.filter(movieObj => movieObj.id != movieId);
    //     localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    //     setWatchList(updatedWatchList);
    // }

  return (
    <>
        {/* required genre movie selection */}
        <div className="flex justify-center m-4">
            {
                genreList.map((genre, id) => {
                    return (
                        <button 
                            key={id} 
                            className= {
                                currGenre==genre 
                                    ? "h-[3rem] w-[9rem] bg-blue-400 flex justify-center items-center rounded-xl text-white font-bold mx-4"
                                    :"h-[3rem] w-[9rem] bg-gray-400/50 flex justify-center items-center rounded-xl text-white font-bold mx-4"
                                }
                            onClick={() => handleClick(genre)}  
                        >
                            {genre}
                        </button>
                    );
                })
            }
        </div>
        <div>
            <input
                type="text"
                placeholder="Search Movies"
                onChange={handleSearch}
                value={search}
                className="bg-gray-200 border border-gray-500 outline-none px-4 h-[3rem] w-[18rem]"
            />
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-5m text-gray-500">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-4 font-medium text-gray-900">Name</th>
                        <th>
                            <div className="flex">
                                <i  onClick={handleAscendingRatings} className="fa-solid fa-arrow-up"></i>
                                <div>Ratings</div>
                                <i  onClick={handleDescendingRatings} className="fa-solid fa-arrow-down"></i>
                            </div>
                        </th>
                        <th>
                            <div className="flex">
                                <div>Popularity</div>
                            </div>
                        </th>
                        <th>
                            <div className="flex">
                                <div>Genre</div>
                            </div>
                        </th>
                        <th>
                            <div className="flex">
                                <div>Delete</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {watchList
                    .filter(movie => { //filetr done
                        if(currGenre=="All Genres") return true /*here true return all the films in the All Genres */
                        return genreids[movie.genre_ids[0]] == currGenre })
                    .filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())) //searching with any case done
                    .map((movie) => (  // Added parentheses here
                        <tr className="hover:bg-gray-50" key={movie.id}>
                            <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                                <img
                                    className="h-[6rem] w-[10rem] object-fit"
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Changed movieObject to movie
                                    alt=""
                                />
                                <div className="font-medium text-gray-700 text-5m">
                                    {movie.title}
                                </div>
                            </td>
                            <td className="pl-6 py-4">{movie.vote_average}</td>
                            <td className="pl-6 py-4">{movie.popularity}</td>
                            <td className="pl-2 py-4">{genreids[movie.genre_ids[0]]}</td>
                            <td className="text-red-500 text-center py-9"><i className="fa-solid fa-trash-can cursor-pointer" onClick={() => removeFromWatchlist(movie.id)}></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default WatchList