import { useState, useEffect } from "react"
import ListView from "../partials/ListView"
import favorites from "../../favorites" // Using favorites for placeholder data

export default function Watchlist() {
    const [watchlistArray, setWatchlistAray] = useState([])
    const watchlist = favorites // This code will need to be removed once we have watchlist data

    useEffect(() => {
        setWatchlistAray(watchlist)
    })

    return (
        <div>
            <h2>My Watchlist</h2>
            <ListView movies={watchlistArray} />
        </div>
    )
}

