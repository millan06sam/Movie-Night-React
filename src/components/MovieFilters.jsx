export default function MovieFilters({ years, filters, onChange, disabled }) {
  return (
    <fieldset disabled={disabled}>
      <legend>Filter loaded results</legend>
      <div className="filter-controls">
        <div>
          <label htmlFor="year-filter">Release year</label>
          <select
            id="year-filter"
            value={filters.year}
            onChange={event => onChange({ ...filters, year: event.target.value })}
          >
            <option value="">Any year</option>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="rating-filter">Minimum rating</label>
          <select
            id="rating-filter"
            value={filters.minimumRating}
            onChange={event => onChange({ ...filters, minimumRating: Number(event.target.value) })}
          >
            <option value={0}>Any rating (including unrated)</option>
            {[5, 6, 7, 8, 9].map(rating => (
              <option key={rating} value={rating}>{rating} / 10</option>
            ))}
          </select>
        </div>
      </div>
      <p>Filters apply to the first page of results already loaded.</p>
    </fieldset>
  );
}
