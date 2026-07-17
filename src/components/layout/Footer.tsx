import { Brain, Globe, Heart } from 'lucide-react';
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
          <p className="text-xs text-text-muted flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-danger fill-danger" /> using Next.js &amp; AI
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <Globe className="h-4 w-4" />
            </a>
            <span className="text-xs text-text-muted">
              © {new Date().getFullYear()} INFENGINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
