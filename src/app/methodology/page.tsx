'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Brain,
  Target,
  SlidersHorizontal,
  BarChart3,
  TrendingUp,
  Search,
  Gauge,
  Sparkles,
  ArrowDown,
  CheckCircle2,
  Eye,
  Shield,
  Lightbulb,
  Layers,
} from 'lucide-react';

const methodologySteps = [
  {
    icon: Brain,
    title: 'Context Understanding',
    subtitle: 'Step 1 — Natural Language Analysis',
    description: 'INFENGINE begins by parsing your natural language input to extract the core decision, identify competing options, understand constraints, and infer your priorities. The AI uses semantic analysis to comprehend nuance, context, and implied preferences.',
    details: [
      'Extracts goals, constraints, and context from free-form text',
      'Identifies the decision type (career, financial, technology, etc.)',
      'Infers stakeholders and success metrics',
      'Detects implicit priorities and concerns',
    ],
    color: 'text-primary',
  },
  {
    icon: Target,
    title: 'Criteria Generation',
    subtitle: 'Step 2 — Dynamic Framework Construction',
    description: 'Rather than using a fixed checklist, INFENGINE generates evaluation criteria tailored to your specific decision domain. A career decision evaluates different dimensions than a technology choice.',
    details: [
      'Generates domain-specific criteria (not a generic checklist)',
      'Identifies 10-15 relevant evaluation dimensions',
      'Considers both quantitative and qualitative factors',
      'Adapts criteria based on user-provided context',
    ],
    color: 'text-info',
  },
  {
    icon: SlidersHorizontal,
    title: 'Dynamic Weight Assignment',
    subtitle: 'Step 3 — Priority Calibration',
    description: 'Each criterion receives a dynamic weight based on the user\'s priorities, decision context, and domain conventions. Users can adjust these weights through the sensitivity analysis interface.',
    details: [
      'AI assigns initial weights based on context analysis',
      'Weights adapt to user-specified priorities (e.g., risk tolerance)',
      'Users can manually adjust through interactive sliders',
      'Weighted scoring prevents any single dimension from dominating',
    ],
    color: 'text-warning',
  },
  {
    icon: BarChart3,
    title: 'Structured Scoring',
    subtitle: 'Step 4 — Multi-Dimensional Evaluation',
    description: 'Each option is scored across every criterion using structured reasoning, factual knowledge, and probabilistic assessment. Scores are on a 0-100 scale with documented rationale for every number.',
    details: [
      'Scores each option 0-100 on every criterion',
      'Uses structured reasoning, not arbitrary assignment',
      'Documents the rationale behind each score',
      'Considers both upside potential and downside risks',
    ],
    color: 'text-success',
  },
  {
    icon: TrendingUp,
    title: 'Scenario Simulation',
    subtitle: 'Step 5 — Outcome Modeling',
    description: 'INFENGINE runs scenario simulations (best case, expected case, worst case) to estimate outcomes under different conditions. This reveals the distribution of possible futures, not just a single prediction.',
    details: [
      'Best case, expected case, and worst case modeling',
      'Market downturn and external shock scenarios',
      'Time-horizon analysis (6mo to 10 years)',
      'Probability-weighted outcome calculations',
    ],
    color: 'text-primary',
  },
  {
    icon: Search,
    title: 'Cognitive Bias Detection',
    subtitle: 'Step 6 — Behavioral Analysis',
    description: 'The system actively identifies cognitive biases that may influence your thinking — confirmation bias, loss aversion, anchoring, status quo bias, and overconfidence — then provides specific de-biasing recommendations.',
    details: [
      'Detects 5+ cognitive biases using behavioral economics frameworks',
      'Severity classification (low, medium, high)',
      'Actionable de-biasing recommendations',
      'Increases decision quality by surfacing blind spots',
    ],
    color: 'text-danger',
  },
  {
    icon: Gauge,
    title: 'Sensitivity Analysis',
    subtitle: 'Step 7 — Robustness Testing',
    description: 'By recalculating recommendations as key assumptions change, INFENGINE reveals whether the conclusion is robust or fragile. If small changes in inputs flip the recommendation, that\'s critical information.',
    details: [
      'Tests recommendation stability across variable parameters',
      'Interactive sliders for real-time recalculation',
      'Identifies which assumptions are "swing factors"',
      'Distinguishes robust from fragile recommendations',
    ],
    color: 'text-info',
  },
  {
    icon: Sparkles,
    title: 'Explainable Recommendation',
    subtitle: 'Step 8 — Transparent Output',
    description: 'The final output is not just "choose A" — it\'s a comprehensive recommendation with confidence levels, trade-off explanations, uncertainties, devil\'s advocate arguments, and concrete next steps. Every score can be inspected.',
    details: [
      'Confidence percentage with detailed justification',
      'Trade-off analysis and hidden cost identification',
      'Devil\'s advocate arguments against the recommendation',
      'Actionable next steps and contingency planning',
    ],
    color: 'text-primary',
  },
];

function StepCard({ step, index }: { step: typeof methodologySteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative"
    >
      {/* Connector */}
      {index < methodologySteps.length - 1 && (
        <div className="absolute left-8 top-full h-8 w-px bg-gradient-to-b from-border to-transparent z-0" />
      )}

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 card-hover gradient-border">
        <div className="flex items-start gap-4 md:gap-6">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ${step.color} flex-shrink-0`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-text-muted">{step.subtitle}</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-3">{step.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">{step.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-text-muted">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MethodologyPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const principlesRef = useRef(null);
  const isPrinciplesInView = useInView(principlesRef, { once: true, margin: '-100px' });

  return (
    <section className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Full Transparency</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Methodology</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            INFENGINE doesn&apos;t give you a black-box answer. It builds a transparent, inspectable decision framework. 
            Here&apos;s exactly how every recommendation is produced.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6 mb-20">
          {methodologySteps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* Principles */}
        <motion.div
          ref={principlesRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isPrinciplesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading text-3xl font-bold text-center mb-10">
            Core <span className="gradient-text">Principles</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Eye,
                title: 'Transparency',
                desc: 'Every score, weight, and reasoning chain is visible and inspectable. No opaque AI decisions.',
              },
              {
                icon: Shield,
                title: 'Bias Awareness',
                desc: 'Active detection of cognitive biases that cloud judgment, with concrete de-biasing strategies.',
              },
              {
                icon: Lightbulb,
                title: 'Explainability',
                desc: 'Not just "what" to choose, but "why" — with evidence chains, trade-offs, and confidence levels.',
              },
            ].map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="rounded-xl border border-border bg-card p-6 text-center card-hover">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{principle.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* What makes it different */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-8 text-center gradient-border"
        >
          <Layers className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold mb-3">What Makes INFENGINE Different</h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Rather than functioning as another conversational assistant, INFENGINE behaves like an AI-powered strategic analyst. 
            It transforms a difficult choice into a structured decision model, visualizes trade-offs with executive-grade dashboards, 
            explains every recommendation, and lets you explore &ldquo;what-if&rdquo; scenarios in real time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
