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

export function getMovieYears(movies) {
  return [...new Set(movies.map(movie => movie.year))]
    .filter(year => year !== null)
    .sort((first, second) => second - first);
}

export function filterMovies(movies, { year = "", minimumRating = 0 } = {}) {
  return movies.filter(movie => {
    const matchesYear = year === "" || movie.year === Number(year);
    const matchesRating = minimumRating === 0
      || (movie.rating !== null && movie.rating >= minimumRating);
    return matchesYear && matchesRating;
  });
}

export function summarizeRatings(movies) {
  const totals = movies.reduce((summary, movie) => {
    if (Number.isFinite(movie.rating) && movie.rating >= 0 && movie.rating <= 10) {
      summary.ratedCount++;
      summary.ratingSum += movie.rating;
    }

    return summary;
  }, { ratedCount: 0, ratingSum: 0 });

  return {
    ratedCount: totals.ratedCount,
    unratedCount: movies.length - totals.ratedCount,
    averageRating: totals.ratedCount === 0 ? null : totals.ratingSum / totals.ratedCount,
  };
}
