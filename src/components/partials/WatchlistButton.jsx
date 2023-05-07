import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

export default function WatchlistButton (props) {
  const [isWatched, setIsWatched] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const tmdbId = `${props.movie.id}`
  const currentUser = props.currentUser
  const navigate = useNavigate()

  useEffect(() => {
    const checkWatch = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        const watchList = response.data.result;
        const ids = watchList.map(favorite => favorite.id)
        setIsWatched(ids.includes(tmdbId));
      } catch (err) {
        console.log(err);
      }
    };

    checkWatch();
  }, [jwt, tmdbId]);
  

  const toggleWatchList = async () => {
    try {
      navigate(0)
      if (isWatched) {
        // remove from watchList
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist/${props.watchObjId}`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setIsWatched(false);
      } else {
        // add to watchList
        const sendData = {...props.movie, userId:currentUser._id}
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist`, sendData, {
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

  
  

  return (
    <button type="button" className="btn btn-sm font-weight-bold" onClick={toggleWatchList}>
      {isWatched ? "Remove From WatchList" : "Add To WatchList"}
    </button>
  );
};

