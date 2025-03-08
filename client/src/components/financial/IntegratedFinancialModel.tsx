import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Chart from 'chart.js/auto';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface FinancialData {
  year: number;
  revenue: {
    sales: number;
    services: number;
    other: number;
    totalRevenue: number;
  };
  costs: {
    cogs: number;
    operatingExpenses: number;
    depreciation: number;
    amortization: number;
    totalCosts: number;
  };
  profitability: {
    grossProfit: number;
    ebitda: number;
    ebit: number;
    netIncome: number;
  };
  balanceSheet: {
    assets: {
      currentAssets: number;
      fixedAssets: number;
      totalAssets: number;
    };
    liabilities: {
      currentLiabilities: number;
      longTermDebt: number;
      totalLiabilities: number;
    };
    equity: {
      retainedEarnings: number;
      totalEquity: number;
    };
  };
  cashFlow: {
    operatingCashFlow: number;
    investingCashFlow: number;
    financingCashFlow: number;
    netCashFlow: number;
  };
  metrics: {
    grossMargin: number;
    operatingMargin: number;
    netMargin: number;
    currentRatio: number;
    quickRatio: number;
    debtToEquity: number;
    roe: number;
    roa: number;
  };
}

const IntegratedFinancialModel: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [projectionYears, setProjectionYears] = useState<number>(5);
  const [growthRate, setGrowthRate] = useState<number>(0.05);
  const [selectedTab, setSelectedTab] = useState<string>('income');

  useEffect(() => {
    generateProjections();
  }, [projectionYears, growthRate]);

  const generateProjections = () => {
    const baseYear = 2025;
    const data: FinancialData[] = [];

    for (let i = 0; i < projectionYears; i++) {
      const year = baseYear + i;
      const growthFactor = Math.pow(1 + growthRate, i);

      // Génération des revenus de base
      const revenue = {
        sales: 1000000 * growthFactor,
        services: 500000 * growthFactor,
        other: 100000 * growthFactor,
        totalRevenue: 0
      };
      revenue.totalRevenue = revenue.sales + revenue.services + revenue.other;

      // Calcul des coûts
      const costs = {
        cogs: revenue.totalRevenue * 0.6,
        operatingExpenses: revenue.totalRevenue * 0.2,
        depreciation: 100000,
        amortization: 50000,
        totalCosts: 0
      };
      costs.totalCosts = costs.cogs + costs.operatingExpenses + costs.depreciation + costs.amortization;

      // Calcul de la rentabilité
      const profitability = {
        grossProfit: revenue.totalRevenue - costs.cogs,
        ebitda: revenue.totalRevenue - costs.cogs - costs.operatingExpenses,
        ebit: revenue.totalRevenue - costs.totalCosts,
        netIncome: (revenue.totalRevenue - costs.totalCosts) * 0.75
      };

      // Bilan
      const balanceSheet = {
        assets: {
          currentAssets: revenue.totalRevenue * 0.3,
          fixedAssets: revenue.totalRevenue * 0.5,
          totalAssets: 0
        },
        liabilities: {
          currentLiabilities: revenue.totalRevenue * 0.2,
          longTermDebt: revenue.totalRevenue * 0.3,
          totalLiabilities: 0
        },
        equity: {
          retainedEarnings: profitability.netIncome * 0.7,
          totalEquity: 0
        }
      };
      balanceSheet.assets.totalAssets = balanceSheet.assets.currentAssets + balanceSheet.assets.fixedAssets;
      balanceSheet.liabilities.totalLiabilities = balanceSheet.liabilities.currentLiabilities + balanceSheet.liabilities.longTermDebt;
      balanceSheet.equity.totalEquity = balanceSheet.assets.totalAssets - balanceSheet.liabilities.totalLiabilities;

      // Flux de trésorerie
      const cashFlow = {
        operatingCashFlow: profitability.netIncome + costs.depreciation + costs.amortization,
        investingCashFlow: -revenue.totalRevenue * 0.1,
        financingCashFlow: -profitability.netIncome * 0.3,
        netCashFlow: 0
      };
      cashFlow.netCashFlow = cashFlow.operatingCashFlow + cashFlow.investingCashFlow + cashFlow.financingCashFlow;

      // Métriques financières
      const metrics = {
        grossMargin: (profitability.grossProfit / revenue.totalRevenue) * 100,
        operatingMargin: (profitability.ebit / revenue.totalRevenue) * 100,
        netMargin: (profitability.netIncome / revenue.totalRevenue) * 100,
        currentRatio: balanceSheet.assets.currentAssets / balanceSheet.liabilities.currentLiabilities,
        quickRatio: (balanceSheet.assets.currentAssets - revenue.totalRevenue * 0.1) / balanceSheet.liabilities.currentLiabilities,
        debtToEquity: balanceSheet.liabilities.totalLiabilities / balanceSheet.equity.totalEquity,
        roe: profitability.netIncome / balanceSheet.equity.totalEquity,
        roa: profitability.netIncome / balanceSheet.assets.totalAssets
      };

      data.push({
        year,
        revenue,
        costs,
        profitability,
        balanceSheet,
        cashFlow,
        metrics
      });
    }

    setFinancialData(data);
  };

  const getGridData = () => {
    switch (selectedTab) {
      case 'income':
        return financialData.map(d => ({
          year: d.year,
          sales: d.revenue.sales,
          services: d.revenue.services,
          otherRevenue: d.revenue.other,
          totalRevenue: d.revenue.totalRevenue,
          cogs: d.costs.cogs,
          grossProfit: d.profitability.grossProfit,
          operatingExpenses: d.costs.operatingExpenses,
          ebitda: d.profitability.ebitda,
          depreciation: d.costs.depreciation,
          amortization: d.costs.amortization,
          ebit: d.profitability.ebit,
          netIncome: d.profitability.netIncome
        }));
      case 'balance':
        return financialData.map(d => ({
          year: d.year,
          currentAssets: d.balanceSheet.assets.currentAssets,
          fixedAssets: d.balanceSheet.assets.fixedAssets,
          totalAssets: d.balanceSheet.assets.totalAssets,
          currentLiabilities: d.balanceSheet.liabilities.currentLiabilities,
          longTermDebt: d.balanceSheet.liabilities.longTermDebt,
          totalLiabilities: d.balanceSheet.liabilities.totalLiabilities,
          retainedEarnings: d.balanceSheet.equity.retainedEarnings,
          totalEquity: d.balanceSheet.equity.totalEquity
        }));
      case 'cashflow':
        return financialData.map(d => ({
          year: d.year,
          operatingCashFlow: d.cashFlow.operatingCashFlow,
          investingCashFlow: d.cashFlow.investingCashFlow,
          financingCashFlow: d.cashFlow.financingCashFlow,
          netCashFlow: d.cashFlow.netCashFlow
        }));
      case 'metrics':
        return financialData.map(d => ({
          year: d.year,
          grossMargin: d.metrics.grossMargin,
          operatingMargin: d.metrics.operatingMargin,
          netMargin: d.metrics.netMargin,
          currentRatio: d.metrics.currentRatio,
          quickRatio: d.metrics.quickRatio,
          debtToEquity: d.metrics.debtToEquity,
          roe: d.metrics.roe,
          roa: d.metrics.roa
        }));
      default:
        return [];
    }
  };

  const getColumnDefs = () => {
    const baseColumns = [{ field: 'year', headerName: 'Année' }];
    
    switch (selectedTab) {
      case 'income':
        return [
          ...baseColumns,
          { field: 'sales', headerName: 'Ventes' },
          { field: 'services', headerName: 'Services' },
          { field: 'otherRevenue', headerName: 'Autres Revenus' },
          { field: 'totalRevenue', headerName: 'Revenus Totaux' },
          { field: 'cogs', headerName: 'Coût des Ventes' },
          { field: 'grossProfit', headerName: 'Marge Brute' },
          { field: 'operatingExpenses', headerName: 'Charges d\'Exploitation' },
          { field: 'ebitda', headerName: 'EBITDA' },
          { field: 'depreciation', headerName: 'Dépréciation' },
          { field: 'amortization', headerName: 'Amortissement' },
          { field: 'ebit', headerName: 'EBIT' },
          { field: 'netIncome', headerName: 'Résultat Net' }
        ];
      // Ajoutez les autres cas pour les autres onglets
    }
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Créer des feuilles pour chaque section
    ['income', 'balance', 'cashflow', 'metrics'].forEach(section => {
      const ws = XLSX.utils.json_to_sheet(getGridData());
      XLSX.utils.book_append_sheet(wb, ws, section.charAt(0).toUpperCase() + section.slice(1));
    });

    // Sauvegarder le fichier
    XLSX.writeFile(wb, 'ModeleFinancier.xlsx');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Modèle Financier Intégré</h1>
          <div className="space-x-4">
            <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded">
              Exporter Excel
            </button>
            <input
              type="number"
              value={projectionYears}
              onChange={(e) => setProjectionYears(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded"
              min="1"
              max="10"
            />
            <input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded"
              step="0.01"
              min="-0.5"
              max="0.5"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 p-4">
        <div className="col-span-2">
          <div className="space-y-2">
            {['income', 'balance', 'cashflow', 'metrics'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`w-full p-2 text-left rounded ${
                  selectedTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-10">
          <div className="h-full bg-white rounded shadow">
            <AgGridReact
              rowData={getGridData()}
              columnDefs={getColumnDefs()}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
                flex: 1
              }}
              domLayout="autoHeight"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedFinancialModel;