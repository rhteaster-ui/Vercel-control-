export default function LogsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Logs</h1>
      <div className="glass rounded-2xl p-6 text-sm text-white/70">
        Stream terminal logs dari endpoint <code>/api/vercel/events</code> menggunakan follow=1.
      </div>
    </section>
  );
}
