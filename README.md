# INFENGINE — AI Decision Intelligence Platform

> **Transform complex decisions into confident actions with explainable AI.**

---

## 🌟 Project Vision

**INFENGINE** is a next-generation AI Decision Intelligence Platform designed to help users evaluate complex personal, business, and strategic choices using multiple AI reasoning models. 

Instead of asking AI *"What should I do?"*, INFENGINE asks: 
> *"Why is one decision objectively stronger than another?"*

The system decomposes decisions across 14 evaluation criteria, maps weighted scores, highlights hidden trade-offs, predicts multi-year timelines, exposes cognitive biases, and delivers fully transparent, explainable recommendations.

---

## 🎨 Premium UI Design Language

INFENGINE is crafted with a high-end **luxury enterprise dark theme**:
- **Palette**: Sleek dark background (`#0A0A0A`), card structures (`#1A1A1A`), primary warm orange accent highlights (`#FF6A2A`), and success/warning/danger feedback colors.
- **Visuals**: Ambient custom cursor mouse-glow, smooth glassmorphism effects, floating animations, and micro-interactions powered by Framer Motion.
- **Typography**: Space Grotesk for headings, Inter for high-readability body copy, and IBM Plex Mono for numeric matrices and data displays.
- **UX**: Zero cookies (except user preferences), no registration wall, and instant analysis workflow with session persistence.

---

## ⚙️ Advanced AI Engine & Methodology

INFENGINE uses an 8-step decision reasoning framework:
1. **Context Understanding**: Extracts goals, priorities, constraints, and implicit concerns from free-form natural language query inputs.
2. **Criteria Generation**: Automatically constructs 10–15 evaluation dimensions tailored to the domain.
3. **Weight Calibration**: Assigns importance coefficients based on context preferences (e.g. risk tolerance).
4. **Structured Scoring**: Performs multi-dimensional evaluation of each option on a 0-100 scale, documenting reasoning for every score.
5. **Scenario Simulation**: Simulates best-case, expected, and worst-case outcomes over a 10-year timeline.
6. **Cognitive Bias Detection**: Exposes confirmation bias, loss aversion, status quo bias, and overconfidence with de-biasing suggestions.
7. **Sensitivity Analysis**: Allows real-time recalculation of recommendations when variables shift.
8. **Explainable Output**: Delivers confidence percentages, trade-off breakdowns, counter-points, and next steps.

---

## 💡 Key Features & Functionality

1. **Integrated Workspace input**: A premium textarea bar on the homepage featuring a model selector dropdown (`o3-mini`, `Gemini 2.5 Flash`, `Claude 3.5 Sonnet`, `GPT-4-1 Mini`, and `GPT-4-1`), parameters drawer, and circular send buttons matching custom UI references.
2. **AI Thinking Animation**: A neural progress layout highlighting steps like context understanding, risk modeling, and scoring.
3. **Dynamic Winner Card & Gauge**: Circular progress meters displaying the recommended choice with confidence percentages.
4. **Radar & Bar Charts**: Side-by-side criteria comparisons mapping scores visually.
5. **Interactive Decision Tree**: Flow-charts powered by React Flow containing decision, chance, and outcome branches.
6. **Risk Heatmap**: Accordion matrices classifying factors (Low to Critical) with mitigations.
7. **Future Timeline**: 6-month, 1-year, 3-year, 5-year, and 10-year outcomes.
8. **Sensitivity Analysis**: Dynamic sliders to modify variables (Budget, Risk, Age, Time Horizon) and watch recommendation scores recalculate live.
9. **Scenario Playground**: Custom "what if" queries to simulate market shifts and shocks.
10. **Evidence Engine**: Open logic trace chains showing exactly how the AI reached its scores.
11. **Devil's Advocate**: Intentional counter-arguments against the recommended option.
12. **Report Export**: Download full reports as Markdown files, Concised text summaries, or raw JSON data.

---

## 🛠️ Technology Stack

### Frontend & Rendering
- **Next.js 16 (App Router)**: Server-side rendering, hot-reloading, and API routing.
- **React 19**: Component lifecycle hooks.
- **TypeScript**: Robust, type-safe interfaces.
- **Tailwind CSS v4**: Theme token variables.
- **Framer Motion**: Page transitions and element animations.
- **Zustand**: Clean, centralized store management.

### Interactive Data Visualization
- **Recharts**: Responsive radar, category bar, and donut charts.
- **React Flow**: Node-based zoomable decision tree graphs.
- **Custom HTML5 Canvas & SVG**: Ambient cursor glows and gauges.

### Backend & Model Integration
- **Node.js (Next.js Route Handlers)**: Serverless functions for execution.
- **Vercel AI SDK**: Unified connection wrapper to call LLM APIs.
- **API integrations**: OpenAI API, Anthropic Claude API, and Google Gemini API.

---

## 📁 Repository Structure

```
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js pages, API routes, and styling
│   │   ├── api/            # Serverless endpoint handlers
│   │   ├── about/          # Platform tech stack page
│   │   ├── methodology/    # AI reasoning framework details
│   │   ├── results/        # Interactive results dashboard
│   │   ├── workspace/      # Route redirect page
│   │   ├── globals.css     # Tailwind themes, classes, and overrides
│   │   ├── layout.tsx      # Core viewport wrappers, fonts, and mouse glow
│   │   └── page.tsx        # Homepage, Workspace textarea, and animations
│   ├── components/         # Reusable presentation and interaction blocks
│   │   ├── dashboard/      # Visualizers (Charts, Accordions, Sliders, React Flow Tree)
│   │   └── layout/         # Navigation Navbar & Footer elements
│   └── lib/                # Shared stores, mock generators, and exports
│       ├── types.ts        # TypeScript models
│       ├── store.ts        # Zustand logic
│       ├── mock-data.ts    # Custom demo data engine
│       └── export.ts       # File downloads logic
├── tsconfig.json           # Compiler rules
├── tailwind.config.js      # Utility definitions
└── package.json            # Module dependencies
```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed (v18+ recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and append your API keys:
```env
# OpenAI Keys (for o3-mini, GPT-4-1, GPT-4-1 Mini)
OPENAI_API_KEY=your_openai_key

# Google AI Keys (for Gemini 2.5 Flash)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key

# Anthropic Keys (for Claude 3.5 Sonnet)
ANTHROPIC_API_KEY=your_claude_key
```
> **Note**: If no API keys are present, INFENGINE automatically runs in a fully-featured **Demo Mode** utilizing realistic mock engines so you can demo the platform seamlessly.

### 3. Launch Development Server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to experience the platform.

### 4. Build for Production
```bash
npm run build
```
