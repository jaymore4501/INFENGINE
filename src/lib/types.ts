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
  { title: 'Startup vs Job', category: 'Career' as const, icon: '🚀', description: 'Model cash flow, learning curves, and equity outcomes to evaluate your next career jump.' },
  { title: 'MBA vs Masters Abroad', category: 'Education' as const, icon: '🎓', description: 'Compare post-grad degrees, local network opportunities, costs, and career acceleration.' },
  { title: 'React vs Flutter', category: 'Technology' as const, icon: '⚡', description: "Determine the optimal frontend framework for your team's skills, dev speed, and platform needs." },
  { title: 'AWS vs Azure', category: 'Infrastructure' as const, icon: '☁️', description: 'Analyze cloud infrastructure cost, services catalog, vendor lock-in, and architecture flexibility.' },
  { title: 'Buy House vs Rent', category: 'Finance' as const, icon: '🏠', description: 'Evaluate financial returns, leverage, maintenance, lifestyle freedom, and market risks.' },
  { title: 'Employee A vs Employee B', category: 'Hiring' as const, icon: '👤', description: 'Objective evaluation of candidates across technical skills, culture, salary, and long-term fit.' },
  { title: 'Marketing Strategy A vs B', category: 'Business' as const, icon: '📊', description: 'Determine optimal channels, CAC vs LTV projections, launch speed, and operational strain.' },
  { title: 'Business Expansion', category: 'Strategy' as const, icon: '🌍', description: 'Score risk factors, regulatory steps, market size, and ROI for expansion opportunities.' },
  { title: 'Investment Decision', category: 'Finance' as const, icon: '💰', description: 'Compare assets based on historical yield, liquidity, risk tolerance, and tax efficiency.' },
  { title: 'Feature Prioritization', category: 'Product' as const, icon: '🎯', description: 'Rank product features using cost, developer hours, customer impact, and strategic alignment.' },
  { title: 'Career Switch', category: 'Career' as const, icon: '🔄', description: 'Assess timeline, salary change, upskilling investment, and long-term growth opportunities.' },
  { title: 'Choosing University', category: 'Education' as const, icon: '🏛️', description: 'Grade academic reputation, local costs, campus life, and post-grad placement statistics.' },
  { title: 'Choosing Tech Stack', category: 'Technology' as const, icon: '🛠️', description: 'Map tech debt, talent pool size, ecosystem support, and performance bottlenecks.' },
  { title: 'Policy Analysis', category: 'Government' as const, icon: '⚖️', description: 'Assess public impact, fiscal cost, administrative viability, and political risks.' },
  { title: 'Treatment Comparison', category: 'Medical' as const, icon: '🏥', description: 'Evaluate medical procedures based on success rate, recovery time, costs, and side effects.' },
];
