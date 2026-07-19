'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/results', label: 'Dashboard' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md group-hover:blur-lg transition-all" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-hover">
                <Brain className="h-4.5 w-4.5 text-white" />
              </div>
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-text-primary">
              INF<span className="text-primary">ENGINE</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA & Repo */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/jaymore4501/INFENGINE.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-surface/30 px-3.5 py-2 text-sm font-semibold text-text-secondary hover:border-primary/30 hover:text-primary transition-all active:scale-95"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              Analyze
            </Link>
          </div>

          {/* Mobile menu button */}
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </motion.nav>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border text-text-muted hover:text-text-primary hover:border-border-hover list-none">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card border border-border p-2 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border mt-1.5 pt-1.5">
            <a
              href="https://github.com/jaymore4501/INFENGINE.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </details>
    </div>
  );
}
