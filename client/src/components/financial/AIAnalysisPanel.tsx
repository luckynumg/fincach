import React, { useState } from 'react';
import { OpenAIService } from '../../services/OpenAIService';

interface AIAnalysisPanelProps {
  financialData: any;
}

const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ financialData }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getAnalysis = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await OpenAIService.analyzeFinancialResults(financialData);
      setAnalysis(result || '');
    } catch (err) {
      setError('Erreur lors de l\'analyse des résultats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Analyse AI des Résultats</h2>
        <button
          onClick={getAnalysis}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Analyse en cours...' : 'Analyser les résultats'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}

      {analysis && (
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br>') }} />
        </div>
      )}
    </div>
  );
};

export default AIAnalysisPanel;