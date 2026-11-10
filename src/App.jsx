import { useState } from "react";
import SearchForm from "./components/SearchForm.jsx"
import MovieList from "./components/MovieList.jsx";
import { sampleMovies } from "./data/sampleMovies.js";
import "./App.css";

export default function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const normalizedQuery = searchTerm.toLowerCase();
  const filteredMovies = sampleMovies.filter(movie => movie.title.toLowerCase().includes(normalizedQuery));

  return (
    <main>
      <header>
        <h1>Movie Night</h1>
        <p>Find something worth watching.</p>
      </header>

      <SearchForm onSearch={setSearchTerm} />

      <section aria-labelledby="movies-heading">
        <h2 id="movies-heading">Movie previews</h2>
        <p>These are fictional sample movies.</p>
        <p role="status">Results: {filteredMovies.length}</p>

        <MovieList movies={filteredMovies} />
      </section>
    </main>
  );
}
