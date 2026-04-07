import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import { Navigation } from '@/components/nav';

export const metadata: Metadata = {
  title: 'Vercel Control IDE',
  description: 'Deployment manager dan web IDE untuk static project.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <div className="flex min-h-screen gap-4 p-4">
          <Navigation />
          <main className="flex-1 pb-24 md:pb-4">{children}</main>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
