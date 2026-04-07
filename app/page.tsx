import { FolderOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Virtual File System</h2>
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 px-8 py-16 text-center">
          <FolderOpen className="h-10 w-10 text-white/50" />
          <p className="mt-3 text-sm text-white/60">Belum ada project tersimpan di VFS.</p>
        </div>
      </div>
    </section>
  );
}
