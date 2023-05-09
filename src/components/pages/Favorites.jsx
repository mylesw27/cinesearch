import { useState, useEffect } from "react";
import ListView from "../partials/ListView";
import axios from "axios";
import './Favorites.css'


export default function Favorites({ authToken }) {
  const [favoritesArray, setFavoritesArray] = useState([]);
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites`;
    const getFaves = async () => {
      const response = await axios.get(url, {
        headers: { Authorization: `${jwt}` },
      })
      setFavoritesArray(response.data.result)
    }
    getFaves()
  }, []);

  return (
    <div>
      <h2 className="faves-title">Favorite Movies</h2>
      <div className="faves">
      <ListView className="movies" movies={favoritesArray} />
      </div>
    </div>
  );
}