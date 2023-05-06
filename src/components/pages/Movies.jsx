import { useState, useEffect } from "react";
import axios from "axios";
import ListView from "../partials/ListView";
import "./Movies.css"

export default function Movies(props) {
  // declare an empty array for state "popularArray"
  const [popularArray, setPopularArray] = useState([]);
  // useEffect for getting movies array on component mount
  useEffect(() => {
    // axios get request to API for list of popular movies
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
      )
      // set state of movies array to the list of popular movies
      .then((response) => {
        console.log('ressss   ', response)
        setPopularArray(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // return Listview component with array of popular movies
  return (
    <div className="movies">
      <h2 className="popular-title">Popular Movies</h2>
      <ListView movies={popularArray} />
    </div>
  );
}
