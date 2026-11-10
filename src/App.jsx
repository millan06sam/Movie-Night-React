import MovieList from "./components/MovieList.jsx";
import { sampleMovies } from "./data/sampleMovies.js";
import "./App.css";

export default function App() {
  return (
    <main>
      <header>
        <h1>Movie Night</h1>
        <p>Find something worth watching.</p>
      </header>
      <section aria-labelledby="movies-heading">
        <h2 id="movies-heading">Movie previews</h2>
        <p>These are fictional sample movies. Live search will be added next.</p>
        <MovieList movies={sampleMovies} />
      </section>
    </main>
  );
}
