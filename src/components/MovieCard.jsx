export default function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <h3>{movie.title}</h3>
      <p className="movie-meta">
        {movie.year ?? "Year unknown"}
        {" · "}
        {movie.rating === null ? "Not rated" : `${movie.rating.toFixed(1)} / 10`}
      </p>
      <details>
        <summary>Read synopsis</summary>
        <p>{movie.overview}</p>
      </details>
    </article>
  );
}
