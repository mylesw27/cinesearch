// search endpoint for movie api

// import react and the necessary hoooks
import {useState} from 'react'
import axios from 'axios'

// define mainsearch component
function MainSearch() {
    // set up state variables
    const [searchQuery, setSearchQuery] = useState('')
    const [movies, setMovies] = useState([])
    // define handle
    const handleSearch = (event) => {
        event.preventDefault()

        axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`)
        .then((response) => setMovies(response.data.results))
        .catch((error) => console.log(error))
    }

    return (
        <div className='main-search'>
            <form onSubmit={handleSearch}>
                <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                </div>
            ))}

        </div>
    )
}

export default MainSearch