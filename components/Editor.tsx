'use client';

import dynamic from 'next/dynamic';

const ClientEditor = dynamic(() => import('@/components/editor/CodeMirrorEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] items-center justify-center rounded-xl border border-white/10 bg-black/30">
      Loading editor...
    </div>
  )
});

interface EditorProps {
  initialValue: string;
}

export default function Editor({ initialValue }: EditorProps) {
  return <ClientEditor initialValue={initialValue} />;
}
