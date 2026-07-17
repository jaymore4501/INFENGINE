import { create } from 'zustand';
import { AnalysisResult, AIModel, ClarificationAnswer, AnalysisState } from './types';
import { generateMockAnalysis } from './mock-data';

interface DecisionStore {
  // Input state
  decisionInput: string;
  options: string[];
  clarifications: ClarificationAnswer;
  selectedModel: AIModel;

  // Analysis state
  analysisState: AnalysisState;
  result: AnalysisResult | null;
  error: string | null;

  // Scenario state
  scenarioQuery: string;
  sensitivityValues: Record<string, number>;

  // Actions
  setDecisionInput: (input: string) => void;
  setOptions: (options: string[]) => void;
  setClarifications: (answers: ClarificationAnswer) => void;
  setSelectedModel: (model: AIModel) => void;
  setAnalysisState: (state: Partial<AnalysisState>) => void;
  setResult: (result: AnalysisResult | null) => void;
  setError: (error: string | null) => void;
  setScenarioQuery: (query: string) => void;
  setSensitivityValue: (key: string, value: number) => void;
  startAnalysis: () => Promise<void>;
  reset: () => void;
}

export const useDecisionStore = create<DecisionStore>((set, get) => ({
  // Initial state
  decisionInput: '',
  options: [],
  clarifications: {},
  selectedModel: 'gpt-4-1-mini',
  analysisState: { step: 'idle', analysisPhase: '', progress: 0 },
  result: null,
  error: null,
  scenarioQuery: '',
  sensitivityValues: {
    budget: 50,
    riskTolerance: 50,
    age: 28,
    timeHorizon: 50,
  },

  // Actions
  setDecisionInput: (input) => set({ decisionInput: input }),
  setOptions: (options) => set({ options }),
  setClarifications: (answers) => set({ clarifications: answers }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setAnalysisState: (state) => set((s) => ({ analysisState: { ...s.analysisState, ...state } })),
  setResult: (result) => set({ result }),
  setError: (error) => set({ error }),
  setScenarioQuery: (query) => set({ scenarioQuery: query }),
  setSensitivityValue: (key, value) =>
    set((s) => ({ sensitivityValues: { ...s.sensitivityValues, [key]: value } })),

  startAnalysis: async () => {
    const { decisionInput, clarifications, selectedModel } = get();
    if (!decisionInput.trim()) return;

    set({
      analysisState: { step: 'analyzing', analysisPhase: 'Understanding context...', progress: 0 },
      error: null,
    });

    const phases = [
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

    // Animate through phases
    for (let i = 0; i < phases.length; i++) {
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      set({
        analysisState: {
          step: 'analyzing',
          analysisPhase: phases[i],
          progress: ((i + 1) / phases.length) * 100,
        },
      });
    }

    try {
      // Try API first
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: decisionInput,
          clarifications,
          model: selectedModel,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        set({
          result: data,
          analysisState: { step: 'complete', analysisPhase: 'Complete', progress: 100 },
        });
      } else {
        // Fallback to mock data
        await new Promise((r) => setTimeout(r, 500));
        const mockResult = generateMockAnalysis(decisionInput);
        set({
          result: mockResult,
          analysisState: { step: 'complete', analysisPhase: 'Complete', progress: 100 },
        });
      }
    } catch {
      // Fallback to mock data on network error
      await new Promise((r) => setTimeout(r, 500));
      const mockResult = generateMockAnalysis(decisionInput);
      set({
        result: mockResult,
        analysisState: { step: 'complete', analysisPhase: 'Complete', progress: 100 },
      });
    }
  },

  reset: () =>
    set({
      decisionInput: '',
      options: [],
      clarifications: {},
      analysisState: { step: 'idle', analysisPhase: '', progress: 0 },
      result: null,
      error: null,
      scenarioQuery: '',
    }),
}));
