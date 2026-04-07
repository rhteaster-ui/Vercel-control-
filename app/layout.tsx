import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Vercel Control IDE',
  description: 'Deployment manager and web-based IDE'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
