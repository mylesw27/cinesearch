import { useState, useEffect } from "react";
import ListView from "../partials/ListView";
import axios from "axios";

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
      <h2 style={{fontFamily:"Sigmar", fontWeight:"lighter", padding:"30px"}}>My Favorite Movies</h2>
      <ListView movies={favoritesArray} />
    </div>
  );
}
