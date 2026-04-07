'use client';

import { useState } from 'react';
import { Editor } from '@/components/Editor';

export default function EditorPage() {
  const [value, setValue] = useState('<h1>Hello Vercel Control</h1>');

  return (
    <section className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <h1 className="text-xl font-semibold">Editor IDE</h1>
      </div>
      <Editor initialValue={value} onChange={setValue} />
    </section>
  );
}
