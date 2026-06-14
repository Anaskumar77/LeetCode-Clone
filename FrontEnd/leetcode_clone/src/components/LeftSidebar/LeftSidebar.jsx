import './LeftSidebar.css';

const NAV_ITEMS = ['Library', 'Quest', 'Explore', 'Study Plan'];

export default function LeftSidebar() {
  return (
    <aside className="lc-sidebar-left">
      <nav className="lc-side-nav">

        {NAV_ITEMS.map((label) => (
          <div key={label} className="lc-side-item">
            <div className="wf-side-icon" />
            <div className="wf-side-label" />
            {label === 'Quest' && <div className="wf-new-badge" />}
          </div>
        ))}

        <div className="lc-side-divider" />

        {/* My Lists section */}
        <div className="lc-side-section-title">
          <div className="wf-text-sm" />
          <div className="wf-icon-xs" />
        </div>

        <div className="lc-side-item">
          <div className="wf-side-icon" />
          <div className="wf-side-label" />
          <div className="wf-lock-icon" />
        </div>

      </nav>
    </aside>
  );
}
