export default function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <h3>{movie.title}</h3>
      <p className="movie-meta">
        {movie.year ?? "Year unknown"}
        {" · "}
        {movie.score === null ? "No critic score" : `${movie.score}% critic score`}
      </p>
      <details>
        <summary>Read synopsis</summary>
        <p>{movie.overview}</p>
      </details>
    </article>
  );
}
