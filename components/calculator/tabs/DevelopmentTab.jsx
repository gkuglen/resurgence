import { useState } from "react";
import { SliderInput } from "../components/SliderInput.jsx";
import { ToggleInput } from "../components/ToggleInput.jsx";
import { SectionLabel } from "../components/SectionLabel.jsx";
import { fmt, fmtFull } from "../utils.js";

function LoanBadge({ label, value, color, T }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.4rem 0.65rem", background: T.surface2, borderRadius: "5px", marginBottom: "0.3rem" }}>
      <span style={{ fontSize: "0.68rem", color: "#64748b" }}>{label}</span>
      <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.76rem", color: color || T.textMuted, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

export function DevelopmentTab({ inputs, set, calc, T }) {
  const IC = "#38bdf8", OC = "#fb923c", CC = "#f59e0b", GC = "#34d399", PC = "#e879f9";
  const [showResidual, setShowResidual] = useState(false);

  return (
    <div className="dev-layout">

      {/* LEFT: Sliders */}
      <div className="dev-sliders">

        {/* DEVELOPMENT */}
        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
          <SectionLabel>Development</SectionLabel>
          <SliderInput label="Construction Cost" value={inputs.constructionCost} min={500000} max={8000000} step={100000}
            onChange={set("constructionCost")} format={fmt} color={IC} />
          <SliderInput label="# of Condos" value={inputs.numCondos} min={2} max={12} step={1}
            onChange={set("numCondos")} format={v => `${v} units`} color="#a78bfa" />
          <SliderInput label="Condo Sale Price" value={inputs.condoSellPrice} min={300000} max={2000000} step={25000}
            onChange={set("condoSellPrice")} format={fmt} color="#a78bfa" />
        </div>

        {/* CONSTRUCTION LOAN */}
        <div className="card" style={{
          border: `1px solid ${inputs.useConstructionLoan ? CC + "55" : T.border}`,
          background: `linear-gradient(180deg,${T.surface},${T.surface2})`,
          transition: "border-color 0.3s",
        }}>
          <SectionLabel>Construction Loan</SectionLabel>
          <ToggleInput label="Use Construction Loan" value={inputs.useConstructionLoan}
            onChange={set("useConstructionLoan")} onColor={CC} />
          {inputs.useConstructionLoan && (
            <>
              <SliderInput label="Down Payment %" value={inputs.constructionLoanDownPct} min={5} max={40} step={1}
                onChange={set("constructionLoanDownPct")} format={v => `${v}%`} color={CC} />
              <SliderInput label="Interest Rate" sublabel="interest-only draws" value={inputs.constructionLoanRate}
                min={5} max={15} step={0.25} onChange={set("constructionLoanRate")} format={v => `${v}%`} color={CC} />
              <SliderInput label="Construction Period" value={inputs.constructionMonths} min={6} max={36} step={1}
                onChange={set("constructionMonths")} format={v => `${v} mo`} color={CC} />
            </>
          )}
        </div>

        {/* RESIDUAL LOAN */}
        <div className="card" style={{ border: "1px solid #f59e0b44", background: "linear-gradient(180deg,#1a0a00,#0f0800)" }}>
          <button className="collapse-toggle" onClick={() => setShowResidual(v => !v)} style={{ color: "#f59e0b" }}>
            <span style={{ color: "#f59e0b", fontSize: "0.78rem", fontWeight: 600 }}>Residual Loan Balance</span>
            <span className={`chevron ${showResidual ? "up" : ""}`}>▾</span>
          </button>
          {showResidual && (
            <div className="collapse-body">
              <div style={{ fontSize: "0.67rem", color: T.label, marginBottom: "0.8rem", lineHeight: 1.5 }}>
                Down payments don't fully cover the construction loan. The remaining balance converts to an Interest-Only loan, paid off at Year 7 from note sale proceeds.
              </div>
              <SliderInput label="IO Interest Rate" sublabel="on residual balance" value={inputs.residualLoanRate}
                min={4} max={15} step={0.25} onChange={set("residualLoanRate")} format={v => `${v}%`} color="#f59e0b" />
              {calc.residualLoanBalance > 0 ? (
                <>
                  <LoanBadge label="Loan Balance" value={fmtFull(calc.residualLoanBalance)} color="#f59e0b" T={T} />
                  <LoanBadge label="Monthly IO Payment" value={fmtFull(calc.residualMonthlyPayment)} color={T.textMuted} T={T} />
                  <LoanBadge label="Total Interest Cost" value={fmtFull(calc.residualInterestTotal)} color="#f87171" T={T} />
                  <LoanBadge label="Balloon at Year 7" value={fmtFull(calc.residualLoanBalance)} color="#f87171" T={T} />
                </>
              ) : (
                <div style={{ fontSize: "0.7rem", color: T.label, padding: "0.4rem" }}>
                  No residual balance — down payments cover the full construction loan.
                </div>
              )}
            </div>
          )}
        </div>

        {/* DEAL COSTS */}
        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
          <SectionLabel>Deal Costs</SectionLabel>
          <SliderInput label="Developer Fee %" sublabel="% of construction cost" value={inputs.developerFeePct}
            min={0} max={10} step={0.5} onChange={set("developerFeePct")} format={v => `${v}%`} color={PC} />
          <SliderInput label="Deal Setup & Ops" sublabel="attorney, CPA, LLC, title" value={inputs.dealSetupCosts}
            min={0} max={200000} step={5000} onChange={set("dealSetupCosts")} format={fmt} color={PC} />
          <SliderInput label="Loan Servicing Fee" sublabel="$ per loan per month" value={inputs.loanServicingMonthly}
            min={0} max={200} step={10} onChange={set("loanServicingMonthly")} format={v => `$${v}/mo`} color={PC} />
        </div>

        {/* SELLER FINANCING */}
        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
          <SectionLabel>Seller Financing · 30yr Fixed</SectionLabel>
          <SliderInput label="Buyer Down Payment %" value={inputs.downPaymentPct} min={5} max={40} step={1}
            onChange={set("downPaymentPct")} format={v => `${v}%`} color={GC} />
          <SliderInput label="Note Interest Rate" value={inputs.interestRate} min={3} max={10} step={0.25}
            onChange={set("interestRate")} format={v => `${v}%`} color={GC} />
          <SliderInput label="Prepay Years" sublabel="hold before note sale" value={inputs.prepayYears}
            min={3} max={15} step={1} onChange={set("prepayYears")} format={v => `${v} yrs`} color={GC} />
          <SliderInput label="Note Sale Discount" sublabel="¢ on the $1" value={inputs.noteSaleDiscount}
            min={70} max={100} step={1} onChange={set("noteSaleDiscount")} format={v => `${v}¢`} color={GC} />
        </div>

        {/* PARTNERSHIP SPLIT */}
        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})` }}>
          <SectionLabel>Partnership Split</SectionLabel>
          <SliderInput label="Investor Split" sublabel="owner gets remainder"
            value={inputs.investorSplit} min={50} max={90} step={1}
            onChange={set("investorSplit")} format={v => `${v} / ${100 - v}`} color={IC} />
          <div style={{ display: "flex", borderRadius: "6px", overflow: "hidden", height: "26px" }}>
            <div style={{ width: `${inputs.investorSplit}%`, background: `linear-gradient(90deg,${IC}88,${IC})`, display: "flex", alignItems: "center", justifyContent: "center", transition: "width 0.2s" }}>
              <span style={{ fontSize: "0.63rem", fontFamily: "'Geist Mono', monospace", color: "#0f172a", fontWeight: 700 }}>YOU {inputs.investorSplit}%</span>
            </div>
            <div style={{ flex: 1, background: `linear-gradient(90deg,${OC}88,${OC})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "0.63rem", fontFamily: "'Geist Mono', monospace", color: "#0f172a", fontWeight: 700 }}>OWNER {calc.ownerSplit}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT: Results */}
      <div className="dev-results">

        {/* Construction Loan Results */}
        {inputs.useConstructionLoan && (
          <div style={{ background: "linear-gradient(135deg,#1a1000,#0a1400)", border: `1px solid ${CC}44`, borderRadius: "12px", padding: "1rem 1.4rem", marginBottom: "1.2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.75rem", marginBottom: "0.75rem" }}>
              {[
                ["Your Cash Down", fmtFull(calc.cLoanDownAmt), `${inputs.constructionLoanDownPct}% of build cost`, CC],
                ["Loan Amount", fmtFull(calc.cLoanAmt), `${inputs.constructionLoanRate}% interest-only`, IC],
                ["Monthly @ Full Draw", `${fmtFull(calc.cLoanMonthlyAtFull)}/mo`, `${inputs.constructionMonths} mo build`, T.textMuted],
                ["Total Interest Carry", fmtFull(calc.cLoanInterestTotal), "avg draw cost", "#f87171"],
                ["Loan Repaid at Closing", fmtFull(calc.loanRepaidAtClose), "from down payments", GC],
              ].map(([label, val, sub, color]) => (
                <div key={label}>
                  <div style={{ fontSize: "0.6rem", color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>{label}</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.88rem", color: T.text, fontWeight: 600 }}>{val}</div>
                  <div style={{ fontSize: "0.62rem", color: T.label }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "0.6rem 0.8rem", background: `${CC}15`, borderRadius: "6px", border: `1px solid ${CC}33` }}>
              <div style={{ fontSize: "0.6rem", color: CC, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>Your True Out-of-Pocket Cost</div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "1.2rem", color: CC, fontWeight: 700 }}>{fmtFull(calc.investorCashIn)}</div>
              <div style={{ fontSize: "0.62rem", color: T.label }}>Down + interest carry (vs {fmtFull(inputs.constructionCost)} all-cash)</div>
            </div>
          </div>
        )}

        {/* Deal Costs results */}
        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})`, marginBottom: "1rem" }}>
          <SectionLabel>Deal Costs</SectionLabel>
          <div style={{ padding: "0.6rem 0.8rem", background: "#1a0a2e", border: "1px solid #e879f933", borderRadius: "7px", fontSize: "0.7rem", lineHeight: 1.6 }}>
            {[
              ["Developer fee (from loan)", fmtFull(calc.developerFeeAmt), PC],
              ["Setup costs (investor out-of-pocket)", fmtFull(calc.totalDealCosts), PC],
              [`Servicing total (${inputs.prepayYears} yrs)`, fmtFull(calc.loanServicingTotal), "#f87171"],
            ].map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: T.textMuted }}>{l}</span>
                <span style={{ fontFamily: "'Geist Mono', monospace", color: c }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Financing results */}
        <div className="card" style={{ border: `1px solid ${T.border}`, background: `linear-gradient(180deg,${T.surface},${T.surface2})`, marginBottom: "1rem" }}>
          <SectionLabel>Seller Financing Results</SectionLabel>
          {[
            ["Total Sale Value", fmtFull(calc.totalSaleValue), `${inputs.numCondos} × ${fmt(inputs.condoSellPrice)}`, "#a78bfa"],
            ["Buyer Down Payments", fmtFull(calc.totalDownPayments), `${inputs.downPaymentPct}% × ${inputs.numCondos} units`, GC],
            ["Total Notes Principal", fmtFull(calc.totalNotesPrincipal), "seller-financed portion", IC],
            ["Monthly per Unit", fmtFull(calc.monthlyPerUnit), "buyer P&I payment", GC],
            ["P&I Collected", fmtFull(calc.totalPICollected), `${inputs.prepayYears} yrs`, GC],
            ["Note Sale Proceeds", fmtFull(calc.noteSaleProceeds), `${inputs.noteSaleDiscount}¢/$1 · bal ${fmt(calc.remainingBalance)}`, GC],
          ].map(([l, v, sub, c]) => (
            <div key={l} style={{ marginBottom: "0.5rem" }}>
              <div style={{ fontSize: "0.6rem", color: T.label, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: "0.88rem", color: c, fontWeight: 600 }}>{v}</div>
              <div style={{ fontSize: "0.62rem", color: T.label }}>{sub}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
