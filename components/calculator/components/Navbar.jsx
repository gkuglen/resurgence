const TAB_LABELS = ["Property", "Development", "Summary", "Ownership Op", "Prefab vs Stick"];

export function Navbar({ activeTab, setActiveTab, darkMode, toggleDark, menuOpen, setMenuOpen }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">PropDev</span>
      </div>

      {/* Center tabs — desktop shows all 5, tablet/mobile shows first 3 */}
      <div className="navbar-tabs">
        {TAB_LABELS.map((label, i) => (
          <button
            key={i}
            className={`navbar-tab ${i >= 3 ? "tab-desktop-only" : ""} ${activeTab === i ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="navbar-right">
        <button className="icon-btn" onClick={toggleDark} title="Toggle dark/light mode">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button className="icon-btn hamburger-btn" onClick={() => setMenuOpen(true)} title="Menu">
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </div>
    </nav>
  );
}
