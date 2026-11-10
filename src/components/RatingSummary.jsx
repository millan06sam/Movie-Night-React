export default function RatingSummary({ summary }) {
  if (summary.ratedCount + summary.unratedCount === 0) {
    return null;
  }

  return (
    <section className="rating-summary" aria-labelledby="ratings-heading">
      <h3 id="ratings-heading">Ratings of displayed movies</h3>
      <dl className="rating-totals">
        <div>
          <dt>Average rating</dt>
          <dd>{summary.averageRating === null ? "Not available" : `${summary.averageRating.toFixed(1)} / 10`}</dd>
        </div>
        <div>
          <dt>Rated movies</dt>
          <dd>{summary.ratedCount}</dd>
        </div>
        <div>
          <dt>Unrated movies</dt>
          <dd>{summary.unratedCount}</dd>
        </div>
      </dl>
      <p>Each rated movie counts equally. Unrated movies are excluded from the average.</p>
    </section>
  );
}
