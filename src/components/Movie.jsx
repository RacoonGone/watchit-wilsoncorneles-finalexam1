export default function Movie({ movie, onView, onEdit, onDelete }) {
    function handleimageerror(event) {
        event.target.src = "https://via.placeholder.com/300x400?text=No+Image";
    }

    function handleviewclick() {
        onView(movie);
    }

    function handleeditclick() {
        onEdit(movie);
    }

    function handledeleteclick() {
        onDelete(movie);
    }

    function handlecoverclick() {
        onView(movie);
    }

    return (
        <div className="movie">
            <div className="cover">
                <img src={movie.image} alt={movie.title} onError={handleimageerror} onClick={handlecoverclick} style={{ cursor: "pointer" }} />
                <div className="overlay">
                    <div className="details">
                        <h3 className="movietitle">{movie.title}</h3>
                        <p className="movieauthor">{movie.director}</p>
                        <p className="moviemeta">{movie.genre} - {movie.release_year}</p>
                        <p className="moviemeta rating" style={{ color: "#FFD700" }}><img className="staricon" src="/star.svg" alt="Star" /> {movie.rating}</p>
                        <div className="actions">
                            <button className="btnview" onClick={handleviewclick}>View</button>
                            <button className="btnedit" onClick={handleeditclick}>Edit</button>
                            <button className="btndelete" onClick={handledeleteclick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
