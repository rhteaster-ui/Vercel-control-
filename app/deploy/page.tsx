'use client';

import { useState } from 'react';

export default function DeployPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="glass rounded-2xl p-6">
      <h1 className="text-xl font-semibold">Deploy</h1>
      <p className="mt-1 text-sm text-white/70">Upload ZIP statis atau deploy dari VFS aktif.</p>
      <button
        onClick={() => setIsLoading(true)}
        disabled={isLoading}
        className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Deploying...' : 'Start Deploy'}
      </button>
    </section>
  );
}
