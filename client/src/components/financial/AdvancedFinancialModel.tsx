import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { PDFExport } from '@progress/kendo-react-pdf';
import pptxgen from 'pptxgenjs';
import * as Excel from 'exceljs';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Legend,
  Tooltip
);

interface FinancialModelData {
  // Structure de base
  incomeStatement: {
    revenue: { [key: string]: number };
    costs: { [key: string]: number };
    operatingExpenses: { [key: string]: number };
    depreciation: { [key: string]: number };
    interest: { [key: string]: number };
    taxes: { [key: string]: number };
  };
  balanceSheet: {
    assets: { [key: string]: number };
    liabilities: { [key: string]: number };
    equity: { [key: string]: number };
  };
  cashFlow: {
    operatingCashFlow: { [key: string]: number };
    investingCashFlow: { [key: string]: number };
    financingCashFlow: { [key: string]: number };
  };
  metrics: {
    profitMargin: { [key: string]: number };
    roi: { [key: string]: number };
    debtToEquity: { [key: string]: number };
    currentRatio: { [key: string]: number };
  };
}

const AdvancedFinancialModel: React.FC = () => {
  const [modelData, setModelData] = useState<FinancialModelData>({
    incomeStatement: {
      revenue: {},
      costs: {},
      operatingExpenses: {},
      depreciation: {},
      interest: {},
      taxes: {}
    },
    balanceSheet: {
      assets: {},
      liabilities: {},
      equity: {}
    },
    cashFlow: {
      operatingCashFlow: {},
      investingCashFlow: {},
      financingCashFlow: {}
    },
    metrics: {
      profitMargin: {},
      roi: {},
      debtToEquity: {},
      currentRatio: {}
    }
  });

  const [activeTab, setActiveTab] = useState('income');
  const [years, setYears] = useState<string[]>(['2024', '2025', '2026', '2027', '2028']);
  const pdfExportComponent = React.useRef<any>(null);

  // Fonctions de calcul financier
  const calculateFinancialMetrics = () => {
    const newMetrics = { ...modelData.metrics };
    years.forEach(year => {
      const revenue = modelData.incomeStatement.revenue[year] || 0;
      const costs = modelData.incomeStatement.costs[year] || 0;
      const profit = revenue - costs;
      
      newMetrics.profitMargin[year] = (profit / revenue) * 100;
      // Ajoutez d'autres calculs de métriques ici
    });
    
    setModelData(prev => ({
      ...prev,
      metrics: newMetrics
    }));
  };

  // Gestionnaires d'export
  const handleExcelExport = async () => {
    const workbook = new Excel.Workbook();
    
    // Création de la feuille Income Statement
    const incomeSheet = workbook.addWorksheet('Income Statement');
    incomeSheet.columns = [
      { header: 'Year', key: 'year' },
      { header: 'Revenue', key: 'revenue' },
      { header: 'Costs', key: 'costs' },
      { header: 'Operating Expenses', key: 'operatingExpenses' }
    ];

    years.forEach(year => {
      incomeSheet.addRow({
        year,
        revenue: modelData.incomeStatement.revenue[year],
        costs: modelData.incomeStatement.costs[year],
        operatingExpenses: modelData.incomeStatement.operatingExpenses[year]
      });
    });

    // Création de la feuille Balance Sheet
    const balanceSheet = workbook.addWorksheet('Balance Sheet');
    // Ajoutez la logique similaire pour le bilan

    // Création de la feuille Cash Flow
    const cashFlowSheet = workbook.addWorksheet('Cash Flow');
    // Ajoutez la logique similaire pour le cash flow

    // Sauvegarde du fichier
    await workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'financial_model.xlsx';
      a.click();
    });
  };

  const handlePDFExport = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const handlePowerPointExport = () => {
    const pres = new pptxgen();

    // Slide 1: Title
    const slide1 = pres.addSlide();
    slide1.addText("Financial Model Report", {
      x: 1,
      y: 1,
      fontSize: 24,
      bold: true
    });

    // Slide 2: Income Statement
    const slide2 = pres.addSlide();
    slide2.addText("Income Statement", {
      x: 1,
      y: 0.5,
      fontSize: 18,
      bold: true
    });

    // Ajoutez d'autres slides avec graphiques et tableaux

    pres.writeFile("FinancialModel.pptx");
  };

  // Composants de grille pour chaque section
  const IncomeStatementGrid = () => {
    const columnDefs = [
      { field: 'year', headerName: 'Année' },
      { 
        field: 'revenue',
        headerName: 'Revenus',
        editable: true,
        valueFormatter: (params: any) => {
          return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' })
            .format(params.value);
        }
      },
      // Ajoutez d'autres colonnes pour l'état des résultats
    ];

    const rowData = years.map(year => ({
      year,
      revenue: modelData.incomeStatement.revenue[year] || 0,
      costs: modelData.incomeStatement.costs[year] || 0
    }));

    return (
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          onCellValueChanged={(params) => {
            // Mettre à jour les données du modèle
            const newModelData = { ...modelData };
            newModelData.incomeStatement[params.column.colId][params.data.year] = params.newValue;
            setModelData(newModelData);
            calculateFinancialMetrics();
          }}
        />
      </div>
    );
  };

  // Graphiques financiers
  const FinancialCharts = () => {
    const revenueData = {
      labels: years,
      datasets: [
        {
          label: 'Revenus',
          data: years.map(year => modelData.incomeStatement.revenue[year] || 0),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Évolution des Revenus</h3>
          <Line data={revenueData} />
        </div>
        {/* Ajoutez d'autres graphiques */}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Modélisation Financière Avancée</h1>
        <div className="space-x-4">
          <button
            onClick={handleExcelExport}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Exporter en Excel
          </button>
          <button
            onClick={handlePDFExport}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Exporter en PDF
          </button>
          <button
            onClick={handlePowerPointExport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Exporter en PowerPoint
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {['income', 'balance', 'cashflow', 'metrics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div className="space-y-6">
          {activeTab === 'income' && <IncomeStatementGrid />}
          {/* Ajoutez les autres composants de grille pour chaque onglet */}
          <FinancialCharts />
        </div>
      </PDFExport>
    </div>
  );
};

export default AdvancedFinancialModel;