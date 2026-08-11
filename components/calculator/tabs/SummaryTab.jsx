import { useState } from "react";
import { fmtFull, fmt } from "../utils.js";

export function SummaryTab({ inputs, calc, onOpenSettings, T }) {
  const IC = "#38bdf8", OC = "#fb923c", GC = "#34d399", CC = "#f59e0b";
  const [invOpen, setInvOpen] = useState(true);
  const [ownOpen, setOwnOpen] = useState(true);

  let cumInv = calc.closingInvestor;
  let cumOwn = calc.closingOwner;

  return (
    <div className="tab-content">

      {/* Settings trigger */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
        <button className="settings-trigger" onClick={onOpenSettings} title="Open settings">
          ⚙ Settings
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-cards">

        {/* INVESTOR Card */}
        <div className="summary-card" style={{ border: `1px solid ${IC}44`, background: "linear-gradient(135deg,#0f172a,#0a1628)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: IC }} />
            <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: IC }}>Investor (You)</span>
          </div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "1.8rem", fontWeight: 700, color: IC, lineHeight: 1 }}>
            {fmtFull(calc.investorGross)}
          </div>
          <div style={{ fontSize: "0.7rem", color: T.label, marginTop: "0.2rem" }}>Gross receipts ({inputs.investorSplit}%)</div>

          <button className="collapse-toggle" style={{ marginTop: "0.75rem", color: T.textMuted }}
            onClick={() => setInvOpen(v => !v)}>
            <span style={{ fontSize: "0.72rem" }}>Details</span>
            <span className={`chevron ${invOpen ? "up" : ""}`}>▾</span>
          </button>

          {invOpen && (
            <div style={{ marginTop: "0.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {[
                ["Net Profit", fmtFull(calc.investorNet), calc.investorNet >= 0 ? GC : "#f87171", null],
                ["Cash-on-Cash Return", `${calc.investorROI.toFixed(1)}%`, calc.investorROI >= 0 ? GC : "#f87171", "total · down + carry + setup"],
                ["Annual ROI", `${calc.investorAnnualROI.toFixed(1)}%/yr`, T.textMuted, `avg over ${inputs.prepayYears} yrs`],
                ["True Out-of-Pocket", fmtFull(calc.investorCashIn), CC, "down + carry + setup costs"],
                ["Developer Fee", fmtFull(calc.developerFeeAmt), "#e879f9", `${inputs.developerFeePct}% of build cost`],
                ["Capital Returned", calc.recoveryYear ? `Yr ${calc.recoveryYear}` : "After sale", T.textMuted, null],
              ].map(([l, v, c, sub]) => (
                <div key={l}>
                  <div style={{ fontSize: "0.6rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.85rem", color: c, fontWeight: 600 }}>{v}</div>
                  {sub && <div style={{ fontSize: "0.57rem", color: T.label, marginTop: "0.1rem" }}>{sub}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PROPERTY OWNER Card */}
        <div className="summary-card" style={{ border: `1px solid ${OC}44`, background: "linear-gradient(135deg,#0f172a,#0a1628)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: OC }} />
            <span style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: OC }}>Property Owner</span>
          </div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "1.8rem", fontWeight: 700, color: OC, lineHeight: 1 }}>
            {fmtFull(calc.ownerGross)}
          </div>
          <div style={{ fontSize: "0.7rem", color: T.label, marginTop: "0.2rem" }}>Gross receipts ({calc.ownerSplit}%)</div>

          <button className="collapse-toggle" style={{ marginTop: "0.75rem", color: T.textMuted }}
            onClick={() => setOwnOpen(v => !v)}>
            <span style={{ fontSize: "0.72rem" }}>Details</span>
            <span className={`chevron ${ownOpen ? "up" : ""}`}>▾</span>
          </button>

          {ownOpen && (
            <div style={{ marginTop: "0.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {[
                ["Net Profit", fmtFull(calc.ownerNet), GC],
                ["Return on Equity (ROE)", `${calc.ownerEquity > 0 ? ((calc.ownerGross / calc.ownerEquity - 1) * 100).toFixed(1) : "—"}%`, GC],
                ["Debt Retired at Close", inputs.existingDebt > 0 ? fmtFull(inputs.existingDebt) : "None", inputs.existingDebt > 0 ? T.textMuted : "#334155"],
                ["Cash In Required", "$0", "#334155"],
                ["Your Share of the Deal", `${calc.ownerSplit}%`, OC],
                ["Annual Note Income", fmtFull(calc.totalPICollected * calc.ownPct / inputs.prepayYears), T.textMuted],
              ].map(([l, v, c]) => (
                <div key={l}>
                  <div style={{ fontSize: "0.6rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.85rem", color: c, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CASH FLOW TABLE */}
      <div className="card table-card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
        <div style={{ padding: "0.8rem 1rem 0.6rem", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" }}>Cash Flow Timeline</div>
          <div style={{ fontSize: "0.74rem", color: T.textMuted, marginTop: "0.1rem" }}>
            30yr fixed · {inputs.prepayYears}-yr hold · notes sold at {inputs.noteSaleDiscount}¢/$1 at end of Year {inputs.prepayYears}
          </div>
        </div>
        <div className="table-scroll">
          <table className="cf-table">
            <thead>
              <tr>
                {["Period", "Event", "Total Cash", `You (${inputs.investorSplit}%)`, `Owner (${calc.ownerSplit}%)`].map((h, i) => (
                  <th key={i} style={{ textAlign: i >= 2 ? "right" : "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Closing row */}
              <tr style={{ background: "#0f1a2e" }}>
                <td style={{ color: GC }}>Close</td>
                <td>
                  <span style={{ color: T.textMuted }}>Down Payments</span>
                  {inputs.useConstructionLoan && (
                    <div style={{ fontSize: "0.61rem", color: T.label }}>− {fmtFull(calc.loanRepaidAtClose)} construction loan</div>
                  )}
                  {inputs.existingDebt > 0 && (
                    <div style={{ fontSize: "0.61rem", color: T.label }}>− {fmtFull(calc.debtRepaidAtClose)} owner debt retired</div>
                  )}
                  {inputs.developerFeePct > 0 && (
                    <div style={{ fontSize: "0.61rem", color: "#e879f9" }}>+ {fmtFull(calc.developerFeeAmt)} developer fee to investor</div>
                  )}
                </td>
                <td style={{ textAlign: "right", color: T.text }}>{fmtFull(calc.downPaymentsAfterAllDebts)}</td>
                <td style={{ textAlign: "right", color: IC }}>{fmtFull(calc.closingInvestor)}</td>
                <td style={{ textAlign: "right", color: OC }}>{fmtFull(calc.closingOwner)}</td>
              </tr>

              {/* P&I rows */}
              {calc.tableRows.map((row, idx) => {
                const annualResidualIO = calc.residualMonthlyPayment * 12;
                const netRow = row.total - annualResidualIO;
                const netInvestor = netRow * calc.invPct;
                const netOwner = netRow * calc.ownPct;
                const recovered = (cumInv + netInvestor) >= calc.investorCashIn;
                cumInv += netInvestor;
                cumOwn += netOwner;
                return (
                  <tr key={row.year} style={{ background: idx % 2 === 0 ? "transparent" : T.surface2 }}>
                    <td style={{ color: "#64748b" }}>Yr {row.year}</td>
                    <td>
                      <span style={{ color: "#64748b" }}>P&I Payments</span>
                      {calc.residualLoanBalance > 0 && (
                        <div style={{ fontSize: "0.6rem", color: "#f59e0b" }}>− {fmtFull(annualResidualIO)} IO payment</div>
                      )}
                      <div style={{ fontSize: "0.62rem", color: T.label }}>
                        monthly: {fmtFull(netRow / 12)}/mo
                      </div>
                    </td>
                    <td style={{ textAlign: "right", color: T.text }}>
                      {fmtFull(netRow)}
                      {calc.residualLoanBalance > 0 && <div style={{ fontSize: "0.6rem", color: T.label }}>gross: {fmtFull(row.total)}</div>}
                    </td>
                    <td style={{ textAlign: "right", color: IC }}>
                      {fmtFull(netInvestor)}
                      {calc.recoveryYear === row.year && recovered && (
                        <span style={{ marginLeft: "0.3rem", fontSize: "0.57rem", color: GC, background: "#052e16", padding: "1px 5px", borderRadius: "4px" }}>WHOLE</span>
                      )}
                    </td>
                    <td style={{ textAlign: "right", color: OC }}>{fmtFull(netOwner)}</td>
                  </tr>
                );
              })}

              {/* Balloon + Note Sale */}
              {(() => {
                const netNoteSale = calc.noteSaleProceeds - calc.residualLoanBalance;
                const netNoteSaleInv = netNoteSale * calc.invPct;
                const netNoteSaleOwn = netNoteSale * calc.ownPct;
                cumInv += netNoteSaleInv;
                cumOwn += netNoteSaleOwn;
                const recovered = cumInv >= calc.investorCashIn;
                return (
                  <>
                    {calc.residualLoanBalance > 0 && (
                      <tr style={{ background: "#1a0a00", borderTop: `1px solid ${T.border}` }}>
                        <td style={{ color: "#f59e0b" }}>Yr {inputs.prepayYears}</td>
                        <td style={{ color: "#f59e0b" }}>
                          Residual Loan Balloon Payoff
                          <div style={{ fontSize: "0.6rem", color: T.label }}>IO balance retired from note sale proceeds</div>
                        </td>
                        <td style={{ textAlign: "right", color: "#f87171" }}>− {fmtFull(calc.residualLoanBalance)}</td>
                        <td colSpan={2} style={{ textAlign: "right", fontSize: "0.68rem", color: T.label }}>paid before partner split</td>
                      </tr>
                    )}
                    <tr style={{ background: "#0f1a2e", borderTop: `1px solid ${T.border}` }}>
                      <td style={{ color: "#a78bfa" }}>Yr {inputs.prepayYears}</td>
                      <td style={{ color: "#a78bfa" }}>
                        Note Sale ({inputs.noteSaleDiscount}¢/$1)
                        <div style={{ fontSize: "0.61rem", color: T.label }}>
                          Bal: {fmtFull(calc.remainingBalance)} · haircut: {fmtFull(calc.noteSaleHaircut)}
                        </div>
                        {calc.residualLoanBalance > 0 && (
                          <div style={{ fontSize: "0.61rem", color: "#f59e0b" }}>
                            Net after {fmtFull(calc.residualLoanBalance)} balloon: {fmtFull(netNoteSale)}
                          </div>
                        )}
                      </td>
                      <td style={{ textAlign: "right", color: "#a78bfa" }}>
                        {fmtFull(calc.residualLoanBalance > 0 ? netNoteSale : calc.noteSaleProceeds)}
                      </td>
                      <td style={{ textAlign: "right", color: IC }}>
                        {fmtFull(calc.residualLoanBalance > 0 ? netNoteSaleInv : calc.noteSaleInvestor)}
                        {recovered && <span style={{ marginLeft: "0.3rem", fontSize: "0.57rem", color: GC, background: "#052e16", padding: "1px 5px", borderRadius: "4px" }}>WHOLE</span>}
                      </td>
                      <td style={{ textAlign: "right", color: OC }}>
                        {fmtFull(calc.residualLoanBalance > 0 ? netNoteSaleOwn : calc.noteSaleOwner)}
                      </td>
                    </tr>
                  </>
                );
              })()}

              {/* Totals row */}
              <tr style={{ borderTop: `2px solid ${T.border}`, background: "#0f1a2e" }}>
                <td colSpan={2} style={{ fontSize: "0.66rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.textMuted }}>TOTALS</td>
                <td style={{ textAlign: "right", fontWeight: 700, color: T.text }}>{fmtFull(calc.grossProceeds)}</td>
                <td style={{ textAlign: "right", fontWeight: 700, color: IC }}>{fmtFull(calc.investorGross)}</td>
                <td style={{ textAlign: "right", fontWeight: 700, color: OC }}>{fmtFull(calc.ownerGross)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER NOTES */}
      <div className="footer-notes" style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
        <div>
          📋 30yr fixed · {inputs.prepayYears}-yr hold · notes sold at {inputs.noteSaleDiscount}¢/$1 · buyer payment:{" "}
          <span style={{ fontFamily: "'Geist Mono', monospace", color: T.textMuted }}>{fmtFull(calc.monthlyPerUnit)}/unit/mo</span>
          {inputs.useConstructionLoan && <> · carry: <span style={{ fontFamily: "'Geist Mono', monospace", color: "#f87171" }}>{fmtFull(calc.cLoanInterestTotal)}</span></>}
          {" · "} dev fee: <span style={{ fontFamily: "'Geist Mono', monospace", color: "#e879f9" }}>{fmtFull(calc.developerFeeAmt)}</span>
          {" · "} servicing: <span style={{ fontFamily: "'Geist Mono', monospace", color: "#f87171" }}>{fmtFull(calc.loanServicingTotal)}</span>
          {calc.residualLoanBalance > 0 && (
            <> · residual loan: <span style={{ fontFamily: "'Geist Mono', monospace", color: "#f59e0b" }}>{fmtFull(calc.residualLoanBalance)}</span> IO · balloon at Yr 7</>
          )}
        </div>
        <div style={{ marginTop: "0.3rem", color: "#64748b" }}>
          ⚠️ Illustrative only. Excludes overruns, entitlements, commissions, taxes, default risk, and IRS installment sale rules. Consult a real estate attorney and CPA.
        </div>
      </div>

    </div>
  );
}
