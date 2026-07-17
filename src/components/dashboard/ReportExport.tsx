'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '@/lib/types';
import { exportToJSON, exportToMarkdown, exportToExecutiveSummary } from '@/lib/export';
import {
  Download,
  FileText,
  FileJson,
  FileSpreadsheet,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

export function ReportExport({ result }: { result: AnalysisResult }) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleExport = async (type: string) => {
    setDownloading(type);
    await new Promise((r) => setTimeout(r, 500)); // Brief animation delay

    switch (type) {
      case 'markdown':
        exportToMarkdown(result);
        break;
      case 'json':
        exportToJSON(result);
        break;
      case 'executive':
        exportToExecutiveSummary(result);
        break;
    }

    setTimeout(() => setDownloading(null), 1000);
  };

  const exports = [
    { id: 'markdown', label: 'Markdown Report', desc: 'Full analysis in Markdown format', icon: FileText },
    { id: 'executive', label: 'Executive Summary', desc: 'Concise decision brief', icon: FileSpreadsheet },
    { id: 'json', label: 'JSON Data', desc: 'Raw structured data export', icon: FileJson },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-1">
        <Download className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold">Export Report</h3>
      </div>
      <p className="text-xs text-text-muted mb-4">Download your analysis in multiple formats</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {exports.map((exp) => {
          const Icon = exp.icon;
          const isDownloading = downloading === exp.id;
          const isDone = downloading === null && false; // Reset after animation

          return (
            <motion.button
              key={exp.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleExport(exp.id)}
              disabled={isDownloading}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface/50 p-4 transition-all hover:border-primary/30 hover:bg-surface disabled:opacity-70"
            >
              {isDownloading ? (
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              ) : downloading === exp.id ? (
                <CheckCircle2 className="h-6 w-6 text-success" />
              ) : (
                <Icon className="h-6 w-6 text-text-muted" />
              )}
              <span className="text-sm font-medium text-text-primary">{exp.label}</span>
              <span className="text-[10px] text-text-muted text-center">{exp.desc}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
