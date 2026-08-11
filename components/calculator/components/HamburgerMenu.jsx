const TAB_LABELS = ["Property", "Development", "Summary", "Ownership Op", "Prefab vs Stick"];

export function HamburgerMenu({ menuOpen, setMenuOpen, activeTab, setActiveTab }) {
  const navigate = (i) => {
    setActiveTab(i);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`menu-backdrop ${menuOpen ? "visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      {/* Slide-in panel */}
      <div className={`hamburger-menu ${menuOpen ? "open" : ""}`}>
        <div className="hamburger-header">
          <span className="navbar-brand">PropDev</span>
          <button className="icon-btn close-btn" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <div className="hamburger-tabs">
          {TAB_LABELS.map((label, i) => (
            <button
              key={i}
              className={`hamburger-tab-item ${activeTab === i ? "active" : ""}`}
              onClick={() => navigate(i)}
            >
              <span className="ham-tab-num">{i + 1}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
