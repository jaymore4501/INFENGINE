'use client';

import { motion } from 'framer-motion';
import { AnalysisResult } from '@/lib/types';
import {
  Shield,
  Clock,
  MessageSquareWarning,
  Search,
  Link2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  ChevronDown,
  Eye,
  Lightbulb,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useState } from 'react';

// ===== RISK HEATMAP =====
export function RiskHeatmap({ result }: { result: AnalysisResult }) {
  const levelConfig = {
    low: { bg: 'risk-low', label: 'Low', icon: CheckCircle2 },
    medium: { bg: 'risk-medium', label: 'Medium', icon: AlertTriangle },
    high: { bg: 'risk-high', label: 'High', icon: AlertTriangle },
    critical: { bg: 'risk-critical', label: 'Critical', icon: XCircle },
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Risk Heatmap</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">Interactive risk assessment matrix with mitigation strategies</p>

      <div className="space-y-3">
        {result.risks.map((risk, i) => {
          const config = levelConfig[risk.level];
          const Icon = config.icon;
          return (
            <motion.div
              key={risk.factor}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <details className="group">
                <summary className={`flex items-center gap-3 rounded-lg px-4 py-3 cursor-pointer ${config.bg} transition-all`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1">{risk.factor}</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">{config.label}</span>
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180 opacity-50" />
                </summary>
                <div className="mt-2 ml-4 pl-7 border-l border-border space-y-2 pb-2">
                  <p className="text-sm text-text-secondary">{risk.description}</p>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-3.5 w-3.5 text-warning mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-text-muted"><strong className="text-warning">Mitigation:</strong> {risk.mitigation}</p>
                  </div>
                </div>
              </details>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ===== FUTURE TIMELINE =====
export function FutureTimeline({ result }: { result: AnalysisResult }) {
  const [selectedOption, setSelectedOption] = useState(result.options[0]?.id || '');

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Future Timeline</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">Projected outcomes from 6 months to 10 years</p>

      {/* Option selector */}
      <div className="flex gap-2 mb-6">
        {result.options.map((o, i) => (
          <button
            key={o.id}
            onClick={() => setSelectedOption(o.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedOption === o.id
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'bg-surface text-text-muted border border-border hover:border-border-hover'
            }`}
          >
            {o.name}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
        <div className="space-y-6">
          {result.timeline.map((t, i) => (
            <motion.div
              key={t.period}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-10"
            >
              <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
              <div className="rounded-lg border border-border bg-surface/50 p-4">
                <span className="text-xs font-mono text-primary font-semibold">{t.period}</span>
                <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                  {t.outcomes[selectedOption] || 'No data available for this option.'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== DEVIL'S ADVOCATE =====
export function DevilsAdvocatePanel({ result }: { result: AnalysisResult }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <MessageSquareWarning className="h-5 w-5 text-danger" />
        <h3 className="font-heading text-lg font-semibold">Devil&apos;s Advocate</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">
        Arguments <strong className="text-danger">against</strong> the recommended option: {result.devilsAdvocate.againstOption}
      </p>

      <div className="space-y-3 mb-6">
        {result.devilsAdvocate.arguments.map((arg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-3 rounded-lg bg-danger/5 border border-danger/10 px-4 py-3"
          >
            <XCircle className="h-4 w-4 text-danger flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary">{arg}</p>
          </motion.div>
        ))}
      </div>

      <h4 className="text-sm font-semibold text-success mb-3 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4" />
        Counter-Points
      </h4>
      <div className="space-y-2">
        {result.devilsAdvocate.counterPoints.map((cp, i) => (
          <div key={i} className="flex gap-3 rounded-lg bg-success/5 border border-success/10 px-4 py-3">
            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary">{cp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== BIAS DETECTOR =====
export function BiasDetectorPanel({ result }: { result: AnalysisResult }) {
  const severityColors = {
    low: 'text-success border-success/20 bg-success/5',
    medium: 'text-warning border-warning/20 bg-warning/5',
    high: 'text-danger border-danger/20 bg-danger/5',
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Search className="h-5 w-5 text-warning" />
        <h3 className="font-heading text-lg font-semibold">Bias Detection</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">Cognitive biases that may affect your decision-making</p>

      <div className="space-y-3">
        {result.biases.map((bias, i) => (
          <motion.div
            key={bias.biasType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <details className="group">
              <summary className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer ${severityColors[bias.severity]} transition-all`}>
                <Eye className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium flex-1">{bias.biasType}</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">{bias.severity}</span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180 opacity-50" />
              </summary>
              <div className="mt-2 ml-4 pl-7 border-l border-border space-y-2 pb-2">
                <p className="text-sm text-text-secondary">{bias.description}</p>
                <div className="flex items-start gap-2">
                  <Info className="h-3.5 w-3.5 text-info mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-text-muted">{bias.recommendation}</p>
                </div>
              </div>
            </details>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ===== AI REASONING PANEL =====
export function ReasoningPanel({ result }: { result: AnalysisResult }) {
  const sections = [
    { title: 'Key Reasons', items: result.reasoning.mainReasons, icon: TrendingUp, color: 'text-primary' },
    { title: 'Trade-offs', items: result.reasoning.tradeoffs, icon: AlertTriangle, color: 'text-warning' },
    { title: 'Hidden Costs', items: result.reasoning.hiddenCosts, icon: Eye, color: 'text-danger' },
    { title: 'Long-Term Effects', items: result.reasoning.longTermEffects, icon: Clock, color: 'text-info' },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">AI Reasoning</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">Structured reasoning behind the recommendation</p>

      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title}>
              <div className={`flex items-center gap-2 mb-3 ${section.color}`}>
                <Icon className="h-4 w-4" />
                <h4 className="text-sm font-semibold">{section.title}</h4>
              </div>
              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3 pl-2"
                  >
                    <div className="mt-2 h-1 w-1 rounded-full bg-text-muted flex-shrink-0" />
                    <p className="text-sm text-text-secondary leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== EVIDENCE ENGINE =====
export function EvidencePanel({ result }: { result: AnalysisResult }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Link2 className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Evidence Engine</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">Linked reasoning chains — no black-box AI</p>

      <div className="space-y-4">
        {result.evidenceChain.map((evidence, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg border border-border bg-surface/50 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-text-primary">{evidence.claim}</h4>
              <span className="text-xs font-mono text-primary bg-primary/10 rounded px-2 py-0.5">
                {evidence.confidence}% confident
              </span>
            </div>
            <p className="text-sm text-text-muted mb-3">{evidence.reasoning}</p>
            <div className="flex flex-wrap gap-1.5">
              {evidence.factors.map((factor) => (
                <span key={factor} className="text-[10px] text-text-muted bg-surface rounded px-2 py-0.5 border border-border">
                  {factor}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ===== SCENARIO SIMULATIONS =====
export function ScenarioSimulations({ result }: { result: AnalysisResult }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Scenario Simulations</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">How outcomes change under different conditions</p>

      <div className="space-y-4">
        {result.scenarioSimulations.map((sim, i) => (
          <motion.div
            key={sim.scenario}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg border border-border bg-surface/50 p-4"
          >
            <h4 className="text-sm font-semibold text-text-primary mb-3">{sim.scenario}</h4>
            <div className="space-y-2">
              {result.options.map((opt) => {
                const impact = sim.impact[opt.id];
                if (!impact) return null;
                const isPositive = impact.change >= 0;
                return (
                  <div key={opt.id} className="flex items-start gap-3">
                    <div className={`flex items-center gap-1 min-w-[60px] ${isPositive ? 'text-success' : 'text-danger'}`}>
                      {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                      <span className="text-xs font-mono font-semibold">{isPositive ? '+' : ''}{impact.change}%</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-text-secondary">{opt.name}:</span>
                      <span className="text-xs text-text-muted ml-1">{impact.explanation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ===== DECISION MATRIX =====
export function DecisionMatrix({ result }: { result: AnalysisResult }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
      <h3 className="font-heading text-lg font-semibold mb-1">Decision Matrix</h3>
      <p className="text-xs text-text-muted mb-4">Complete scoring table across all dimensions</p>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-3 text-text-muted font-medium text-xs">Criteria</th>
            <th className="text-left py-3 px-3 text-text-muted font-medium text-xs">Weight</th>
            {result.options.map((o) => (
              <th key={o.id} className="text-center py-3 px-3 text-text-muted font-medium text-xs">{o.name}</th>
            ))}
            <th className="text-center py-3 px-3 text-text-muted font-medium text-xs">Winner</th>
          </tr>
        </thead>
        <tbody>
          {result.categoryScores.map((cat, i) => {
            const scores = result.options.map((o) => ({ id: o.id, name: o.name, score: cat.scores[o.id] }));
            const maxScore = Math.max(...scores.map((s) => s.score));
            const winner = scores.find((s) => s.score === maxScore);
            return (
              <motion.tr
                key={cat.category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 hover:bg-surface/30 transition-colors"
              >
                <td className="py-2.5 px-3 text-text-secondary text-xs">{cat.category}</td>
                <td className="py-2.5 px-3 font-mono text-xs text-text-muted">{cat.weight.toFixed(1)}</td>
                {scores.map((s) => (
                  <td key={s.id} className="py-2.5 px-3 text-center">
                    <span className={`font-mono text-xs ${s.score === maxScore ? 'text-primary font-bold' : 'text-text-muted'}`}>
                      {s.score}
                    </span>
                  </td>
                ))}
                <td className="py-2.5 px-3 text-center text-xs text-primary font-medium">{winner?.name.slice(0, 12)}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
