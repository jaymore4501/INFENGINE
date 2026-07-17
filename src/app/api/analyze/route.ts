import { NextRequest, NextResponse } from 'next/server';
import { generateMockAnalysis } from '@/lib/mock-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { decision, clarifications, model } = body;

    if (!decision || typeof decision !== 'string' || !decision.trim()) {
      return NextResponse.json(
        { error: 'Decision text is required' },
        { status: 400 }
      );
    }

    // Check for API keys
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    const hasGemini = !!process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const hasClaude = !!process.env.ANTHROPIC_API_KEY;

    // If any API key is available, try to use the AI model
    if (hasOpenAI || hasGemini || hasClaude) {
      try {
        const result = await callAIModel(decision, clarifications, model);
        return NextResponse.json(result);
      } catch (aiError) {
        console.warn('AI model call failed, falling back to demo mode:', aiError);
      }
    }

    // Fallback: Generate comprehensive mock analysis
    const mockResult = generateMockAnalysis(decision);
    return NextResponse.json(mockResult);

  } catch (error) {
    console.error('Analysis API error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}

async function callAIModel(
  decision: string,
  clarifications: Record<string, string>,
  model: string
): Promise<ReturnType<typeof generateMockAnalysis>> {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(decision, clarifications);

  // Determine which API to use
  const isOpenAI = model === 'o3-mini' || model === 'gpt-4-1-mini' || model === 'gpt-4-1';
  if (isOpenAI && process.env.OPENAI_API_KEY) {
    const apiModelName = model === 'o3-mini' ? 'o3-mini' : model === 'gpt-4-1-mini' ? 'gpt-4o-mini' : 'gpt-4o';
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: apiModelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: apiModelName.startsWith('o3-') ? undefined : { type: 'json_object' },
      }),
    });

    if (!response.ok) throw new Error('OpenAI API error');
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }

  if (model === 'gemini-2-5-flash' && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 4000 },
        }),
      }
    );

    if (!response.ok) throw new Error('Gemini API error');
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    throw new Error('Failed to parse Gemini response');
  }

  if (model === 'claude-3-5-sonnet' && process.env.ANTHROPIC_API_KEY) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) throw new Error('Claude API error');
    const data = await response.json();
    const text = data.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    throw new Error('Failed to parse Claude response');
  }

  // Fallback for unsupported models
  throw new Error(`No API key configured for model: ${model}`);
}

function buildSystemPrompt(): string {
  return `You are INFENGINE Core AI, a decision intelligence system. You analyze decisions across multiple dimensions and return structured JSON.

Your response MUST be valid JSON matching this exact structure:
{
  "id": "analysis-{timestamp}",
  "decision": "the decision text",
  "options": [{"id": "option-a", "name": "Option A", "description": "..."}],
  "winner": {"optionId": "option-a", "optionName": "...", "confidence": 85, "summary": "..."},
  "categoryScores": [{"category": "Financial Return", "scores": {"option-a": 75, "option-b": 60}, "weight": 1.2, "reasoning": "..."}],
  "timeline": [{"period": "6 Months", "outcomes": {"option-a": "...", "option-b": "..."}}],
  "risks": [{"factor": "...", "level": "low|medium|high|critical", "affectedOptions": ["option-a"], "description": "...", "mitigation": "..."}],
  "biases": [{"biasType": "...", "description": "...", "severity": "low|medium|high", "recommendation": "..."}],
  "devilsAdvocate": {"againstOption": "Winner Name", "arguments": ["..."], "counterPoints": ["..."]},
  "evidenceChain": [{"claim": "...", "reasoning": "...", "confidence": 85, "factors": ["..."]}],
  "scenarioSimulations": [{"scenario": "Best Case", "impact": {"option-a": {"change": 20, "explanation": "..."}}}],
  "reasoning": {"mainReasons": ["..."], "tradeoffs": ["..."], "hiddenCosts": ["..."], "longTermEffects": ["..."]},
  "recommendation": "Full recommendation text",
  "executiveSummary": "Brief executive summary",
  "methodology": "Description of methodology used",
  "createdAt": "ISO timestamp"
}

Categories to evaluate: Financial Return, Risk, Learning Curve, Long-Term Growth, Personal Satisfaction, Time Investment, Scalability, Stress Level, Flexibility, Opportunity Cost, Market Demand, Future Stability, Lifestyle Impact, AI Confidence.

Include a decisionTree and sankeyNodes/sankeyLinks in your response following the types defined. Be thorough, analytical, and objective.`;
}

function buildUserPrompt(decision: string, clarifications: Record<string, string>): string {
  let prompt = `Analyze this decision: "${decision}"\n\n`;

  if (Object.keys(clarifications).length > 0) {
    prompt += 'User context:\n';
    for (const [key, value] of Object.entries(clarifications)) {
      if (value) prompt += `- ${key}: ${value}\n`;
    }
  }

  prompt += '\nProvide a comprehensive analysis in the JSON format specified. Be thorough and objective.';
  return prompt;
}
