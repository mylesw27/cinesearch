import { Link } from "react-router-dom";

export default function Card(props) {
    const movie = props.movie
    const listType = props.listType
    const posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`

    const handleRemoveFavorite = (e) => {
        e.preventDefault()
        console.log(`Remove ${movie.title} from favories`)
    }

    const handleAddWatchList = (e) => {
        e.preventDefault()
        console.log(`Add ${movie.title} to watchlist`)
    }

    const handleAddFavorite = (e) => {
        e.preventDefault()
        console.log(`Add ${movie.title} to favorites`)
    }

    const handleRemoveWatchList = (e) => {
        e.preventDefault()
        console.log(`Remove ${movie.title} from watchlist`)
    }

    const buttons = () => {
        if (listType === "Favorites") {
            return (
                <>
                    <button onClick={handleRemoveFavorite}>Remove from Favorites</button>
                    <button onClick={handleAddWatchList}>Add to Watch List</button>
                </>
            )
        } else if (listType === "Watchlist") {
            return (
                <>
                    <button onClick={handleAddFavorite}>Add to Favorites</button>
                    <button onClick={handleRemoveWatchList}>Remove from Watch List</button>
                </>
            )
        } else {
            return (
                <>
                    <button onClick={handleAddFavorite}>Add to Favorites</button>
                    <button onClick={handleAddWatchList}>Add to Watch List</button>
                </>
            )
        }
    }

    const otherButtons = () => {
        return (
            <p>{listType}</p>
        )
    }

    return (
        <>
            <Link to={`/movies/${movie.id}/details`}>
                <div className="card">
                    <img src={posterUrl} />
                    <h2>{movie.name}</h2>
                    <p>{movie.overview}</p>
                    {buttons()}
                </div>
            </Link>
        </>
    )
}