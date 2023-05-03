export default function Card(props) {
    const movie = props.movie
    console.log(movie)
    const posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
    return (
        <div className="card">
            <img src={posterUrl} />
            <h2>{movie.name}</h2>
            <p>{movie.overview}</p>
        </div>
    )
}