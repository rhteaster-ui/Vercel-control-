'use client';

import { Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAppStore } from '@/stores/useAppStore';

export default function DeployPage() {
  const [projectName, setProjectName] = useState('');
  const isLoading = useAppStore((s) => s.isLoading);
  const setLoading = useAppStore((s) => s.setLoading);

  async function handleDeploy() {
    try {
      setLoading(true);
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': prompt('Masukkan ADMIN_SECRET_KEY') || ''
        },
        body: JSON.stringify({
          projectName,
          files: [
            { file: 'index.html', content: '<h1>Hello Vercel Control</h1>' },
            { file: 'styles.css', content: 'body { font-family: sans-serif; }' }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Deploy failed');
      }

      toast.success('Deploy berhasil dijalankan.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Deploy gagal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Deploy</h1>
      <div className="glass space-y-4 rounded-2xl p-6">
        <label className="space-y-2 text-sm text-white/80">
          <span>Project Name</span>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 outline-none"
            placeholder="my-static-project"
          />
        </label>
        <button
          disabled={isLoading || !projectName}
          onClick={handleDeploy}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {isLoading ? 'Deploying...' : 'Deploy Now'}
        </button>
      </div>
    </section>
  );
}
