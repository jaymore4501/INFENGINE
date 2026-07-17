'use client';

import { motion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { AnalysisResult } from '@/lib/types';

// ===== RADAR CHART =====
export function DecisionRadarChart({ result }: { result: AnalysisResult }) {
  const data = result.categoryScores.map((c) => ({
    category: c.category.length > 12 ? c.category.slice(0, 12) + '…' : c.category,
    fullCategory: c.category,
    ...Object.fromEntries(result.options.map((o) => [o.name, c.scores[o.id]])),
  }));

  const colors = ['#FF6A2A', '#60A5FA', '#34D399', '#F59E0B', '#A78BFA'];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-heading text-lg font-semibold mb-1">Multi-Dimensional Comparison</h3>
      <p className="text-xs text-text-muted mb-4">Radar visualization across all {result.categoryScores.length} evaluation criteria</p>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#2A2A2A" />
          <PolarAngleAxis dataKey="category" tick={{ fill: '#8D8D8D', fontSize: 10 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#8D8D8D', fontSize: 10 }} />
          {result.options.map((option, i) => (
            <Radar
              key={option.id}
              name={option.name}
              dataKey={option.name}
              stroke={colors[i % colors.length]}
              fill={colors[i % colors.length]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
          <Tooltip
            contentStyle={{
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '12px',
              color: '#F8F8F8',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ===== BAR CHART =====
export function DecisionBarChart({ result }: { result: AnalysisResult }) {
  const data = result.categoryScores.map((c) => ({
    category: c.category.length > 15 ? c.category.slice(0, 15) + '…' : c.category,
    ...Object.fromEntries(result.options.map((o) => [o.name, c.scores[o.id]])),
  }));

  const colors = ['#FF6A2A', '#60A5FA', '#34D399', '#F59E0B', '#A78BFA'];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-heading text-lg font-semibold mb-1">Category Comparison</h3>
      <p className="text-xs text-text-muted mb-4">Side-by-side scores for each evaluation dimension</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#8D8D8D', fontSize: 11 }} />
          <YAxis type="category" dataKey="category" tick={{ fill: '#8D8D8D', fontSize: 11 }} width={120} />
          {result.options.map((option, i) => (
            <Bar
              key={option.id}
              dataKey={option.name}
              fill={colors[i % colors.length]}
              radius={[0, 4, 4, 0]}
              barSize={12}
            />
          ))}
          <Tooltip
            contentStyle={{
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '12px',
              color: '#F8F8F8',
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ===== DONUT CHART =====
export function CategoryWeightDonut({ result }: { result: AnalysisResult }) {
  const data = result.categoryScores.map((c) => ({
    name: c.category,
    value: c.weight,
  }));

  const COLORS = [
    '#FF6A2A', '#FF8E53', '#FFB088', '#60A5FA', '#34D399',
    '#F59E0B', '#A78BFA', '#EC4899', '#06B6D4', '#84CC16',
    '#F97316', '#8B5CF6', '#14B8A6', '#EF4444',
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-heading text-lg font-semibold mb-1">Criteria Weights</h3>
      <p className="text-xs text-text-muted mb-4">How much each dimension influences the final recommendation</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '12px',
              color: '#F8F8F8',
            }}
            formatter={(value: any) => [`Weight: ${Number(value).toFixed(1)}`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-1.5 mt-4">
        {data.slice(0, 8).map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
            <span className="text-[10px] text-text-muted truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== SCORE CARDS =====
export function ScoreCards({ result }: { result: AnalysisResult }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-heading text-lg font-semibold mb-1">Detailed Scores</h3>
      <p className="text-xs text-text-muted mb-4">All {result.categoryScores.length} evaluation criteria with individual scores</p>
      <div className="space-y-3">
        {result.categoryScores.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-text-secondary font-medium">{cat.category}</span>
              <div className="flex items-center gap-3 font-mono text-xs">
                {result.options.map((o, oi) => {
                  const score = cat.scores[o.id];
                  const isHigher = score === Math.max(...result.options.map(opt => cat.scores[opt.id]));
                  return (
                    <span key={o.id} className={isHigher ? 'text-primary font-bold' : 'text-text-muted'}>
                      {o.name.slice(0, 10)}: {score}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-1.5">
              {result.options.map((o, oi) => (
                <div key={o.id} className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: oi === 0 ? '#FF6A2A' : '#60A5FA' }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${cat.scores[o.id]}%` }}
                    transition={{ duration: 0.6, delay: i * 0.04 + 0.2 }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ===== CONFIDENCE METER =====
export function ConfidenceMeter({ confidence, summary }: { confidence: number; summary: string }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (confidence / 100) * circumference;

  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center">
      <h3 className="font-heading text-lg font-semibold mb-4">AI Confidence</h3>
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="none" stroke="#2A2A2A" strokeWidth="8" />
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="url(#confGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            transform="rotate(-90 60 60)"
          />
          <defs>
            <linearGradient id="confGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6A2A" />
              <stop offset="100%" stopColor="#FF8E53" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-2xl font-bold text-primary">{confidence}%</span>
        </div>
      </div>
      <p className="text-xs text-text-muted text-center mt-4 leading-relaxed max-w-xs">{summary.slice(0, 150)}...</p>
    </div>
  );
}

// ===== WINNER CARD =====
export function WinnerCard({ result }: { result: AnalysisResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-8 orange-glow gradient-border"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🏆</span>
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Recommended Option</span>
      </div>
      <h2 className="font-heading text-3xl font-bold text-text-primary mb-3">{result.winner.optionName}</h2>
      <p className="text-sm text-text-secondary leading-relaxed">{result.winner.summary}</p>
      <div className="mt-5 flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
          <span className="text-xs text-text-muted">Confidence</span>
          <span className="font-mono text-sm font-bold text-primary">{result.winner.confidence}%</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5">
          <span className="text-xs text-text-muted">Scored across</span>
          <span className="font-mono text-sm font-bold text-text-primary">{result.categoryScores.length}</span>
          <span className="text-xs text-text-muted">criteria</span>
        </div>
      </div>
    </motion.div>
  );
}
