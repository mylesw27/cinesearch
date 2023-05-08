import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FavoritesButton (props) {
  const [isFavorite, setIsFavorite] = useState(false); //I MIGHT NOT NEED props.isfavorite - change to false instead
  const jwt = localStorage.getItem("jwt");
  const tmdbId = `${props.movie.id}`
  const currentUser = props.currentUser
  const navigate = useNavigate()

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        const favorites = response.data.result;
        const ids = favorites.map(favorite => favorite.id)
        setIsFavorite(ids.includes(tmdbId));
      } catch (err) {
        console.log(err);
      }
    };
  // get all objectid from users favorites
  // get all 
    checkFavorite();
  }, [jwt, tmdbId]);

  const toggleFavorite = async () => {
    try {
      navigate(0)
      if (isFavorite) {
        // remove from favorites
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites/${props.objectId}`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setIsFavorite(false);
      } else {
        // add to favorites
        const sendData = {...props.movie, userId: currentUser._id}
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites`, sendData, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.log(err);
    }
  };


  
  

  return (
    <button type="button" className="btn btn-sm font-weight-bold" onClick={toggleFavorite}>
      {isFavorite ? "Remove From Favorites" : "Add To Favorites"}
    </button>
  );
};
