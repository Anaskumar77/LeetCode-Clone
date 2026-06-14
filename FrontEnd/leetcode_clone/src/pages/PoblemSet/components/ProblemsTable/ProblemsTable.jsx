import './ProblemsTable.css';

export default function ProblemsTable() {
  return (
    <section className="lc-section lc-section-problems" id="problems-list">
      <div className="lc-section-label">Problems</div>

      {/* Topic Tags Row */}
      <div className="lc-topic-tags">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="wf-topic-tag" />
        ))}
        <div className="wf-expand-btn" />
      </div>

      {/* Filter Tabs */}
      <div className="lc-filter-tabs">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`wf-tab ${i === 0 ? 'wf-tab-active' : ''}`} />
        ))}
        <div className="wf-tab-more" />
      </div>

      {/* Search + Controls Row */}
      <div className="lc-controls-row">
        <div className="wf-search-bar wf-search-problems" />
        <div className="wf-sort-btn" />
        <div className="wf-filter-btn" />
        <div className="lc-controls-right">
          <div className="wf-solved-count" />
          <div className="wf-icon-xs" />
        </div>
      </div>

      {/* Problems Table */}
      <div className="lc-table">
        {/* Header */}
        <div className="lc-table-header">
          <div className="wf-col wf-col-status" />
          <div className="wf-col wf-col-title" />
          <div className="wf-col wf-col-acc" />
          <div className="wf-col wf-col-diff" />
          <div className="wf-col wf-col-lock" />
          <div className="wf-col wf-col-fav" />
        </div>

        {/* Rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="lc-table-row">
            <div className="wf-col wf-col-status">
              <div className="wf-status-dot" />
            </div>
            <div className="wf-col wf-col-title">
              <div className="wf-row-title" style={{ width: `${55 + (i % 4) * 10}%` }} />
            </div>
            <div className="wf-col wf-col-acc">
              <div className="wf-text-sm" />
            </div>
            <div className="wf-col wf-col-diff">
              <div className="wf-diff-badge" />
            </div>
            <div className="wf-col wf-col-lock">
              <div className="wf-icon-xs" />
            </div>
            <div className="wf-col wf-col-fav">
              <div className="wf-icon-xs" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
