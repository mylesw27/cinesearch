import React, { useState, useEffect } from "react";
import axios from "axios";

const FavoritesButton = ({ movieId, authToken }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites`;

      if (isFavorited) {
        // Remove the movie from favorites
        await axios.delete(`${url}/${movieId}`, {
          headers: { Authorization: `jwt ${authToken}` },
        });
        setIsFavorited(false);
      } else {
        // Add the movie to favorites
        await axios.post(
          url,
          { movieId },
          { headers: { Authorization: `jwt ${authToken}` } }
        );
        setIsFavorited(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfFavorited = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites`;
      const response = await axios.get(url, {
        headers: { Authorization: `jwt ${authToken}` },
      });
      const favorites = response.data.result;
      setIsFavorited(favorites.includes(movieId));
    } catch (error) {
      console.log(error);
    }
  };

  // Check if the movie is in favorites when the component mounts
  useEffect(() => {
    checkIfFavorited();
  }, []);

  return (
    <button onClick={handleFavoriteClick}>
      {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoritesButton;
