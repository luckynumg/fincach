import OpenAI from 'openai';

export class OpenAIService {
  private static openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  static async analyzeFinancialResults(financialData: any) {
    try {
      const prompt = `En tant qu'expert financier, analysez les données financières suivantes et fournissez une analyse détaillée en français :
      
      Données financières :
      ${JSON.stringify(financialData, null, 2)}
      
      Veuillez inclure :
      1. Une analyse des tendances principales
      2. Les points forts et les points faibles
      3. Des recommandations concrètes
      4. Les risques potentiels
      5. Les opportunités d'amélioration`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en analyse financière qui fournit des analyses détaillées et des recommandations pratiques."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de l\'analyse financière:', error);
      throw error;
    }
  }

  static async generateBusinessPlan(businessIdea: string) {
    try {
      const prompt = `En tant qu'expert en création d'entreprise, générez un business plan détaillé pour l'idée suivante :
      
      "${businessIdea}"
      
      Le business plan doit inclure :
      1. Résumé exécutif
      2. Description du projet
      3. Analyse du marché
      4. Stratégie commerciale
      5. Plan opérationnel
      6. Structure organisationnelle
      7. Projections financières
      8. Analyse des risques
      9. Plan de mise en œuvre
      
      Veuillez fournir des détails précis et des suggestions concrètes pour chaque section.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en création d'entreprise qui génère des business plans détaillés et pratiques."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de la génération du business plan:', error);
      throw error;
    }
  }
}