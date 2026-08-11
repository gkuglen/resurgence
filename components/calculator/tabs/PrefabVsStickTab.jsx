import { useState } from "react";
import { useCalc } from "../hooks/useCalc.js";
import { SliderInput } from "../components/SliderInput.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { fmtFull, fmt, prefabOverrides } from "../utils.js";

export function PrefabVsStickTab({ inputs, T }) {
  const GC = "#34d399", AC = "#f59e0b", PC = "#e879f9";
  const [prefabCost, setPrefabCost] = useState(prefabOverrides.constructionCost);
  const [prefabMonths, setPrefabMonths] = useState(prefabOverrides.constructionMonths);
  const [prefabDevFeePct, setPrefabDevFeePct] = useState(prefabOverrides.developerFeePct);

  const tradCalc = useCalc({ ...inputs });
  const prefCalc = useCalc({ ...inputs, constructionCost: prefabCost, constructionMonths: prefabMonths, developerFeePct: prefabDevFeePct });

  const dc = (d, up = true) => d === 0 ? "#475569" : (up ? (d > 0 ? GC : "#f87171") : (d < 0 ? GC : "#f87171"));
  const fd = (d, m = true, u = "") => {
    const s = d >= 0 ? "+" : "";
    return m ? `${s}${fmtFull(d)}` : `${s}${d.toFixed(1)}${u}`;
  };

  const rows = [
    { label: "Construction Cost", tv: inputs.constructionCost, pv: prefabCost, m: true, up: false },
    { label: "Build Timeline (months)", tv: inputs.constructionMonths, pv: prefabMonths, m: false, u: " mo", up: false },
    { label: "Construction Loan Down", tv: tradCalc.cLoanDownAmt, pv: prefCalc.cLoanDownAmt, m: true, up: false },
    { label: "Interest Carry Cost", tv: tradCalc.cLoanInterestTotal, pv: prefCalc.cLoanInterestTotal, m: true, up: false },
    { label: "Developer Fee", tv: tradCalc.developerFeeAmt, pv: prefCalc.developerFeeAmt, m: true, up: true },
    { label: "Your True Out-of-Pocket Cost", tv: tradCalc.investorCashIn, pv: prefCalc.investorCashIn, m: true, up: false },
    { label: "Gross Proceeds (pool)", tv: tradCalc.grossProceeds, pv: prefCalc.grossProceeds, m: true, up: true },
    { label: "Investor Gross", tv: tradCalc.investorGross, pv: prefCalc.investorGross, m: true, up: true },
    { label: "Investor Net Profit", tv: tradCalc.investorNet, pv: prefCalc.investorNet, m: true, up: true },
    { label: "Cash-on-Cash Return", tv: tradCalc.investorROI, pv: prefCalc.investorROI, m: false, u: "%", up: true },
    { label: "Annual Return on Investment", tv: tradCalc.investorAnnualROI, pv: prefCalc.investorAnnualROI, m: false, u: "%/yr", up: true },
    { label: "Owner Gross", tv: tradCalc.ownerGross, pv: prefCalc.ownerGross, m: true, up: true },
  ];

  const netDelta = prefCalc.investorNet - tradCalc.investorNet;
  const costDelta = prefabCost - inputs.constructionCost;
  const carryDelta = prefCalc.cLoanInterestTotal - tradCalc.cLoanInterestTotal;
  const cashDelta = prefCalc.investorCashIn - tradCalc.investorCashIn;

  return (
    <div className="tab-content" style={{ maxWidth: "1200px", margin: "0 auto" }}>

      {/* Prefab inputs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1.8rem" }}>
        {[
          { label: "Prefab All-In Cost", sub: "modules + site work", val: prefabCost, fn: setPrefabCost, min: 500000, max: 3000000, step: 50000, f: fmt },
          { label: "Prefab Build Timeline", sub: "months to completion", val: prefabMonths, fn: setPrefabMonths, min: 4, max: 24, step: 1, f: v => `${v} mo` },
          { label: "Developer Fee (Prefab)", sub: "% of build cost", val: prefabDevFeePct, fn: setPrefabDevFeePct, min: 0, max: 10, step: 0.5, f: v => `${v}%` },
        ].map(({ label, sub, val, fn, min, max, step, f }) => (
          <div key={label} className="card" style={{ border: `1px solid ${PC}33`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
            <div style={{ fontSize: "0.63rem", letterSpacing: "0.08em", textTransform: "uppercase", color: PC, marginBottom: "0.6rem" }}>Prefab Scenario</div>
            <SliderInput label={label} sublabel={sub} value={val} min={min} max={max} step={step} onChange={fn} format={f} color={PC} />
          </div>
        ))}
      </div>

      {/* Summary deltas */}
      <div style={{
        background: netDelta >= 0 ? "linear-gradient(135deg,#052e16,#0a1a0a)" : "linear-gradient(135deg,#1a0505,#0f0a0a)",
        border: `1px solid ${netDelta >= 0 ? GC : "#f87171"}44`,
        borderRadius: "14px", padding: "1.4rem 2rem", marginBottom: "1.8rem",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1.2rem",
      }}>
        {[
          ["Construction Savings", fmtFull(Math.abs(costDelta)), costDelta < 0 ? "prefab cheaper" : "prefab costs more", costDelta < 0 ? GC : "#f87171"],
          ["Carry Cost Savings", fmtFull(Math.abs(carryDelta)), `${Math.abs(inputs.constructionMonths - prefabMonths)} months faster`, carryDelta < 0 ? GC : "#f87171"],
          ["Out-of-Pocket Savings", fmtFull(Math.abs(cashDelta)), "less out of pocket", cashDelta < 0 ? GC : "#f87171"],
          ["Investor Net Delta", fmtFull(netDelta), netDelta >= 0 ? "prefab advantage" : "trad advantage", netDelta >= 0 ? GC : "#f87171"],
        ].map(([label, value, sub, color]) => (
          <div key={label}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.09em", textTransform: "uppercase", color: "#64748b", marginBottom: "0.2rem" }}>{label}</div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "1.4rem", fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: "0.67rem", color: T.label, marginTop: "0.2rem" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="card table-card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})`, marginBottom: "1.4rem", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: `1px solid ${T.border}`, background: T.surface2 }}>
          {["Metric", "Traditional", "Prefab / Modular", "Delta (Prefab − Trad)"].map((h, i) => (
            <div key={h} style={{ padding: "0.75rem 1.1rem", fontSize: "0.63rem", letterSpacing: "0.08em", textTransform: "uppercase", color: i === 1 ? AC : i === 2 ? PC : T.label, fontWeight: 600 }}>{h}</div>
          ))}
        </div>
        {rows.map((row, idx) => {
          const d = row.pv - row.tv;
          return (
            <div key={row.label} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: idx < rows.length - 1 ? `1px solid ${T.border}22` : "none", background: idx % 2 === 0 ? "transparent" : T.surface2 }}>
              <div style={{ padding: "0.65rem 1.1rem", fontSize: "0.76rem", color: T.textMuted }}>{row.label}</div>
              <div style={{ padding: "0.65rem 1.1rem", fontFamily: "'Geist Mono', monospace", fontSize: "0.8rem", color: AC }}>
                {row.m ? fmtFull(row.tv) : `${row.tv.toFixed(1)}${row.u}`}
              </div>
              <div style={{ padding: "0.65rem 1.1rem", fontFamily: "'Geist Mono', monospace", fontSize: "0.8rem", color: PC }}>
                {row.m ? fmtFull(row.pv) : `${row.pv.toFixed(1)}${row.u}`}
              </div>
              <div style={{ padding: "0.65rem 1.1rem", fontFamily: "'Geist Mono', monospace", fontSize: "0.8rem", color: dc(d, row.up), fontWeight: 600 }}>
                {row.m ? fd(d) : `${d >= 0 ? "+" : ""}${d.toFixed(1)}${row.u}`}
              </div>
            </div>
          );
        })}
      </div>

      <div className="footer-notes" style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
        <div><span style={{ color: "#64748b" }}>📋 Assumptions:</span> All seller financing terms, partnership split, and note sale structure are identical between scenarios. Only construction cost, timeline, and developer fee % differ.</div>
        <div style={{ marginTop: "0.3rem" }}><span style={{ color: "#64748b" }}>⚠️</span> SF-specific factors: DBI modular approval timelines, union labor for on-site assembly, and geotechnical/foundation costs can erode prefab savings.</div>
      </div>

    </div>
  );
}
