'use client';

import dynamic from 'next/dynamic';

const EditorClient = dynamic(() => import('./Editor.client'), {
  ssr: false,
  loading: () => <div className="glass rounded-xl p-4 text-sm text-white/60">Memuat editor...</div>
});

type EditorProps = {
  initialValue?: string;
  onChange?: (value: string) => void;
};

export function Editor(props: EditorProps) {
  return <EditorClient {...props} />;
}
