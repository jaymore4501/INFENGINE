import { Brain } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-hover">
                <Brain className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-heading text-lg font-bold">
                INF<span className="text-primary">ENGINE</span>
              </span>
            </div>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              Transform complex decisions into confident actions with explainable AI. 
              Every decision deserves intelligence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/workspace', label: 'Decision Workspace' },
                { href: '/results', label: 'Results Dashboard' },
                { href: '/methodology', label: 'Methodology' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Built With</h4>
            <ul className="space-y-2.5">
              {['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                <li key={tech} className="text-sm text-text-muted">{tech}</li>
               ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted leading-relaxed">
            Empowering strategic decisions through multi-dimensional AI intelligence.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/jaymore4501/INFENGINE.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors"
              title="GitHub Repository"
            >
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <span className="text-xs text-text-muted">
              © {new Date().getFullYear()} INFENGINE. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
