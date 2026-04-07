'use client';

import { useState } from 'react';

import Editor from '@/components/Editor';

export default function EditorPage() {
  const [content, setContent] = useState('<!doctype html>\n<html>\n  <body>Hello</body>\n</html>');

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Editor</h1>
      <div className="glass rounded-2xl p-4">
        <Editor path="index.html" value={content} onChange={setContent} />
      </div>
    </section>
  );
}
