import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false,
  loading: () => <p className="text-sm text-white/60">Loading editor...</p>
});

export default Editor;
