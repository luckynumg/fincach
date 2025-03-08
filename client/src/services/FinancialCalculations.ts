export class FinancialCalculations {
  // Calculs du compte de résultat
  static calculateGrossProfit(revenue: number, costOfSales: number): number {
    return revenue - costOfSales;
  }

  static calculateOperatingProfit(grossProfit: number, operatingExpenses: number): number {
    return grossProfit - operatingExpenses;
  }

  static calculateNetProfit(operatingProfit: number, interest: number, taxes: number): number {
    return operatingProfit - interest - taxes;
  }

  // Ratios financiers
  static calculateCurrentRatio(currentAssets: number, currentLiabilities: number): number {
    return currentLiabilities === 0 ? 0 : currentAssets / currentLiabilities;
  }

  static calculateQuickRatio(currentAssets: number, inventory: number, currentLiabilities: number): number {
    return currentLiabilities === 0 ? 0 : (currentAssets - inventory) / currentLiabilities;
  }

  static calculateDebtToEquityRatio(totalLiabilities: number, totalEquity: number): number {
    return totalEquity === 0 ? 0 : totalLiabilities / totalEquity;
  }

  static calculateROE(netIncome: number, shareholderEquity: number): number {
    return shareholderEquity === 0 ? 0 : (netIncome / shareholderEquity) * 100;
  }

  static calculateROA(netIncome: number, totalAssets: number): number {
    return totalAssets === 0 ? 0 : (netIncome / totalAssets) * 100;
  }

  // Calculs de valorisation
  static calculateDCF(cashFlows: number[], discountRate: number): number {
    return cashFlows.reduce((acc, cf, index) => {
      return acc + (cf / Math.pow(1 + discountRate, index + 1));
    }, 0);
  }

  static calculateNPV(initialInvestment: number, cashFlows: number[], discountRate: number): number {
    const dcf = this.calculateDCF(cashFlows, discountRate);
    return dcf - initialInvestment;
  }

  static calculateIRR(cashFlows: number[], guess: number = 0.1): number {
    const maxIterations = 100;
    const tolerance = 0.0001;
    let rate = guess;

    for (let i = 0; i < maxIterations; i++) {
      const npv = this.calculateNPV(-cashFlows[0], cashFlows.slice(1), rate);
      if (Math.abs(npv) < tolerance) {
        return rate;
      }

      const derivative = this.calculateNPVDerivative(cashFlows, rate);
      if (derivative === 0) {
        break;
      }

      rate = rate - npv / derivative;
    }

    return rate;
  }

  private static calculateNPVDerivative(cashFlows: number[], rate: number): number {
    return cashFlows.reduce((acc, cf, index) => {
      return acc - (index * cf) / Math.pow(1 + rate, index + 1);
    }, 0);
  }

  // Analyse du point mort
  static calculateBreakEvenPoint(fixedCosts: number, unitPrice: number, unitVariableCost: number): number {
    return fixedCosts / (unitPrice - unitVariableCost);
  }

  // Gestion du fonds de roulement
  static calculateWorkingCapital(currentAssets: number, currentLiabilities: number): number {
    return currentAssets - currentLiabilities;
  }

  static calculateDSO(accountsReceivable: number, annualRevenue: number