import { useState, useEffect } from "react";
import ListView from "../partials/ListView";
import favorites from "../../favorites";

export default function Favorites() {
  const [favoritesArray, setFavoritesArray] = useState([]);

  useEffect(() => {
    setFavoritesArray(favorites);
  }, []);

  return (
    <div>
      <h2>My Favorite Movies</h2>
      <ListView movies={favoritesArray} />
    </div>
  );
}
