import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieFilters from "./components/MovieFilters.jsx";
import ScoreSummary from "./components/ScoreSummary.jsx";
import { getMovies } from "./api.js";
import { normalizeMovies, getMovieYears, filterMovies, summarizeScores } from "./logic.js";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [request, setRequest] = useState({ status: "loading", movies: [], error: "" });
  const [filters, setFilters] = useState({ year: "", minimumScore: 0 });
  const [loadAttempt, setLoadAttempt] = useState(0);
  const years = getMovieYears(request.movies);
  const visibleMovies = filterMovies(request.movies, { ...filters, query: searchTerm });
  const scoreSummary = summarizeScores(visibleMovies);

  function handleSearch(query) {
    setSearchTerm(query.trim());
    setFilters({ year: "", minimumScore: 0 });
  }

  function handleRetry() {
    setRequest({ status: "loading", movies: [], error: "" });
    setLoadAttempt(attempt => attempt + 1);
  }

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadMovies() {
      try {
        const results = await getMovies(controller.signal);
        const movies = normalizeMovies(results);

        if (active) {
          setRequest({ status: "success", movies, error: "" });
        }
      } catch (error) {
        if (!active || error.name === "AbortError") {
          return;
        }

        const message = error instanceof TypeError
          ? "Could not connect to the film service. Check your connection and try again."
          : error.message;
        setRequest({ status: "error", movies: [], error: message });
      }
    }

    loadMovies();

    return () => {
      active = false;
      controller.abort();
    };
  }, [loadAttempt]);

  return (
    <main>
      <header>
        <h1>Movie Night</h1>
        <p>Studio Ghibli edition · an unofficial film finder.</p>
      </header>
      <SearchForm onSearch={handleSearch} />
      <section aria-labelledby="movies-heading">
        <h2 id="movies-heading">Ghibli film catalogue</h2>
        <MovieFilters
          years={years}
          filters={filters}
          onChange={setFilters}
          disabled={request.status !== "success" || request.movies.length === 0}
        />
        <p role="status">
          {request.status === "loading" && "Loading the Ghibli film catalogue…"}
          {request.status === "success" && `Showing ${visibleMovies.length} of ${request.movies.length} loaded movies.`}
        </p>
        {request.status === "error" && (
          <div>
            <p className="error" role="alert">{request.error}</p>
            <button type="button" onClick={handleRetry}>Try again</button>
          </div>
        )}
        <div aria-busy={request.status === "loading"}>
          {request.status === "success" && (
            <>
              <ScoreSummary summary={scoreSummary} />
              <MovieList
                movies={visibleMovies}
                emptyMessage={request.movies.length === 0
                  ? "The film catalogue is empty."
                  : "No movies match your search and filters. Try another title, year, or score."}
              />
            </>
          )}
        </div>
      </section>
      <footer aria-label="Credits">
        <p>Film data from the <a href="https://ghibliapi.vercel.app/">Studio Ghibli API</a>, an unofficial, fan-maintained service.</p>
        <p>Critic scores are the Rotten Tomatoes percentages supplied by the API.</p>
      </footer>
    </main>
  );
}
