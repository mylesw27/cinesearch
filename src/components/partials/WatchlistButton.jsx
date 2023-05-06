import React, { useState, useEffect } from "react";
import axios from "axios";

const WatchlistButton = ({ movie }) => {
  console.log(movie)
  const [isWatched, setIsWatched] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const tmdbId = `${movie.id}`

  const toggleWatchList = async () => {
    try {
      if (isWatched) {
        // remove from watchList
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist/${movie}`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setIsWatched(false);
      } else {
        // add to watchList
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist`, movie, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setIsWatched(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        const watchList = response.data.result;
        const ids = watchList.map(favorite => favorite.id)
        console.log(ids)

        console.log(`Sanity`, ids.includes(tmdbId), tmdbId)
        setIsWatched(ids.includes(tmdbId));
      } catch (err) {
        console.log(err);
      }
    };
  // get all objectid from users watchList
  // get all 



    checkFavorite();
  }, [jwt, tmdbId]);
  
  

  return (
    <button onClick={toggleWatchList}>
      {isWatched ? "Remove from watchList" : "Add to watchList"}
    </button>
  );
};

export default WatchlistButton;
