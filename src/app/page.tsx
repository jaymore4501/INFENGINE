'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDecisionStore } from '@/lib/store';
import { USE_CASES, AI_MODELS, AIModel, ANALYSIS_PHASES } from '@/lib/types';
import {
  Brain,
  Sparkles,
  ArrowRight,
  GitBranch,
  Clock,
  Shield,
  MessageSquareWarning,
  Search,
  SlidersHorizontal,
  Gauge,
  Link2,
  BarChart3,
  Zap,
  Target,
  TrendingUp,
  ChevronRight,
  Play,
  Loader2,
  CheckCircle2,
  Paperclip,
  ChevronDown,
  Check,
  Sliders,
  Sparkle,
  Briefcase,
  GraduationCap,
  Code,
  Cloud,
  Home,
  Users,
  Megaphone,
  Globe,
  Coins,
  ListTodo,
  RefreshCw,
  School,
  Cpu,
  Scale,
  HeartPulse,
  Terminal,
  Database,
  Layers,
} from 'lucide-react';

// Brand icons matching the reference style
const OpenAIIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={`${className} text-emerald-500 fill-current`} viewBox="0 0 24 24">
    <path d="M21.3,10.1c0.1-0.6,0.1-1.2-0.2-1.7c-0.4-0.8-1.2-1.3-2.1-1.3c-0.3,0-0.5,0.1-0.8,0.2c-0.3-0.7-0.9-1.3-1.7-1.6 c-0.8-0.3-1.7-0.2-2.4,0.3c-0.4-0.5-1-0.9-1.7-1c-0.7-0.1-1.5,0.1-2.1,0.5C9.9,5.2,9.5,4.7,8.9,4.4C8.2,4.1,7.4,4.2,6.8,4.5 C6.5,4.4,6.2,4.3,5.9,4.3C5,4.3,4.2,4.8,3.8,5.6C3.5,6.1,3.5,6.7,3.6,7.3C3,7.6,2.5,8.1,2.2,8.9C1.9,9.6,1.9,10.4,2.3,11.1 c-0.4,0.4-0.6,1-0.6,1.6c0,0.9,0.5,1.7,1.3,2.1c0.3,0.1,0.5,0.2,0.8,0.2c0.3,0.7,0.9,1.3,1.7,1.6c0.6,0.2,1.2,0.2,1.8-0.1 c0.4,0.5,1,0.9,1.7,1c0.7,0.1,1.5-0.1,2.1-0.5c0.4,0.3,0.8,0.8,1.4,1.1c0.7,0.3,1.5,0.2,2.1-0.1c0.3,0.1,0.6,0.2,0.9,0.2 c0.9,0,1.7-0.5,2.1-1.3c0.3-0.5,0.3-1.1,0.2-1.7c0.6-0.3,1.1-0.8,1.4-1.6c0.3-0.7,0.3-1.5-0.1-2.2c0.4-0.4,0.6-1,0.6-1.6 C21.9,11.1,21.6,10.5,21.3,10.1z M17.4,8.5c0.1,0.1,0.1,0.3,0.1,0.4v2.7l-2.4,1.4c-0.2,0.1-0.4,0.1-0.6,0l-2.4-1.4v-2.7 c0-0.2,0.1-0.4,0.3-0.5l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0L17.4,8.5z M8.8,10.1c0,0.2-0.1,0.4-0.3,0.5L6.1,12c-0.2,0.1-0.4,0.1-0.6,0 l-2.4-1.4C3,10.5,2.9,10.3,2.9,10.1v-2.7l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0l2.4,1.4c0.2,0.1,0.3,0.3,0.3,0.5V10.1z M11.7,15.1 c0,0.2-0.1,0.4-0.3,0.5l-2.4,1.4c-0.2,0.1-0.4,0.1-0.6,0L6,15.6c-0.2-0.1-0.3-0.3-0.3-0.5v-2.7l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0 l2.4,1.4c0.2,0.1,0.3,0.3,0.3,0.5V15.1z M14.6,12.5L12,14l-2.6-1.5v-3L12,8l2.6,1.5V12.5z M14.6,18.4L12,19.9l-2.6-1.5v-2.7 c0-0.2,0.1-0.4,0.3-0.5l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0l2.4,1.4c0.2,0.1,0.3,0.3,0.3,0.5V18.4z M20.9,13.9L18.5,15.3 c-0.2,0.1-0.4,0.1-0.6,0l-2.4-1.4v-2.7c0-0.2,0.1-0.4,0.3-0.5l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0l2.4,1.4c0.2,0.1,0.3,0.3,0.3,0.5 V13.9z" />
  </svg>
);

const GeminiIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={`${className} text-blue-400 fill-current`} viewBox="0 0 24 24">
    <path d="M12,2L14.7,9.3L22,12L14.7,14.7L12,22L9.3,14.7L2,12L9.3,9.3L12,2Z" />
  </svg>
);

const ClaudeIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={`${className} text-orange-400 fill-current`} viewBox="0 0 24 24">
    <path d="M12,2C10.9,2 10,2.9 10,4C10,5.1 10.9,6 12,6C13.1,6 14,5.1 14,4C14,2.9 13.1,2 12,2M12,18C10.9,18 10,18.9 10,20C10,21.1 10.9,22 12,22C13.1,22 14,21.1 14,20C14,18.9 13.1,18 12,18M4,10C2.9,10 2,10.9 2,12C2,13.1 2.9,14 4,14C5.1,14 6,13.1 6,12C6,10.9 5.1,10 4,10M20,10C18.9,10 18,10.9 18,12C18,13.1 18.9,14 20,14C21.1,14 22,13.1 22,12C22,10.9 21.1,10 20,10M6.4,6.4C5.6,7.2 5.6,8.5 6.4,9.3C7.2,10.1 8.5,10.1 9.3,9.3C10.1,8.5 10.1,7.2 9.3,6.4C8.5,5.6 7.2,5.6 6.4,6.4M14.7,14.7C13.9,15.5 13.9,16.8 14.7,17.6C15.5,18.4 16.8,18.4 17.6,17.6C18.4,16.8 18.4,15.5 17.6,14.7C16.8,13.9 15.5,13.9 14.7,14.7M6.4,17.6C7.2,18.4 8.5,18.4 9.3,17.6C10.1,16.8 10.1,15.5 9.3,14.7C8.5,13.9 7.2,13.9 6.4,14.7C5.6,15.5 5.6,16.8 6.4,17.6M17.6,6.4C16.8,5.6 15.5,5.6 14.7,6.4C13.9,7.2 13.9,8.5 14.7,9.3C15.5,10.1 16.8,10.1 17.6,9.3C18.4,8.5 18.4,7.2 17.6,6.4Z" />
  </svg>
);

const getModelBrandIcon = (modelId: AIModel) => {
  if (modelId.includes('gemini')) return <GeminiIcon />;
  if (modelId.includes('claude')) return <ClaudeIcon />;
  return <OpenAIIcon />;
};

interface LiveComputationsProps {
  phaseId: string;
  optionA: string;
  optionB: string;
}

function LiveComputations({ phaseId, optionA, optionB }: LiveComputationsProps) {
  switch (phaseId) {
    case 'context':
      return (
        <div className="space-y-3.5 font-mono text-[10px] text-text-secondary leading-relaxed">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex justify-between border-b border-border/30 pb-1.5">
            <span className="text-primary font-semibold">[NLP_PARSER_ACTIVE]</span>
            <span className="text-success font-bold">READY</span>
          </motion.div>
          <div className="space-y-1 bg-surface/30 p-2.5 rounded-lg border border-border/50">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-text-muted">
              &gt; Initializing tokenization pipeline... Done.
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-primary/95">
              &gt; Identified target vectors:
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-text-primary pl-3">
              - Option A: &quot;{optionA}&quot;
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-text-primary pl-3">
              - Option B: &quot;{optionB}&quot;
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="flex justify-between items-center text-[10px]">
            <span>Semantic parsing confidence:</span>
            <span className="font-bold text-primary">98.4%</span>
          </motion.div>
        </div>
      );
    case 'decomposition':
      return (
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-border bg-surface/40 p-4 flex flex-col justify-between h-[130px]"
          >
            <div>
              <div className="text-[9px] font-mono text-text-muted uppercase tracking-wider">Option A Vector</div>
              <div className="text-xs font-bold text-text-primary mt-2 line-clamp-2 leading-relaxed">{optionA}</div>
            </div>
            <div className="text-[9px] font-mono text-primary flex items-center gap-1.5 border-t border-border/20 pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Vector mapping: ACTIVE
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-surface/40 p-4 flex flex-col justify-between h-[130px]"
          >
            <div>
              <div className="text-[9px] font-mono text-text-muted uppercase tracking-wider">Option B Vector</div>
              <div className="text-xs font-bold text-text-primary mt-2 line-clamp-2 leading-relaxed">{optionB}</div>
            </div>
            <div className="text-[9px] font-mono text-primary flex items-center gap-1.5 border-t border-border/20 pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Vector mapping: ACTIVE
            </div>
          </motion.div>
        </div>
      );
    case 'criteria':
      const criteriaList = ['Financial Return', 'Risk Exposure', 'Personal Satisfaction', 'Long-Term Growth', 'Stress Level', 'Flexibility'];
      return (
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          {criteriaList.map((crit, idx) => (
            <motion.div
              key={crit}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-lg border border-border bg-surface/20 p-2.5 flex flex-col justify-between h-14"
            >
              <span className="text-text-muted truncate text-[9px] uppercase tracking-wider">{crit}</span>
              <div className="flex items-center justify-between mt-1 gap-2">
                <span className="text-primary font-bold">W: {(1.5 - idx * 0.15).toFixed(1)}</span>
                <div className="flex-1 h-1 bg-border/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(1.5 - idx * 0.15) * 60}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.08 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    case 'risks':
      const riskFactors = [
        { name: 'Financial Volatility', code: 'FIN-V' },
        { name: 'Opportunity Cost', code: 'OPP-C' },
        { name: 'Reversibility Lock', code: 'REV-L' },
      ];
      return (
        <div className="space-y-2.5 font-mono text-[10px]">
          <div className="text-[9px] text-text-muted uppercase tracking-wider border-b border-border/30 pb-1.5">[RISK_VECTOR_MAP]</div>
          {riskFactors.map((rf, idx) => (
            <div key={rf.name} className="flex items-center justify-between border border-border bg-surface/30 rounded-lg p-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-bold">{rf.code}</span>
                <span className="text-text-primary">{rf.name}</span>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.15 }}
                className={`font-bold text-[9px] px-1.5 py-0.5 rounded ${
                  idx === 0 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : idx === 1 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}
              >
                {idx === 0 ? 'CRITICAL' : idx === 1 ? 'HIGH' : 'MEDIUM'}
              </motion.span>
            </div>
          ))}
        </div>
      );
    case 'simulations':
      return (
        <div className="space-y-3 font-mono">
          <div className="flex justify-between items-center text-[10px] text-text-secondary border-b border-border/30 pb-1.5">
            <span>[STOCHASTIC_PATHWAYS_SOLVER]</span>
            <span className="text-primary font-bold">10,000 RUNS COMPLETE</span>
          </div>
          <div className="h-[90px] bg-surface/30 border border-border rounded-xl relative overflow-hidden flex items-end p-2">
            <svg className="w-full h-full text-primary" viewBox="0 0 100 30" preserveAspectRatio="none">
              <motion.path
                d="M0,25 Q15,5 30,18 T60,8 T90,22 T100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              <motion.path
                d="M0,25 Q20,20 40,28 T70,12 T90,26 T100,15"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="2,2"
                className="opacity-40"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
            </svg>
            <div className="absolute top-2 right-2 text-[9px] text-text-muted bg-card/60 backdrop-blur-md px-1.5 py-0.5 rounded border border-border/30">
              Mean Variance: 0.04
            </div>
          </div>
          <div className="flex justify-between text-[9px] text-text-muted">
            <span>0 ms</span>
            <span>Running Monte Carlo iterations...</span>
            <span>120 ms</span>
          </div>
        </div>
      );
    case 'scenarios':
      return (
        <div className="space-y-3.5 font-mono text-[10px]">
          <div className="text-[9px] text-text-muted uppercase tracking-wider border-b border-border/30 pb-1.5">[STRESS_TEST_PROJECTIONS]</div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span>Best Case Scenario</span>
              <span className="text-success font-bold">+30.0%</span>
            </div>
            <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                className="h-full bg-success rounded-full"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span>Expected Case Baseline</span>
              <span className="text-primary font-bold">+0.0%</span>
            </div>
            <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span>Worst Case Drawdown</span>
              <span className="text-red-400 font-bold">-40.0%</span>
            </div>
            <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '20%' }}
                className="h-full bg-red-400 rounded-full"
              />
            </div>
          </div>
        </div>
      );
    case 'biases':
      const biases = ['Confirmation Bias', 'Loss Aversion', 'Status Quo Bias', 'Overconfidence Anchoring'];
      return (
        <div className="space-y-2.5 font-mono text-[10px]">
          <div className="text-[9px] text-text-muted uppercase tracking-wider border-b border-border/30 pb-1.5">[COGNITIVE_BIAS_AUDIT]</div>
          {biases.map((bias, idx) => (
            <motion.div
              key={bias}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.12 }}
              className="flex justify-between items-center border-b border-border/30 pb-1.5"
            >
              <span className="text-text-primary">{bias}</span>
              <span className={`font-bold text-[9px] px-1 rounded ${
                idx === 1 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : idx === 3 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-success/10 text-success border border-success/20'
              }`}>
                {idx === 1 ? 'FLAG_ALERT' : idx === 3 ? 'WARM_NOTICE' : 'AUDITED_SAFE'}
              </span>
            </motion.div>
          ))}
        </div>
      );
    case 'scoring':
      return (
        <div className="space-y-4 font-mono text-[11px]">
          <div className="flex justify-between items-center text-[10px] text-text-secondary border-b border-border/30 pb-1.5">
            <span>[PREFERENCE_SYNTHESIS_ENGINE]</span>
            <span className="text-primary font-bold">14 VECTORS INTEGRATED</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-text-primary font-bold mb-1">
                <span className="truncate max-w-[80%]">{optionA}</span>
                <span>87%</span>
              </div>
              <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '87%' }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-text-secondary mb-1">
                <span className="truncate max-w-[80%]">{optionB}</span>
                <span>63%</span>
              </div>
              <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '63%' }}
                  className="h-full bg-border rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      );
    case 'report':
      return (
        <div className="space-y-3 font-mono text-[10px] text-text-secondary">
          <div className="text-[9px] text-text-muted uppercase tracking-wider border-b border-border/30 pb-1.5">[REPORT_COMPILER_PUBLISH]</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span>Generating core decision rationales... Done.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span>Compiling Monte Carlo projections... Done.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-text-primary">Publishing final PDF document package...</span>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-border/20">
            <div className="h-1.5 w-full bg-border/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: '90%' }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

// ===== AI THINKING ANIMATION =====
function AIThinkingAnimation() {
  const { analysisState, decisionInput } = useDecisionStore();
  const phases = [
    { id: 'context', label: 'Context Understanding', agent: 'Context Decomposition Analyst', module: 'NLP-01' },
    { id: 'decomposition', label: 'Decision Decomposition', agent: 'Decision Logic Engineer', module: 'OVM-02' },
    { id: 'criteria', label: 'Criteria Alignment', agent: 'Heuristics Engine', module: 'HMG-03' },
    { id: 'risks', label: 'Risk Assessment', agent: 'Risk & Volatility Forecaster', module: 'VF-04' },
    { id: 'simulations', label: 'Monte Carlo Simulation', agent: 'Monte Carlo Core', module: 'SPS-05' },
    { id: 'scenarios', label: 'Scenario Forecasting', agent: 'Scenario Model Analyst', module: 'MSE-06' },
    { id: 'biases', label: 'Cognitive Bias Audit', agent: 'Cognitive Audit Engine', module: 'BBD-07' },
    { id: 'scoring', label: 'Preference Scoring', agent: 'Synthesis & Weighting Engine', module: 'MCE-08' },
    { id: 'report', label: 'Executive Report Synthesis', agent: 'Executive Summary Publisher', module: 'RCE-09' },
  ];

  const currentIdx = Math.max(0, ANALYSIS_PHASES.indexOf(analysisState.analysisPhase));


  // Extract clean options for presentation
  const vsPatterns = [/\s+(?:vs\.?|versus|or)\s+/i];
  let optionA = 'Option A';
  let optionB = 'Option B';
  const cleanDecision = decisionInput.replace(/[?.\s]+$/, '');
  for (const pattern of vsPatterns) {
    const parts = cleanDecision.split(pattern);
    if (parts.length >= 2) {
      optionA = parts[0].replace(/^(?:what\s+should\s+i\s+do\s+)?(?:what\s+should\s+i\s+)?(?:should\s+i\s+)?(?:do\s+i\s+)?(?:choose\s+between\s+)?(?:choose\s+)?(?:decide\s+between\s+)?(?:decide\s+)?(?:whether\s+to\s+)?(?:whether\s+)?/i, '').trim();
      optionB = parts.slice(1).join(' or ').trim();
      if (optionA) optionA = optionA[0].toUpperCase() + optionA.slice(1);
      if (optionB) optionB = optionB[0].toUpperCase() + optionB.slice(1);
      break;
    }
  }

  const activePhase = phases[currentIdx] || phases[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl px-6 py-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sequential Analyst Pipeline Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border-b border-border/50 pb-3 mb-6">
            <h3 className="font-heading text-lg font-bold text-text-primary">Analyst Pipeline</h3>
            <p className="text-xs text-text-muted mt-1 leading-normal font-mono uppercase tracking-wider">Sequence: Active Reasoning Engine</p>
          </div>
          <div className="relative border-l border-border/50 pl-5 ml-2.5 space-y-6">
            {phases.map((phase, i) => {
              const isDone = i < currentIdx;
              const isCurrent = i === currentIdx;
              return (
                <div key={phase.id} className="relative flex items-center justify-between group">
                  {/* Timeline indicator node */}
                  <div className={`absolute -left-[26px] h-3 w-3 rounded-full border transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-primary border-primary scale-125 orange-glow-sm' 
                      : isDone 
                        ? 'bg-success border-success' 
                        : 'bg-background border-border/80'
                  }`} />
                  
                  <div className="flex flex-col">
                    <span className={`text-xs font-semibold font-heading transition-colors ${
                      isCurrent 
                        ? 'text-primary' 
                        : isDone 
                          ? 'text-success' 
                          : 'text-text-muted/40'
                    }`}>
                      {phase.label}
                    </span>
                    <span className="text-[9px] font-mono text-text-muted/40 uppercase tracking-wider mt-0.5">{phase.module} // {phase.agent}</span>
                  </div>

                  {isCurrent && (
                    <motion.div
                      className="flex gap-1"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Premium Active Analyst Terminal Display */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-card/40 backdrop-blur-md p-6 orange-glow relative overflow-hidden"
            >
              {/* Scanline background overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent bg-[size:100%_4px] bg-[repeat:repeat] opacity-60" />
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Terminal className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{activePhase.module} // ACTIVE_COMPILATION</span>
                    <span className="text-xs font-bold font-heading text-text-primary mt-0.5">{activePhase.agent}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono bg-primary/5 text-primary border border-primary/20 px-2 py-1 rounded">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  COMPUTING
                </div>
              </div>

              {/* Computations Area */}
              <div className="min-h-[140px] flex flex-col justify-center">
                <LiveComputations phaseId={activePhase.id} optionA={optionA} optionB={optionB} />
              </div>

              {/* Card Footer: Progress and Metric */}
              <div className="border-t border-border/50 pt-4 mt-5 flex items-center justify-between text-[9px] font-mono text-text-muted uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span>Job progress:</span>
                  <span className="font-bold text-text-primary">{Math.round(analysisState.progress)}%</span>
                </div>
                <div>
                  <span>SYS_LOG: EST_TIME_REMAINING // {(10 - Math.round(analysisState.progress * 0.1))}s</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ===== HERO SECTION WITH INTEGRATED DROPDOWN & TEXTAREA =====
function HeroSection() {
  const router = useRouter();
  const {
    decisionInput,
    setDecisionInput,
    selectedModel,
    setSelectedModel,
    clarifications,
    setClarifications,
    startAnalysis,
    analysisState,
    result,
  } = useDecisionStore();

  const [inputLocal, setInputLocal] = useState(decisionInput);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showParams, setShowParams] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Update store input value
  useEffect(() => {
    setDecisionInput(inputLocal);
  }, [inputLocal, setDecisionInput]);

  // Sync internal local state with store state changes (from useCase clicks)
  useEffect(() => {
    setInputLocal(decisionInput);
  }, [decisionInput]);

  const handleAnalyze = async () => {
    if (!inputLocal.trim()) return;
    await startAnalysis();
    router.push('/results');
  };

  const currentModelConfig = AI_MODELS.find((m) => m.id === selectedModel) || AI_MODELS[0];

  const parameters = [
    { key: 'budget', label: 'Budget Range', type: 'select', options: ['< $10K', '$10K - $50K', '$50K - $100K', '$100K+', 'Not Applicable'] },
    { key: 'age', label: 'Age Range', type: 'select', options: ['18-24', '25-30', '31-40', '41-50', '50+'] },
    { key: 'country', label: 'Country / Region', type: 'text', placeholder: 'e.g., USA, India, UK' },
    { key: 'experience', label: 'Experience Level', type: 'select', options: ['Student', 'Junior (0-2 yrs)', 'Mid (3-5 yrs)', 'Senior (5-10 yrs)', 'Expert (10+ yrs)'] },
    { key: 'timeline', label: 'Decision Timeline', type: 'select', options: ['Immediate', '1-3 months', '3-6 months', '6-12 months', '1+ year'] },
    { key: 'goals', label: 'Primary Goals', type: 'text', placeholder: 'e.g., Financial growth, lifestyle quality' },
  ];

  if (analysisState.step === 'analyzing') {
    return <AIThinkingAnimation />;
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-16">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8"
        >
          <Sparkle className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary font-heading">AI-Powered Decision Intelligence</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6"
        >
          Transform Complex <span className="gradient-text">Decisions</span>
          <br />
          Into Confident <span className="gradient-text">Actions</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-text-muted max-w-xl mx-auto mb-10 leading-relaxed font-body"
        >
          INFENGINE decomposes your queries across 14 evaluation criteria, visualizes risk matrices, predicts timelines, and computes structured recommendations.
        </motion.p>

        {/* Premium Textarea Workspace Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-left w-full"
        >
          {/* Main Input Box */}
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-4 orange-glow-sm transition-all focus-within:border-primary/40 focus-within:orange-glow">
            <textarea
              ref={textareaRef}
              value={inputLocal}
              onChange={(e) => setInputLocal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAnalyze())}
              placeholder="What can I do for you?"
              rows={2}
              className="w-full bg-transparent border-none text-base text-text-primary placeholder:text-text-muted/40 focus:outline-none resize-none font-body leading-relaxed mb-4"
              id="landing-decision-textarea"
            />

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-3">
                {/* Custom Dropdown Trigger */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                    className="flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-2 text-xs font-semibold text-text-secondary hover:border-border-hover hover:text-text-primary transition-all active:scale-95"
                  >
                    {getModelBrandIcon(selectedModel)}
                    <span>{currentModelConfig.name}</span>
                    <ChevronDown className="h-3 w-3 text-text-muted group-hover:text-text-primary transition-transform" />
                  </button>

                  {/* Dropdown Options */}
                  <AnimatePresence>
                    {showModelDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-0 mb-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 overflow-hidden"
                      >
                        {AI_MODELS.map((model) => {
                          const isSelected = selectedModel === model.id;
                          return (
                            <button
                              key={model.id}
                              onClick={() => {
                                setSelectedModel(model.id);
                                setShowModelDropdown(false);
                              }}
                              className={`flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-colors ${isSelected
                                ? 'bg-primary/10 text-primary'
                                : 'text-text-muted hover:text-text-primary hover:bg-surface/50'
                                }`}
                            >
                              <div className="flex items-center gap-2.5">
                                {getModelBrandIcon(model.id)}
                                <span>{model.name}</span>
                              </div>
                              {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Separator */}
                <div className="h-4 w-px bg-border/80" />

                {/* Paperclip Visual Button */}
                <button
                  onClick={() => setShowParams(!showParams)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 ${showParams
                    ? 'border-primary/40 bg-primary/15 text-primary'
                    : 'border-border bg-surface/50 text-text-muted hover:border-border-hover hover:text-text-primary'
                    }`}
                  title="Configure Parameters"
                >
                  <Sliders className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Submit Action Arrow */}
              <button
                onClick={handleAnalyze}
                disabled={!inputLocal.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 disabled:opacity-30 disabled:hover:shadow-none transition-all active:scale-95"
                id="landing-submit-button"
              >
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Collapsible advanced details parameters */}
          <AnimatePresence>
            {showParams && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-3"
              >
                <div className="rounded-xl border border-border bg-card/40 p-4 space-y-4">
                  {/* Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-text-secondary font-medium">Risk Tolerance</span>
                      <span className="text-xs font-mono text-primary">{clarifications.riskTolerance || 5}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={clarifications.riskTolerance || 5}
                      onChange={(e) => setClarifications({ ...clarifications, riskTolerance: parseInt(e.target.value) })}
                      className="w-full"
                      style={{ '--range-progress': `${((clarifications.riskTolerance || 5) - 1) / 9 * 100}%` } as React.CSSProperties}
                    />
                    <div className="flex justify-between text-[10px] text-text-muted mt-1">
                      <span>Low Risk</span>
                      <span>High Risk</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {parameters.map((param) => (
                      <div key={param.key}>
                        <label className="text-[10px] text-text-muted mb-1 block">{param.label}</label>
                        {param.type === 'select' ? (
                          <select
                            value={(clarifications as Record<string, string>)[param.key] || ''}
                            onChange={(e) => setClarifications({ ...clarifications, [param.key]: e.target.value })}
                            className="w-full rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary focus:border-primary/50 focus:outline-none transition-colors"
                          >
                            <option value="">Select...</option>
                            {param.options?.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={(clarifications as Record<string, string>)[param.key] || ''}
                            onChange={(e) => setClarifications({ ...clarifications, [param.key]: e.target.value })}
                            placeholder={param.placeholder}
                            className="w-full rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-text-primary placeholder:text-text-muted/40 focus:border-primary/50 focus:outline-none transition-colors"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick examples */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-text-muted">Try:</span>
            {['Startup vs Job', 'React vs Flutter', 'Buy vs Rent', 'MBA vs Masters'].map((example) => (
              <button
                key={example}
                onClick={() => {
                  setInputLocal(`Should I choose ${example.replace(' vs ', ' or ')}?`);
                  // Focus the textarea
                  textareaRef.current?.focus();
                }}
                className="rounded-lg border border-border px-3 py-1 text-xs text-text-muted hover:text-primary hover:border-primary/30 transition-all bg-card/30"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '14+', label: 'Criteria Analyzed' },
            { value: '5+', label: 'AI Models' },
            { value: '10yr', label: 'Forecast Range' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
              <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const emojiIconMap: Record<string, any> = {
  '🚀': Briefcase,
  '🎓': GraduationCap,
  '⚡': Code,
  '☁️': Cloud,
  '🏠': Home,
  '👤': Users,
  '📊': Megaphone,
  '🌍': Globe,
  '💰': Coins,
  '🎯': ListTodo,
  '🔄': RefreshCw,
  '🏛️': School,
  '🛠️': Cpu,
  '⚖️': Scale,
  '🏥': HeartPulse,
};

// ===== USE CASE GLOWING CARD COMPONENT =====
function UseCaseCard({
  useCase,
  index,
  theme,
  onClick,
  isInView,
}: {
  useCase: typeof USE_CASES[0];
  index: number;
  theme: { badge: string; dot: string; bg: string; link: string; glowColor: string };
  onClick: () => void;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.button
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.02 }}
      onClick={onClick}
      className={`group relative rounded-xl border p-4 text-left transition-all duration-300 card-hover flex flex-col justify-between h-[155px] overflow-hidden ${theme.bg}`}
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {/* Background radial glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, ${theme.glowColor.replace('0.45', '0.06')}, transparent 80%)`,
          }}
        />
      )}

      {/* Cursor-following border glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(100px circle at ${coords.x}px ${coords.y}px, ${theme.glowColor}, transparent 80%)`,
            maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-20 flex flex-col justify-between h-full w-full">
        <div>
          {/* Badge */}
          <div className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8px] font-bold w-fit uppercase tracking-wider mb-2.5 ${theme.badge}`}>
            <span className={`h-1 w-1 rounded-full ${theme.dot}`} />
            {useCase.category}
          </div>

          {/* Header & Copy */}
          <h3 className="font-heading text-xs font-bold text-text-primary mb-1 tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {useCase.title}
          </h3>
          <p className="text-[10px] text-text-muted leading-normal line-clamp-2">
            {useCase.description}
          </p>
        </div>

        {/* CTA Link */}
        <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold transition-all ${theme.link}`}>
          Analyze <ArrowRight className="h-2.5 w-2.5 group-hover:translate-x-0.5 transition-transform" />
        </span>

        {/* Premium Minimal Icon Outline instead of oversized 3D Emojis */}
        <div className="absolute right-4 bottom-4 text-text-muted/15 group-hover:text-primary/25 transition-all duration-500 scale-100 group-hover:scale-125 z-0 pointer-events-none">
          {(() => {
            const IconComp = emojiIconMap[useCase.icon] || Briefcase;
            return <IconComp className="h-14 w-14 stroke-[1.2]" />;
          })()}
        </div>
      </div>
    </motion.button>
  );
}

// ===== USE CASES SECTION =====
function UseCasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const setDecisionInput = useDecisionStore((s) => s.setDecisionInput);

  // Category thematic variables mapped to our premium dark palette
  const categoryThemes: Record<
    string,
    { badge: string; dot: string; bg: string; link: string; glowColor: string }
  > = {
    Career: {
      badge: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      dot: 'bg-orange-500',
      bg: 'bg-gradient-to-br from-[#1A0F08] via-card to-card border-orange-500/20 hover:border-orange-500/40',
      link: 'text-orange-400 group-hover:text-orange-300',
      glowColor: 'rgba(255, 106, 42, 0.45)',
    },
    Education: {
      badge: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      dot: 'bg-purple-500',
      bg: 'bg-gradient-to-br from-[#100D1A] via-card to-card border-purple-500/20 hover:border-purple-500/40',
      link: 'text-purple-400 group-hover:text-purple-300',
      glowColor: 'rgba(168, 85, 247, 0.45)',
    },
    Technology: {
      badge: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      dot: 'bg-blue-500',
      bg: 'bg-gradient-to-br from-[#0B151F] via-card to-card border-blue-500/20 hover:border-blue-500/40',
      link: 'text-blue-400 group-hover:text-blue-300',
      glowColor: 'rgba(59, 130, 246, 0.45)',
    },
    Infrastructure: {
      badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
      dot: 'bg-indigo-500',
      bg: 'bg-gradient-to-br from-[#0C0E1E] via-card to-card border-indigo-500/20 hover:border-indigo-500/40',
      link: 'text-indigo-400 group-hover:text-indigo-300',
      glowColor: 'rgba(99, 102, 241, 0.45)',
    },
    Finance: {
      badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      dot: 'bg-emerald-500',
      bg: 'bg-gradient-to-br from-[#081710] via-card to-card border-emerald-500/20 hover:border-emerald-500/40',
      link: 'text-emerald-400 group-hover:text-emerald-300',
      glowColor: 'rgba(16, 185, 129, 0.45)',
    },
    Hiring: {
      badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
      dot: 'bg-rose-500',
      bg: 'bg-gradient-to-br from-[#1E0B10] via-card to-card border-rose-500/20 hover:border-rose-500/40',
      link: 'text-rose-400 group-hover:text-rose-300',
      glowColor: 'rgba(244, 63, 94, 0.45)',
    },
    Business: {
      badge: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
      dot: 'bg-yellow-500',
      bg: 'bg-gradient-to-br from-[#18150A] via-card to-card border-yellow-500/20 hover:border-yellow-500/40',
      link: 'text-yellow-400 group-hover:text-yellow-300',
      glowColor: 'rgba(234, 179, 8, 0.45)',
    },
    Strategy: {
      badge: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      dot: 'bg-amber-500',
      bg: 'bg-gradient-to-br from-[#18110A] via-card to-card border-amber-500/20 hover:border-amber-500/40',
      link: 'text-amber-400 group-hover:text-amber-300',
      glowColor: 'rgba(245, 158, 11, 0.45)',
    },
    Product: {
      badge: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
      dot: 'bg-pink-500',
      bg: 'bg-gradient-to-br from-[#1E0B17] via-card to-card border-pink-500/20 hover:border-pink-500/40',
      link: 'text-pink-400 group-hover:text-pink-300',
      glowColor: 'rgba(236, 72, 153, 0.45)',
    },
    Medical: {
      badge: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
      dot: 'bg-teal-500',
      bg: 'bg-gradient-to-br from-[#0B1E19] via-card to-card border-teal-500/20 hover:border-teal-500/40',
      link: 'text-teal-400 group-hover:text-teal-300',
      glowColor: 'rgba(20, 184, 166, 0.45)',
    },
    Government: {
      badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
      dot: 'bg-cyan-500',
      bg: 'bg-gradient-to-br from-[#0B1A1E] via-card to-card border-cyan-500/20 hover:border-cyan-500/40',
      link: 'text-cyan-400 group-hover:text-cyan-300',
      glowColor: 'rgba(6, 182, 212, 0.45)',
    },
  };

  return (
    <section ref={ref} className="relative py-28 overflow-hidden bg-surface/10">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Real-World <span className="gradient-text">Decisions</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            From career pivots to technology choices — INFENGINE handles any decision that keeps you up at night.
          </p>
        </motion.div>

        {/* 5-column grid layout for desktop (5x3 for 15 elements) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {USE_CASES.map((useCase, i) => {
            const theme = categoryThemes[useCase.category] || categoryThemes.Career;
            return (
              <UseCaseCard
                key={useCase.title}
                useCase={useCase}
                index={i}
                theme={theme}
                onClick={() => {
                  setDecisionInput(`Should I choose ${useCase.title.replace(' vs ', ' or ')}?`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                isInView={isInView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== HOW IT WORKS SECTION =====
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    { icon: Brain, title: 'Input Decision', desc: 'Type your decision query (e.g. startup vs. job) into the homepage workspace textarea.' },
    { icon: Sliders, title: 'Calibrate Parameters', desc: 'Optionally specify details like budget range, timeline, goals, and risk tolerance.' },
    { icon: Brain, title: 'Context Analysis', desc: 'AI maps your query constraints, extracts goals, and identifies options.' },
    { icon: Target, title: 'Define Criteria', desc: 'AI custom-generates 14 evaluation categories tailored to your decision domain.' },
    { icon: BarChart3, title: 'Weighted Scoring', desc: 'Scores all options dynamically on a 0-100 scale with explicit transparent rationale.' },
    { icon: TrendingUp, title: 'Simulate Outcomes', desc: 'Forecasts timelines from 6 months to 10 years for best, expected, and worst cases.' },
    { icon: Shield, title: 'Audit Risks & Biases', desc: 'Identifies execution risks with mitigations and flags cognitive bias distortions.' },
    { icon: Sparkles, title: 'Explore Dashboard', desc: 'Examine results on the dashboard via charts, decision trees, playgrounds, and export reports.' },
  ];

  return (
    <section ref={ref} className="py-28 bg-surface/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            How <span className="gradient-text">INFENGINE</span> Works
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            The data pipeline from natural language input to structured explainable recommendations.
          </p>
        </motion.div>

        {/* Connected Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLastInRow = (i + 1) % 4 === 0;
            const isLastStep = i === steps.length - 1;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-xl border border-border bg-card/40 p-6 hover:border-primary/40 hover:bg-card/75 transition-all card-hover flex flex-col justify-between"
              >
                {/* Connector Arrows for Visual Flow */}
                {!isLastStep && (
                  <>
                    {/* Desktop Right Arrows */}
                    {!isLastInRow && (
                      <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 bg-background border border-border rounded-full p-1 text-primary shadow-lg">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    )}
                    {/* Desktop Down Arrow at Row End */}
                    {isLastInRow && i === 3 && (
                      <div className="hidden lg:block absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 bg-background border border-border rounded-full p-1 text-primary shadow-lg">
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    )}
                    {/* Mobile/Tablet Down Arrows */}
                    <div className="block lg:hidden absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 bg-background border border-border rounded-full p-1 text-primary shadow-lg">
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  </>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-text-muted font-bold tracking-widest uppercase">
                      Step 0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== CURSOR-STYLE GLOWING CARD COMPONENT =====
function GlowingCard({
  children,
  className = "",
  delay = 0,
  isInView = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  isInView?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-xl border border-border bg-card/30 p-6 overflow-hidden transition-all duration-300 group ${className}`}
      style={{ transform: 'translate3d(0,0,0)' }}
    >
      {/* Background radial glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(255, 106, 42, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Cursor-following border glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(255, 106, 42, 0.45), transparent 80%)`,
            maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}

// ===== FEATURES SECTION =====
function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { icon: BarChart3, title: 'Decision Comparison', desc: 'Compare 2 to 5+ options simultaneously across 14 weighted criteria with interactive visualizations.' },
    { icon: GitBranch, title: 'Decision Tree Generator', desc: 'AI creates intelligent decision trees with interactive nodes, probability branches, and outcome predictions.' },
    { icon: Clock, title: 'Future Timeline', desc: 'Visualize projected outcomes at 6 months, 1, 3, 5, and 10 years for every option.' },
    { icon: Shield, title: 'Risk Heatmap', desc: 'Interactive risk matrix from Low to Critical with detailed reasoning and mitigation strategies.' },
    { icon: MessageSquareWarning, title: 'AI Devil\'s Advocate', desc: 'AI intentionally argues against its own recommendation to increase trust and expose blind spots.' },
    { icon: Search, title: 'Bias Detector', desc: 'Detects confirmation bias, loss aversion, fear, overconfidence, and other cognitive distortions.' },
    { icon: Play, title: 'Scenario Simulator', desc: '"What if salary increases 20%?" — change assumptions and watch the entire analysis update live.' },
    { icon: SlidersHorizontal, title: 'Sensitivity Analysis', desc: 'Move sliders for budget, risk tolerance, age, and location. AI recalculates instantly.' },
    { icon: Gauge, title: 'Confidence Meter', desc: 'AI provides a precise confidence percentage and explains exactly why it\'s that confident.' },
    { icon: Link2, title: 'Evidence Engine', desc: 'Every recommendation links to structured reasoning chains. No black-box AI — full transparency.' },
  ];

  return (
    <section ref={ref} className="py-28 bg-surface/10 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Powerful <span className="gradient-text">AI Features</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Ten specialized AI capabilities that go far beyond simple Q&A to build an entire decision framework.
          </p>
        </motion.div>

        {/* 2x5 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <GlowingCard
                key={feature.title}
                delay={i * 0.05}
                isInView={isInView}
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-text-primary mb-1.5 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </GlowingCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== CTA SECTION =====
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const textarea = document.getElementById('landing-decision-textarea');
    if (textarea) textarea.focus();
  };

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Make <span className="gradient-text">Smarter Decisions</span>?
        </h2>
        <p className="text-sm text-text-muted mb-10 max-w-xl mx-auto leading-relaxed">
          No signup required. No cookies. Just paste your decision and get a comprehensive AI analysis in seconds.
        </p>
        <button
          onClick={handleScrollTop}
          className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-95 orange-glow"
          id="cta-start-button"
        >
          Start Analyzing
          <ArrowRight className="h-5 w-5" />
        </button>
      </motion.div>
    </section>
  );
}

// ===== MAIN PAGE =====
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <UseCasesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
