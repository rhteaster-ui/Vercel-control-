'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, History, Home, Info, Rocket } from 'lucide-react';

import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/deploy', label: 'Deploy', icon: Rocket },
  { href: '/logs', label: 'Logs', icon: History },
  { href: '/editor', label: 'Editor', icon: Code2 },
  { href: '/about', label: 'About', icon: Info }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-grid-white/[0.02] bg-grid">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="glass hidden md:block">
          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border border-white/20 bg-white/10" />
              <span className="font-semibold">Vercel Control</span>
            </div>
          </div>
          <nav className="p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'mb-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition',
                    active ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="p-4 pb-24 md:p-8">{children}</main>
      </div>

      <nav className="glass fixed inset-x-4 bottom-4 z-50 rounded-2xl p-2 md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl py-2 text-[11px]',
                  active ? 'bg-white/10 text-white' : 'text-white/70'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
