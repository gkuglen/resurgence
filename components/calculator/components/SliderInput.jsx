export function SliderInput({ label, sublabel, value, min, max, step, onChange, format, color }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div className="slider-wrap">
      <div className="slider-header">
        <div>
          <span className="slider-label">{label}</span>
          {sublabel && <span className="slider-sublabel">{sublabel}</span>}
        </div>
        <span className="slider-value" style={{ color }}>{format(value)}</span>
      </div>
      <div className="slider-track">
        <div className="slider-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${color}66,${color})` }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="slider-input"
        />
        <div className="slider-thumb" style={{ left: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}99` }} />
      </div>
    </div>
  );
}
