'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDecisionStore } from '@/lib/store';
import { WinnerCard, ConfidenceMeter, DecisionRadarChart, DecisionBarChart, CategoryWeightDonut, ScoreCards } from '@/components/dashboard/Charts';
import { RiskHeatmap, FutureTimeline, DevilsAdvocatePanel, BiasDetectorPanel, ReasoningPanel, EvidencePanel, ScenarioSimulations, DecisionMatrix } from '@/components/dashboard/Panels';
import { DecisionTreeFlow } from '@/components/dashboard/DecisionTree';
import { SensitivityAnalysis, ScenarioPlayground } from '@/components/dashboard/Interactive';
import { ReportExport } from '@/components/dashboard/ReportExport';
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import { generateMockAnalysis } from '@/lib/mock-data';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const router = useRouter();
  const { result, setResult, decisionInput, reset } = useDecisionStore();
  const [isResetting, setIsResetting] = useState(false);

  // If no result, generate a demo one
  useEffect(() => {
    if (!result && !isResetting) {
      const demoDecision = decisionInput || 'Should I start a SaaS company or pursue an MBA?';
      setResult(generateMockAnalysis(demoDecision));
    }
  }, [result, decisionInput, setResult, isResetting]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <p className="text-text-muted">Loading analysis...</p>
        </div>
      </div>
    );
  }

  const handleNewAnalysis = () => {
    setIsResetting(true);
    reset();
    router.push('/workspace');
  };

  return (
    <section className="min-h-screen py-8 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <button
              onClick={() => router.push('/workspace')}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Workspace
            </button>
            <button
              onClick={handleNewAnalysis}
              className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-4 py-2 text-sm text-primary hover:bg-primary/20 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              New Analysis
            </button>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2">
            Results <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-text-muted text-sm">
            Analyzing: <span className="text-text-secondary font-medium">&ldquo;{result.decision}&rdquo;</span>
          </p>
        </motion.div>

        {/* Grid layout */}
        <div className="space-y-6">
          {/* Row 1: Winner + Confidence */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WinnerCard result={result} />
            </div>
            <ConfidenceMeter confidence={result.winner.confidence} summary={result.winner.summary} />
          </div>

          {/* Row 2: Radar + Bar charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DecisionRadarChart result={result} />
            <DecisionBarChart result={result} />
          </div>

          {/* Row 3: Score Cards + Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ScoreCards result={result} />
            </div>
            <CategoryWeightDonut result={result} />
          </div>

          {/* Row 4: Decision Tree */}
          <DecisionTreeFlow tree={result.decisionTree} />

          {/* Row 5: Risk + Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskHeatmap result={result} />
            <FutureTimeline result={result} />
          </div>

          {/* Row 6: Sensitivity + Scenarios */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SensitivityAnalysis result={result} />
            <ScenarioPlayground result={result} />
          </div>

          {/* Row 7: Scenario Simulations */}
          <ScenarioSimulations result={result} />

          {/* Row 8: Decision Matrix */}
          <DecisionMatrix result={result} />

          {/* Row 9: Devil's Advocate + Bias */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DevilsAdvocatePanel result={result} />
            <BiasDetectorPanel result={result} />
          </div>

          {/* Row 10: Reasoning + Evidence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReasoningPanel result={result} />
            <EvidencePanel result={result} />
          </div>

          {/* Row 11: Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Full Recommendation
            </h3>
            <div className="prose prose-sm prose-invert max-w-none">
              {result.recommendation.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h4 key={i} className="text-sm font-semibold text-primary mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
                }
                if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) {
                  return <p key={i} className="text-sm text-text-secondary ml-4 mb-1">{line}</p>;
                }
                if (line.trim()) {
                  return <p key={i} className="text-sm text-text-secondary mb-2 leading-relaxed">{line.replace(/\*\*/g, '')}</p>;
                }
                return <br key={i} />;
              })}
            </div>
          </motion.div>

          {/* Row 12: Export */}
          <ReportExport result={result} />
        </div>
      </div>
    </section>
  );
}
