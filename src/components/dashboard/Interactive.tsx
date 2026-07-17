'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDecisionStore } from '@/lib/store';
import { SlidersHorizontal, Play, RotateCcw, Loader2, Send } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

// ===== SENSITIVITY ANALYSIS =====
export function SensitivityAnalysis({ result }: { result: AnalysisResult }) {
  const { sensitivityValues, setSensitivityValue } = useDecisionStore();

  const sliders = [
    { key: 'budget', label: 'Budget Priority', min: 0, max: 100, unit: '%' },
    { key: 'riskTolerance', label: 'Risk Tolerance', min: 0, max: 100, unit: '%' },
    { key: 'age', label: 'Age Factor', min: 18, max: 65, unit: 'yrs' },
    { key: 'timeHorizon', label: 'Time Horizon Weight', min: 0, max: 100, unit: '%' },
  ];

  // Calculate adjusted scores based on slider values
  const adjustedScores = result.options.map((opt) => {
    const baseScore = result.categoryScores.reduce((sum, cat) => sum + cat.scores[opt.id], 0) / result.categoryScores.length;
    const budgetFactor = (sensitivityValues.budget - 50) / 100;
    const riskFactor = (sensitivityValues.riskTolerance - 50) / 200;
    const adjusted = Math.min(100, Math.max(0, baseScore + budgetFactor * 10 + riskFactor * 5));
    return { name: opt.name, score: Math.round(adjusted) };
  });

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Sensitivity Analysis</h3>
      </div>
      <p className="text-xs text-text-muted mb-6">Move sliders to see how changing assumptions affects the recommendation</p>

      <div className="space-y-5">
        {sliders.map((slider) => {
          const value = sensitivityValues[slider.key] ?? 50;
          return (
            <div key={slider.key}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-text-secondary font-medium">{slider.label}</label>
                <span className="text-sm font-mono text-primary">
                  {value}{slider.unit}
                </span>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                value={value}
                onChange={(e) => setSensitivityValue(slider.key, parseInt(e.target.value))}
                className="w-full"
                style={{ '--range-progress': `${((value - slider.min) / (slider.max - slider.min)) * 100}%` } as React.CSSProperties}
              />
            </div>
          );
        })}
      </div>

      {/* Adjusted results */}
      <div className="mt-6 pt-5 border-t border-border">
        <h4 className="text-sm font-semibold text-text-secondary mb-3">Adjusted Scores</h4>
        <div className="space-y-3">
          {adjustedScores.map((item, i) => {
            const isWinner = item.score === Math.max(...adjustedScores.map((s) => s.score));
            return (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-sm font-medium ${isWinner ? 'text-primary' : 'text-text-muted'}`}>
                    {isWinner && '🏆 '}{item.name}
                  </span>
                  <span className="font-mono text-sm text-text-secondary">{item.score}/100</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: i === 0 ? '#FF6A2A' : '#60A5FA' }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===== SCENARIO PLAYGROUND =====
export function ScenarioPlayground({ result }: { result: AnalysisResult }) {
  const [query, setQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const presetScenarios = [
    'What if salary becomes 20% higher?',
    'What if the startup fails in year 1?',
    'What if tuition costs double?',
    'What if remote work becomes permanent?',
    'What if the market crashes?',
  ];

  const runSimulation = async (scenarioText: string) => {
    setIsSimulating(true);
    setQuery(scenarioText);

    // Simulate AI thinking
    await new Promise((r) => setTimeout(r, 1500));

    const optA = result.options[0]?.name || 'Option A';
    const optB = result.options[1]?.name || 'Option B';

    setSimResult(
      `**Impact Analysis for: "${scenarioText}"**\n\n` +
      `Under this scenario, ${optA} would be affected by approximately ±15-25% on financial dimensions, ` +
      `while ${optB} shows more resilience with only ±5-10% variance. ` +
      `The overall recommendation ${Math.random() > 0.3 ? 'remains unchanged' : 'shifts slightly'}, ` +
      `but risk-adjusted scores would update. Key affected criteria: Financial Return, Risk, Future Stability, and Opportunity Cost.`
    );
    setIsSimulating(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Play className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Scenario Playground</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">Ask &quot;what if&quot; questions and see how the analysis changes</p>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && query.trim() && runSimulation(query)}
          placeholder='e.g., "What if salary becomes 20% higher?"'
          className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 focus:border-primary/50 focus:outline-none transition-colors input-glow"
        />
        <button
          onClick={() => query.trim() && runSimulation(query)}
          disabled={!query.trim() || isSimulating}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {isSimulating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>

      {/* Preset scenarios */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presetScenarios.map((scenario) => (
          <button
            key={scenario}
            onClick={() => runSimulation(scenario)}
            className="text-[11px] text-text-muted border border-border rounded-lg px-2.5 py-1.5 hover:border-primary/30 hover:text-primary transition-all"
          >
            {scenario}
          </button>
        ))}
      </div>

      {/* Simulation result */}
      {isSimulating && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <span className="text-sm text-primary">Simulating scenario...</span>
        </div>
      )}

      {simResult && !isSimulating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-surface/50 p-4"
        >
          <p className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">{simResult}</p>
          <button
            onClick={() => { setSimResult(null); setQuery(''); }}
            className="mt-3 flex items-center gap-1.5 text-xs text-text-muted hover:text-primary transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Clear & try another
          </button>
        </motion.div>
      )}
    </div>
  );
}
