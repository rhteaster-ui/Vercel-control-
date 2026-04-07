'use client';

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeMirrorProps {
  initialValue: string;
}

export default function CodeMirrorEditor({ initialValue }: CodeMirrorProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <CodeMirror
      value={value}
      minHeight="60vh"
      theme={oneDark}
      extensions={[html()]}
      onChange={(nextValue) => setValue(nextValue)}
      className="overflow-hidden rounded-xl border border-white/10"
    />
  );
}
