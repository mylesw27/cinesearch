// import react and the necessary hoooks
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

// define mainsearch component
function MainSearch() {
  // set up state variables
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  let navigate = useNavigate()

  // define handle
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/?q=${searchQuery}`, { replace: false })
    navigate(0)
    setSearchQuery('')
  };

  return (
    <div className="main-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="main-search-input"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button className="main-search-button" type="submit">Search</button>
      </form>
    </div>
  );
}

export default MainSearch;
