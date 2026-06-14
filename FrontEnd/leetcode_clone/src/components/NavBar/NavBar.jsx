import './NavBar.css';

export default function NavBar() {
  return (
    <header className="lc-navbar">
      {/* Logo */}
      <div className="lc-nav-logo wf-box" />

      {/* Nav Links */}
      <div className="lc-nav-links">
        <div className="wf-chip" />
        <div className="wf-chip" />
        <div className="wf-chip" />
        <div className="wf-chip" />
        <div className="wf-chip" />
      </div>

      {/* Right actions */}
      <div className="lc-nav-right">
        <div className="wf-search-bar" />
        <div className="wf-icon-btn" />
        <div className="wf-icon-btn" />
        <div className="wf-icon-btn" />
        <div className="wf-premium-btn" />
      </div>
    </header>
  );
}
