export function normalizeMovies(results) {
  const seenIds = new Set();

  return results
    .filter(movie => {
      if (!movie || typeof movie !== "object" || Array.isArray(movie)
        || !Number.isInteger(movie.id) || movie.id <= 0 || seenIds.has(movie.id)) {
        return false;
      }

      seenIds.add(movie.id);
      return true;
    })
    .map(movie => ({
      id: movie.id,
      title: typeof movie.title === "string" && movie.title.trim() !== "" ? movie.title : "Untitled movie",
      year: typeof movie.release_date === "string" && /^[1-9]\d{3}-/.test(movie.release_date)
        ? Number(movie.release_date.slice(0, 4)) : null,
      rating: Number.isFinite(movie.vote_average) && movie.vote_average >= 0 && movie.vote_average <= 10
        && Number.isFinite(movie.vote_count) && movie.vote_count > 0 ? movie.vote_average : null,
      overview: typeof movie.overview === "string" && movie.overview.trim() !== ""
        ? movie.overview : "No summary available.",
    }));
}
