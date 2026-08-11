import { SliderInput } from "../components/SliderInput.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { fmtFull, fmt } from "../utils.js";

export function OwnershipOpTab({ inputs, set, opp, setO, calc, T }) {
  const IC = "#38bdf8", OC = "#fb923c", GC = "#34d399";

  const salePrice = inputs.homeValue;
  const agentCost = salePrice * (opp.agentCommissionPct / 100);
  const closingCost = salePrice * (opp.otherClosingCostPct / 100);
  const netBeforeTax = salePrice - agentCost - closingCost;
  const taxableGain = Math.max(0, netBeforeTax - opp.taxBasis);
  const taxOwed = inputs.applyCapGains
    ? taxableGain * ((opp.federalCapGainsRate + opp.stateCapGainsRate) / 100)
    : 0;
  const asIsNetProceeds = netBeforeTax - taxOwed - inputs.existingDebt;
  const partnershipProceeds = calc.ownerGross;
  const uplift = partnershipProceeds - asIsNetProceeds;
  const upliftPct = asIsNetProceeds > 0 ? (uplift / asIsNetProceeds) * 100 : 0;
  const ownerSplit = 100 - inputs.investorSplit;

  return (
    <div className="dev-layout">
      {/* LEFT: Controls */}
      <div className="dev-sliders">

        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
          <SectionLabel>As-Is Sale Assumptions</SectionLabel>
          <div style={{ fontSize: "0.7rem", color: T.label, marginBottom: "1rem", lineHeight: 1.5 }}>
            Models what the owner nets selling today. Property value and debt pull from the main calculator automatically.
          </div>
          <SliderInput label="Agent Commission" value={opp.agentCommissionPct} min={0} max={8} step={0.25}
            onChange={setO("agentCommissionPct")} format={v => `${v}%`} color={OC} />
          <SliderInput label="Other Closing Costs" value={opp.otherClosingCostPct} min={0} max={4} step={0.1}
            onChange={setO("otherClosingCostPct")} format={v => `${v}%`} color={OC} />
          <SliderInput label="Owner's Original Purchase Price" sublabel="tax basis"
            value={opp.taxBasis} min={0} max={inputs.homeValue} step={10000}
            onChange={setO("taxBasis")} format={v => fmt(v)} color={T.textMuted} />
        </div>

        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
          <SectionLabel>Capital Gains Tax Rates</SectionLabel>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.6rem 0.8rem",
            background: inputs.applyCapGains ? T.surface2 : "#0f2a1e",
            border: `1px solid ${inputs.applyCapGains ? T.border : "#34d39933"}`,
            borderRadius: "8px", marginBottom: "1rem", transition: "all 0.3s",
          }}>
            <div>
              <div style={{ fontSize: "0.72rem", color: inputs.applyCapGains ? T.textMuted : GC, fontWeight: 600 }}>Capital Gains</div>
              <div style={{ fontSize: "0.62rem", color: T.label }}>{inputs.applyCapGains ? "Standard rates applied" : "§1014 Step-up — $0 tax"}</div>
            </div>
            <div onClick={() => set("applyCapGains")(!inputs.applyCapGains)}
              style={{ width: "40px", height: "22px", borderRadius: "11px", background: inputs.applyCapGains ? "#f87171" : GC, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: "3px", left: inputs.applyCapGains ? "19px" : "3px", width: "14px", height: "14px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </div>
          </div>
          {inputs.applyCapGains && (
            <div>
              <SliderInput label="Federal Long-Term Rate" value={opp.federalCapGainsRate} min={0} max={23.8} step={0.1}
                onChange={setO("federalCapGainsRate")} format={v => `${v}%`} color="#f87171" />
              <SliderInput label="State Rate" sublabel="CA = 13.3%" value={opp.stateCapGainsRate} min={0} max={15} step={0.1}
                onChange={setO("stateCapGainsRate")} format={v => `${v}%`} color="#f87171" />
              <div style={{ padding: "0.6rem 0.8rem", background: "#1a0505", border: "1px solid #f8717133", borderRadius: "7px", fontSize: "0.7rem", color: "#fca5a5", lineHeight: 1.5 }}>
                Combined rate: <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 700 }}>{(opp.federalCapGainsRate + opp.stateCapGainsRate).toFixed(1)}%</span>
              </div>
            </div>
          )}
          {!inputs.applyCapGains && (
            <div style={{ padding: "0.6rem 0.8rem", background: "#0f2a1e", border: "1px solid #34d39933", borderRadius: "7px", fontSize: "0.7rem", color: "#34d399", lineHeight: 1.6 }}>
              IRC §1014 step-up in basis applied. Capital gains tax is $0. This models a scenario where the property is inherited at current market value — common in California community property situations.
            </div>
          )}
        </div>

        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
          <SectionLabel>From Main Calculator</SectionLabel>
          {[
            ["Property Value", fmtFull(inputs.homeValue)],
            ["Existing Debt", fmtFull(inputs.existingDebt)],
            ["Owner Share of Deal", `${ownerSplit}%`],
            ["Partnership Proceeds", fmtFull(partnershipProceeds)],
          ].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: `1px solid ${T.border}22` }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{l}</span>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.78rem", color: T.textMuted }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Analysis */}
      <div className="dev-results">

        {/* Partnership Advantage banner */}
        <div style={{
          background: uplift >= 0 ? "linear-gradient(135deg,#052e16,#0a1a0a)" : "linear-gradient(135deg,#1a0505,#0f0a0a)",
          border: `1px solid ${uplift >= 0 ? GC : "#f87171"}44`,
          borderRadius: "14px", padding: "1.5rem 2rem", marginBottom: "1.4rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: uplift >= 0 ? GC : "#f87171", marginBottom: "0.3rem" }}>
              {uplift >= 0 ? "Partnership Advantage" : "Partnership Disadvantage"}
            </div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "2.4rem", fontWeight: 800, color: uplift >= 0 ? GC : "#f87171", lineHeight: 1 }}>
              {uplift >= 0 ? "+" : ""}{fmtFull(uplift)}
            </div>
            <div style={{ fontSize: "0.8rem", color: T.label, marginTop: "0.3rem" }}>
              Owner earns {Math.abs(upliftPct).toFixed(0)}% {uplift >= 0 ? "more" : "less"} by partnering vs. selling today
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.label, marginBottom: "0.3rem" }}>Return Multiplier</div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "2rem", fontWeight: 700, color: uplift >= 0 ? GC : "#f87171" }}>
              {asIsNetProceeds > 0 ? (partnershipProceeds / asIsNetProceeds).toFixed(2) : "—"}×
            </div>
            <div style={{ fontSize: "0.7rem", color: T.label }}>vs. selling as-is today</div>
          </div>
        </div>

        {/* Side-by-side comparison cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.4rem" }}>
          {[
            {
              title: "Sell As-Is Today", color: OC, value: asIsNetProceeds,
              sub: inputs.applyCapGains ? "Net after costs, taxes & debt" : "Net after costs — §1014 step-up applied",
              rows: [
                ["Sale Price", fmtFull(salePrice), T.textMuted],
                ["Agent Commission", `− ${fmtFull(agentCost)}`, "#f87171"],
                ["Other Closing Costs", `− ${fmtFull(closingCost)}`, "#f87171"],
                ["Net Before Tax", fmtFull(netBeforeTax), T.text],
                ...(inputs.applyCapGains
                  ? [["Taxable Gain", fmtFull(taxableGain), T.textMuted], ["Cap Gains Tax", `− ${fmtFull(taxOwed)}`, "#f87171"]]
                  : [["Step-Up in Basis (§1014)", "Applied", GC], ["Cap Gains Tax", "$0", GC]]),
                ["Debt Payoff", inputs.existingDebt > 0 ? `− ${fmtFull(inputs.existingDebt)}` : "None", inputs.existingDebt > 0 ? "#f87171" : "#334155"],
              ],
            },
            {
              title: "Partner & Develop", color: IC, value: partnershipProceeds,
              sub: `Owner's ${ownerSplit}% of gross proceeds`,
              rows: [
                ["Down Payments (owner share)", fmtFull(calc.closingOwner), T.textMuted],
                [`P&I · ${inputs.prepayYears} yrs (owner share)`, fmtFull(calc.totalPICollected * calc.ownPct), T.textMuted],
                ["Note Sale (owner share)", fmtFull(calc.noteSaleOwner), T.textMuted],
                ["Debt Retired at Close", inputs.existingDebt > 0 ? fmtFull(inputs.existingDebt) : "None", inputs.existingDebt > 0 ? GC : "#334155"],
                ["Cash In Required", "$0", "#334155"],
                ["Total Hold Period", `~${inputs.prepayYears + Math.ceil(inputs.constructionMonths / 12)} yrs`, "#64748b"],
              ],
            },
          ].map(({ title, color, value, sub, rows }) => (
            <div key={title} style={{ background: "linear-gradient(135deg,#0f172a,#0a1628)", border: `1px solid ${color}44`, borderRadius: "14px", padding: "1.3rem 1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: color }} />
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color }}>{title}</span>
              </div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "1.8rem", fontWeight: 700, color, lineHeight: 1 }}>{fmtFull(value)}</div>
              <div style={{ fontSize: "0.7rem", color: T.label, marginTop: "0.2rem", marginBottom: "1rem" }}>{sub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {rows.map(([l, v, c]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.35rem 0.6rem", background: T.surface2, borderRadius: "5px" }}>
                    <span style={{ fontSize: "0.69rem", color: "#64748b" }}>{l}</span>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.75rem", color: c, fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Tradeoffs */}
        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})`, marginBottom: "1rem" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", marginBottom: "1rem" }}>Key Tradeoffs for the Owner</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { label: "Immediate liquidity", asis: "✓ Cash now", partner: "✗ Multi-year wait", ac: GC, pc: "#f87171" },
              { label: "Net proceeds", asis: fmtFull(asIsNetProceeds), partner: fmtFull(partnershipProceeds), ac: T.textMuted, pc: uplift >= 0 ? GC : "#f87171" },
              { label: "Construction risk", asis: "None", partner: "Shared exposure", ac: GC, pc: "#f59e0b" },
              { label: "Tax event timing", asis: "Immediate", partner: "Installment sale", ac: "#f59e0b", pc: GC },
              { label: "Cash required", asis: "None", partner: "None", ac: GC, pc: GC },
              { label: "Net advantage", asis: "Baseline", partner: uplift >= 0 ? `+${fmtFull(uplift)}` : fmtFull(uplift), ac: "#475569", pc: uplift >= 0 ? GC : "#f87171" },
            ].map(({ label, asis, partner, ac, pc }) => (
              <div key={label} style={{ background: T.surface2, borderRadius: "8px", padding: "0.7rem 0.9rem" }}>
                <div style={{ fontSize: "0.63rem", color: T.label, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>{label}</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.58rem", color: "#334155", marginBottom: "0.1rem" }}>As-Is</div>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.78rem", color: ac, fontWeight: 600 }}>{asis}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.58rem", color: "#334155", marginBottom: "0.1rem" }}>Partnership</div>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.78rem", color: pc, fontWeight: 600 }}>{partner}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-notes" style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
          <span style={{ color: "#64748b" }}>⚠️ Illustrative only.</span> Does not account for the §121 exclusion ($250K/$500K primary residence), depreciation recapture, installment sale deferral under IRC §453, or state-specific rules. Consult a CPA before advising the owner on tax treatment.
        </div>

      </div>
    </div>
  );
}
