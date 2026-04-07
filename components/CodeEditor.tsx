'use client';

import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

type Props = {
  path: string;
  value: string;
  onChange: (value: string) => void;
};

function getExtensions(path: string) {
  if (path.endsWith('.html')) return [html()];
  if (path.endsWith('.md')) return [markdown()];
  return [javascript({ jsx: true, typescript: true })];
}

export default function CodeEditor({ path, value, onChange }: Props) {
  return (
    <CodeMirror
      value={value}
      height="70vh"
      theme={oneDark}
      extensions={getExtensions(path)}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        foldGutter: true
      }}
      onChange={onChange}
    />
  );
}
