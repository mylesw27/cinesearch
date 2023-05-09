// import react and the necessary hoooks
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainSearch.css"

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
    <form onSubmit={handleSearch}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}


export default MainSearch;
