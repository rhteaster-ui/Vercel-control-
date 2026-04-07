import Editor from '@/components/Editor';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 p-4 md:p-8">
      <header className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
        <h1 className="text-xl font-bold">Vercel Proxy IDE</h1>
        <p className="text-sm text-white/70">Generate, edit, and deploy static apps without Git.</p>
      </header>
      <section className="flex-1 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
        <Editor initialValue="&lt;h1&gt;Hello Blueprint&lt;/h1&gt;" />
      </section>
    </main>
  );
}
