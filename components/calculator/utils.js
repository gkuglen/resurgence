export function fmt(val) {
  if (Math.abs(val) >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
  if (Math.abs(val) >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
  return `$${Math.round(val)}`;
}

export function fmtFull(val) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(val);
}

export const DARK = {
  bg: "#060b14",
  surface: "#0d1625",
  surface2: "#0a1020",
  border: "#1e293b",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  label: "#9D9B9B",
};

export const LIGHT = {
  bg: "#ffffff",
  surface: "#f8fafc",
  surface2: "#f1f5f9",
  border: "#e2e8f0",
  text: "#0f172a",
  textMuted: "#64748b",
  label: "#6b7280",
};

export const defaultInputs = {
  existingDebt: 500000,
  homeValue: 1200000,
  constructionCost: 2000000,
  numCondos: 6,
  condoSellPrice: 900000,
  useConstructionLoan: true,
  constructionLoanDownPct: 20,
  constructionLoanRate: 10,
  constructionMonths: 18,
  interestRate: 5,
  downPaymentPct: 20,
  prepayYears: 7,
  noteSaleDiscount: 90,
  investorSplit: 65,
  developerFeePct: 4,
  dealSetupCosts: 75000,
  loanServicingMonthly: 50,
  residualLoanRate: 8,
  applyCapGains: true,
};

export const defaultOpp = {
  agentCommissionPct: 5.5,
  otherClosingCostPct: 1.0,
  taxBasis: 200000,
  federalCapGainsRate: 20,
  stateCapGainsRate: 13.3,
};

export const prefabOverrides = {
  constructionCost: 1600000,
  constructionMonths: 12,
  developerFeePct: 5.5,
};
