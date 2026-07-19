# INFENGINE — AI Decision Intelligence Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js Badge" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React Badge" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript Badge" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS Badge" />
  <img src="https://img.shields.io/badge/Render-Deploy-512BD4?style=for-the-badge&logo=render" alt="Render Badge" />
</p>

> **Transform complex decisions into confident actions with explainable AI.**
> Evaluates choices across 14 categories with multi-model reasoning, interactive flowcharts, risk audits, and multi-page PDF consulting briefs.

---

## 🌟 Overview

**INFENGINE** is an enterprise-grade dark-themed Decision Intelligence platform. Instead of asking AI *"What should I do?"*, INFENGINE evaluates *"Why is one decision objectively stronger than another?"* through systematic scoring, timeline forecasting, scenario simulations, and cognitive bias detection.

### 🎥 Live Demo & Deployment
* **Local Workspace**: [http://localhost:3000](http://localhost:3000)
* **One-Click Deploy**: Deploy directly on Render using the Blueprint:
  
  [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/jaymore4501/INFENGINE)

---

## 💡 Key Features

### 🧠 1. Multi-Model AI Reasoner
* Select between **OpenAI (GPT-4o)**, **Claude (3.5 Sonnet)**, and **Google (Gemini)**.
* Automatic **Demo Mode** fallback: works out-of-the-box with simulated evaluations if keys are missing.

### 📊 2. Interactive Results Dashboard
* **Winner Card & Confidence Gauge**: Instant visualization of the recommended choice with score differentials.
* **Spider/Radar Matrix**: Multi-dimensional radar comparison mapping options across all 14 criteria.
* **Decision Tree Flow**: Interactive node-based flowchart (powered by React Flow) illustrating decision path outcomes.
* **Timeline Projections**: 10-year forecasts comparing option evolution.

### 🎛️ 3. Sensitivity & Scenario Playground
* **Variable Sliders**: Dynamically change weights (Budget, Risk, Time) and watch option scores recalculate live.
* **Scenario Simulations**: Model external shocks (Market Downturns, Competitor Shifts) and gauge immediate impact.

### 📄 4. Consultant-Grade PDF Exporter
* Generate a beautiful, multi-page **6-page PDF Report** featuring:
  * Executive Summary with highlighted recommendations.
  * Side-by-side options comparison columns.
  * Multi-dimensional Radar Chart & vector scoring bar charts.
  * Timeline forecasts, risk mitigations, bias audits, and evidence chains.

---

## ⚙️ 14 Evaluation Dimensions
Decisions are mathematically evaluated across:
1. **Financial Return**
2. **Risk Exposure**
3. **Learning Curve**
4. **Long-Term Growth**
5. **Personal Satisfaction**
6. **Time Investment**
7. **Scalability**
8. **Stress Level**
9. **Flexibility**
10. **Opportunity Cost**
11. **Market Demand**
12. **Future Stability**
13. **Lifestyle Impact**
14. **AI Confidence**

---

## 📂 Repository Structure

```
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Pages, API endpoints, global styles
│   │   ├── api/analyze     # Model serverless call routers
│   │   ├── results         # Dashboard components and page
│   │   ├── methodology     # AI reasoning description
│   │   └── about           # Project details page
│   ├── components/
│   │   ├── dashboard       # Visualizers (Charts, Sliders, React Flow Tree)
│   │   └── layout          # Header Navbar & Footer layouts
│   └── lib/                # PDF Exports, Mock Engines, and Zustand Store
├── render.yaml             # Render Blueprint configuration
└── package.json            # Module dependencies
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org) (v18.0.0 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Google (Free tier key available via Google AI Studio)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key

# OpenAI
OPENAI_API_KEY=your_openai_key

# Anthropic Claude
ANTHROPIC_API_KEY=your_claude_key
```

> 💡 **No Keys?** The app runs automatically in fully-featured **Demo Mode** using custom mock engines.

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the platform.

### 4. Build for Production
```bash
npm run build
npm run start
```
