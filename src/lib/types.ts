// ===== DECISION ANALYSIS TYPES =====

export interface DecisionOption {
  id: string;
  name: string;
  description?: string;
}

export interface ClarificationAnswer {
  budget?: string;
  age?: string;
  country?: string;
  experience?: string;
  riskTolerance?: number; // 1-10
  timeline?: string;
  goals?: string;
  income?: string;
  savings?: string;
}

export interface CategoryScore {
  category: string;
  scores: Record<string, number>; // optionId -> score (0-100)
  weight: number;
  reasoning: string;
}

export interface ScenarioOutcome {
  period: string; // "6 months", "1 year", etc.
  outcomes: Record<string, string>; // optionId -> outcome description
}

export interface RiskItem {
  factor: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  affectedOptions: string[];
  description: string;
  mitigation: string;
}

export interface BiasDetection {
  biasType: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface DevilsAdvocate {
  againstOption: string;
  arguments: string[];
  counterPoints: string[];
}

export interface EvidenceItem {
  claim: string;
  reasoning: string;
  confidence: number;
  factors: string[];
}

export interface ScenarioSimulation {
  scenario: string;
  impact: Record<string, { change: number; explanation: string }>;
}

export interface DecisionTreeNode {
  id: string;
  label: string;
  probability?: number;
  outcome?: string;
  children?: DecisionTreeNode[];
  type: 'decision' | 'chance' | 'outcome';
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyNode {
  id: string;
  name: string;
}

export interface AnalysisResult {
  id: string;
  decision: string;
  options: DecisionOption[];
  winner: {
    optionId: string;
    optionName: string;
    confidence: number;
    summary: string;
  };
  categoryScores: CategoryScore[];
  timeline: ScenarioOutcome[];
  risks: RiskItem[];
  biases: BiasDetection[];
  devilsAdvocate: DevilsAdvocate;
  evidenceChain: EvidenceItem[];
  scenarioSimulations: ScenarioSimulation[];
  decisionTree: DecisionTreeNode;
  sankeyNodes: SankeyNode[];
  sankeyLinks: SankeyLink[];
  reasoning: {
    mainReasons: string[];
    tradeoffs: string[];
    hiddenCosts: string[];
    longTermEffects: string[];
  };
  recommendation: string;
  executiveSummary: string;
  methodology: string;
  createdAt: string;
}

export type AIModel = 'o3-mini' | 'gemini-2-5-flash' | 'claude-3-5-sonnet' | 'gpt-4-1-mini' | 'gpt-4-1';

export interface AIModelConfig {
  id: AIModel;
  name: string;
  provider: string;
  description: string;
  icon: string;
}

export const AI_MODELS: AIModelConfig[] = [
  { id: 'o3-mini', name: 'o3-mini', provider: 'OpenAI', description: 'Fast reasoning model', icon: '🧠' },
  { id: 'gemini-2-5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', description: 'Lightning fast responses', icon: '✨' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Thoughtful and nuanced', icon: '✍️' },
  { id: 'gpt-4-1-mini', name: 'GPT-4-1 Mini', provider: 'OpenAI', description: 'Optimized intelligence', icon: '⚡' },
  { id: 'gpt-4-1', name: 'GPT-4-1', provider: 'OpenAI', description: 'Premium flagship intelligence', icon: '🔥' },
];

export const DECISION_CATEGORIES = [
  'Financial Return',
  'Risk',
  'Learning Curve',
  'Long-Term Growth',
  'Personal Satisfaction',
  'Time Investment',
  'Scalability',
  'Stress Level',
  'Flexibility',
  'Opportunity Cost',
  'Market Demand',
  'Future Stability',
  'Lifestyle Impact',
  'AI Confidence',
] as const;

export type DecisionCategory = typeof DECISION_CATEGORIES[number];

export interface AnalysisState {
  step: 'idle' | 'input' | 'clarifying' | 'analyzing' | 'complete';
  analysisPhase: string;
  progress: number;
}

export const ANALYSIS_PHASES = [
  'Understanding context...',
  'Decomposing decision...',
  'Generating criteria...',
  'Modeling risks...',
  'Running simulations...',
  'Forecasting scenarios...',
  'Detecting biases...',
  'Scoring options...',
  'Generating report...',
];

export const USE_CASES = [
  { title: 'Startup vs Job', category: 'Career', icon: '🚀' },
  { title: 'MBA vs Masters Abroad', category: 'Education', icon: '🎓' },
  { title: 'React vs Flutter', category: 'Technology', icon: '⚡' },
  { title: 'AWS vs Azure', category: 'Infrastructure', icon: '☁️' },
  { title: 'Buy House vs Rent', category: 'Finance', icon: '🏠' },
  { title: 'Employee A vs Employee B', category: 'Hiring', icon: '👤' },
  { title: 'Marketing Strategy A vs B', category: 'Business', icon: '📊' },
  { title: 'Business Expansion', category: 'Strategy', icon: '🌍' },
  { title: 'Investment Decision', category: 'Finance', icon: '💰' },
  { title: 'Feature Prioritization', category: 'Product', icon: '🎯' },
  { title: 'Career Switch', category: 'Career', icon: '🔄' },
  { title: 'Choosing University', category: 'Education', icon: '🏛️' },
  { title: 'Choosing Tech Stack', category: 'Technology', icon: '🛠️' },
  { title: 'Policy Analysis', category: 'Government', icon: '⚖️' },
  { title: 'Treatment Comparison', category: 'Medical', icon: '🏥' },
];
