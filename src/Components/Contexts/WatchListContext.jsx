//contextAPI
import { createContext, useState, useEffect } from 'react';

export const WatchListContext = createContext();

export function WatchListProvider({ children }) {
    const [watchList, setWatchList] = useState([]);

    // Listen to localStorage changes
    useEffect(() => {
        // Initial load
        loadWatchList();

        // Add event listener for storage changes
        window.addEventListener('storage', loadWatchList);

        return () => {
            window.removeEventListener('storage', loadWatchList);
        };
    }, []);

    const loadWatchList = () => {
        let stringifiedWatchlist = localStorage.getItem("watchList");
        if(!stringifiedWatchlist) {
            setWatchList([]);
            return;
        }
        let watchList = JSON.parse(stringifiedWatchlist);
        setWatchList(watchList);
    }

    const addToWatchList = (movie) => {
        const updatedList = [...watchList, movie];
        localStorage.setItem("watchList", JSON.stringify(updatedList));
        setWatchList(updatedList);
    }

    const removeFromWatchlist = (movieId) => {
        const updatedList = watchList.filter(movie => movie.id != movieId);
        localStorage.setItem("watchList", JSON.stringify(updatedList));
        setWatchList(updatedList);
    }

    const sortWatchList = (direction) => {
        let sortedList;
        if(direction === 'asc') {
            sortedList = [...watchList].sort((a,b) => a.vote_average - b.vote_average);
        } else {
            sortedList = [...watchList].sort((a,b) => b.vote_average - a.vote_average);
        }
        setWatchList(sortedList);
        localStorage.setItem("watchList", JSON.stringify(sortedList)); // Add this line
    }

    return (
        <WatchListContext.Provider value={{ 
            watchList, 
            addToWatchList, 
            removeFromWatchlist,
            sortWatchList,
            loadWatchList // Export this function
        }}>
            {children}
        </WatchListContext.Provider>
    );
}