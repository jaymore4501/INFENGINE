import { AnalysisResult } from './types';
import { jsPDF } from 'jspdf';

// Clean text formatting helpers
function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '') // Remove bold asterisks
    .replace(/\*/g, '')   // Remove italic asterisks
    .replace(/`/g, '')    // Remove backticks
    .replace(/__+/g, '')  // Remove double underscores
    .replace(/#+/g, '');  // Remove markdown headers hashes
}

export function exportToJSON(result: AnalysisResult): void {
  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `infengine-analysis-${Date.now()}.json`);
}

export function exportToMarkdown(result: AnalysisResult): void {
  const md = generateMarkdownReport(result);
  const blob = new Blob([md], { type: 'text/markdown' });
  downloadBlob(blob, `infengine-analysis-${Date.now()}.md`);
}

export function exportToExecutiveSummary(result: AnalysisResult): void {
  const summary = generateExecutiveSummary(result);
  const blob = new Blob([summary], { type: 'text/plain' });
  downloadBlob(blob, `infengine-executive-summary-${Date.now()}.txt`);
}

export function exportToPDF(result: AnalysisResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  let y = 20;
  let pageNum = 1;

  // Header helper
  const drawPageHeader = () => {
    // Top border accent line in primary orange
    doc.setFillColor(255, 106, 42);
    doc.rect(0, 0, pageWidth, 4, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('INFENGINE AI DECISION INTELLIGENCE REPORT', margin, 12);
    doc.text(`Page ${pageNum}`, pageWidth - margin - 12, 12);

    // Light line divider
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.2);
    doc.line(margin, 14, pageWidth - margin, 14);
  };

  // Setup first page
  drawPageHeader();
  y = 22;

  // Helper for text formatting and layout with auto pagination
  const addText = (
    text: string,
    fontSize: number,
    isBold: boolean,
    color: [number, number, number] = [74, 74, 74],
    bottomGap = 4,
    topGap = 0
  ): void => {
    y += topGap;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(stripMarkdown(text), contentWidth - 10);
    
    const lineHeight = fontSize * 0.45;
    const blockHeight = lines.length * lineHeight + bottomGap;
    
    if (y + blockHeight > 275) {
      doc.addPage();
      pageNum++;
      drawPageHeader();
      y = 22;
    }
    
    lines.forEach((line: string) => {
      doc.text(line, margin + 5, y);
      y += lineHeight;
    });
    
    y += bottomGap;
  };

  // Drawer helper for structural rounded container boxes (cards)
  const drawSectionBox = (title: string, heightEstimate: number, renderContent: () => void) => {
    // Check if it fits on this page, push to next page if not
    if (y + heightEstimate > 272) {
      doc.addPage();
      pageNum++;
      drawPageHeader();
      y = 22;
    }

    const startY = y;
    const headerHeight = 7;
    
    // Reserve space for header tab
    y += headerHeight + 3;
    
    // Render content
    renderContent();
    
    // Calculate final box height
    const finalHeight = y - startY + 2;
    
    // Draw outer rounded border rectangle
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, startY, contentWidth, finalHeight, 2, 2, 'D');
    
    // Draw header box block
    doc.setFillColor(26, 26, 26);
    doc.rect(margin + 0.15, startY + 0.15, contentWidth - 0.3, headerHeight, 'F');
    
    // Render section title inside header block
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 5, startY + 4.8);
    
    // Push page cursor down below the container box
    y += 8;
  };

  // Recursive printer for Decision Tree node structures
  const formatDecisionTree = (node: any, prefix = ''): string[] => {
    if (!node) return [];
    let lines: string[] = [];
    
    let label = node.label;
    if (node.probability) label += ` (${node.probability}% Prob)`;
    if (node.outcome) label += ` ➜ Outcome: ${node.outcome}`;
    
    lines.push(`${prefix}${label}`);
    
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any, idx: number) => {
        const isLast = idx === node.children.length - 1;
        const childPrefix = prefix + (isLast ? '└── ' : '├── ');
        const nextPrefix = prefix + (isLast ? '    ' : '│   ');
        lines.push(...formatDecisionTree(child, childPrefix));
      });
    }
    return lines;
  };

  // ==================== PAGE 1 ====================
  // Report Title
  addText('INFENGINE DECISION BRIEF', 22, true, [26, 26, 26], 3, 4);
  const dateStr = `Generated: ${new Date(result.createdAt).toLocaleString()}`;
  addText(dateStr, 9, false, [120, 120, 120], 8);

  // Box 1: Decision Details
  drawSectionBox('Decision Context', 35, () => {
    addText(`Decision prompt analyzed by INFENGINE Core AI:`, 9, true, [100, 100, 100], 3);
    addText(`"${capitalize(result.decision)}"`, 11, true, [26, 26, 26], 4);
  });

  // Box 2: Options Evaluated
  drawSectionBox('Options Evaluated', 45, () => {
    result.options.forEach((o, i) => {
      addText(`${capitalize(o.name)}`, 10.5, true, [255, 106, 42], 1.5, i > 0 ? 3 : 0);
      addText(o.description || 'No description provided.', 9.5, false, [74, 74, 74], 4);
    });
  });

  // Box 3: Recommendation
  drawSectionBox('Recommendation Report', 60, () => {
    const winnerTitle = `Winner: ${capitalize(result.winner.optionName)} (${result.winner.confidence}% Confidence)`;
    addText(winnerTitle, 11, true, [255, 106, 42], 3);
    addText(result.winner.summary, 9.5, false, [74, 74, 74], 4);
  });

  // ==================== PAGE 2 ====================
  // Box 4: Category Matrix scores
  drawSectionBox('Category Score Matrix', 85, () => {
    const colWidths = [contentWidth * 0.45, contentWidth * 0.2, contentWidth * 0.2, contentWidth * 0.15];
    const headers = ['Evaluation Dimension', capitalize(result.options[0]?.name || 'Option A'), capitalize(result.options[1]?.name || 'Option B'), 'Weight'];
    const tableRowHeight = 7;
    
    // Draw Header Row
    doc.setFillColor(40, 40, 40);
    doc.rect(margin + 0.15, y, contentWidth - 0.3, tableRowHeight, 'F');
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    
    let cursorX = margin;
    headers.forEach((h, i) => {
      doc.text(h, cursorX + 2, y + 4.8);
      cursorX += colWidths[i];
    });
    y += tableRowHeight;

    // Draw Rows
    result.categoryScores.forEach((row, rowIndex) => {
      doc.setFillColor(rowIndex % 2 === 0 ? 246 : 255, rowIndex % 2 === 0 ? 246 : 255, rowIndex % 2 === 0 ? 246 : 255);
      doc.rect(margin + 0.15, y, contentWidth - 0.3, tableRowHeight, 'F');
      
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.1);
      doc.line(margin + 0.15, y + tableRowHeight, margin + contentWidth - 0.15, y + tableRowHeight);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(74, 74, 74);
      doc.setFontSize(8.5);
      
      let cellX = margin;
      
      doc.text(row.category, cellX + 2, y + 4.8);
      cellX += colWidths[0];
      
      doc.text(String(row.scores[result.options[0]?.id] || '0'), cellX + 2, y + 4.8);
      cellX += colWidths[1];
      
      doc.text(String(row.scores[result.options[1]?.id] || '0'), cellX + 2, y + 4.8);
      cellX += colWidths[2];
      
      doc.text(row.weight.toFixed(1), cellX + 2, y + 4.8);
      
      y += tableRowHeight;
    });
  });

  // Box 5: Visual Score Comparison Chart
  drawSectionBox('Visual Score Comparison', 80, () => {
    const categories = result.categoryScores;
    const labelWidth = 45;
    const barTrackWidth = contentWidth - labelWidth - 25; // Remaining width for bars

    // Legend
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    // Opt A Legend
    doc.setFillColor(255, 106, 42);
    doc.rect(margin + labelWidth + 5, y, 4, 3, 'F');
    doc.setTextColor(74, 74, 74);
    doc.text(capitalize(result.options[0]?.name || 'Option A'), margin + labelWidth + 11, y + 2.5);

    // Opt B Legend
    doc.setFillColor(100, 116, 139);
    doc.rect(margin + labelWidth + 45, y, 4, 3, 'F');
    doc.text(capitalize(result.options[1]?.name || 'Option B'), margin + labelWidth + 51, y + 2.5);

    y += 8;

    categories.forEach((c) => {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(26, 26, 26);
      doc.text(c.category, margin + 4, y + 4.2);

      const scoreA = c.scores[result.options[0]?.id] || 0;
      const scoreB = c.scores[result.options[1]?.id] || 0;

      const barWidthA = (scoreA / 100) * barTrackWidth;
      const barWidthB = (scoreB / 100) * barTrackWidth;

      // Option A Bar
      doc.setFillColor(255, 106, 42);
      doc.rect(margin + labelWidth + 5, y, barWidthA, 2.2, 'F');
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(String(scoreA), margin + labelWidth + barWidthA + 6.5, y + 1.8);

      // Option B Bar
      doc.setFillColor(100, 116, 139);
      doc.rect(margin + labelWidth + 5, y + 3.2, barWidthB, 2.2, 'F');
      doc.text(String(scoreB), margin + labelWidth + barWidthB + 6.5, y + 5);

      // Draw subtle grid line below this category row
      doc.setDrawColor(240, 240, 240);
      doc.setLineWidth(0.1);
      doc.line(margin + 4, y + 6.8, margin + contentWidth - 4, y + 6.8);

      y += 7.8;
    });
  });

  // Box 6: Timeline Projections
  drawSectionBox('Future Timeline Projections', 65, () => {
    result.timeline.forEach((t, i) => {
      addText(t.period, 10, true, [255, 106, 42], 2, i > 0 ? 3 : 0);
      result.options.forEach((opt) => {
        const outcome = t.outcomes[opt.id] || 'No timeline forecast available.';
        addText(`- ${capitalize(opt.name)}: ${outcome}`, 9, false, [74, 74, 74], 3);
      });
    });
  });

  // Box 7: Scenario Simulations
  drawSectionBox('Scenario Simulations', 65, () => {
    result.scenarioSimulations.forEach((sim, i) => {
      addText(sim.scenario, 10, true, [255, 106, 42], 2, i > 0 ? 3 : 0);
      result.options.forEach((opt) => {
        const data = sim.impact[opt.id];
        if (data) {
          const dirSymbol = data.change >= 0 ? '+' : '';
          addText(`- ${capitalize(opt.name)}: ${dirSymbol}${data.change}% Impact ➜ ${data.explanation}`, 9, false, [74, 74, 74], 3);
        }
      });
    });
  });

  // Box 8: Evidence Chain
  drawSectionBox('Evidence & Validation Chain', 65, () => {
    result.evidenceChain.forEach((ev, i) => {
      addText(`Claim: ${ev.claim} (Confidence: ${ev.confidence}%)`, 10, true, [147, 51, 234], 2, i > 0 ? 3 : 0);
      addText(`Reasoning: ${ev.reasoning}`, 9, false, [74, 74, 74], 2.5);
      addText(`Supporting Factors: ${ev.factors.join(', ')}`, 8.5, false, [120, 120, 120], 4);
    });
  });

  // Box 9: Decision Tree
  drawSectionBox('Decision Tree Analysis', 65, () => {
    addText('Interactive tree nodes parsed from probabilistic modeling layer:', 9.5, true, [100, 100, 100], 3);
    const treeLines = formatDecisionTree(result.decisionTree);
    doc.setFont('courier', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(26, 26, 26);
    treeLines.forEach((line) => {
      if (y + 5 > 275) {
        doc.addPage();
        pageNum++;
        drawPageHeader();
        y = 22;
      }
      doc.text(line, margin + 5, y);
      y += 5;
    });
  });

  // Box 10: Critical Risks
  drawSectionBox('Risk Assessment & Mitigation', 65, () => {
    result.risks.forEach((r, i) => {
      const riskColor = r.level === 'critical' || r.level === 'high' ? [220, 38, 38] as [number, number, number] : [217, 119, 6] as [number, number, number];
      addText(`${capitalize(r.factor)} (Severity: ${r.level.toUpperCase()})`, 10, true, riskColor, 1.5, i > 0 ? 3 : 0);
      addText(`Assessment: ${r.description}`, 9, false, [74, 74, 74], 1.5);
      addText(`Mitigation: ${r.mitigation}`, 9, false, [26, 26, 26], 4.5);
    });
  });

  // Box 11: Cognitive Biases
  drawSectionBox('Cognitive Bias Auditor', 60, () => {
    result.biases.forEach((b, i) => {
      addText(`${b.biasType} (Severity: ${b.severity.toUpperCase()})`, 10, true, [147, 51, 234], 1.5, i > 0 ? 3 : 0);
      addText(`Indicator: ${b.description}`, 9, false, [74, 74, 74], 1.5);
      addText(`De-biasing Recommendation: ${b.recommendation}`, 9, false, [26, 26, 26], 4.5);
    });
  });

  // Box 12: Devil's Advocate
  drawSectionBox(`Devil's Advocate Analysis (Against ${capitalize(result.devilsAdvocate.againstOption)})`, 65, () => {
    addText('Core Challenging Arguments:', 10.5, true, [220, 38, 38], 2);
    result.devilsAdvocate.arguments.forEach((arg, i) => {
      addText(`${i + 1}. ${arg}`, 9.5, false, [74, 74, 74], 3);
    });
    
    addText('Counter-Balance Counterpoints:', 10.5, true, [16, 185, 129], 2, 3);
    result.devilsAdvocate.counterPoints.forEach((cp, i) => {
      addText(`${i + 1}. ${cp}`, 9.5, false, [74, 74, 74], 3);
    });
  });

  // Box 13: Core Reasonings
  drawSectionBox('Reasoning & Strategic Trade-offs', 80, () => {
    addText('Main Reasons:', 10.5, true, [26, 26, 26], 2);
    result.reasoning.mainReasons.forEach((r) => addText(`- ${r}`, 9.5, false, [74, 74, 74], 2.5));
    
    addText('Key Trade-offs:', 10.5, true, [26, 26, 26], 2, 3.5);
    result.reasoning.tradeoffs.forEach((t) => addText(`- ${t}`, 9.5, false, [74, 74, 74], 2.5));
    
    addText('Hidden Costs:', 10.5, true, [26, 26, 26], 2, 3.5);
    result.reasoning.hiddenCosts.forEach((hc) => addText(`- ${hc}`, 9.5, false, [74, 74, 74], 2.5));

    addText('Long-Term Effects:', 10.5, true, [26, 26, 26], 2, 3.5);
    result.reasoning.longTermEffects.forEach((lte) => addText(`- ${lte}`, 9.5, false, [74, 74, 74], 2.5));
  });

  // Box 14: Platform Methodology
  drawSectionBox('Analytical Methodology', 35, () => {
    addText(result.methodology, 8.5, false, [120, 120, 120], 3);
    addText('*Document generated by INFENGINE AI Decision Intelligence Platform. All data matches verified sandbox analysis.*', 8, false, [150, 150, 150], 3, 2);
  });

  // Save PDF as file
  doc.save(`infengine-analysis-report-${Date.now()}.pdf`);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateMarkdownReport(result: AnalysisResult): string {
  const lines: string[] = [
    `# INFENGINE Decision Analysis Report`,
    ``,
    `**Generated:** ${new Date(result.createdAt).toLocaleString()}`,
    ``,
    `## Decision`,
    `> ${result.decision}`,
    ``,
    `## Options Evaluated`,
    ...result.options.map((o) => `- **${capitalize(o.name)}**: ${o.description || ''}`),
    ``,
    `---`,
    ``,
    `## Recommendation`,
    ``,
    `**Winner: ${capitalize(result.winner.optionName)}** (${result.winner.confidence}% confidence)`,
    ``,
    result.winner.summary,
    ``,
    `---`,
    ``,
    `## Category Scores`,
    ``,
    `| Category | ${result.options.map(o => capitalize(o.name)).join(' | ')} | Weight |`,
    `| --- | ${result.options.map(() => '---').join(' | ')} | --- |`,
    ...result.categoryScores.map(c =>
      `| ${c.category} | ${result.options.map(o => `${c.scores[o.id]}/100`).join(' | ')} | ${c.weight.toFixed(1)} |`
    ),
    ``,
    `---`,
    ``,
    `## Future Timeline`,
    ``,
    ...result.timeline.flatMap(t => [
      `### ${t.period}`,
      ...result.options.map(o => `- **${capitalize(o.name)}:** ${t.outcomes[o.id]}`),
      ``,
    ]),
    `---`,
    ``,
    `## Risk Assessment`,
    ``,
    ...result.risks.map(r =>
      `- **${capitalize(r.factor)}** (${r.level.toUpperCase()}): ${r.description}\n  - *Mitigation:* ${r.mitigation}`
    ),
    ``,
    `---`,
    ``,
    `## Cognitive Bias Detection`,
    ``,
    ...result.biases.map(b =>
      `- **${b.biasType}** (${b.severity}): ${b.description}\n  - *Recommendation:* ${b.recommendation}`
    ),
    ``,
    `---`,
    ``,
    `## Devil's Advocate (Against ${capitalize(result.devilsAdvocate.againstOption)})`,
    ``,
    ...result.devilsAdvocate.arguments.map((a, i) => `${i + 1}. ${a}`),
    ``,
    `### Counter-Points`,
    ...result.devilsAdvocate.counterPoints.map((c, i) => `${i + 1}. ${c}`),
    ``,
    `---`,
    ``,
    `## Reasoning`,
    ``,
    `### Main Reasons`,
    ...result.reasoning.mainReasons.map(r => `- ${r}`),
    ``,
    `### Trade-offs`,
    ...result.reasoning.tradeoffs.map(r => `- ${r}`),
    ``,
    `### Hidden Costs`,
    ...result.reasoning.hiddenCosts.map(r => `- ${r}`),
    ``,
    `### Long-Term Effects`,
    ...result.reasoning.longTermEffects.map(r => `- ${r}`),
    ``,
    `---`,
    ``,
    `## Methodology`,
    ``,
    result.methodology,
    ``,
    `---`,
    ``,
    `*Report generated by INFENGINE AI Decision Intelligence Platform*`,
  ];

  return lines.join('\n');
}

function generateExecutiveSummary(result: AnalysisResult): string {
  return [
    `INFENGINE — Executive Summary`,
    `${'='.repeat(50)}`,
    ``,
    `Decision: ${result.decision}`,
    `Date: ${new Date(result.createdAt).toLocaleString()}`,
    ``,
    `RECOMMENDATION`,
    `-`.repeat(30),
    `Winner: ${capitalize(result.winner.optionName)}`,
    `Confidence: ${result.winner.confidence}%`,
    ``,
    result.winner.summary,
    ``,
    `KEY SCORES`,
    `-`.repeat(30),
    ...result.categoryScores.slice(0, 5).map(c =>
      `${c.category}: ${result.options.map(o => `${capitalize(o.name)}=${c.scores[o.id]}`).join(' vs ')}`
    ),
    ``,
    `TOP RISKS`,
    `-`.repeat(30),
    ...result.risks.filter(r => r.level === 'high' || r.level === 'critical').map(r =>
      `[${r.level.toUpperCase()}] ${capitalize(r.factor)}: ${r.description}`
    ),
    ``,
    `BIASES DETECTED`,
    `-`.repeat(30),
    ...result.biases.map(b => `[${b.severity.toUpperCase()}] ${b.biasType}`),
    ``,
    `NEXT STEPS`,
    `-`.repeat(30),
    result.recommendation,
  ].join('\n');
}
