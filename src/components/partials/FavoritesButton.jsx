import { useState, useEffect } from "react";

export default function FavoritesButton({ movie, currentUser, userId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // check if the movie is already in favorites
    fetch(`/api-v1/users/${userId}/favorites`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result.some((favorite) => favorite.id === movie.id)) {
          setIsFavorite(true);
        }
      })
      .catch((err) => console.log(err));
  }, [movie, userId]);

  const handleFavorite = (e) => {
    e.preventDefault();
    console.log(movie);
    console.log(currentUser);
    if (isFavorite) {
      // remove the movie from favorites
      //   fetch(`/api-v1/users/${userId}/favorites/${movie.id}`, { method: 'DELETE' })
      //     .then(() => setIsFavorite(false))
      //     .catch(err => console.log(err))
      console.log(`Add ${movie.title} to favorites`);
    } else {
      // add the movie to favorites
      fetch(`/api-v1/users/${userId}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      })
        .then(() => setIsFavorite(true))
        .catch((err) => console.log(err));
      console.log(`Remove ${movie.title} from favorites`);
    }
  };

  return (
    <button onClick={handleFavorite}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
