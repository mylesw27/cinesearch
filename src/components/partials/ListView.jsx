import favorites from "../../favorites"
import Card from "./Card"


export default function ListView(props) {
    // set state for movie list passed down from app.js
    const listName = props.listName
    // set name of list passed down from app.jst
    const cardsArray = favorites.map((movie, i) => {
        return (
            <Card
                movie={movie}
            />
        )
    })
    return (
        <div>
            <h1>{listName}</h1>
            {cardsArray}


        </div>
    )
}

// TO DO
// stub out card component
// create mock favorites array to display
