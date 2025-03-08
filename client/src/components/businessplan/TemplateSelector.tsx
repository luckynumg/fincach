import React from 'react';

const templates = [
  {
    id: 'startup',
    name: 'Template Startup',
    description: 'Idéal pour les startups technologiques et innovantes',
    icon: '🚀'
  },
  {
    id: 'service',
    name: 'Template Entreprise de Service',
    description: 'Parfait pour les entreprises de service et consulting',
    icon: '💼'
  },
  {
    id: 'commerce',
    name: 'Template Commerce',
    description: 'Adapté aux commerces de détail et e-commerce',
    icon: '🏪'
  },
  {
    id: 'industrie',
    name: 'Template Industrie',
    description: 'Pour les projets industriels et de fabrication',
    icon: '🏭'
  }
];

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Choisissez votre template</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelect(template.id)}
          >
            <div className="text-4xl mb-4">{template.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
            <p className="text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Commencer à zéro</h2>
        <p className="text-gray-600 mb-4">
          Vous préférez partir d'une page blanche ? Créez votre business plan personnalisé.
        </p>
        <button
          onClick={() => onSelect('blank')}
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Page blanche
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;