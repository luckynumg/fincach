import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'analytics' | 'settings' | 'business'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalBusinessPlans: 0,
    totalRevenue: 0
  });

  // Simulation des données pour le tableau de bord
  useEffect(() => {
    // Simuler le chargement des utilisateurs
    setUsers([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        lastLogin: "2024-03-08 09:30:00",
        status: "active",
        createdAt: "2024-01-01"
      },
      // ... autres utilisateurs
    ]);

    // Simuler les statistiques
    setStatistics({
      totalUsers: 150,
      activeUsers: 89,
      totalBusinessPlans: 234,
      totalRevenue: 15000
    });
  }, []);

  const userColumnDefs = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Nom', sortable: true },
    { field: 'email', headerName: 'Email', sortable: true },
    { field: 'role', headerName: 'Rôle', sortable: true },
    { field: 'lastLogin', headerName: 'Dernière Connexion', sortable: true },
    { field: 'status', headerName: 'Statut', sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params: any) => (
        <div className="space-x-2">
          <button
            onClick={() => handleEditUser(params.data.id)}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Éditer
          </button>
          <button
            onClick={() => handleDeleteUser(params.data.id)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Supprimer
          </button>
        </div>
      )
    }
  ];

  const handleEditUser = (userId: number) => {
    toast.info(`Édition de l'utilisateur ${userId}`);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      toast.success(`Utilisateur ${userId} supprimé`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'users'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Utilisateurs
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'analytics'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Analytiques
                </button>
                <button
                  onClick={() => setActiveTab('business')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'business'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Business Plans
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'settings'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Paramètres
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Statistiques générales */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Utilisateurs</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{statistics.totalUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Utilisateurs Actifs</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{statistics.activeUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Business Plans</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{statistics.totalBusinessPlans}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Revenu Total</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{statistics.totalRevenue.toLocaleString()} FCFA</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        {activeTab === 'users' && (
          <div className="bg-white shadow rounded-lg">
            <div className="h-[600px] w-full">
              <AgGridReact
                rowData={users}
                columnDefs={userColumnDefs}
                defaultColDef={{
                  sortable: true,
                  filter: true,
                  resizable: true
                }}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Croissance des Utilisateurs</h3>
              <Line
                data={{
                  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                  datasets: [{
                    label: 'Nouveaux Utilisateurs',
                    data: [65, 78, 90, 105, 125, 150],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                  }]
                }}
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Business Plans par Catégorie</h3>
              <Bar
                data={{
                  labels: ['Startup', 'Commerce', 'Service', 'Industrie'],
                  datasets: [{
                    label: 'Nombre de Business Plans',
                    data: [85, 45, 65, 39],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(75, 192, 192, 0.5)'
                    ]
                  }]
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Business Plans Récents</h3>
            {/* Liste des business plans */}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres Système</h3>
            {/* Paramètres de l'application */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;