import { useState } from 'react'
import favorites from "../../favorites"
import Card from "./Card"


export default function ListView(props) {
    // set state for movie list passed down from app.js
    const listName = props.listName
    const [search, setSearch] = useState("")

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filterMoviesArray = favorites.filter((movie) => {
        return movie.title.toLowerCase().includes(search.toLowerCase())
    })

    const cardsArray = filterMoviesArray.map((movie, i) => {
        return (
            <Card
                key={`Card-${movie.id}`}
                movie={movie}
                listType={listName}
            />
        )
    })
    return (
        <div>
            <h1>{listName}</h1>
            <div>
                <label htmlFor="movie-search">Search in {listName}</label>
                <input
                    id="movie-search"
                    type="text"
                    value={search}
                    onChange={handleChange}
                />
            </div>

            {cardsArray}
        </div>
    )
}