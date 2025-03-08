import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import * as d3 from 'd3';
import { OpenAIService } from '../../services/OpenAIService';

interface FinancialModel {
  incomeStatement: IncomeStatement;
  balanceSheet: BalanceSheet;
  cashFlow: CashFlow;
  ratios: FinancialRatios;
  valuationMetrics: ValuationMetrics;
}

interface IncomeStatement {
  revenue: {
    productSales: number[];
    serviceSales: number[];
    otherRevenue: number[];
  };
  expenses: {
    costOfGoodsSold: number[];
    operatingExpenses: number[];
    depreciation: number[];
    amortization: number[];
    interest: number[];
    taxes: number[];
  };
}

interface BalanceSheet {
  assets: {
    currentAssets: {
      cash: number[];
      accountsReceivable: number[];
      inventory: number[];
      prepaidExpenses: number[];
    };
    nonCurrentAssets: {
      propertyPlantEquipment: number[];
      intangibleAssets: number[];
      investments: number[];
    };
  };
  liabilities: {
    currentLiabilities: {
      accountsPayable: number[];
      shortTermDebt: number[];
      currentPortionLongTermDebt: number[];
    };
    nonCurrentLiabilities: {
      longTermDebt: number[];
      deferredTax: number[];
    };
  };
  equity: {
    commonStock: number[];
    retainedEarnings: number[];
  };
}

interface CashFlow {
  operating: {
    netIncome: number[];
    adjustments: {
      depreciation: number[];
      amortization: number[];
      workingCapitalChanges: number[];
    };
  };
  investing: {
    capitalExpenditures: number[];
    acquisitions: number[];
    investments: number[];
  };
  financing: {
    debtIssuance: number[];
    debtRepayment: number[];
    equityIssuance: number[];
    dividends: number[];
  };
}

interface FinancialRatios {
  profitability: {
    grossMargin: number[];
    operatingMargin: number[];
    netMargin: number[];
    roe: number[];
    roa: number[];
  };
  liquidity: {
    currentRatio: number[];
    quickRatio: number[];
    cashRatio: number[];
  };
  leverage: {
    debtToEquity: number[];
    interestCoverage: number[];
  };
  efficiency: {
    assetTurnover: number[];
    inventoryTurnover: number[];
    receivablesDays: number[];
  };
}

interface ValuationMetrics {
  dcf: {
    presentValue: number[];
    terminalValue: number;
    wacc: number;
    growthRate: number;
  };
  multiples: {
    peRatio: number[];
    evEbitda: number[];
    priceToBook: number[];
  };
}

const QuantrixModel: React.FC = () => {
  const [model, setModel] = useState<FinancialModel | null>(null);
  const [yearsProjection, setYearsProjection] = useState<number>(5);
  const [activeSection, setActiveSection] = useState<string>('income');
  const gridRef = useRef<any>(null);
  const [analysis, setAnalysis] = useState<string>('');

  // Initialisation du modèle avec toutes les fonctionnalités de Quantrix
  useEffect(() => {
    initializeModel();
  }, [yearsProjection]);

  const initializeModel = () => {
    // Création d'un modèle financier complet
    const newModel: FinancialModel = {
      incomeStatement: createIncomeStatement(),
      balanceSheet: createBalanceSheet(),
      cashFlow: createCashFlow(),
      ratios: calculateFinancialRatios(),
      valuationMetrics: calculateValuationMetrics()
    };
    setModel(newModel);
  };

  // Fonctions de calcul détaillées comme dans Quantrix
  const createIncomeStatement = () => {
    // Implémentation similaire à Quantrix
    return {
      revenue: {
        productSales: Array(yearsProjection).fill(0),
        serviceSales: Array(yearsProjection).fill(0),
        otherRevenue: Array(yearsProjection).fill(0)
      },
      expenses: {
        costOfGoodsSold: Array(yearsProjection).fill(0),
        operatingExpenses: Array(yearsProjection).fill(0),
        depreciation: Array(yearsProjection).fill(0),
        amortization: Array(yearsProjection).fill(0),
        interest: Array(yearsProjection).fill(0),
        taxes: Array(yearsProjection).fill(0)
      }
    };
  };

  const calculateFinancialRatios = () => {
    // Implémentation des ratios comme dans Quantrix
    if (!model) return {} as FinancialRatios;

    // Calcul des ratios de rentabilité
    const profitability = {
      grossMargin: calculateGrossMargin(),
      operatingMargin: calculateOperatingMargin(),
      netMargin: calculateNetMargin(),
      roe: calculateROE(),
      roa: calculateROA()
    };

    return {
      profitability,
      liquidity: calculateLiquidityRatios(),
      leverage: calculateLeverageRatios(),
      efficiency: calculateEfficiencyRatios()
    };
  };

  const calculateValuationMetrics = () => {
    // Implémentation des métriques de valorisation comme dans Quantrix
    return {
      dcf: calculateDCF(),
      multiples: calculateMultiples()
    };
  };

  // Fonctions d'analyse et de projection
  const performSensitivityAnalysis = () => {
    // Implémentation de l'analyse de sensibilité
  };

  const calculateScenarios = () => {
    // Implémentation des scénarios (optimiste, pessimiste, réaliste)
  };

  // Interface utilisateur similaire à Quantrix
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none bg-gray-100 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Modèle Financier Intégré</h1>
          <div className="space-x-4">
            <button onClick={performSensitivityAnalysis}>
              Analyse de Sensibilité
            </button>
            <button onClick={calculateScenarios}>
              Scénarios
            </button>
            <button onClick={async () => {
              if (model) {
                const aiAnalysis = await OpenAIService.analyzeFinancialResults(model);
                setAnalysis(aiAnalysis);
              }
            }}>
              Analyse AI
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-12 gap-4 p-4">
        <div className="col-span-3 bg-white rounded shadow">
          {/* Navigation entre les sections */}
          <nav className="space-y-2">
            {['income', 'balance', 'cashflow', 'ratios', 'valuation'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full p-2 text-left ${
                  activeSection === section ? 'bg-blue-100' : ''
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="col-span-9 bg-white rounded shadow">
          {/* Grille de données principale */}
          <div className="h-full">
            <AgGridReact
              ref={gridRef}
              rowData={getGridData()}
              columnDefs={getColumnDefs()}
              onCellValueChanged={handleCellValueChanged}
            />
          </div>
        </div>
      </div>

      {analysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Analyse AI des Résultats</h2>
            <div className="prose">
              {analysis.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setAnalysis('')}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantrixModel;