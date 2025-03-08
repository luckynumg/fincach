import { OpenAIService } from './OpenAIService';

export class FinancialAIAnalysis {
  static async analyzeResults(financialModel: any) {
    const analysisPrompt = `En tant qu'expert financier, analysez en détail les résultats financiers suivants :

    1. Performance Financière :
    ${JSON.stringify(financialModel.incomeStatement, null, 2)}
    
    2. Position Financière :
    ${JSON.stringify(financialModel.balanceSheet, null, 2)}
    
    3. Flux de Trésorerie :
    ${JSON.stringify(financialModel.cashFlow, null, 2)}
    
    4. Ratios Clés :
    ${JSON.stringify(financialModel.ratios, null, 2)}
    
    5. Métriques de Valorisation :
    ${JSON.stringify(financialModel.valuationMetrics, null, 2)}

    Veuillez fournir :
    1. Une analyse approfondie des performances
    2. Les points forts et points faibles
    3. Les risques identifiés
    4. Les opportunités d'amélioration
    5. Des recommandations stratégiques
    6. Une perspective sur la valorisation
    7. Des suggestions d'optimisation financière`;

    try {
      const analysis = await OpenAIService.analyzeFinancialResults(analysisPrompt);
      return this.formatAnalysis(analysis);
    } catch (error) {
      console.error('Erreur lors de l\'analyse AI:', error);
      throw error;
    }
  }

  private static formatAnalysis(analysis: string): string {
    // Formatage de l'analyse pour une meilleure présentation
    return analysis.replace(/\n\n/g, '\n')
                  .replace(/(\d+\.)([^\n])/g, '$1 $2')
                  .replace(/([.!?])\s*\n/g, '$1\n\n');
  }
}