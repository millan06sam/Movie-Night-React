function parseNumber(value) {
  if ((typeof value !== "string" && typeof value !== "number") || String(value).trim() === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function normalizeMovies(results) {
  const seenIds = new Set();

  return results
    .filter(movie => {
      if (!movie || typeof movie !== "object" || Array.isArray(movie)
        || typeof movie.id !== "string" || movie.id.trim() === "" || seenIds.has(movie.id)) {
        return false;
      }

      seenIds.add(movie.id);
      return true;
    })
    .map(movie => {
      const year = parseNumber(movie.release_date);
      const score = parseNumber(movie.rt_score);

      return {
        id: movie.id,
        title: typeof movie.title === "string" && movie.title.trim() !== "" ? movie.title : "Untitled movie",
        year: Number.isInteger(year) && year >= 1000 && year <= 9999 ? year : null,
        score: score !== null && score >= 0 && score <= 100 ? score : null,
        overview: typeof movie.description === "string" && movie.description.trim() !== ""
          ? movie.description : "No summary available.",
      };
    });
}

export function getMovieYears(movies) {
  return [...new Set(movies.map(movie => movie.year))]
    .filter(year => year !== null)
    .toSorted((first, second) => second - first);
}

export function filterMovies(movies, { query = "", year = "", minimumScore = 0 } = {}) {
  const search = query.trim().toLowerCase();

  return movies.filter(movie => {
    const matchesTitle = movie.title.toLowerCase().includes(search);
    const matchesYear = year === "" || movie.year === Number(year);
    const matchesScore = minimumScore === 0
      || (movie.score !== null && movie.score >= minimumScore);
    return matchesTitle && matchesYear && matchesScore;
  });
}

export function summarizeScores(movies) {
  const totals = movies.reduce((summary, movie) => {
    if (Number.isFinite(movie.score) && movie.score >= 0 && movie.score <= 100) {
      summary.scoredCount++;
      summary.scoreSum += movie.score;
    }

    return summary;
  }, { scoredCount: 0, scoreSum: 0 });

  return {
    scoredCount: totals.scoredCount,
    unscoredCount: movies.length - totals.scoredCount,
    averageScore: totals.scoredCount === 0 ? null : totals.scoreSum / totals.scoredCount,
  };
}
