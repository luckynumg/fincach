import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Chart from 'react-apexcharts';

interface FinancialData {
  [key: string]: number | string;
}

const FinancialModel: React.FC = () => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState<FinancialData[]>([
    { year: '2024', revenue: 0, costs: 0, profit: 0 },
    { year: '2025', revenue: 0, costs: 0, profit: 0 },
    { year: '2026', revenue: 0, costs: 0, profit: 0 },
    { year: '2027', revenue: 0, costs: 0, profit: 0 },
    { year: '2028', revenue: 0, costs: 0, profit: 0 },
  ]);

  const columnDefs = [
    { field: 'year', headerName: 'Année', editable: false },
    { 
      field: 'revenue', 
      headerName: 'Revenus',
      editable: true,
      valueFormatter: (params: any) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' })
          .format(params.value);
      }
    },
    { 
      field: 'costs', 
      headerName: 'Coûts',
      editable: true,
      valueFormatter: (params: any) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' })
          .format(params.value);
      }
    },
    { 
      field: 'profit', 
      headerName: 'Profit',
      valueGetter: (params: any) => {
        return params.data.revenue - params.data.costs;
      },
      valueFormatter: (params: any) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' })
          .format(params.value);
      }
    },
  ];

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: rowData.map(row => row.year),
    },
    yaxis: {
      title: {
        text: 'FCFA'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' })
            .format(val);
        }
      }
    }
  };

  const chartSeries = [
    {
      name: 'Revenus',
      data: rowData.map(row => Number(row.revenue))
    },
    {
      name: 'Coûts',
      data: rowData.map(row => Number(row.costs))
    },
    {
      name: 'Profit',
      data: rowData.map(row => Number(row.revenue) - Number(row.costs))
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modélisation Financière</h1>
      
      <div className="mb-8">
        <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={(params: any) => setGridApi(params.api)}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Graphique des Projections</h2>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-green-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Revenus Totaux</h3>
          <p className="text-2xl font-bold text-green-800">
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' })
              .format(rowData.reduce((acc, row) => acc + Number(row.revenue), 0))}
          </p>
        </div>
        <div className="p-6 bg-red-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Coûts Totaux</h3>
          <p className="text-2xl font-bold text-red-800">
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' })
              .format(rowData.reduce((acc, row) => acc + Number(row.costs), 0))}
          </p>
        </div>
        <div className="p-6 bg-blue-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Profit Total</h3>
          <p className="text-2xl font-bold text-blue-800">
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' })
              .format(rowData.reduce((acc, row) => acc + (Number(row.revenue) - Number(row.costs)), 0))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialModel;