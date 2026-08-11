export function ToggleInput({ label, value, onChange, onColor = "#f59e0b" }) {
  return (
    <div className="toggle-wrap">
      <span className="slider-label">{label}</span>
      <div
        onClick={() => onChange(!value)}
        className="toggle-track"
        style={{ background: value ? onColor : "var(--border)", border: `1px solid ${value ? onColor : "var(--border)"}` }}
      >
        <div className="toggle-thumb" style={{ left: value ? "19px" : "3px" }} />
      </div>
    </div>
  );
}
