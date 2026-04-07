import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { AppShell } from '@/components/AppShell';

import './globals.css';

export const metadata: Metadata = {
  title: 'Vercel Control',
  description: 'Deployment manager dan web IDE untuk static projects.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AppShell>{children}</AppShell>
        <Toaster theme="dark" richColors />
      </body>
    </html>
  );
}
