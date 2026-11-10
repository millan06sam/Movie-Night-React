import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="movie-query">Movie title</label>

      <div className="search-controls">
        <input
          id="movie-query"
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="For example, Inception"
          maxLength={100}
        />

        <button type="submit">Search</button>
      </div>
    </form>
  );
}
