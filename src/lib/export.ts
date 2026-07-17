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

  // Helper to draw a solid background section separator banner
  const drawSectionHeader = (title: string, topPadding = 4) => {
    y += topPadding;
    
    // Check page break
    if (y + 12 > 275) {
      doc.addPage();
      pageNum++;
      drawPageHeader();
      y = 24;
    }

    doc.setFillColor(28, 28, 30);
    doc.rect(margin, y, contentWidth, 8, 'F');
    
    // Highlight left border block on header in primary orange
    doc.setFillColor(255, 106, 42);
    doc.rect(margin, y, 1.5, 8, 'F');

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(title, margin + 4, y + 5.5);
    y += 12;
  };

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
    const lines = doc.splitTextToSize(stripMarkdown(text), contentWidth);
    
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

  const forceNewPage = () => {
    doc.addPage();
    pageNum++;
    drawPageHeader();
    y = 24;
  };

  // ==========================================
  // PAGE 1: OVERVIEW & EXECUTIVE SUMMARY
  // ==========================================
  drawPageHeader();
  y = 24;

  // Report Title
  addText('INFENGINE DECISION BRIEF', 22, true, [26, 26, 26], 4, 6);
  
  // Date
  const dateStr = `Generated: ${new Date(result.createdAt).toLocaleString()}`;
  addText(dateStr, 9, false, [120, 120, 120], 10);

  // Decision Prompt Card
  drawSectionHeader('THE DECISION QUERY');
  doc.setFillColor(248, 248, 248);
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.2);
  const decisionText = `"${capitalize(result.decision)}"`;
  const decLines = doc.splitTextToSize(stripMarkdown(decisionText), contentWidth - 10);
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

  // Options Evaluated
  drawSectionHeader('OPTIONS EVALUATED');
  result.options.forEach((o) => {
    addText(capitalize(o.name), 10.5, true, [255, 106, 42], 1.5);
    addText(o.description || 'No description provided.', 9.5, false, [74, 74, 74], 6);
  });
  y += 4;

  // Executive Summary Card
  drawSectionHeader('EXECUTIVE SUMMARY');
  const execLines = doc.splitTextToSize(stripMarkdown(result.executiveSummary || 'No executive summary provided.'), contentWidth - 10);
  const execCardHeight = execLines.length * 5 + 10;
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.25);
  doc.rect(margin, y, contentWidth, execCardHeight, 'FD');
  
  let execY = y + 7;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(74, 74, 74);
  execLines.forEach((line: string) => {
    doc.text(line, margin + 5, execY);
    execY += 5;
  });
  y += execCardHeight + 10;

  // ==========================================
  // PAGE 2: RECOMMENDATION & RADAR CHART
  // ==========================================
  forceNewPage();

  // Recommendation Card (Highlight Box)
  drawSectionHeader('RECOMMENDATION ANALYSIS', 4);
  
  const winnerTitle = `Winner: ${capitalize(result.winner.optionName)} (${result.winner.confidence}% Confidence)`;
  const winLines = doc.splitTextToSize(stripMarkdown(result.winner.summary), contentWidth - 10);
  const cardHeight = winLines.length * 5 + 18;
  
  // Highlight light orange-tinted background card
  doc.setFillColor(255, 250, 245);
  doc.setDrawColor(255, 106, 42);
  doc.setLineWidth(0.35);
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

  // Multi-Dimensional Radar Visualization
  drawSectionHeader('MULTI-DIMENSIONAL COMPARISON RADAR');
  addText('Spider matrix mapping options across all 14 evaluation criteria (0-100 scale)', 9, false, [120, 120, 120], 6);

  const cx = pageWidth / 2;
  const cy = y + 42;
  const R = 32;
  const N = result.categoryScores.length;

  // Draw Legend
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  
  // Option A Legend
  doc.setFillColor(255, 106, 42);
  doc.rect(margin + 20, y + 6, 4, 3, 'F');
  doc.setTextColor(74, 74, 74);
  doc.text(capitalize(result.options[0]?.name || 'Option A'), margin + 26, y + 8.5);

  // Option B Legend
  doc.setFillColor(100, 116, 139);
  doc.rect(pageWidth - margin - 50, y + 6, 4, 3, 'F');
  doc.text(capitalize(result.options[1]?.name || 'Option B'), pageWidth - margin - 44, y + 8.5);

  // Concentric polygon grid levels (20, 40, 60, 80, 100)
  for (let level = 1; level <= 5; level++) {
    const r = (level / 5) * R;
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.15);
    for (let i = 0; i < N; i++) {
      const angle1 = (i * 2 * Math.PI) / N - Math.PI / 2;
      const angle2 = (((i + 1) % N) * 2 * Math.PI) / N - Math.PI / 2;
      
      const x1 = cx + r * Math.cos(angle1);
      const y1 = cy + r * Math.sin(angle1);
      const x2 = cx + r * Math.cos(angle2);
      const y2 = cy + r * Math.sin(angle2);
      
      doc.line(x1, y1, x2, y2);
    }
  }

  // Draw Radial Axis Lines and Labels
  for (let i = 0; i < N; i++) {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    const ax = cx + R * Math.cos(angle);
    const ay = cy + R * Math.sin(angle);

    // Axis line
    doc.setDrawColor(235, 235, 235);
    doc.setLineWidth(0.2);
    doc.line(cx, cy, ax, ay);

    // Axis label
    const label = result.categoryScores[i]?.category || '';
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(110, 110, 110);

    const lx = cx + (R + 3.5) * Math.cos(angle);
    const ly = cy + (R + 3.5) * Math.sin(angle);

    let align: 'left' | 'right' | 'center' = 'center';
    const cosVal = Math.cos(angle);
    if (cosVal > 0.15) align = 'left';
    else if (cosVal < -0.15) align = 'right';

    if (align === 'left') {
      doc.text(label, lx, ly + 1);
    } else if (align === 'right') {
      const wText = doc.getTextWidth(label);
      doc.text(label, lx - wText, ly + 1);
    } else {
      const wText = doc.getTextWidth(label);
      doc.text(label, lx - wText / 2, ly + 1);
    }
  }

  // Draw Option A (Orange) Polygon
  doc.setDrawColor(255, 106, 42);
  doc.setLineWidth(0.65);
  for (let i = 0; i < N; i++) {
    const angle1 = (i * 2 * Math.PI) / N - Math.PI / 2;
    const angle2 = (((i + 1) % N) * 2 * Math.PI) / N - Math.PI / 2;

    const score1 = result.categoryScores[i]?.scores[result.options[0]?.id] || 0;
    const score2 = result.categoryScores[(i + 1) % N]?.scores[result.options[0]?.id] || 0;

    const r1 = (score1 / 100) * R;
    const r2 = (score2 / 100) * R;

    const x1 = cx + r1 * Math.cos(angle1);
    const y1 = cy + r1 * Math.sin(angle1);
    const x2 = cx + r2 * Math.cos(angle2);
    const y2 = cy + r2 * Math.sin(angle2);

    doc.line(x1, y1, x2, y2);
  }

  // Tiny Orange dots on Option A vertices
  for (let i = 0; i < N; i++) {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    const score = result.categoryScores[i]?.scores[result.options[0]?.id] || 0;
    const r = (score / 100) * R;
    const px = cx + r * Math.cos(angle);
    const py = cy + r * Math.sin(angle);
    doc.setFillColor(255, 106, 42);
    doc.circle(px, py, 0.65, 'F');
  }

  // Draw Option B (Slate) Polygon
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.65);
  for (let i = 0; i < N; i++) {
    const angle1 = (i * 2 * Math.PI) / N - Math.PI / 2;
    const angle2 = (((i + 1) % N) * 2 * Math.PI) / N - Math.PI / 2;

    const score1 = result.categoryScores[i]?.scores[result.options[1]?.id] || 0;
    const score2 = result.categoryScores[(i + 1) % N]?.scores[result.options[1]?.id] || 0;

    const r1 = (score1 / 100) * R;
    const r2 = (score2 / 100) * R;

    const x1 = cx + r1 * Math.cos(angle1);
    const y1 = cy + r1 * Math.sin(angle1);
    const x2 = cx + r2 * Math.cos(angle2);
    const y2 = cy + r2 * Math.sin(angle2);

    doc.line(x1, y1, x2, y2);
  }

  // Tiny Slate dots on Option B vertices
  for (let i = 0; i < N; i++) {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    const score = result.categoryScores[i]?.scores[result.options[1]?.id] || 0;
    const r = (score / 100) * R;
    const px = cx + r * Math.cos(angle);
    const py = cy + r * Math.sin(angle);
    doc.setFillColor(100, 116, 139);
    doc.circle(px, py, 0.65, 'F');
  }

  y += 94; // move down after chart

  // ==========================================
  // PAGE 3: SCORING MATRIX & CRITERIA WEIGHTS
  // ==========================================
  forceNewPage();

  // Category Matrix Scores Table
  drawSectionHeader('CATEGORY SCORE MATRIX', 4);
  
  const colWidths = [contentWidth * 0.45, contentWidth * 0.2, contentWidth * 0.2, contentWidth * 0.15];
  const headers = ['Evaluation Dimension', capitalize(result.options[0]?.name || 'Option A'), capitalize(result.options[1]?.name || 'Option B'), 'Weight'];
  const tableRowHeight = 8;
  
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

  // Visual Data Visualization (Comparative Horizontal Bar Chart)
  drawSectionHeader('VISUAL SCORE COMPARISON');

  const labelWidth = 45;
  const barTrackWidth = contentWidth - labelWidth - 15; // Remaining width for bars

  // Draw Chart Legend
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  
  // Option A Legend
  doc.setFillColor(255, 106, 42);
  doc.rect(margin + labelWidth, y, 4, 3, 'F');
  doc.setTextColor(74, 74, 74);
  doc.text(capitalize(result.options[0]?.name || 'Option A'), margin + labelWidth + 6, y + 2.5);

  // Option B Legend
  doc.setFillColor(100, 116, 139);
  doc.rect(margin + labelWidth + 40, y, 4, 3, 'F');
  doc.text(capitalize(result.options[1]?.name || 'Option B'), margin + labelWidth + 46, y + 2.5);

  y += 8;

  result.categoryScores.forEach((c) => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(26, 26, 26);
    doc.text(c.category, margin, y + 4.5);

    const scoreA = c.scores[result.options[0]?.id] || 0;
    const scoreB = c.scores[result.options[1]?.id] || 0;

    const barWidthA = (scoreA / 100) * barTrackWidth;
    const barWidthB = (scoreB / 100) * barTrackWidth;

    // Draw Bar for Option A (Orange)
    doc.setFillColor(255, 106, 42);
    doc.rect(margin + labelWidth, y, barWidthA, 2.2, 'F');
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(String(scoreA), margin + labelWidth + barWidthA + 1.5, y + 1.8);

    // Draw Bar for Option B (Slate)
    doc.setFillColor(100, 116, 139);
    doc.rect(margin + labelWidth, y + 3.2, barWidthB, 2.2, 'F');
    doc.text(String(scoreB), margin + labelWidth + barWidthB + 1.5, y + 5);

    // Draw subtle grid line below this category row
    doc.setDrawColor(240, 240, 240);
    doc.setLineWidth(0.1);
    doc.line(margin, y + 6.8, margin + contentWidth, y + 6.8);

    y += 7.8;
  });

  // ==========================================
  // PAGE 4: CORE REASONINGS & SCENARIO SIMULATIONS
  // ==========================================
  forceNewPage();

  drawSectionHeader('CORE STRATEGIC REASONING', 4);
  
  // Render each Core Reasoning category in its own thin-bordered structured card block
  const drawReasoningBlock = (title: string, items: string[], borderCol: [number, number, number] = [230, 230, 230]) => {
    // Check page space
    const blockHeight = items.length * 5 + 10;
    if (y + blockHeight + 10 > 275) {
      forceNewPage();
    }
    
    doc.setFillColor(252, 252, 252);
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, blockHeight, 'FD');
    
    // Draw left highlight border inside card
    doc.setFillColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.rect(margin, y, 1.2, blockHeight, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 26);
    doc.text(title, margin + 4, y + 5.5);
    
    let itemY = y + 11;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(74, 74, 74);
    items.forEach((item) => {
      const lineStr = `• ${item}`;
      const itemLines = doc.splitTextToSize(stripMarkdown(lineStr), contentWidth - 10);
      itemLines.forEach((l: string) => {
        doc.text(l, margin + 4, itemY);
        itemY += 4.5;
      });
    });
    
    y += blockHeight + 6;
  };

  drawReasoningBlock('Main Rationales', result.reasoning.mainReasons, [255, 106, 42]);
  drawReasoningBlock('Key Trade-offs', result.reasoning.tradeoffs, [99, 102, 241]);
  drawReasoningBlock('Hidden Costs', result.reasoning.hiddenCosts, [244, 63, 94]);
  drawReasoningBlock('Long-Term Effects', result.reasoning.longTermEffects, [16, 185, 129]);

  y += 4;

  // Scenario Simulations Table
  drawSectionHeader('SCENARIO SIMULATIONS');
  addText('Simulating alternative futures and impact offsets on both options', 9.5, false, [120, 120, 120], 6);

  const simColWidths = [contentWidth * 0.25, contentWidth * 0.37, contentWidth * 0.38];
  const simHeaders = ['Scenario', `${capitalize(result.options[0]?.name || 'Option A')} Impact`, `${capitalize(result.options[1]?.name || 'Option B')} Impact`];
  const simRowHeight = 12;

  // Draw Sim Header Row
  doc.setFillColor(26, 26, 26);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  
  let simCursorX = margin;
  simHeaders.forEach((h, i) => {
    doc.text(h, simCursorX + 2, y + 5.5);
    simCursorX += simColWidths[i];
  });
  y += 8;

  // Draw Sim Rows
  result.scenarioSimulations.forEach((sim, index) => {
    doc.setFillColor(index % 2 === 0 ? 248 : 255, index % 2 === 0 ? 248 : 255, index % 2 === 0 ? 248 : 255);
    doc.rect(margin, y, contentWidth, simRowHeight, 'F');
    
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.15);
    doc.line(margin, y + simRowHeight, margin + contentWidth, y + simRowHeight);

    // Scenario Name
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(8.5);
    doc.text(sim.scenario, margin + 2, y + 5);

    // Option A Impact
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(74, 74, 74);
    doc.setFontSize(8);
    const impA = sim.impact[result.options[0]?.id] || { change: 0, explanation: 'No impact modeled.' };
    const textA = `(${impA.change > 0 ? '+' : ''}${impA.change}%) ${impA.explanation}`;
    const linesA = doc.splitTextToSize(stripMarkdown(textA), simColWidths[1] - 4);
    linesA.forEach((l: string, i: number) => {
      doc.text(l, margin + simColWidths[0] + 2, y + 4 + (i * 3.5));
    });

    // Option B Impact
    const impB = sim.impact[result.options[1]?.id] || { change: 0, explanation: 'No impact modeled.' };
    const textB = `(${impB.change > 0 ? '+' : ''}${impB.change}%) ${impB.explanation}`;
    const linesB = doc.splitTextToSize(stripMarkdown(textB), simColWidths[2] - 4);
    linesB.forEach((l: string, i: number) => {
      doc.text(l, margin + simColWidths[0] + simColWidths[1] + 2, y + 4 + (i * 3.5));
    });

    y += simRowHeight;
  });

  // ==========================================
  // PAGE 5: FUTURE TIMELINES & RISK AUDIT
  // ==========================================
  forceNewPage();

  drawSectionHeader('FUTURE TIMELINE PROJECTIONS', 4);
  result.timeline.forEach((t) => {
    // Draw a neat bounding box card for each timeline period
    const tLinesOpt1 = doc.splitTextToSize(stripMarkdown(`- ${capitalize(result.options[0]?.name)}: ${t.outcomes[result.options[0]?.id] || ''}`), contentWidth - 10);
    const tLinesOpt2 = doc.splitTextToSize(stripMarkdown(`- ${capitalize(result.options[1]?.name)}: ${t.outcomes[result.options[1]?.id] || ''}`), contentWidth - 10);
    
    const tBlockHeight = tLinesOpt1.length * 4.5 + tLinesOpt2.length * 4.5 + 10;
    
    if (y + tBlockHeight + 6 > 275) {
      forceNewPage();
    }

    doc.setFillColor(255, 253, 250);
    doc.setDrawColor(255, 220, 200);
    doc.setLineWidth(0.15);
    doc.rect(margin, y, contentWidth, tBlockHeight, 'FD');

    doc.setFillColor(255, 106, 42);
    doc.rect(margin, y, 1.2, tBlockHeight, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 106, 42);
    doc.text(t.period, margin + 4, y + 5.5);

    let lineY = y + 10;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(74, 74, 74);
    
    tLinesOpt1.forEach((line: string) => {
      doc.text(line, margin + 4, lineY);
      lineY += 4.5;
    });
    
    tLinesOpt2.forEach((line: string) => {
      doc.text(line, margin + 4, lineY);
      lineY += 4.5;
    });

    y += tBlockHeight + 6;
  });

  y += 6;

  // Critical Risk Factors Section
  drawSectionHeader('CRITICAL RISK FACTORS');
  
  result.risks.forEach((r) => {
    const isCritical = r.level === 'critical' || r.level === 'high';
    const riskBg = isCritical ? [255, 245, 245] as [number, number, number] : [255, 253, 245] as [number, number, number];
    const riskBorder = isCritical ? [239, 68, 68] as [number, number, number] : [245, 158, 11] as [number, number, number];
    const riskText = isCritical ? [220, 38, 38] as [number, number, number] : [217, 119, 6] as [number, number, number];
    
    const affectedNames = r.affectedOptions.map(id => capitalize(result.options.find(o => o.id === id)?.name || id)).join(', ');
    
    const rLinesDesc = doc.splitTextToSize(stripMarkdown(`Risk Impact: ${r.description}`), contentWidth - 10);
    const rLinesMit = doc.splitTextToSize(stripMarkdown(`Mitigation Strategy: ${r.mitigation}`), contentWidth - 10);
    
    const rBlockHeight = rLinesDesc.length * 4.5 + rLinesMit.length * 4.5 + 13;
    
    if (y + rBlockHeight + 6 > 275) {
      forceNewPage();
    }

    doc.setFillColor(riskBg[0], riskBg[1], riskBg[2]);
    doc.setDrawColor(riskBorder[0], riskBorder[1], riskBorder[2]);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, rBlockHeight, 'FD');

    doc.setFillColor(riskBorder[0], riskBorder[1], riskBorder[2]);
    doc.rect(margin, y, 1.2, rBlockHeight, 'F');

    // Title
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(riskText[0], riskText[1], riskText[2]);
    doc.text(`${capitalize(r.factor)} (${r.level.toUpperCase()})`, margin + 4, y + 5);

    // Affected Option Metadata
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 120, 120);
    doc.text(`Affected: ${affectedNames}`, margin + 4, y + 9.5);

    let textCursorY = y + 14;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(74, 74, 74);
    
    rLinesDesc.forEach((l: string) => {
      doc.text(l, margin + 4, textCursorY);
      textCursorY += 4.5;
    });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 26);
    rLinesMit.forEach((l: string) => {
      doc.text(l, margin + 4, textCursorY);
      textCursorY += 4.5;
    });

    y += rBlockHeight + 6;
  });

  // ==========================================
  // PAGE 6: COGNITIVE BIASES, EVIDENCE ENGINE & DEVIL'S ADVOCATE
  // ==========================================
  forceNewPage();

  drawSectionHeader('COGNITIVE BIAS DETECTION', 4);
  result.biases.forEach((b) => {
    const descLines = doc.splitTextToSize(stripMarkdown(`Indicator: ${b.description}`), contentWidth - 10);
    const recLines = doc.splitTextToSize(stripMarkdown(`De-biasing Recommendation: ${b.recommendation}`), contentWidth - 10);
    
    const bBlockHeight = descLines.length * 4.5 + recLines.length * 4.5 + 13;
    
    if (y + bBlockHeight + 6 > 275) {
      forceNewPage();
    }

    doc.setFillColor(253, 244, 255);
    doc.setDrawColor(216, 180, 254);
    doc.setLineWidth(0.15);
    doc.rect(margin, y, contentWidth, bBlockHeight, 'FD');

    doc.setFillColor(147, 51, 234);
    doc.rect(margin, y, 1.2, bBlockHeight, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(147, 51, 234);
    doc.text(b.biasType, margin + 4, y + 5);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(120, 120, 120);
    doc.text(`Severity: ${b.severity.toUpperCase()}`, margin + 4, y + 9.5);

    let textCursorY = y + 14;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(74, 74, 74);
    
    descLines.forEach((l: string) => {
      doc.text(l, margin + 4, textCursorY);
      textCursorY += 4.5;
    });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 26);
    recLines.forEach((l: string) => {
      doc.text(l, margin + 4, textCursorY);
      textCursorY += 4.5;
    });

    y += bBlockHeight + 6;
  });

  y += 6;

  // Evidence & Decision Pathways Section
  drawSectionHeader('EVIDENCE & DECISION PATHWAYS');
  result.evidenceChain.forEach((ev) => {
    const rLines = doc.splitTextToSize(stripMarkdown(`Reasoning: ${ev.reasoning}`), contentWidth - 10);
    const fLines = doc.splitTextToSize(stripMarkdown(`Supporting Heuristics: ${ev.factors.join(', ')}`), contentWidth - 10);
    
    const evBlockHeight = rLines.length * 4.5 + fLines.length * 4.5 + 13;

    if (y + evBlockHeight + 6 > 275) {
      forceNewPage();
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(240, 240, 240);
    doc.setLineWidth(0.2);
    doc.rect(margin, y, contentWidth, evBlockHeight, 'FD');

    doc.setFillColor(255, 106, 42);
    doc.rect(margin, y, 1.2, evBlockHeight, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 106, 42);
    doc.text(`${ev.claim} (Confidence: ${ev.confidence}%)`, margin + 4, y + 5);

    let textCursorY = y + 10;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(74, 74, 74);
    
    rLines.forEach((l: string) => {
      doc.text(l, margin + 4, textCursorY);
      textCursorY += 4.5;
    });

    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    fLines.forEach((l: string) => {
      doc.text(l, margin + 4, textCursorY);
      textCursorY += 4.5;
    });

    y += evBlockHeight + 6;
  });

  y += 6;

  // Devil's Advocate Audit
  drawSectionHeader(`DEVIL'S ADVOCATE AUDIT (Against ${capitalize(result.devilsAdvocate.againstOption)})`);
  addText('Challenging Arguments Against Recommendation:', 10.5, true, [74, 74, 74], 2);
  result.devilsAdvocate.arguments.forEach((arg, i) => {
    addText(`${i + 1}. ${arg}`, 9.5, false, [74, 74, 74], 3);
  });
  
  addText('Counter-Balance Counterpoints:', 10.5, true, [74, 74, 74], 2, 3);
  result.devilsAdvocate.counterPoints.forEach((cp, i) => {
    addText(`${i + 1}. ${cp}`, 9.5, false, [74, 74, 74], 3);
  });

  y += 10;

  // Methodology Notes
  addText('Methodology Notes:', 10, true, [26, 26, 26], 1.5);
  addText(result.methodology, 8.5, false, [120, 120, 120], 6);

  addText('*Report generated by INFENGINE AI Decision Intelligence Platform*', 9, false, [150, 150, 150], 4, 4);

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
