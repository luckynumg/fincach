export class FinancialCalculationService {
  // Calculs de rentabilité
  static calculateGrossProfit(revenue: number, cogs: number): number {
    return revenue - cogs;
  }

  static calculateEBITDA(revenue: number, cogs: number, operatingExpenses: number): number {
    return revenue - cogs - operatingExpenses;
  }

  static calculateEBIT(ebitda: number, depreciation: number, amortization: number): number {
    return ebitda - depreciation - amortization;
  }

  static calculateNetIncome(ebit: number, taxRate: number): number {
    return ebit * (1 - taxRate);
  }

  // Ratios financiers
  static calculateFinancialRatios(data: any) {
    return {
      profitability: {
        grossMargin: (data.grossProfit / data.revenue) * 100,
        operatingMargin: (data.ebit / data.revenue) * 100,
        netMargin: (data.netIncome / data.revenue) * 100,
        roe: data.netIncome / data.equity,
        roa: data.netIncome / data.totalAssets
      },
      liquidity: {
        currentRatio: data.currentAssets / data.currentLiabilities,
        quickRatio: (data.currentAssets - data.inventory) / data.currentLiabilities,
        cashRatio: data.cash / data.currentLiabilities
      },
      efficiency: {
        assetTurnover: data.revenue / data.totalAssets,
        inventoryTurnover: data.cogs / data.inventory,
        receivablesTurnover: data.revenue / data.accountsReceivable,
        payablesTurnover: data.cogs / data.accountsPayable
      },
      leverage: {
        debtToEquity: data.totalLiabilities / data.equity,
        debtRatio: data.totalLiabilities / data.totalAssets,
        interestCoverage: data.ebit / data.interestExp