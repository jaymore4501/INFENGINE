'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDecisionStore } from '@/lib/store';
import { USE_CASES, AI_MODELS, AIModel } from '@/lib/types';
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
  Pause,
  RotateCcw,
  AlertCircle,
  Award,
  ArrowRightLeft,
} from 'lucide-react';

// Brand icons matching the reference style
const OpenAIIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={`${className} text-emerald-500 fill-current`} viewBox="0 0 24 24">
    <path d="M21.3,10.1c0.1-0.6,0.1-1.2-0.2-1.7c-0.4-0.8-1.2-1.3-2.1-1.3c-0.3,0-0.5,0.1-0.8,0.2c-0.3-0.7-0.9-1.3-1.7-1.6 c-0.8-0.3-1.7-0.2-2.4,0.3c-0.4-0.5-1-0.9-1.7-1c-0.7-0.1-1.5,0.1-2.1,0.5C9.9,5.2,9.5,4.7,8.9,4.4C8.2,4.1,7.4,4.2,6.8,4.5 C6.5,4.4,6.2,4.3,5.9,4.3C5,4.3,4.2,4.8,3.8,5.6C3.5,6.1,3.5,6.7,3.6,7.3C3,7.6,2.5,8.1,2.2,8.9C1.9,9.6,1.9,10.4,2.3,11.1 c-0.4,0.4-0.6,1-0.6,1.6c0,0.9,0.5,1.7,1.3,2.1c0.3,0.1,0.5,0.2,0.8,0.2c0.3,0.7,0.9,1.3,1.7,1.6c0.6,0.2,1.2,0.2,1.8-0.1 c0.4,0.5,1,0.9,1.7,1c0.7,0.1,1.5-0.1,2.1-0.5c0.4,0.3,0.8,0.8,1.4,1.1c0.7,0.3,1.5,0.2,2.1-0.1c0.3,0.1,0.6,0.2,0.9,0.2 c0.9,0,1.7-0.5,2.1-1.3c0.3-0.5,0.3-1.1,0.2-1.7c0.6-0.3,1.1-0.8,1.4-1.6c0.3-0.7,0.3-1.5-0.1-2.2c0.4-0.4,0.6-1,0.6-1.6 C21.9,11.1,21.6,10.5,21.3,10.1z M17.4,8.5c0.1,0.1,0.1,0.3,0.1,0.4v2.7l-2.4,1.4c-0.2,0.1-0.4,0.1-0.6,0l-2.4-1.4v-2.7 c0-0.2,0.1-0.4,0.3-0.5l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0L17.4,8.5z M8.8,10.1c0,0.2-0.1,0.4-0.3,0.5L6.1,12c-0.2,0.1-0.4,0.1-0.6,0 l-2.4-1.4C3,10.5,2.9,10.3,2.9,10.1v-2.7l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0l2.4,1.4c0.2,0.1,0.3,0.3,0.3,0.5V10.1z M11.7,15.1 c0,0.2-0.1,0.4-0.3,0.5l-2.4,1.4c-0.2,0.1-0.4,0.1-0.6,0L6,15.6c-0.2-0.1-0.3-0.3-0.3-0.5v-2.7l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0 l2.4,1.4c0.2,0.1,0.3,0.3,0.3,0.5V15.1z M14.6,12.5L12,14l-2.6-1.5v-3L12,8l2.6,1.5V12.5z M14.6,18.4L12,19.9l-2.6-1.5v-2.7 c0-0.2,0.1-0.4,0.3-0.5l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0l2.4,1.4c0.2,0.1,0.3,0.3,0.3,0.5V18.4z M20.9,13.9L18.5,15.3 c-0.2,0.1-0.4,0.1-0.6,0l-2.4-1.4v-2.7c0-0.2,0.1-0.4,0.3-0.5l2.4-1.4c0.2-0.1,0.4-0.1,0.6,0l2.4,1.4c0.2,0.1,0.3,0.3,0.3,0.5 V13.9z"/>
  </svg>
);

const GeminiIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={`${className} text-blue-400 fill-current`} viewBox="0 0 24 24">
    <path d="M12,2L14.7,9.3L22,12L14.7,14.7L12,22L9.3,14.7L2,12L9.3,9.3L12,2Z"/>
  </svg>
);

const ClaudeIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={`${className} text-orange-400 fill-current`} viewBox="0 0 24 24">
    <path d="M12,2C10.9,2 10,2.9 10,4C10,5.1 10.9,6 12,6C13.1,6 14,5.1 14,4C14,2.9 13.1,2 12,2M12,18C10.9,18 10,18.9 10,20C10,21.1 10.9,22 12,22C13.1,22 14,21.1 14,20C14,18.9 13.1,18 12,18M4,10C2.9,10 2,10.9 2,12C2,13.1 2.9,14 4,14C5.1,14 6,13.1 6,12C6,10.9 5.1,10 4,10M20,10C18.9,10 18,10.9 18,12C18,13.1 18.9,14 20,14C21.1,14 22,13.1 22,12C22,10.9 21.1,10 20,10M6.4,6.4C5.6,7.2 5.6,8.5 6.4,9.3C7.2,10.1 8.5,10.1 9.3,9.3C10.1,8.5 10.1,7.2 9.3,6.4C8.5,5.6 7.2,5.6 6.4,6.4M14.7,14.7C13.9,15.5 13.9,16.8 14.7,17.6C15.5,18.4 16.8,18.4 17.6,17.6C18.4,16.8 18.4,15.5 17.6,14.7C16.8,13.9 15.5,13.9 14.7,14.7M6.4,17.6C7.2,18.4 8.5,18.4 9.3,17.6C10.1,16.8 10.1,15.5 9.3,14.7C8.5,13.9 7.2,13.9 6.4,14.7C5.6,15.5 5.6,16.8 6.4,17.6M17.6,6.4C16.8,5.6 15.5,5.6 14.7,6.4C13.9,7.2 13.9,8.5 14.7,9.3C15.5,10.1 16.8,10.1 17.6,9.3C18.4,8.5 18.4,7.2 17.6,6.4Z"/>
  </svg>
);

const getModelBrandIcon = (modelId: AIModel) => {
  if (modelId.includes('gemini')) return <GeminiIcon />;
  if (modelId.includes('claude')) return <ClaudeIcon />;
  return <OpenAIIcon />;
};

// ===== AI THINKING ANIMATION =====
function AIThinkingAnimation() {
  const { analysisState } = useDecisionStore();
  const phases = [
    { label: 'Understanding context', icon: '🧠' },
    { label: 'Decomposing decision', icon: '🔍' },
    { label: 'Generating criteria', icon: '📋' },
    { label: 'Modeling risks', icon: '⚠️' },
    { label: 'Running simulations', icon: '🎲' },
    { label: 'Forecasting scenarios', icon: '🔮' },
    { label: 'Detecting biases', icon: '🪞' },
    { label: 'Scoring options', icon: '📊' },
    { label: 'Generating report', icon: '📄' },
  ];

  const currentIdx = phases.findIndex((p) =>
    analysisState.analysisPhase.toLowerCase().includes(p.label.toLowerCase().split(' ')[0])
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-2xl py-12"
    >
      <div className="rounded-2xl border border-border bg-card p-8 orange-glow">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center animate-spin-slow">
              <Brain className="h-10 w-10 text-white animate-pulse" />
            </div>
          </div>
        </div>

        <h3 className="font-heading text-xl font-bold text-center mb-2">INFENGINE Core AI</h3>
        <p className="text-sm text-text-muted text-center mb-8">{analysisState.analysisPhase}</p>

        <div className="relative h-1.5 bg-border rounded-full overflow-hidden mb-8">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-hover rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${analysisState.progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="space-y-2">
          {phases.map((phase, i) => {
            const isDone = i < currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-all ${
                  isCurrent
                    ? 'bg-primary/10 border border-primary/20 text-primary'
                    : isDone
                    ? 'text-success'
                    : 'text-text-muted/50'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin flex-shrink-0" />
                ) : (
                  <span className="h-4 w-4 flex items-center justify-center text-xs flex-shrink-0">{phase.icon}</span>
                )}
                <span className="font-medium">{phase.label}</span>
                {isCurrent && (
                  <motion.div
                    className="ml-auto flex gap-1"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <div className="h-1 w-1 rounded-full bg-primary" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
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

  // Navigate to results when analysis is complete
  useEffect(() => {
    if (analysisState.step === 'complete' && result) {
      router.push('/results');
    }
  }, [analysisState.step, result, router]);

  const handleAnalyze = () => {
    if (!inputLocal.trim()) return;
    startAnalysis();
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
          <div className="rounded-2xl border border-white/[0.08] bg-card/40 backdrop-blur-md p-4 orange-glow-sm transition-all focus-within:border-primary/40 focus-within:orange-glow">
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
                    className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-surface/50 px-3 py-2 text-xs font-semibold text-text-secondary hover:border-primary/30 hover:text-text-primary transition-all active:scale-95"
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
                        className="absolute bottom-full left-0 mb-2 w-56 rounded-xl border border-white/[0.08] bg-card p-1.5 shadow-2xl z-50 overflow-hidden"
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
                              className={`flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                                isSelected
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
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 ${
                    showParams
                      ? 'border-primary/40 bg-primary/15 text-primary'
                      : 'border-white/[0.08] bg-surface/50 text-text-muted hover:border-primary/30 hover:text-text-primary'
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
                <div className="rounded-xl border border-white/[0.08] bg-card/30 p-4 space-y-4">
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
                            className="w-full rounded-lg border border-white/[0.08] bg-surface px-2.5 py-1.5 text-xs text-text-primary focus:border-primary/50 focus:outline-none transition-colors"
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
                            className="w-full rounded-lg border border-white/[0.08] bg-surface px-2.5 py-1.5 text-xs text-text-primary placeholder:text-text-muted/40 focus:border-primary/50 focus:outline-none transition-colors"
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
                className="rounded-lg border border-white/[0.08] px-3 py-1 text-xs text-text-muted hover:text-primary hover:border-primary/30 transition-all bg-card/20"
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
            { value: '14', label: 'Criteria Analyzed' },
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

// ===== USE CASES SECTION =====
function UseCasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const setDecisionInput = useDecisionStore((s) => s.setDecisionInput);

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
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Real-World <span className="gradient-text">Decisions</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            From career pivots to technology choices — INFENGINE handles any decision that keeps you up at night.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {USE_CASES.map((useCase, i) => (
            <motion.button
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => {
                setDecisionInput(`Should I choose ${useCase.title.replace(' vs ', ' or ')}?`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative rounded-2xl border border-white/[0.06] bg-card/30 p-5 text-left transition-all hover:border-primary/40 hover:bg-card/50 card-hover"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface/50 border border-white/[0.06] text-xl mb-3 shadow-inner group-hover:scale-110 group-hover:border-primary/20 transition-all">
                {useCase.icon}
              </div>
              <span className="text-sm font-semibold text-text-primary block mb-1 group-hover:text-primary transition-colors">{useCase.title}</span>
              <span className="text-xs text-text-muted font-medium">{useCase.category}</span>
              <ChevronRight className="absolute top-6 right-4 h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all translate-x-[-4px] group-hover:translate-x-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== HOW IT WORKS SECTION (WITH INTERACTIVE LIVE FLOW SIMULATION) =====
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    { icon: Brain, title: 'Understand Context', desc: 'Natural language analysis parses competing options and details.' },
    { icon: Target, title: 'Generate Criteria', desc: 'Domain-specific framework generates custom parameters.' },
    { icon: SlidersHorizontal, title: 'Calibrate Weights', desc: 'Priorities dynamically balance criteria weight factors.' },
    { icon: BarChart3, title: 'Score Options', desc: 'Multi-dimensional analysis outputs objective scores.' },
    { icon: TrendingUp, title: 'Forecast Scenarios', desc: 'Time horizon modeling forecasts outcomes up to 10 years.' },
    { icon: Search, title: 'Detect Biases', desc: 'Behavioral economics flags hidden mental blindspots.' },
    { icon: SlidersHorizontal, title: 'Sensitivity Test', desc: 'Adjusts key parameters to test solution consistency.' },
    { icon: Sparkles, title: 'Recommend Solution', desc: 'Explainable dashboard renders the verified winner.' },
  ];

  // Auto-play the simulator loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 8);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section ref={ref} className="py-28 bg-surface/30 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            How <span className="gradient-text">INFENGINE</span> Works
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base">
            Witness the flow from a complex question to a confident, transparent solution in real-time.
          </p>
        </motion.div>

        {/* Stepper Controls */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-card/50 px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-primary" /> Pause Flow
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-success" /> Resume Flow
              </>
            )}
          </button>
          <button
            onClick={() => { setActiveStep(0); setIsPlaying(false); }}
            className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-card/50 px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        {/* Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Steps List on Left */}
          <div className="lg:col-span-5 space-y-3.5">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeStep;
              return (
                <button
                  key={step.title}
                  onClick={() => { setActiveStep(i); setIsPlaying(false); }}
                  className={`w-full text-left rounded-xl border p-4 transition-all flex items-start gap-4 ${
                    isActive
                      ? 'border-primary/50 bg-gradient-to-r from-primary/5 to-transparent shadow-lg shadow-primary/5 scale-[1.02]'
                      : 'border-white/[0.05] bg-card/20 hover:border-white/[0.1] hover:bg-card/30'
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 transition-colors ${
                    isActive ? 'bg-primary/20 text-primary' : 'bg-surface/50 text-text-muted'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-primary font-bold">STAGE 0{i + 1}</span>
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />}
                    </div>
                    <h3 className={`font-heading text-sm font-semibold transition-colors ${
                      isActive ? 'text-primary' : 'text-text-primary'
                    }`}>{step.title}</h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Visualizer on Right */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/[0.08] bg-card/30 p-6 sm:p-8 flex flex-col justify-between min-h-[460px] h-full relative overflow-hidden orange-glow-sm">
              {/* Glow accent */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
              
              <div className="w-full">
                {/* Header Mock */}
                <div className="flex items-center gap-2 mb-8 border-b border-border/40 pb-4">
                  <div className="h-3 w-3 rounded-full bg-danger/60" />
                  <div className="h-3 w-3 rounded-full bg-warning/60" />
                  <div className="h-3 w-3 rounded-full bg-success/60" />
                  <span className="text-xs text-text-muted font-mono ml-4 uppercase tracking-wider">Analysis Stream Simulator</span>
                </div>

                {/* Animation Screen Switching */}
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Context Analyzer</span>
                      <div className="rounded-xl bg-surface/50 border border-white/[0.06] p-4 font-body text-sm text-text-secondary leading-relaxed">
                        &ldquo;Should I quit my stable software engineering job to build an AI SaaS startup, or stay for the corporate promotion?&rdquo;
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[10px] bg-primary/15 text-primary border border-primary/20 rounded-full px-3 py-1 font-medium">Goal: Independence</span>
                        <span className="text-[10px] bg-primary/15 text-primary border border-primary/20 rounded-full px-3 py-1 font-medium">Domain: Career & Finance</span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Dynamic Evaluation Criteria</span>
                      <p className="text-xs text-text-muted">Generating evaluation framework metrics based on decision metadata:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {['Financial Return', 'Downside Risk', 'Personal Growth', 'Workplace Autonomy'].map((item) => (
                          <div key={item} className="flex items-center gap-2.5 rounded-lg border border-white/[0.05] bg-surface/30 px-3 py-2 text-xs font-medium text-text-secondary">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Calibrating Importance Weights</span>
                      <div className="space-y-3">
                        {[
                          { label: 'Financial Upside Weight', val: '90%' },
                          { label: 'Risk Aversion Scale', val: '35%' },
                          { label: 'Growth & Autonomy Emphasis', val: '80%' },
                        ].map((slider) => (
                          <div key={slider.label}>
                            <div className="flex justify-between text-[11px] text-text-muted mb-1">
                              <span>{slider.label}</span>
                              <span className="font-mono text-primary font-semibold">{slider.val}</span>
                            </div>
                            <div className="h-1.5 bg-border rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: slider.val }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Option Score Matrix</span>
                      <div className="space-y-3">
                        {[
                          { name: 'SaaS Startup Option', score: 86, color: '#FF6A2A' },
                          { name: 'Stable Corporate Job', score: 62, color: '#60A5FA' },
                        ].map((opt) => (
                          <div key={opt.name}>
                            <div className="flex justify-between text-xs text-text-secondary mb-1">
                              <span>{opt.name}</span>
                              <span className="font-mono font-bold text-text-primary">{opt.score}/100</span>
                            </div>
                            <div className="h-3 bg-border rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: opt.color }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${opt.score}%` }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3.5"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Long-Term Outcomes Forecast</span>
                      <div className="space-y-2">
                        <div className="border border-white/[0.05] rounded-xl p-3 bg-surface/30">
                          <span className="text-[10px] font-mono text-primary font-bold">1 YEAR HORIZON</span>
                          <p className="text-xs text-text-secondary mt-1">SaaS: High setup costs, validation. Job: Stable salary compounding.</p>
                        </div>
                        <div className="border border-white/[0.05] rounded-xl p-3 bg-surface/30">
                          <span className="text-[10px] font-mono text-primary font-bold">5 YEAR HORIZON</span>
                          <p className="text-xs text-text-secondary mt-1">SaaS: Exponential scaling (+350% yield cap). Job: Saturated linear promotion.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 5 && (
                    <motion.div
                      key="step-5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Cognitive Bias Inspector</span>
                      <p className="text-xs text-text-muted">Analyzing decisions for psychological deviations:</p>
                      <div className="space-y-2">
                        <div className="flex gap-3 rounded-lg border border-danger/20 bg-danger/5 p-3 text-xs text-text-secondary">
                          <AlertCircle className="h-4 w-4 text-danger flex-shrink-0" />
                          <div>
                            <strong className="text-danger">Loss Aversion (High severity)</strong>
                            <p className="text-text-muted mt-0.5">Overweighting startup failure risk over stable corporate routine benefits.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 6 && (
                    <motion.div
                      key="step-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Sensitivity Analysis Engine</span>
                      <div className="rounded-xl border border-white/[0.06] bg-surface/30 p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <span>Changing "Stability Preference" factor:</span>
                          <span className="text-primary font-mono font-bold">-30%</span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Recommendation maintains <span className="text-success font-semibold">robust consistency</span> across 85% of parameter combinations, confirming high stability.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 7 && (
                    <motion.div
                      key="step-7"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">Decision Intelligence Verdict</span>
                      <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-4 sm:p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="h-4.5 w-4.5 text-primary" />
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">Recommended choice</span>
                        </div>
                        <h4 className="text-lg font-heading font-bold text-text-primary mb-1">AI SaaS Startup</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Evaluated with **88% AI Confidence**. Autonomy gains and scaling limits offset initial career volatility.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step indicator footer */}
              <div className="border-t border-border/40 pt-4 flex items-center justify-between text-[10px] text-text-muted font-mono">
                <span>STAGE {activeStep + 1} OF 8</span>
                <div className="flex gap-1.5">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        idx === activeStep ? 'w-4 bg-primary' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FEATURES SECTION =====
function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { icon: ArrowRightLeft, title: 'Decision Comparison', desc: 'Compare 2 to 5+ options simultaneously across 14 weighted criteria with interactive visualizations.' },
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
    <section ref={ref} className="py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Powerful <span className="gradient-text">AI Features</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Ten specialized AI capabilities that go far beyond simple Q&A to build an entire decision framework.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-2xl border border-white/[0.06] bg-card/30 p-6 transition-all hover:border-primary/40 card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface/50 border border-white/[0.06] text-primary mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:border-primary/20 transition-all">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
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
