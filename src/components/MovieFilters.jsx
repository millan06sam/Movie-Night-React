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
          <label htmlFor="score-filter">Minimum critic score</label>
          <select
            id="score-filter"
            value={filters.minimumScore}
            onChange={event => onChange({ ...filters, minimumScore: Number(event.target.value) })}
          >
            <option value={0}>Any score (including missing scores)</option>
            {[50, 60, 70, 80, 90].map(score => (
              <option key={score} value={score}>{score}%</option>
            ))}
          </select>
        </div>
      </div>
      <p>Search and filters apply to the loaded Ghibli catalogue. An empty search shows all titles.</p>
    </fieldset>
  );
}
