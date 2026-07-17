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

                {/* Parameters Panel toggle */}
                <button
                  onClick={() => setShowParams(!showParams)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all active:scale-95 ${
                    showParams
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
          <p className="text-text-muted max-w-xl mx-auto text-sm">
            From career pivots to technology choices — INFENGINE handles any decision that keeps you up at night.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {USE_CASES.map((useCase, i) => (
            <motion.button
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={() => {
                setDecisionInput(`Should I choose ${useCase.title.replace(' vs ', ' or ')}?`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative rounded-2xl border border-border/80 bg-gradient-to-b from-card/35 to-surface/20 p-5 text-left transition-all duration-300 hover:border-primary/40 hover:from-card/75 hover:to-surface/50 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98] overflow-hidden cursor-pointer"
            >
              <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border/80 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 mb-4">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{useCase.icon}</span>
              </div>
              <span className="text-sm font-heading font-semibold text-text-primary block mb-1.5">{useCase.title}</span>
              <span className="text-xs text-text-muted">{useCase.category}</span>
              <ChevronRight className="absolute top-5 right-4 h-4 w-4 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== HOW IT WORKS SECTION (INTERACTIVE DECISION-TO-SOLUTION PIPELINE) =====
function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState<'saas-mba' | 'react-flutter'>('saas-mba');

  // Auto-play state
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 8);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Brain, title: 'Understand Input', desc: 'Semantic parser extracts primary constraints, goals, and targets from natural text prompts.' },
    { icon: Target, title: 'Tailor Criteria', desc: 'Domain-specific evaluation criteria are dynamically generated by multiple reasoning LLMs.' },
    { icon: SlidersHorizontal, title: 'Calibrate Weights', desc: 'Assigns dynamic coefficients based on user parameters, risk tolerance, and goals.' },
    { icon: BarChart3, title: 'Multi-Model Score', desc: 'Evaluates and scores all options side-by-side using comparative logic and historical data.' },
    { icon: TrendingUp, title: 'Scenario Forecast', desc: 'Projects expected, best-case, and worst-case outcomes over a 10-year horizon.' },
    { icon: Search, title: 'Detect Biases', desc: 'Flags cognitive biases (loss aversion, status quo) with de-biasing mitigation steps.' },
    { icon: Sliders, title: 'Sensitivity Test', desc: 'Models stability of recommendation as variables are adjusted in real-time.' },
    { icon: Sparkles, title: 'Optimal Solution', desc: 'Outputs explainable final recommendations with absolute confidence metrics.' },
  ];

  // Mock data for sandbox demonstration
  const demoData = {
    'saas-mba': {
      prompt: 'Should I start a bootstrapped SaaS company or accept a Corporate PM offer?',
      context: { budget: '$20K', risk: 'High', timeline: '3 Months' },
      criteria: [
        { name: 'Financial Upside', weight: 1.3, scoreA: 95, scoreB: 70 },
        { name: 'Learning Velocity', weight: 1.2, scoreA: 98, scoreB: 55 },
        { name: 'Lifestyle Flexibility', weight: 1.0, scoreA: 90, scoreB: 45 },
        { name: 'Risk Mitigation', weight: 0.8, scoreA: 30, scoreB: 85 },
      ],
      biases: [
        { type: 'Loss Aversion', severity: 'High', desc: 'Fear of losing corporate stability overrides SaaS upside.' },
        { type: 'Status Quo Bias', severity: 'Medium', desc: 'Inclination to choose corporate job due to career familiarity.' },
      ],
      simulation: { expected: 'SaaS: +$280K / PM: +$140K in 3yrs', worstCase: 'SaaS fails (loses $20K) / PM laid off' },
      winner: 'Start SaaS Company',
      confidence: 84,
      reason: 'SaaS matches your High risk tolerance and dominates on financial upside and autonomy, outweighing the corporate safety net.'
    },
    'react-flutter': {
      prompt: 'Should we build our mobile startup MVP with React Native or Flutter?',
      context: { team: 'JS/React Experience', timeline: '2 Months', platform: 'iOS & Android' },
      criteria: [
        { name: 'Time to Market', weight: 1.4, scoreA: 92, scoreB: 65 },
        { name: 'Developer Velocity', weight: 1.2, scoreA: 95, scoreB: 50 },
        { name: 'App Performance', weight: 1.0, scoreA: 80, scoreB: 90 },
        { name: 'Code Reusability', weight: 1.1, scoreA: 85, scoreB: 92 },
      ],
      biases: [
        { type: 'Anchoring Bias', severity: 'Medium', desc: 'Preference for React due to existing web development patterns.' }
      ],
      simulation: { expected: 'React: Launch in 6 weeks / Flutter: Launch in 10 weeks', worstCase: 'Flutter delayed due to Dart learning curve' },
      winner: 'React Native',
      confidence: 79,
      reason: 'Existing team JS expertise accelerates development velocity by 40%, securing time-to-market advantage despite Flutter performance benefits.'
    }
  };

  const currentData = demoData[selectedDemo];

  return (
    <section ref={ref} className="py-28 bg-surface/30 relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/5 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            How <span className="gradient-text">INFENGINE</span> Solves It
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm">
            Interactive pipeline visualizer: Trace a sample decision from initial prompt to final optimized solution.
          </p>
        </motion.div>

        {/* Demo Selector */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => { setSelectedDemo('saas-mba'); setActiveStep(0); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
              selectedDemo === 'saas-mba'
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'border-border bg-card/45 text-text-muted hover:text-text-primary'
            }`}
          >
            💼 SaaS vs Corporate PM
          </button>
          <button
            onClick={() => { setSelectedDemo('react-flutter'); setActiveStep(0); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
              selectedDemo === 'react-flutter'
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'border-border bg-card/45 text-text-muted hover:text-text-primary'
            }`}
          >
            ⚡ React Native vs Flutter
          </button>
        </div>

        {/* The connected decision pipeline */}
        <div className="relative mb-12 p-6 rounded-2xl border border-border/80 bg-card/25 backdrop-blur-sm overflow-x-auto scrollbar-none">
          <div className="min-w-[850px] relative">
            {/* SVG Connecting pipeline path */}
            <svg className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 pointer-events-none" viewBox="0 0 850 4" fill="none">
              <line x1="20" y1="2" x2="830" y2="2" stroke="#2A2A2A" strokeWidth="2" strokeDasharray="6 4" />
              <motion.line
                x1="20" y1="2" x2="830" y2="2"
                stroke="url(#orangeGradient)" strokeWidth="2"
                strokeDasharray="40 120"
                animate={{ strokeDashoffset: [-160, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <defs>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6A2A" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FF6A2A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FF6A2A" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pipeline Stage Buttons */}
            <div className="flex justify-between items-center relative z-10 px-4">
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isPassed = idx < activeStep;
                const isActive = idx === activeStep;

                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none transition-all"
                  >
                    <div className={`h-11 w-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'border-primary bg-primary text-white scale-110 shadow-lg shadow-primary/20'
                        : isPassed
                        ? 'border-primary/45 bg-primary/10 text-primary'
                        : 'border-border bg-surface text-text-muted group-hover:border-border-hover group-hover:text-text-primary'
                    }`}>
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-semibold font-mono mt-3 uppercase tracking-wider transition-colors ${
                      isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-secondary'
                    }`}>
                      Step {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Step Simulator Window */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 rounded-2xl border border-border/80 bg-card/40 p-6 lg:p-8 overflow-hidden relative">
          {/* Glowing element */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Step Description */}
          <div className="lg:col-span-2 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border/50 pb-6 lg:pb-0 lg:pr-8">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary mb-4">
              {(() => {
                const IconComp = steps[activeStep].icon;
                return <IconComp className="h-5 w-5" />;
              })()}
            </div>
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-1.5">
              Stage {activeStep + 1} of 8
            </span>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
              {steps[activeStep].title}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {steps[activeStep].desc}
            </p>

            {/* Checklist */}
            <div className="mt-5 space-y-2 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <span>Deterministic analytical processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <span>Contextual parameter mapping</span>
              </div>
            </div>
          </div>

          {/* Right: Actual Decision -> Solution Visual console */}
          <div className="lg:col-span-3 flex flex-col justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep + '-' + selectedDemo}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Stage 1: Input text visualizer */}
                {activeStep === 0 && (
                  <div className="rounded-xl border border-border bg-surface/50 p-4">
                    <div className="text-[10px] uppercase font-mono text-text-muted mb-2">RAW INPUT PROMPT</div>
                    <div className="text-sm font-medium text-text-secondary leading-relaxed border-l-2 border-primary/50 pl-3">
                      &ldquo;{currentData.prompt}&rdquo;
                    </div>
                    <div className="flex gap-4 mt-4 pt-3 border-t border-border/50 text-[11px] font-mono text-text-muted">
                      <div>Timeline: <span className="text-primary">{Object.values(currentData.context)[2] || 'Medium'}</span></div>
                      <div>Risk: <span className="text-primary">{Object.values(currentData.context)[1]}</span></div>
                    </div>
                  </div>
                )}

                {/* Stage 2: Tailor Criteria */}
                {activeStep === 1 && (
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-mono text-text-muted mb-1">GENERATED DOMAIN CRITERIA</div>
                    <div className="grid grid-cols-2 gap-2">
                      {currentData.criteria.map((crit, idx) => (
                        <div key={idx} className="rounded-lg border border-border bg-surface/50 p-3 flex items-center justify-between">
                          <span className="text-xs font-semibold text-text-secondary">{crit.name}</span>
                          <span className="text-[10px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">Tailored</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 3: Calibrate Weights */}
                {activeStep === 2 && (
                  <div className="space-y-3">
                    <div className="text-[10px] uppercase font-mono text-text-muted">CRITERIA IMPORTANCE WEIGHTS</div>
                    {currentData.criteria.map((crit, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-text-secondary">{crit.name}</span>
                          <span className="text-primary font-bold">{crit.weight.toFixed(1)}x</span>
                        </div>
                        <div className="h-1.5 bg-border rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${(crit.weight / 1.5) * 100}%` }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stage 4: Multi-Model Scoring */}
                {activeStep === 3 && (
                  <div className="space-y-3">
                    <div className="text-[10px] uppercase font-mono text-text-muted">COMPARATIVE CRITERIA SCORES</div>
                    <div className="space-y-2.5">
                      {currentData.criteria.map((crit, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 text-xs">
                          <span className="font-medium text-text-secondary truncate">{crit.name}</span>
                          <div className="sm:col-span-2 flex items-center gap-2.5">
                            {/* Option A bar */}
                            <div className="flex-1 space-y-0.5">
                              <div className="h-2 bg-border rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-primary"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${crit.scoreA}%` }}
                                />
                              </div>
                            </div>
                            <span className="font-mono w-6 text-right font-bold text-text-primary">{crit.scoreA}</span>

                            {/* Option B bar */}
                            <div className="flex-1 space-y-0.5">
                              <div className="h-2 bg-border rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-info"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${crit.scoreB}%` }}
                                />
                              </div>
                            </div>
                            <span className="font-mono w-6 text-right text-text-muted">{crit.scoreB}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 5: Scenario Forecast */}
                {activeStep === 4 && (
                  <div className="rounded-xl border border-border bg-surface/50 p-4 space-y-3">
                    <div className="text-[10px] uppercase font-mono text-text-muted">MULTIPLE FUTURE PROJECTIONS</div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-mono font-bold text-primary mr-1">Expected case:</span>
                        <span className="text-text-secondary">{currentData.simulation.expected}</span>
                      </div>
                      <div>
                        <span className="font-mono font-bold text-warning mr-1">Worst case (shock):</span>
                        <span className="text-text-secondary">{currentData.simulation.worstCase}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 6: Bias Filter */}
                {activeStep === 5 && (
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-mono text-text-muted mb-1">DETECTED COGNITIVE DISTORTIONS</div>
                    {currentData.biases.map((bias, idx) => (
                      <div key={idx} className="rounded-xl border border-border bg-surface/30 p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-text-primary">{bias.type}</span>
                          <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded ${
                            bias.severity === 'High' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                          }`}>{bias.severity} Severity</span>
                        </div>
                        <p className="text-[11px] text-text-muted">{bias.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stage 7: Sensitivity Playground */}
                {activeStep === 6 && (
                  <div className="rounded-xl border border-border bg-surface/50 p-4 text-center">
                    <div className="text-[10px] uppercase font-mono text-text-muted mb-2 text-left">ROBUSTNESS CALIBRATION</div>
                    <div className="flex justify-center items-center gap-4 py-2">
                      <div className="text-center">
                        <div className="text-xs font-mono text-text-muted">Assumed priority</div>
                        <div className="text-base font-bold text-primary">High Risk</div>
                      </div>
                      <div className="h-6 w-px bg-border" />
                      <div className="text-center">
                        <div className="text-xs font-mono text-text-muted">Score stability</div>
                        <div className="text-base font-bold text-success">92.4% Robust</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 8: Recommendation Winner */}
                {activeStep === 7 && (
                  <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-4">
                    <div className="text-[10px] uppercase font-mono text-primary font-bold mb-2">🏆 RECOMMENDATION DECISION SOLUTION</div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-base font-bold text-text-primary">{currentData.winner}</span>
                      <span className="text-xs font-mono font-bold bg-primary/20 text-primary px-2 py-0.5 rounded">
                        {currentData.confidence}% Confidence
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {currentData.reason}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
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
          <p className="text-text-muted max-w-xl mx-auto text-sm">
            Ten specialized AI capabilities that go far beyond simple Q&A to build an entire decision framework.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-2xl border border-border bg-gradient-to-b from-card/35 to-surface/20 p-6 transition-all duration-300 hover:border-primary/40 hover:from-card/75 hover:to-surface/50 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.99] overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface border border-border/80 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-300 mb-5 text-text-secondary group-hover:text-primary">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="font-heading text-base font-semibold text-text-primary mb-2.5 group-hover:text-primary/90 transition-colors duration-300">{feature.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{feature.desc}</p>
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
