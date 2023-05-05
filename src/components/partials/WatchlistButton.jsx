import { useState, useEffect } from "react";

export default function WatchlistButton({ movie, userId }) {
  const [isWatchlist, setIsWatchlist] = useState(false);

  useEffect(() => {
    // check if the movie is already in favorites
    fetch(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result.some((watchlist) => watchlist.id === movie.id)) {
          setIsWatchlist(true);
        }
      })
      .catch((err) => console.log(err));
  }, [movie, userId]);

  const handleWatchlist = (e) => {
    e.preventDefault();
    if (isWatchlist) {
      // fetch(`/api-v1/users/${userId}/favorites/${movie.id}`, { method: 'DELETE' })
      //     .then(() => setIsFavorite(false))
      //     .catch(err => console.log(err))
      console.log(`Removed ${movie.title} from watchlist`);
    } else {
      // fetch(`/api-v1/users/${userId}/favorites`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(movie)
      // })
      //     .then(() => setIsFavorite(true))
      //     .catch(err => console.log(err))
      console.log(`Added ${movie.title} to watchlist`);
    }
  };

  return (
    <button onClick={handleWatchlist}>
      {isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
}
