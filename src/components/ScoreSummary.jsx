export default function ScoreSummary({ summary }) {
  if (summary.scoredCount + summary.unscoredCount === 0) {
    return null;
  }

  return (
    <section className="score-summary" aria-labelledby="scores-heading">
      <h3 id="scores-heading">Critic scores of displayed movies</h3>
      <dl className="score-totals">
        <div>
          <dt>Average score</dt>
          <dd>{summary.averageScore === null ? "Not available" : `${summary.averageScore.toFixed(1)}%`}</dd>
        </div>
        <div>
          <dt>Scored movies</dt>
          <dd>{summary.scoredCount}</dd>
        </div>
        <div>
          <dt>Without a score</dt>
          <dd>{summary.unscoredCount}</dd>
        </div>
      </dl>
      <p>Each scored movie counts equally. Missing scores are excluded from the average.</p>
    </section>
  );
}
