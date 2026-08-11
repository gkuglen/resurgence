export function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <div className="section-line-left" />
      {children}
      <div className="section-line-right" />
    </div>
  );
}
