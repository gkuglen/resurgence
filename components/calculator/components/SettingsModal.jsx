import { SliderInput } from "./SliderInput.jsx";
import { ToggleInput } from "./ToggleInput.jsx";
import { SectionLabel } from "./SectionLabel.jsx";
import { fmt } from "../utils.js";

export function SettingsModal({ open, onClose, inputs, set }) {
  const IC = "#38bdf8", OC = "#fb923c", CC = "#f59e0b", GC = "#34d399", PC = "#e879f9";

  return (
    <>
      <div className={`menu-backdrop ${open ? "visible" : ""}`} onClick={onClose} />
      <div className={`settings-modal ${open ? "open" : ""}`}>
        <div className="settings-header">
          <span className="settings-title">Settings</span>
          <button className="icon-btn close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="settings-body">

          <SectionLabel>Property</SectionLabel>
          <SliderInput label="Home Value" value={inputs.homeValue} min={200000} max={3000000} step={50000}
            onChange={set("homeValue")} format={fmt} color={OC} />
          <SliderInput label="Existing Debt" value={inputs.existingDebt} min={0} max={2000000} step={25000}
            onChange={set("existingDebt")} format={fmt} color={OC} />
          <ToggleInput
            label={inputs.applyCapGains ? "Capital Gains: Standard Rates" : "Capital Gains: §1014 Step-Up ($0 tax)"}
            value={inputs.applyCapGains}
            onChange={set("applyCapGains")}
            onColor="#f87171"
          />

          <SectionLabel>Development</SectionLabel>
          <SliderInput label="Construction Cost" value={inputs.constructionCost} min={500000} max={8000000} step={100000}
            onChange={set("constructionCost")} format={fmt} color={IC} />
          <SliderInput label="# of Condos" value={inputs.numCondos} min={2} max={12} step={1}
            onChange={set("numCondos")} format={v => `${v} units`} color="#a78bfa" />
          <SliderInput label="Condo Sale Price" value={inputs.condoSellPrice} min={300000} max={2000000} step={25000}
            onChange={set("condoSellPrice")} format={fmt} color="#a78bfa" />
          <ToggleInput label="Use Construction Loan" value={inputs.useConstructionLoan}
            onChange={set("useConstructionLoan")} onColor={CC} />
          {inputs.useConstructionLoan && (
            <>
              <SliderInput label="Down Payment %" value={inputs.constructionLoanDownPct} min={5} max={40} step={1}
                onChange={set("constructionLoanDownPct")} format={v => `${v}%`} color={CC} />
              <SliderInput label="Interest Rate" value={inputs.constructionLoanRate} min={5} max={15} step={0.25}
                onChange={set("constructionLoanRate")} format={v => `${v}%`} color={CC} />
              <SliderInput label="Construction Period" value={inputs.constructionMonths} min={6} max={36} step={1}
                onChange={set("constructionMonths")} format={v => `${v} mo`} color={CC} />
            </>
          )}
          <SliderInput label="IO Interest Rate (Residual Loan)" value={inputs.residualLoanRate} min={4} max={15} step={0.25}
            onChange={set("residualLoanRate")} format={v => `${v}%`} color="#f59e0b" />
          <SliderInput label="Developer Fee %" value={inputs.developerFeePct} min={0} max={10} step={0.5}
            onChange={set("developerFeePct")} format={v => `${v}%`} color={PC} />
          <SliderInput label="Deal Setup & Ops" value={inputs.dealSetupCosts} min={0} max={200000} step={5000}
            onChange={set("dealSetupCosts")} format={fmt} color={PC} />
          <SliderInput label="Loan Servicing Fee" value={inputs.loanServicingMonthly} min={0} max={200} step={10}
            onChange={set("loanServicingMonthly")} format={v => `$${v}/mo`} color={PC} />

          <SectionLabel>Seller Financing</SectionLabel>
          <SliderInput label="Buyer Down Payment %" value={inputs.downPaymentPct} min={5} max={40} step={1}
            onChange={set("downPaymentPct")} format={v => `${v}%`} color={GC} />
          <SliderInput label="Note Interest Rate" value={inputs.interestRate} min={3} max={10} step={0.25}
            onChange={set("interestRate")} format={v => `${v}%`} color={GC} />
          <SliderInput label="Prepay Years" value={inputs.prepayYears} min={3} max={15} step={1}
            onChange={set("prepayYears")} format={v => `${v} yrs`} color={GC} />
          <SliderInput label="Note Sale Discount" value={inputs.noteSaleDiscount} min={70} max={100} step={1}
            onChange={set("noteSaleDiscount")} format={v => `${v}¢`} color={GC} />

          <SectionLabel>Partnership</SectionLabel>
          <SliderInput label="Investor Split" value={inputs.investorSplit} min={50} max={90} step={1}
            onChange={set("investorSplit")} format={v => `${v} / ${100 - v}`} color={IC} />

        </div>
      </div>
    </>
  );
}
