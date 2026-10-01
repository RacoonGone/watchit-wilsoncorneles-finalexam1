import Movie from "./Movie"

export default function MovieList({ movies, onView, onEdit, onDelete }) {
    function rendermovie(movie) {
        return (
            <Movie key={movie.id} movie={movie} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        );
    }

    return (
        <main className="grid">
            {movies.map((movie) => {
                return rendermovie(movie);
            })}
        </main>
    );
}
