'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, House, Info, Logs, UploadCloud } from 'lucide-react';

const items = [
  { href: '/', label: 'Home', icon: House },
  { href: '/deploy', label: 'Deploy', icon: UploadCloud },
  { href: '/logs', label: 'Logs', icon: Logs },
  { href: '/editor', label: 'Editor', icon: Code },
  { href: '/about', label: 'About', icon: Info }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <aside className="glass hidden w-64 flex-col md:flex">
        <div className="border-b border-white/10 p-4">
          <p className="font-bold">Vercel Control</p>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  active ? 'bg-white text-black' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="glass fixed bottom-3 left-3 right-3 z-50 flex justify-between rounded-2xl px-3 py-2 md:hidden">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 px-2 py-1 text-xs">
              <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-white/60'}`} />
              <span className={active ? 'text-white' : 'text-white/60'}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
