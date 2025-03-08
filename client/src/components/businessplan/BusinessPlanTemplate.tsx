import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface Section {
  title: string;
  content: string;
}

interface BusinessPlanTemplateProps {
  templateId: string;
  onSave: (content: any) => void;
}

const defaultTemplates = {
  startup: {
    name: "Template Startup",
    sections: [
      {
        title: "Résumé Exécutif",
        content: "Décrivez brièvement votre projet..."
      },
      {
        title: "Présentation de l'Entreprise",
        content: "Histoire, vision, mission..."
      },
      {
        title: "Analyse de Marché",
        content: "Taille du marché, concurrence..."
      },
      {
        title: "Stratégie et Mise en Œuvre",
        content: "Plan marketing, stratégie de vente..."
      },
      {
        title: "Organisation et Management",
        content: "Équipe, structure..."
      },
      {
        title: "Projections Financières",
        content: "Prévisions sur 3-5 ans..."
      }
    ]
  },
  service: {
    name: "Template Entreprise de Service",
    sections: [/* Sections similaires avec contenu adapté */]
  },
  commerce: {
    name: "Template Commerce",
    sections: [/* Sections similaires avec contenu adapté */]
  },
  industrie: {
    name: "Template Industrie",
    sections: [/* Sections similaires avec contenu adapté */]
  }
};

const BusinessPlanTemplate: React.FC<BusinessPlanTemplateProps> = ({ templateId, onSave }) => {
  const [sections, setSections] = React.useState<Section[]>(
    defaultTemplates[templateId as keyof typeof defaultTemplates]?.sections || []
  );

  const handleEditorChange = (content: string, index: number) => {
    const newSections = [...sections];
    newSections[index].content = content;
    setSections(newSections);
  };

  const handleSave = () => {
    onSave({
      templateId,
      sections,
      lastModified: new Date().toISOString()
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {defaultTemplates[templateId as keyof typeof defaultTemplates]?.name}
        </h1>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>

      {sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <Editor
            initialValue={section.content}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={(content) => handleEditorChange(content, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default BusinessPlanTemplate;