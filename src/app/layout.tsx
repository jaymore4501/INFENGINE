import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MouseGlow from '@/components/layout/MouseGlow';

export const metadata: Metadata = {
  title: 'INFENGINE — AI Decision Intelligence Platform',
  description:
    'Transform complex decisions into confident actions with explainable AI. Evaluate options across multiple dimensions with weighted scoring, risk analysis, scenario forecasting, and bias detection.',
  keywords: [
    'AI decision making',
    'decision intelligence',
    'decision analysis',
    'explainable AI',
    'decision framework',
    'risk analysis',
    'scenario planning',
  ],
  authors: [{ name: 'INFENGINE' }],
  openGraph: {
    title: 'INFENGINE — AI Decision Intelligence Platform',
    description: 'Every decision deserves intelligence.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <MouseGlow />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
