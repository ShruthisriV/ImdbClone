import React, { useState } from 'react'

function MovieCard({ movieObject, addToWatchList, 
  removeFromWatchlist, watchList }) {
    
    function isPresentInWatchList(){
      //if movie is present in my watchlist
      for(let movieData of watchList){
        if(movieData.id == movieObject.id){
          return true; //display cross
        }
      }
      return false;
      //else display emoji
    }

    return (
      <div
          className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col
          justify-between items-end"
          style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movieObject.poster_path}')`,
          }}
       >
          <div className="text-white w-full text-center 
                          text-xl bg-gray-900/70 p-2 rounded-lg">
              {movieObject.title}
          </div>
          {/* if this movie is added to watchlist?X: 😍 */}

          {isPresentInWatchList() == true ? ( 
            <div onClick={()=>removeFromWatchlist(movieObject.id)} 
            className="m-4 flex justify-center items-center h-8 w-8 
            rounded-lg bg-gray-900/60"
            >
              ❌
            </div>
          ):(
          <div onClick={()=>addToWatchList(movieObject)} 
          className="m-4 flex justify-center items-center h-8 w-8 
          rounded-lg bg-gray-900/60"
          >
            ❤️
          </div>
          )} 
      </div>
    );
  }

export default MovieCard