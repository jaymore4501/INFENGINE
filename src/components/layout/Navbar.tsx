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

          {/* CTA */}
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            Analyze
          </Link>

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
        </div>
      </details>
    </div>
  );
}
