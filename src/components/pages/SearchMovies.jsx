// import useSearchParams
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// import listview component
import ListView from '../partials/ListView'
// import search field component
import MainSearch from '../MainSearch'
import axios from 'axios'

// export function
export default function SearchMovies() {
    // declare empty array state for searchArray
    const [movies, setMovies] = useState([0])
    // declare state for search params
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('q'))

    // useEffect    
    useEffect(() => {
        // setState search params
        const getSearch = async () => {
            // axios get apiURL/{searchparams}
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
            // then set SearchArray to response
            setMovies(response.data.results)
            console.log(response)
        }
        getSearch()
    }, [])

    console.log(search)
    // return search bar
    // return listview with searchArray
    return (
        <div>
            <ListView
                movies={movies}
            />
        </div>
    )
}



