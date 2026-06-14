import './RightSidebar.css';

export default function RightSidebar() {
  return (
    <aside className="lc-sidebar-right">

      {/* ── Daily Challenge Card ── */}
      <div className="lc-right-card wf-card-right" id="daily-challenge">
        <div className="lc-right-card-label">Daily Challenge</div>
        <div className="lc-right-row">
          <div className="wf-day-info">
            <div className="wf-text-sm" />
            <div className="wf-day-nav">
              <div className="wf-icon-xs" />
              <div className="wf-icon-xs" />
            </div>
          </div>
          <div className="wf-streak-badge" />
        </div>

        {/* Calendar */}
        <div className="wf-cal-header">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="wf-cal-day-name" />
          ))}
        </div>
        <div className="wf-cal-grid">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className={`wf-cal-cell ${i === 13 ? 'wf-cal-today' : ''}`} />
          ))}
        </div>
      </div>

      {/* ── Weekly Premium Card ── */}
      <div className="lc-right-card wf-card-right" id="weekly-premium">
        <div className="lc-right-card-label">Weekly Premium</div>
        <div className="wf-week-tabs">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`wf-week-tab ${i === 0 ? 'wf-week-tab-active' : ''}`} />
          ))}
        </div>
        <div className="wf-premium-row">
          <div className="wf-dot-green" />
          <div className="wf-text-sm wf-grow" />
          <div className="wf-text-sm" />
        </div>
      </div>

      {/* ── Trending Companies Card ── */}
      <div className="lc-right-card wf-card-right" id="trending-companies">
        <div className="lc-right-card-label">Trending Companies</div>
        <div className="lc-right-row lc-right-row-between">
          <div className="wf-text-sm wf-grow" />
          <div className="wf-icon-xs" />
          <div className="wf-icon-xs" />
        </div>
        <div className="wf-company-search" />
        <div className="wf-company-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="wf-company-chip" />
          ))}
        </div>
      </div>

    </aside>
  );
}
