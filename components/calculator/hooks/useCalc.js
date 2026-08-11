import { useMemo } from "react";

export function useCalc(inputs) {
  return useMemo(() => {
    const {
      existingDebt, homeValue, constructionCost, condoSellPrice, numCondos,
      interestRate, downPaymentPct, investorSplit, prepayYears, noteSaleDiscount,
      useConstructionLoan, constructionLoanDownPct, constructionLoanRate, constructionMonths,
      developerFeePct, dealSetupCosts, loanServicingMonthly,
      residualLoanRate,
    } = inputs;

    const ownerSplit = 100 - investorSplit;
    const ownerEquity = homeValue - existingDebt;
    const cLoanDownAmt = useConstructionLoan ? constructionCost * (constructionLoanDownPct / 100) : constructionCost;
    const cLoanAmt = useConstructionLoan ? constructionCost - cLoanDownAmt : 0;
    const cLoanMonthlyRate = constructionLoanRate / 100 / 12;
    const cLoanInterestTotal = (cLoanAmt * 0.5) * cLoanMonthlyRate * constructionMonths;
    const cLoanMonthlyAtFull = cLoanAmt * cLoanMonthlyRate;
    const developerFeeAmt = constructionCost * (developerFeePct / 100);
    const totalDealCosts = dealSetupCosts;
    const loanServicingTotal = loanServicingMonthly * numCondos * prepayYears * 12;
    const investorCashIn = useConstructionLoan
      ? cLoanDownAmt + cLoanInterestTotal + totalDealCosts
      : constructionCost + totalDealCosts;

    const totalSaleValue = numCondos * condoSellPrice;
    const downPct = downPaymentPct / 100;
    const totalDownPayments = totalSaleValue * downPct;
    const totalNotesPrincipal = totalSaleValue * (1 - downPct);
    const notePerUnit = condoSellPrice * (1 - downPct);
    const r = interestRate / 100 / 12;
    const n = 30 * 12;
    const monthlyPerUnit = r > 0
      ? notePerUnit * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : notePerUnit / n;

    const loanRepaidAtClose = useConstructionLoan ? Math.min(cLoanAmt, totalDownPayments) : 0;
    const afterConstructionLoan = Math.max(0, totalDownPayments - loanRepaidAtClose);
    const debtRepaidAtClose = Math.min(existingDebt, afterConstructionLoan);
    const downPaymentsAfterAllDebts = Math.max(0, afterConstructionLoan - debtRepaidAtClose);

    // Residual IO loan — construction loan balance not covered by down payments
    const residualLoanBalance = useConstructionLoan ? Math.max(0, cLoanAmt - loanRepaidAtClose) : 0;
    const residualMonthlyRate = residualLoanRate / 100 / 12;
    const residualMonthlyPayment = residualLoanBalance * residualMonthlyRate;
    const residualInterestTotal = residualMonthlyPayment * prepayYears * 12;
    const residualTotalCost = residualInterestTotal + residualLoanBalance;

    let balance = totalNotesPrincipal;
    const years = [];
    for (let yr = 1; yr <= prepayYears; yr++) {
      let yInt = 0, yPrin = 0, b = balance / numCondos;
      for (let m = 0; m < 12; m++) {
        const mi = b * r, mp = monthlyPerUnit - mi;
        b -= mp;
        yInt += mi * numCondos;
        yPrin += mp * numCondos;
      }
      balance -= yPrin;
      years.push({ year: yr, interest: yInt, principal: yPrin, total: yInt + yPrin, balance: Math.max(balance, 0) });
    }

    const remainingBalance = years.length > 0 ? years[years.length - 1].balance : 0;
    const noteSaleProceeds = remainingBalance * (noteSaleDiscount / 100);
    const noteSaleHaircut = remainingBalance - noteSaleProceeds;
    const totalPICollected = years.reduce((s, y) => s + y.total, 0);
    const totalInterestEarned = years.reduce((s, y) => s + y.interest, 0);
    const grossProceeds = downPaymentsAfterAllDebts + totalPICollected + noteSaleProceeds
      - loanServicingTotal
      - residualInterestTotal
      - residualLoanBalance;

    const invPct = investorSplit / 100;
    const ownPct = ownerSplit / 100;
    const investorGross = grossProceeds * invPct;
    const ownerGross = grossProceeds * ownPct;
    const investorNet = investorGross + developerFeeAmt - investorCashIn;
    const investorROI = investorCashIn > 0 ? (investorNet / investorCashIn) * 100 : 0;
    const investorAnnualROI = investorROI / Math.max(prepayYears, 1);

    const closingInvestor = downPaymentsAfterAllDebts * invPct;
    const closingOwner = downPaymentsAfterAllDebts * ownPct;
    const tableRows = years.map(y => ({ ...y, investor: y.total * invPct, owner: y.total * ownPct }));

    let cumI = closingInvestor, recoveryYear = null;
    for (const row of tableRows) {
      cumI += row.investor;
      if (cumI >= investorCashIn && !recoveryYear) recoveryYear = row.year;
    }
    if (!recoveryYear && cumI + noteSaleProceeds * invPct >= investorCashIn) recoveryYear = prepayYears;

    return {
      ownerEquity, totalSaleValue, totalDownPayments, totalNotesPrincipal,
      totalPICollected, totalInterestEarned, grossProceeds, remainingBalance,
      noteSaleProceeds, noteSaleHaircut,
      investorGross, ownerGross, investorNet, ownerNet: ownerGross,
      investorROI, investorAnnualROI, recoveryYear,
      closingInvestor, closingOwner, tableRows, monthlyPerUnit,
      ownerSplit, invPct, ownPct,
      noteSaleInvestor: noteSaleProceeds * invPct,
      noteSaleOwner: noteSaleProceeds * ownPct,
      cLoanAmt, cLoanDownAmt, cLoanInterestTotal, cLoanMonthlyAtFull,
      investorCashIn, loanRepaidAtClose, debtRepaidAtClose,
      downPaymentsAfterAllDebts,
      downPaymentsAfterLoanRepay: afterConstructionLoan,
      developerFeeAmt, totalDealCosts, loanServicingTotal,
      residualLoanBalance, residualMonthlyPayment, residualInterestTotal, residualTotalCost,
    };
  }, [inputs]);
}
