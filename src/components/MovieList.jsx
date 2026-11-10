import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p>No movies match your search. Try another title.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}