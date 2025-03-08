import React, { useState } from 'react';
import { OpenAIService } from '../../services/OpenAIService';

const AIBusinessPlanGenerator: React.FC = () => {
  const [businessIdea, setBusinessIdea] = useState('');
  const [businessPlan, setBusinessPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateBusinessPlan = async () => {
    if (!businessIdea.trim()) {
      setError('Veuillez décrire votre idée d\'entreprise');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const generatedPlan = await OpenAIService.generateBusinessPlan(businessIdea);
      setBusinessPlan(generatedPlan || '');
    } catch (err) {
      setError('Erreur lors de la génération du business plan');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBusinessPlan = async () => {
    try {
      const response = await fetch('/api/businessplan/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          idea: businessIdea,
          plan: businessPlan,
          created_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert('Business plan enregistré avec succès !');
      } else {
        throw new Error('Erreur lors de l\'enregistrement');
      }
    } catch (error) {
      alert('Erreur: ' + (error as Error).message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Générateur de Business Plan AI</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Décrivez votre idée d'entreprise
          </label>
          <textarea
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
            placeholder="Décrivez votre idée d'entreprise en détail..."
          />
        </div>
        <button
          onClick={generateBusinessPlan}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Génération en cours...' : 'Générer le Business Plan'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {businessPlan && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Votre Business Plan</h2>
            <button
              onClick={handleSaveBusinessPlan}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Enregistrer
            </button>
          </div>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: businessPlan.replace(/\n/g, '<br>') }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBusinessPlanGenerator;