import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies, emptyMessage = "No movies found. Try another title." }) {
  if (movies.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
