import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import MovieList from "./components/MovieList.jsx";
import { searchMovies } from "./api.js";
import { normalizeMovies } from "./logic.js";
import "./App.css";

export default function App() {

  const [search, setSearch] = useState(null);
  const [request, setRequest] = useState({ status: "idle", movies: [], error: "" });

  function handleSearch(query) {
    const title = query.trim();
    setRequest({ status: title === "" ? "idle" : "loading", movies: [], error: "" });
    setSearch({ query: title });
  }

  useEffect(() => {
    if (!search || search.query === "") {
      return;
    }

    const controller = new AbortController();
    let active = true;

    async function loadMovies() {
      try {
        const results = await searchMovies(search.query, controller.signal);
        const movies = normalizeMovies(results);

        if (active) {
          setRequest({ status: "success", movies, error: "" });
        }
      } catch (error) {
        if (!active || error.name === "AbortError") {
          return;
        }

        const message = error instanceof TypeError
          ? "Could not connect to the movie service. Check your connection and try again."
          : error.message;
        setRequest({ status: "error", movies: [], error: message });
      }
    }

    loadMovies();

    return () => {
      active = false;
      controller.abort();
    };
  }, [search]);

  return (
    <main>
      <header>
        <h1>Movie Night</h1>
        <p>Find something worth watching.</p>
      </header>

      <SearchForm onSearch={handleSearch} />

      <section aria-labelledby="movies-heading">
        <h2 id="movies-heading">Search results</h2>
        <p role="status">
          {request.status === "idle" && "Search for a movie title to get started."}
          {request.status === "loading" && `Searching for "${search.query}"…`}
          {request.status === "success" && `Showing ${request.movies.length} movies from the first page of results for "${search.query}".`}
        </p>
        {request.status === "error" && (
          <div>
            <p className="error" role="alert">{request.error}</p>
            <button type="button" onClick={() => handleSearch(search.query)}>Try again</button>
          </div>
        )}
        <div aria-busy={request.status === "loading"}>
          {request.status === "success" && <MovieList movies={request.movies} />}
        </div>
      </section>
      <footer aria-label="Credits">
        <a href="https://www.themoviedb.org/">
          <img className="tmdb-logo" src="https://www.themoviedb.org/assets/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" width="110" />
        </a>
        <p>Movie data from TMDB.</p>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </main>
  );
}
