'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Brain,
  Code2,
  Palette,
  Cpu,
  BarChart3,
  Layers,
  GitBranch,
  Sparkles,
  ArrowRight,
  Globe,
  Zap,
  Shield,
  Mail,
  ExternalLink,
  Heart,
} from 'lucide-react';

// ===== VISION SECTION =====
function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-20"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6">
        <Brain className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium text-primary">About the Platform</span>
      </div>

      <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
        About <span className="gradient-text">INFENGINE</span>
      </h1>

      <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed mb-8">
        INFENGINE is a next-generation AI Decision Intelligence Platform that helps users evaluate complex 
        personal, business, and strategic decisions using multiple AI reasoning models.
      </p>

      <div className="max-w-2xl mx-auto rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-6 gradient-border">
        <p className="text-base text-text-secondary italic leading-relaxed">
          &ldquo;Instead of asking AI <strong className="text-text-primary">what should I do?</strong> — 
          INFENGINE asks <strong className="text-primary">why is one decision objectively stronger than another?</strong>&rdquo;
        </p>
      </div>
    </motion.div>
  );
}

// ===== DIFFERENTIATORS =====
function DifferentiatorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const items = [
    { icon: Layers, title: 'Decision Framework', desc: 'Not a simple answer — a complete multi-dimensional analysis framework with 14+ evaluation criteria.' },
    { icon: BarChart3, title: 'Executive Dashboards', desc: 'Interactive visualizations including radar charts, heatmaps, decision trees, Sankey diagrams, and more.' },
    { icon: Shield, title: 'Bias Detection', desc: 'Active cognitive bias identification using established behavioral economics frameworks.' },
    { icon: Zap, title: 'Real-Time Scenarios', desc: 'What-if scenario simulator and sensitivity analysis with instant recalculation.' },
    { icon: GitBranch, title: 'Explainable AI', desc: 'Every recommendation links to reasoning chains. Full transparency — no black-box decisions.' },
    { icon: Globe, title: 'Multi-Model AI', desc: 'Switch between OpenAI GPT, Gemini, Claude, Together AI, and DeepSeek for diverse perspectives.' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <h2 className="font-heading text-3xl font-bold text-center mb-10">
        What Makes It <span className="gradient-text">Different</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-6 card-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ===== TECH STACK =====
function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stacks = [
    {
      category: 'Frontend',
      icon: Code2,
      color: 'text-info',
      techs: [
        { name: 'Next.js 15', desc: 'React framework with App Router' },
        { name: 'React 19', desc: 'UI component library' },
        { name: 'TypeScript', desc: 'Type-safe development' },
        { name: 'Tailwind CSS', desc: 'Utility-first styling' },
        { name: 'Framer Motion', desc: 'Animations & transitions' },
        { name: 'Zustand', desc: 'State management' },
      ],
    },
    {
      category: 'Visualization',
      icon: BarChart3,
      color: 'text-primary',
      techs: [
        { name: 'Recharts', desc: 'Radar, bar, donut, pie charts' },
        { name: 'D3.js', desc: 'Heatmaps, Sankey diagrams' },
        { name: 'React Flow', desc: 'Interactive decision trees' },
        { name: 'Custom SVG', desc: 'Confidence meters, gauges' },
      ],
    },
    {
      category: 'AI & Backend',
      icon: Cpu,
      color: 'text-success',
      techs: [
        { name: 'Vercel AI SDK', desc: 'Unified AI model interface' },
        { name: 'OpenAI GPT-4o', desc: 'Primary reasoning model' },
        { name: 'Google Gemini', desc: 'Advanced analysis' },
        { name: 'Anthropic Claude', desc: 'Nuanced reasoning' },
        { name: 'Together AI', desc: 'Open-source models' },
        { name: 'DeepSeek', desc: 'Deep reasoning' },
      ],
    },
    {
      category: 'Design & UX',
      icon: Palette,
      color: 'text-warning',
      techs: [
        { name: 'Lucide Icons', desc: 'Consistent icon system' },
        { name: 'Space Grotesk', desc: 'Heading typography' },
        { name: 'Inter', desc: 'Body typography' },
        { name: 'IBM Plex Mono', desc: 'Numeric displays' },
        { name: 'Glassmorphism', desc: 'Premium glass effects' },
        { name: 'Custom animations', desc: 'Micro-interactions' },
      ],
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <h2 className="font-heading text-3xl font-bold text-center mb-10">
        Tech <span className="gradient-text">Stack</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stacks.map((stack, i) => {
          const Icon = stack.icon;
          return (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className={`flex items-center gap-3 mb-4 ${stack.color}`}>
                <Icon className="h-5 w-5" />
                <h3 className="font-heading text-lg font-semibold">{stack.category}</h3>
              </div>
              <div className="space-y-2.5">
                {stack.techs.map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">{tech.name}</span>
                    <span className="text-xs text-text-muted">{tech.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ===== CONTACT SECTION =====
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-heading text-3xl font-bold text-center mb-10">
        Get In <span className="gradient-text">Touch</span>
      </h2>

      <div className="max-w-xl mx-auto rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-text-muted mb-6 leading-relaxed">
          INFENGINE is an open project showcasing modern full-stack development, AI integration, 
          data visualization, UX design, and explainable AI in a single cohesive application.
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-secondary hover:border-primary/30 hover:text-primary transition-all"
          >
            <Globe className="h-4 w-4" />
            GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-secondary hover:border-primary/30 hover:text-primary transition-all"
          >
            <Sparkles className="h-4 w-4" />
            LinkedIn
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="mailto:hello@infengine.ai"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-secondary hover:border-primary/30 hover:text-primary transition-all"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover px-6 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-primary/25 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Try INFENGINE Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ===== MAIN PAGE =====
export default function AboutPage() {
  return (
    <section className="min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <VisionSection />
        <DifferentiatorsSection />
        <TechStackSection />
        <ContactSection />
      </div>
    </section>
  );
}
