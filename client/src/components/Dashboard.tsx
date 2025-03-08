import React, { useState } from 'react';
import AdvancedFinancialModel from './financial/AdvancedFinancialModel';
import AIAnalysisPanel from './financial/AIAnalysisPanel';
import AIBusinessPlanGenerator from './businessplan/AIBusinessPlanGenerator';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'financial' | 'businessplan'>('financial');
  const [financialData, setFinancialData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('financial')}
              className={`px-3 py-4 text-sm font-medium ${
                activeTab === 'financial'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Modélisation Financière
            </button>
            <button
              onClick={() => setActiveTab('businessplan')}
              className={`px-3 py-4 text-sm font-medium ${
                activeTab === 'businessplan'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Business Plan
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4">
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <AdvancedFinancialModel onDataChange={setFinancialData} />
            {financialData && <AIAnalysisPanel financialData={financialData} />}
          </div>
        )}
        {activeTab === 'businessplan' && <AIBusinessPlanGenerator />}
      </div>
    </div>
  );
};

export default Dashboard;