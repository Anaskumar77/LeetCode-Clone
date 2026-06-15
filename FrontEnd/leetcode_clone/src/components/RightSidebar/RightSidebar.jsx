import './RightSidebar.css';

export default function RightSidebar() {
  return (
    <aside className="lc-sidebar-right">

      {/* ── Progress Tracker Card ── */}
      <div className="lc-right-card wf-card-right" id="progress-tracker">
        <div className="lc-right-card-label">Progress</div>
        
        <div className="lc-progress-body">
          <div className="lc-progress-ring-container">
            <svg viewBox="0 0 100 100" className="lc-progress-svg">
              <circle cx="50" cy="50" r="42" className="lc-ring-bg" />
              <circle cx="50" cy="50" r="42" className="lc-ring-segment lc-ring-easy" strokeDasharray="132 264" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="42" className="lc-ring-segment lc-ring-medium" strokeDasharray="99 264" strokeDashoffset="-132" />
              <circle cx="50" cy="50" r="42" className="lc-ring-segment lc-ring-hard" strokeDasharray="33 264" strokeDashoffset="-231" />
            </svg>
            <div className="lc-progress-center">
              <div className="lc-progress-total">120</div>
              <div className="lc-progress-solved">Solved</div>
            </div>
          </div>
          
          <div className="lc-progress-stats">
            <div className="lc-stat-item">
              <span className="lc-stat-name lc-easy">Easy</span>
              <span className="lc-stat-val">60</span>
            </div>
            <div className="lc-stat-item">
              <span className="lc-stat-name lc-medium">Med.</span>
              <span className="lc-stat-val">45</span>
            </div>
            <div className="lc-stat-item">
              <span className="lc-stat-name lc-hard">Hard</span>
              <span className="lc-stat-val">15</span>
            </div>
          </div>
        </div>

        <div className="lc-progress-streak">
          <div className="lc-streak-flame">🔥</div>
          <div className="lc-streak-text">
            <strong>12</strong> Max Streak
          </div>
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
