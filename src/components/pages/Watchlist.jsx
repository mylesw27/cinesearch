import { useState, useEffect } from "react";
import ListView from "../partials/ListView";
import axios from "axios";
import './Watchlist.css'


export default function Watchlist() {
  const [watchlistArray, setWatchlistArray] = useState([]);
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist`;
    const getWatchlist = async () => {
      const response = await axios.get(url, {
        headers: { Authorization: `${jwt}` },
      })
      setWatchlistArray(response.data.result)
    }
    getWatchlist()
  }, []);

  return (
    <div>
      <h2 className="watch-title">Watchlist Movies</h2>
      <div className="watch">
      <ListView className="movies" movies={watchlistArray} />
      </div>
    </div>
  );
}
