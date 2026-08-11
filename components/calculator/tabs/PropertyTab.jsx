import { useState } from "react";
import { SliderInput } from "../components/SliderInput.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { fmt, fmtFull } from "../utils.js";

export function PropertyTab({ inputs, set, opp, calc, T }) {
  const OC = "#fb923c";
  const GC = "#34d399";

  const [showSellBreakdown, setShowSellBreakdown] = useState(false);
  const [showResidual, setShowResidual] = useState(false);

  const salePrice = inputs.homeValue;
  const agentCost = salePrice * (opp.agentCommissionPct / 100);
  const closingCost = salePrice * (opp.otherClosingCostPct / 100);
  const netBeforeTax = salePrice - agentCost - closingCost;
  const taxableGain = Math.max(0, netBeforeTax - opp.taxBasis);
  const taxOwed = inputs.applyCapGains
    ? taxableGain * ((opp.federalCapGainsRate + opp.stateCapGainsRate) / 100)
    : 0;
  const asIsNetProceeds = netBeforeTax - taxOwed - inputs.existingDebt;

  return (
    <div className="tab-content">

      {/* HOME VALUE */}
      <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
        <SectionLabel>Home Value</SectionLabel>
        <SliderInput label="Home Value" value={inputs.homeValue} min={200000} max={3000000} step={50000}
          onChange={set("homeValue")} format={fmt} color={OC} />
      </div>

      {/* EXISTING DEBT */}
      <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
        <SectionLabel>Existing Debt</SectionLabel>
        <SliderInput label="Existing Debt" value={inputs.existingDebt} min={0} max={2000000} step={25000}
          onChange={set("existingDebt")} format={fmt} color={OC} />
        {calc.ownerEquity <= 0 && (
          <div className="warn-box">⚠️ Debt exceeds home value</div>
        )}
      </div>

      {/* SELL AS-IS TODAY — large display */}
      <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
        <div style={{ fontSize: "0.72rem", color: T.label, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>
          Sell As-Is Today
        </div>
        <div style={{ fontFamily: "'Geist Mono', 'JetBrains Mono', monospace", fontSize: "2.2rem", fontWeight: 800, color: OC, lineHeight: 1 }}>
          {fmtFull(asIsNetProceeds)}
        </div>
        <div style={{ fontSize: "0.7rem", color: T.label, marginTop: "0.3rem" }}>estimated net after debt payoff</div>
      </div>

      {/* CAPITAL GAINS TOGGLE */}
      <div className="card" style={{
        border: `1px solid ${inputs.applyCapGains ? T.border : "#34d39933"}`,
        background: inputs.applyCapGains
          ? `linear-gradient(180deg,${T.surface},${T.surface2})`
          : "linear-gradient(180deg,#0f2a1e,#0a1e14)",
        transition: "all 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 600, color: inputs.applyCapGains ? T.textMuted : GC }}>
              Capital Gains
            </div>
            <div style={{ fontSize: "0.62rem", color: T.label, marginTop: "0.15rem" }}>
              {inputs.applyCapGains ? "Standard cap gains applied" : "§1014 Step-up in basis — $0 tax"}
            </div>
          </div>
          <div
            onClick={() => set("applyCapGains")(!inputs.applyCapGains)}
            style={{
              width: "40px", height: "22px", borderRadius: "11px",
              background: inputs.applyCapGains ? "#f87171" : GC,
              cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
            }}
          >
            <div style={{
              position: "absolute", top: "3px",
              left: inputs.applyCapGains ? "19px" : "3px",
              width: "14px", height: "14px", borderRadius: "50%",
              background: "#fff", transition: "left 0.2s",
            }} />
          </div>
        </div>
      </div>

      {/* SELL AS-IS BREAKDOWN — collapse/expand */}
      <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
        <button className="collapse-toggle" onClick={() => setShowSellBreakdown(v => !v)}
          style={{ color: T.textMuted }}>
          <span style={{ color: T.text, fontSize: "0.78rem", fontWeight: 600 }}>Sell As-Is Breakdown</span>
          <span className={`chevron ${showSellBreakdown ? "up" : ""}`}>▾</span>
        </button>
        {showSellBreakdown && (
          <div className="collapse-body">
            {[
              ["Sale Price", fmtFull(salePrice), T.text],
              ["Agent Commission", `− ${fmtFull(agentCost)}`, "#f87171"],
              ["Other Closing Costs", `− ${fmtFull(closingCost)}`, "#f87171"],
              ["Net Before Tax", fmtFull(netBeforeTax), T.text],
              ...(inputs.applyCapGains ? [
                ["Taxable Gain", fmtFull(taxableGain), T.label],
                ["Cap Gains Tax", `− ${fmtFull(taxOwed)}`, "#f87171"],
              ] : [
                ["Step-Up in Basis (§1014)", "Applied", GC],
                ["Cap Gains Tax", "$0", GC],
              ]),
              ["Debt Payoff", inputs.existingDebt > 0 ? `− ${fmtFull(inputs.existingDebt)}` : "None",
                inputs.existingDebt > 0 ? "#f87171" : "#334155"],
            ].map(([l, v, c]) => (
              <div key={l} className="row-item" style={{ background: T.surface2 }}>
                <span style={{ fontSize: "0.69rem", color: T.label }}>{l}</span>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.75rem", color: c }}>{v}</span>
              </div>
            ))}
            <div className="row-item row-total" style={{ background: "#0f2a1e", border: "1px solid #34d39933", marginTop: "0.1rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: T.text }}>TOTAL</span>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.78rem", color: GC, fontWeight: 700 }}>
                {fmtFull(asIsNetProceeds)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* RESIDUAL LOAN BALANCE — collapse/expand */}
      {calc.residualLoanBalance > 0 && (
        <div className="card" style={{ border: "1px solid #f59e0b44", background: "linear-gradient(180deg,#1a0a00,#0f0800)" }}>
          <button className="collapse-toggle" onClick={() => setShowResidual(v => !v)}
            style={{ color: "#f59e0b" }}>
            <span style={{ color: "#f59e0b", fontSize: "0.78rem", fontWeight: 600 }}>Residual Loan Balance</span>
            <span className={`chevron ${showResidual ? "up" : ""}`}>▾</span>
          </button>
          {showResidual && (
            <div className="collapse-body">
              {[
                ["Unconverted balance", fmtFull(calc.residualLoanBalance)],
                ["Monthly IO payment", fmtFull(calc.residualMonthlyPayment)],
                [`Total interest (${inputs.prepayYears} yrs)`, fmtFull(calc.residualInterestTotal)],
                ["Balloon due at Yr 7", fmtFull(calc.residualLoanBalance)],
              ].map(([l, v]) => (
                <div key={l} className="row-item" style={{ background: "transparent" }}>
                  <span style={{ fontSize: "0.69rem", color: T.label }}>{l}</span>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.75rem", color: "#f59e0b" }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
