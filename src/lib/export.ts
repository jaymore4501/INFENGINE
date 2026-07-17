import { AnalysisResult } from './types';
import { jsPDF } from 'jspdf';

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
  y = 24;

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
    const lines = doc.splitTextToSize(text, contentWidth);
    
    const lineHeight = fontSize * 0.45;
    const blockHeight = lines.length * lineHeight + bottomGap;
    
    if (y + blockHeight > 275) {
      doc.addPage();
      pageNum++;
      drawPageHeader();
      y = 24;
    }
    
    lines.forEach((line: string) => {
      doc.text(line, margin, y);
      y += lineHeight;
    });
    
    y += bottomGap;
  };

  // 1. Report Title
  addText('INFENGINE DECISION BRIEF', 22, true, [26, 26, 26], 4, 6);
  
  // Date
  const dateStr = `Generated: ${new Date(result.createdAt).toLocaleString()}`;
  addText(dateStr, 9, false, [120, 120, 120], 8);

  // 2. Decision Prompt Box
  doc.setFillColor(248, 248, 248);
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.2);
  
  const decisionText = `Decision: "${result.decision}"`;
  const decLines = doc.splitTextToSize(decisionText, contentWidth - 10);
  const boxHeight = decLines.length * 6 + 10;
  
  doc.rect(margin, y, contentWidth, boxHeight, 'FD');
  
  let boxY = y + 7;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 26, 26);
  decLines.forEach((line: string) => {
    doc.text(line, margin + 5, boxY);
    boxY += 6;
  });
  
  y += boxHeight + 10;

  // 3. Options
  addText('OPTIONS EVALUATED', 14, true, [26, 26, 26], 4);
  result.options.forEach((o) => {
    addText(`${o.name}`, 11, true, [255, 106, 42], 2);
    addText(o.description || 'No description provided.', 10, false, [74, 74, 74], 6);
  });

  // 4. Recommendation Card (Highlight Box)
  addText('🏆 RECOMMENDATION REPORT', 14, true, [26, 26, 26], 4, 4);
  
  const winnerTitle = `Winner: ${result.winner.optionName} (${result.winner.confidence}% Confidence)`;
  const winLines = doc.splitTextToSize(result.winner.summary, contentWidth - 10);
  const cardHeight = winLines.length * 5 + 18;
  
  if (y + cardHeight > 275) {
    doc.addPage();
    pageNum++;
    drawPageHeader();
    y = 24;
  }
  
  // Highlight light orange-tinted background card
  doc.setFillColor(255, 250, 245);
  doc.setDrawColor(255, 106, 42);
  doc.setLineWidth(0.3);
  doc.rect(margin, y, contentWidth, cardHeight, 'FD');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 106, 42);
  doc.text(winnerTitle, margin + 5, y + 7);
  
  let textY = y + 14;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(74, 74, 74);
  winLines.forEach((line: string) => {
    doc.text(line, margin + 5, textY);
    textY += 5;
  });
  
  y += cardHeight + 12;

  // 5. Category Matrix Scores Table
  addText('📊 CATEGORY SCORE MATRIX', 14, true, [26, 26, 26], 4);
  
  const colWidths = [contentWidth * 0.45, contentWidth * 0.2, contentWidth * 0.2, contentWidth * 0.15];
  const headers = ['Evaluation Dimension', result.options[0]?.name || 'Option A', result.options[1]?.name || 'Option B', 'Weight'];
  const tableRowHeight = 8;
  const tableHeight = (result.categoryScores.length + 1) * tableRowHeight;
  
  if (y + tableHeight > 275) {
    doc.addPage();
    pageNum++;
    drawPageHeader();
    y = 24;
  }

  // Draw Header Row
  doc.setFillColor(26, 26, 26);
  doc.rect(margin, y, contentWidth, tableRowHeight, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  
  let cursorX = margin;
  headers.forEach((h, i) => {
    doc.text(h, cursorX + 2, y + 5.5);
    cursorX += colWidths[i];
  });
  y += tableRowHeight;

  // Draw Rows
  result.categoryScores.forEach((row, rowIndex) => {
    // Alternating rows
    doc.setFillColor(rowIndex % 2 === 0 ? 245 : 255, rowIndex % 2 === 0 ? 245 : 255, rowIndex % 2 === 0 ? 245 : 255);
    doc.rect(margin, y, contentWidth, tableRowHeight, 'F');
    
    // Bottom border gridline
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.15);
    doc.line(margin, y + tableRowHeight, margin + contentWidth, y + tableRowHeight);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(74, 74, 74);
    
    let cellX = margin;
    
    // Dim Name
    doc.text(row.category, cellX + 2, y + 5.5);
    cellX += colWidths[0];
    
    // Opt 1 Score
    doc.text(String(row.scores[result.options[0]?.id] || '0'), cellX + 2, y + 5.5);
    cellX += colWidths[1];
    
    // Opt 2 Score
    doc.text(String(row.scores[result.options[1]?.id] || '0'), cellX + 2, y + 5.5);
    cellX += colWidths[2];
    
    // Weight
    doc.text(row.weight.toFixed(1), cellX + 2, y + 5.5);
    
    y += tableRowHeight;
  });
  
  y += 12;

  // 6. Timeline Forecast
  addText('🔮 FUTURE TIMELINE PROJECTIONS', 14, true, [26, 26, 26], 4, 4);
  result.timeline.forEach((t) => {
    addText(t.period, 11, true, [255, 106, 42], 2);
    result.options.forEach((opt) => {
      const outcome = t.outcomes[opt.id] || 'No timeline forecast available.';
      addText(`• ${opt.name}: ${outcome}`, 10, false, [74, 74, 74], 4);
    });
    y += 2;
  });

  y += 4;

  // 7. Risk Heatmap
  addText('⚠️ CRITICAL RISK FACTORS', 14, true, [26, 26, 26], 4, 4);
  result.risks.forEach((r) => {
    const riskLevelColor = r.level === 'critical' || r.level === 'high' ? [220, 38, 38] as [number, number, number] : [217, 119, 6] as [number, number, number];
    addText(`${r.factor} (${r.level.toUpperCase()})`, 11, true, riskLevelColor, 2);
    addText(`Risk: ${r.description}`, 10, false, [74, 74, 74], 2);
    addText(`Mitigation: ${r.mitigation}`, 10, false, [26, 26, 26], 6);
  });

  // 8. Bias Auditor
  addText('🧠 COGNITIVE BIAS DETECTION', 14, true, [26, 26, 26], 4, 4);
  result.biases.forEach((b) => {
    addText(b.biasType, 11, true, [147, 51, 234], 2);
    addText(`Indicator: ${b.description}`, 10, false, [74, 74, 74], 2);
    addText(`De-biasing Step: ${b.recommendation}`, 10, false, [26, 26, 26], 6);
  });

  // 9. Devil's Advocate
  addText(`😈 DEVIL'S ADVOCATE REPORT (Against ${result.devilsAdvocate.againstOption})`, 14, true, [26, 26, 26], 4, 4);
  addText('Challenging Arguments:', 11, true, [74, 74, 74], 2);
  result.devilsAdvocate.arguments.forEach((arg, i) => {
    addText(`${i + 1}. ${arg}`, 10, false, [74, 74, 74], 4);
  });
  
  addText('Counter-Balance Counterpoints:', 11, true, [74, 74, 74], 2, 2);
  result.devilsAdvocate.counterPoints.forEach((cp, i) => {
    addText(`${i + 1}. ${cp}`, 10, false, [74, 74, 74], 4);
  });

  y += 6;

  // 10. Core Reasonings
  addText('💡 REASONING & STRATEGIC TRADE-OFFS', 14, true, [26, 26, 26], 4, 4);
  
  addText('Main Reasons:', 11, true, [26, 26, 26], 2);
  result.reasoning.mainReasons.forEach((r) => addText(`- ${r}`, 10, false, [74, 74, 74], 3));
  
  addText('Key Trade-offs:', 11, true, [26, 26, 26], 2, 2);
  result.reasoning.tradeoffs.forEach((t) => addText(`- ${t}`, 10, false, [74, 74, 74], 3));
  
  addText('Hidden Costs:', 11, true, [26, 26, 26], 2, 2);
  result.reasoning.hiddenCosts.forEach((hc) => addText(`- ${hc}`, 10, false, [74, 74, 74], 3));

  addText('Long-Term Effects:', 11, true, [26, 26, 26], 2, 2);
  result.reasoning.longTermEffects.forEach((lte) => addText(`- ${lte}`, 10, false, [74, 74, 74], 3));

  y += 10;

  // 11. Footer Methodology Notes
  addText('Methodology Notes:', 10, true, [26, 26, 26], 2);
  addText(result.methodology, 9, false, [120, 120, 120], 6);

  addText('*Report generated by INFENGINE Decision Intelligence Platform*', 9, false, [150, 150, 150], 4, 4);

  // Trigger Save File
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
    ...result.options.map((o) => `- **${o.name}**: ${o.description || ''}`),
    ``,
    `---`,
    ``,
    `## 🏆 Recommendation`,
    ``,
    `**Winner: ${result.winner.optionName}** (${result.winner.confidence}% confidence)`,
    ``,
    result.winner.summary,
    ``,
    `---`,
    ``,
    `## 📊 Category Scores`,
    ``,
    `| Category | ${result.options.map(o => o.name).join(' | ')} | Weight |`,
    `| --- | ${result.options.map(() => '---').join(' | ')} | --- |`,
    ...result.categoryScores.map(c =>
      `| ${c.category} | ${result.options.map(o => `${c.scores[o.id]}/100`).join(' | ')} | ${c.weight.toFixed(1)} |`
    ),
    ``,
    `---`,
    ``,
    `## 🔮 Future Timeline`,
    ``,
    ...result.timeline.flatMap(t => [
      `### ${t.period}`,
      ...result.options.map(o => `- **${o.name}:** ${t.outcomes[o.id]}`),
      ``,
    ]),
    `---`,
    ``,
    `## ⚠️ Risk Assessment`,
    ``,
    ...result.risks.map(r =>
      `- **${r.factor}** (${r.level.toUpperCase()}): ${r.description}\n  - *Mitigation:* ${r.mitigation}`
    ),
    ``,
    `---`,
    ``,
    `## 🧠 Cognitive Bias Detection`,
    ``,
    ...result.biases.map(b =>
      `- **${b.biasType}** (${b.severity}): ${b.description}\n  - *Recommendation:* ${b.recommendation}`
    ),
    ``,
    `---`,
    ``,
    `## 😈 Devil's Advocate (Against ${result.devilsAdvocate.againstOption})`,
    ``,
    ...result.devilsAdvocate.arguments.map((a, i) => `${i + 1}. ${a}`),
    ``,
    `### Counter-Points`,
    ...result.devilsAdvocate.counterPoints.map((c, i) => `${i + 1}. ${c}`),
    ``,
    `---`,
    ``,
    `## 💡 Reasoning`,
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
    `Winner: ${result.winner.optionName}`,
    `Confidence: ${result.winner.confidence}%`,
    ``,
    result.winner.summary,
    ``,
    `KEY SCORES`,
    `-`.repeat(30),
    ...result.categoryScores.slice(0, 5).map(c =>
      `${c.category}: ${result.options.map(o => `${o.name}=${c.scores[o.id]}`).join(' vs ')}`
    ),
    ``,
    `TOP RISKS`,
    `-`.repeat(30),
    ...result.risks.filter(r => r.level === 'high' || r.level === 'critical').map(r =>
      `[${r.level.toUpperCase()}] ${r.factor}: ${r.description}`
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
