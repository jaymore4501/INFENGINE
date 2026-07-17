import { AnalysisResult, DECISION_CATEGORIES } from './types';

function parseOptions(decision: string): { optionA: string; optionB: string } {
  const vsPatterns = [
    /(?:should i\s+)?(.+?)\s+(?:vs\.?|versus|or)\s+(.+?)(?:\?|$)/i,
    /(.+?)\s+(?:vs\.?|versus|or)\s+(.+?)(?:\?|$)/i,
  ];
  for (const pattern of vsPatterns) {
    const match = decision.match(pattern);
    if (match) {
      return { optionA: match[1].trim(), optionB: match[2].trim() };
    }
  }
  return { optionA: 'Option A', optionB: 'Option B' };
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMockAnalysis(decision: string): AnalysisResult {
  const { optionA, optionB } = parseOptions(decision);
  const idA = 'option-a';
  const idB = 'option-b';

  // Generate realistic scores with some variance
  const baseScoreA = rand(55, 85);
  const baseScoreB = rand(50, 80);
  const winnerIsA = baseScoreA >= baseScoreB;

  const categoryScores = DECISION_CATEGORIES.map((category) => {
    const scoreA = Math.min(100, Math.max(10, baseScoreA + rand(-25, 25)));
    const scoreB = Math.min(100, Math.max(10, baseScoreB + rand(-25, 25)));
    return {
      category,
      scores: { [idA]: scoreA, [idB]: scoreB },
      weight: rand(5, 15) / 10,
      reasoning: generateCategoryReasoning(category, optionA, optionB, scoreA, scoreB),
    };
  });

  const avgA = categoryScores.reduce((sum, c) => sum + (c.scores[idA] || 0), 0) / categoryScores.length;
  const avgB = categoryScores.reduce((sum, c) => sum + (c.scores[idB] || 0), 0) / categoryScores.length;

  const winnerId = avgA >= avgB ? idA : idB;
  const winnerName = avgA >= avgB ? optionA : optionB;
  const loserName = avgA >= avgB ? optionB : optionA;
  const confidence = rand(78, 95);

  return {
    id: `analysis-${Date.now()}`,
    decision,
    options: [
      { id: idA, name: optionA, description: `Pursuing ${optionA}` },
      { id: idB, name: optionB, description: `Pursuing ${optionB}` },
    ],
    winner: {
      optionId: winnerId,
      optionName: winnerName,
      confidence,
      summary: `Based on comprehensive multi-dimensional analysis across ${DECISION_CATEGORIES.length} evaluation criteria, "${winnerName}" emerges as the stronger choice with a ${confidence}% confidence score. While "${loserName}" offers distinct advantages in certain areas, the overall weighted assessment favors "${winnerName}" for its superior balance of risk-adjusted returns, long-term growth potential, and alignment with typical decision-maker priorities.`,
    },
    categoryScores,
    timeline: [
      {
        period: '6 Months',
        outcomes: {
          [idA]: `Early stage foundations laid. ${optionA} shows initial momentum with setup costs and learning investments. Key milestone: fundamental infrastructure established.`,
          [idB]: `Initial phase complete. ${optionB} demonstrates early traction with preliminary results visible. Foundation period with moderate resource commitment.`,
        },
      },
      {
        period: '1 Year',
        outcomes: {
          [idA]: `${optionA} enters growth phase. ROI begins materializing with 40-60% of initial goals achieved. Network effects starting to compound.`,
          [idB]: `${optionB} reaches operational maturity. 50-70% of projected benefits realized. Clear trajectory established with measurable outcomes.`,
        },
      },
      {
        period: '3 Years',
        outcomes: {
          [idA]: `Significant compound growth visible. ${optionA} delivers 2-3x initial projected value. Market position strengthened considerably.`,
          [idB]: `Steady accumulated returns. ${optionB} provides consistent value with 1.5-2.5x return on investment. Stable and predictable outcomes.`,
        },
      },
      {
        period: '5 Years',
        outcomes: {
          [idA]: `${optionA} potentially reaches transformative scale. 4-8x multiplier possible with exponential growth characteristics in best case.`,
          [idB]: `${optionB} establishes deep expertise value. 3-5x return with high reliability. Strong foundation for next-stage decisions.`,
        },
      },
      {
        period: '10 Years',
        outcomes: {
          [idA]: `Long-term legacy impact of ${optionA}. Generational value creation possible. Compound effects fully realized across all dimensions.`,
          [idB]: `${optionB} delivers enduring value with accumulated expertise and networks. Stable, predictable long-term positioning achieved.`,
        },
      },
    ],
    risks: [
      { factor: 'Financial Risk', level: winnerIsA ? 'medium' : 'high', affectedOptions: [idA], description: `${optionA} carries moderate financial exposure with variable returns`, mitigation: 'Establish clear financial milestones and exit criteria' },
      { factor: 'Time Commitment', level: 'medium', affectedOptions: [idA, idB], description: 'Both options require significant time investment with opportunity cost', mitigation: 'Create structured schedules with regular review checkpoints' },
      { factor: 'Market Volatility', level: 'high', affectedOptions: [idA], description: `${optionA} is more exposed to market fluctuations and external factors`, mitigation: 'Diversify approach and maintain contingency plans' },
      { factor: 'Skill Gap', level: 'low', affectedOptions: [idB], description: `${optionB} may require developing new competencies`, mitigation: 'Invest in targeted skill development early' },
      { factor: 'Opportunity Cost', level: 'high', affectedOptions: [idA, idB], description: 'Choosing either option means forgoing benefits of the alternative', mitigation: 'Consider hybrid approaches or phased implementation' },
      { factor: 'Burnout Risk', level: winnerIsA ? 'high' : 'medium', affectedOptions: [idA], description: `${optionA} demands sustained high energy with uncertain payoff timing`, mitigation: 'Build in recovery periods and support systems' },
      { factor: 'Dependency Risk', level: 'medium', affectedOptions: [idB], description: `${optionB} may create dependencies on external factors`, mitigation: 'Develop independent capabilities alongside main pursuit' },
      { factor: 'Reversibility', level: 'low', affectedOptions: [idB], description: `${optionB} offers easier course correction if needed`, mitigation: 'Set review milestones to evaluate direction' },
    ],
    biases: [
      { biasType: 'Confirmation Bias', description: `You may be seeking information that confirms a preference for ${winnerName} while discounting evidence supporting ${loserName}.`, severity: 'medium', recommendation: 'Actively seek out success stories and data from people who chose the alternative path.' },
      { biasType: 'Loss Aversion', description: 'The fear of losing what you currently have may be disproportionately influencing your evaluation of the riskier option.', severity: 'high', recommendation: 'Reframe potential losses as investments. Consider what you lose by NOT taking action.' },
      { biasType: 'Status Quo Bias', description: 'There may be an unconscious preference for whichever option requires less change from your current situation.', severity: 'medium', recommendation: 'Evaluate each option as if starting from a neutral position without existing commitments.' },
      { biasType: 'Overconfidence', description: 'Initial enthusiasm may lead to underestimating challenges and overestimating the probability of best-case scenarios.', severity: 'low', recommendation: 'Research base rates — what percentage of people in similar situations achieve the outcomes you envision?' },
      { biasType: 'Anchoring Effect', description: 'Early information or a specific number (salary, valuation, ranking) may be disproportionately anchoring your evaluation.', severity: 'medium', recommendation: 'Consider multiple reference points and scenarios rather than fixating on a single benchmark.' },
    ],
    devilsAdvocate: {
      againstOption: winnerName,
      arguments: [
        `${winnerName} carries higher execution risk — the gap between "possible" and "probable" outcomes is wider than it appears in the scoring.`,
        `The opportunity cost analysis may underweight the compounding benefits of ${loserName} which become significant over 5-10 year horizons.`,
        `Current market conditions that favor ${winnerName} may shift. This analysis captures a point-in-time snapshot, not a dynamic forecast.`,
        `Survivorship bias in success narratives around ${winnerName} may inflate perceived probability of success.`,
        `${loserName} offers stronger downside protection — in worst-case scenarios, the floor is significantly higher.`,
      ],
      counterPoints: [
        `While risks are real, the weighted analysis accounts for probability-adjusted outcomes, not just best-case scenarios.`,
        `${winnerName}'s advantage persists across multiple sensitivity analyses, suggesting robust underlying fundamentals.`,
        `The scoring methodology incorporates both quantitative metrics and qualitative factors to reduce single-dimension bias.`,
      ],
    },
    evidenceChain: [
      { claim: `${winnerName} scores higher on risk-adjusted return`, reasoning: 'When normalizing for volatility and downside exposure, the expected value calculation favors this option by a meaningful margin.', confidence: 85, factors: ['Financial Return', 'Risk', 'Future Stability'] },
      { claim: `Long-term growth trajectory favors ${winnerName}`, reasoning: 'Compound growth modeling across 5 and 10-year horizons shows exponential divergence in outcomes, with the gap widening over time.', confidence: 78, factors: ['Long-Term Growth', 'Scalability', 'Market Demand'] },
      { claim: `${loserName} offers better lifestyle balance`, reasoning: 'On dimensions of stress, flexibility, and personal satisfaction, the alternative option provides a more balanced day-to-day experience.', confidence: 82, factors: ['Stress Level', 'Flexibility', 'Lifestyle Impact'] },
      { claim: 'Opportunity cost is the decisive swing factor', reasoning: 'The divergence in scoring is primarily driven by what each option prevents you from pursuing, not by the direct benefits alone.', confidence: 74, factors: ['Opportunity Cost', 'Time Investment', 'Learning Curve'] },
    ],
    scenarioSimulations: [
      { scenario: 'Best Case', impact: { [idA]: { change: 30, explanation: `${optionA} could exceed expectations by 30% with favorable conditions` }, [idB]: { change: 20, explanation: `${optionB} upside is more bounded but still meaningful at +20%` } } },
      { scenario: 'Expected Case', impact: { [idA]: { change: 0, explanation: `${optionA} performs as modeled in the base analysis` }, [idB]: { change: 0, explanation: `${optionB} delivers projected outcomes within normal variance` } } },
      { scenario: 'Worst Case', impact: { [idA]: { change: -40, explanation: `${optionA} downside is significant: -40% from base with potential for sunk costs` }, [idB]: { change: -15, explanation: `${optionB} worst case is more contained at -15%, with preserved optionality` } } },
      { scenario: 'Market Downturn', impact: { [idA]: { change: -25, explanation: `${optionA} is more sensitive to economic headwinds` }, [idB]: { change: -10, explanation: `${optionB} provides relative stability during downturns` } } },
    ],
    decisionTree: {
      id: 'root',
      label: decision,
      type: 'decision',
      children: [
        {
          id: 'a',
          label: optionA,
          type: 'chance',
          children: [
            { id: 'a-best', label: 'Best Case', probability: 25, outcome: `High success: ${rand(3, 8)}x value created`, type: 'outcome' },
            { id: 'a-expected', label: 'Expected', probability: 50, outcome: `Moderate success: ${rand(1, 3)}x value`, type: 'outcome' },
            { id: 'a-worst', label: 'Worst Case', probability: 25, outcome: `Below expectations: ${rand(20, 50)}% loss`, type: 'outcome' },
          ],
        },
        {
          id: 'b',
          label: optionB,
          type: 'chance',
          children: [
            { id: 'b-best', label: 'Best Case', probability: 30, outcome: `Strong performance: ${rand(2, 5)}x value`, type: 'outcome' },
            { id: 'b-expected', label: 'Expected', probability: 50, outcome: `Solid results: ${rand(1, 2)}x value`, type: 'outcome' },
            { id: 'b-worst', label: 'Worst Case', probability: 20, outcome: `Minor setback: ${rand(5, 20)}% loss`, type: 'outcome' },
          ],
        },
      ],
    },
    sankeyNodes: [
      { id: 'decision', name: 'Your Decision' },
      { id: 'opt-a', name: optionA },
      { id: 'opt-b', name: optionB },
      { id: 'financial', name: 'Financial Return' },
      { id: 'growth', name: 'Growth Potential' },
      { id: 'risk', name: 'Risk Exposure' },
      { id: 'satisfaction', name: 'Satisfaction' },
      { id: 'high-outcome', name: 'High Outcome' },
      { id: 'medium-outcome', name: 'Medium Outcome' },
      { id: 'low-outcome', name: 'Low Outcome' },
    ],
    sankeyLinks: [
      { source: 'decision', target: 'opt-a', value: avgA },
      { source: 'decision', target: 'opt-b', value: avgB },
      { source: 'opt-a', target: 'financial', value: rand(20, 40) },
      { source: 'opt-a', target: 'growth', value: rand(20, 40) },
      { source: 'opt-a', target: 'risk', value: rand(10, 25) },
      { source: 'opt-b', target: 'financial', value: rand(15, 35) },
      { source: 'opt-b', target: 'satisfaction', value: rand(20, 35) },
      { source: 'opt-b', target: 'growth', value: rand(15, 30) },
      { source: 'financial', target: 'high-outcome', value: rand(20, 35) },
      { source: 'growth', target: 'high-outcome', value: rand(15, 30) },
      { source: 'growth', target: 'medium-outcome', value: rand(15, 25) },
      { source: 'risk', target: 'low-outcome', value: rand(10, 20) },
      { source: 'satisfaction', target: 'medium-outcome', value: rand(15, 30) },
      { source: 'satisfaction', target: 'high-outcome', value: rand(10, 20) },
    ],
    reasoning: {
      mainReasons: [
        `${winnerName} delivers stronger risk-adjusted returns across the evaluation horizon, with the advantage increasing over longer timeframes.`,
        `The compound growth potential of ${winnerName} creates exponential value divergence beyond the 3-year mark.`,
        `Market demand dynamics favor ${winnerName}, with structural tailwinds providing sustainable advantage.`,
      ],
      tradeoffs: [
        `Choosing ${winnerName} means accepting higher short-term volatility for potentially greater long-term payoff.`,
        `${loserName} offers superior work-life balance and lower stress, which has genuine health and relationship value.`,
        `The learning curve for ${winnerName} is steeper, requiring more upfront investment in skill development.`,
      ],
      hiddenCosts: [
        'Opportunity cost of time spent on the chosen path compounds over years and is often underestimated.',
        'Social and relationship impacts of high-commitment choices rarely appear in quantitative analysis.',
        'Mental health toll from sustained uncertainty should be factored into stress-related dimensions.',
        'Switching costs increase dramatically after year 2, making early course correction essential.',
      ],
      longTermEffects: [
        `${winnerName} positions you for a broader set of future opportunities through skill and network accumulation.`,
        'The identity and expertise you develop will shape available paths for the next 10-20 years.',
        'Financial compounding effects create meaningful divergence only beyond the 5-year horizon.',
        'Adaptability and optionality preservation become increasingly valuable in uncertain environments.',
      ],
    },
    recommendation: `After comprehensive multi-dimensional analysis, I recommend pursuing **${winnerName}** with ${confidence}% confidence. This recommendation is based on superior weighted scores across ${DECISION_CATEGORIES.length} evaluation criteria, with particular strength in long-term growth potential, risk-adjusted returns, and market alignment.\n\n**Immediate Next Steps:**\n1. Conduct deeper due diligence on the top 3 risk factors identified\n2. Set concrete milestones for 3-month, 6-month, and 1-year checkpoints\n3. Develop a contingency plan addressing the worst-case scenario\n4. Establish measurable success criteria before committing\n5. Consider preserving partial optionality for the alternative path\n\n**Key Caveat:** While the analysis favors ${winnerName}, the margin is not overwhelming. If your personal values strongly emphasize the dimensions where ${loserName} excels (lifestyle balance, stress management, flexibility), the alternative remains a rational choice.`,
    executiveSummary: `INFENGINE Decision Analysis: "${decision}"\n\nRecommendation: ${winnerName} (${confidence}% confidence)\n\nThe analysis evaluated both options across ${DECISION_CATEGORIES.length} weighted criteria including financial return, risk exposure, growth potential, and lifestyle impact. ${winnerName} outperformed on ${rand(8, 11)} of ${DECISION_CATEGORIES.length} dimensions, with notable strength in long-term growth and scalability metrics. Key risks include market volatility and execution complexity. The decision tree analysis shows favorable probability-weighted outcomes. Five cognitive biases were identified and should be addressed before finalizing.`,
    methodology: 'INFENGINE Core AI employs an 8-step analytical framework: (1) Context understanding from natural language input, (2) Dynamic criteria generation tailored to the decision domain, (3) Weighted scoring using domain-specific heuristics, (4) Monte Carlo-style scenario simulation, (5) Cognitive bias detection using established behavioral economics frameworks, (6) Decision tree probability modeling, (7) Sensitivity analysis across variable parameters, and (8) Explainable recommendation generation with confidence intervals.',
    createdAt: new Date().toISOString(),
  };
}

function generateCategoryReasoning(category: string, optA: string, optB: string, scoreA: number, scoreB: number): string {
  const winner = scoreA >= scoreB ? optA : optB;
  const reasonings: Record<string, string> = {
    'Financial Return': `${winner} shows stronger potential for financial returns based on market dynamics and expected ROI trajectories.`,
    'Risk': `Risk-adjusted analysis indicates ${winner} offers a more favorable risk profile when considering both upside potential and downside protection.`,
    'Learning Curve': `${winner} presents a more manageable learning trajectory, enabling faster time-to-competency and value generation.`,
    'Long-Term Growth': `Compound growth modeling over 5-10 year horizons favors ${winner} based on market expansion and skill accumulation patterns.`,
    'Personal Satisfaction': `Alignment with intrinsic motivation factors and lifestyle preferences gives ${winner} an edge in sustained personal fulfillment.`,
    'Time Investment': `${winner} offers better time-to-value ratio, with returns materializing earlier in the commitment timeline.`,
    'Scalability': `${winner} demonstrates superior scalability characteristics, with growth potential that compounds rather than plateaus.`,
    'Stress Level': `Stress analysis including workload intensity, uncertainty, and work-life balance considerations favors ${winner}.`,
    'Flexibility': `${winner} preserves more future optionality, allowing easier pivots and adjustments as circumstances evolve.`,
    'Opportunity Cost': `When factoring in alternatives foregone, ${winner} minimizes total opportunity cost across all measured dimensions.`,
    'Market Demand': `Current and projected market demand analysis shows stronger tailwinds for ${winner} in the relevant sectors.`,
    'Future Stability': `${winner} offers more predictable long-term outcomes with lower variance in expected results.`,
    'Lifestyle Impact': `${winner} better accommodates desired lifestyle patterns including location flexibility, time autonomy, and social engagement.`,
    'AI Confidence': `Model confidence in scoring accuracy is higher for ${winner} due to clearer data signals and more established precedent patterns.`,
  };
  return reasonings[category] || `Analysis favors ${winner} on this dimension.`;
}
