import { FolderX } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="glass rounded-2xl p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-sm text-white/70">Kelola project statis, deploy ke Vercel, dan edit file langsung dari browser.</p>

      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 py-14 text-center">
        <FolderX className="h-10 w-10 text-white/50" />
        <p className="mt-3 text-sm text-white/70">Belum ada project di Virtual File System.</p>
      </div>
    </section>
  );
}
