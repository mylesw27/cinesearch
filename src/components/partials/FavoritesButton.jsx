import React, { useState, useEffect } from "react";
import axios from "axios";

const FavoritesButton = ({ movie }) => {
  console.log(movie)
  const [isFavorite, setIsFavorite] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const tmdbId = `${movie.id}`

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        // remove from favorites
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites/${movie}`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        setIsFavorite(false);
      } else {
        // add to favorites
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites`, movie, {
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
        console.log(ids)

        console.log(`Sanity`, ids.includes(tmdbId), tmdbId)
        setIsFavorite(ids.includes(tmdbId));
      } catch (err) {
        console.log(err);
      }
    };
  // get all objectid from users favorites
  // get all 



    checkFavorite();
  }, [jwt, tmdbId]);
  
  

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoritesButton;
