'use client';

import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

type EditorClientProps = {
  initialValue?: string;
  onChange?: (value: string) => void;
};

export default function EditorClient({ initialValue = '', onChange }: EditorClientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: initialValue,
      extensions: [
        javascript(),
        EditorView.theme({
          '&': { height: '420px' },
          '.cm-scroller': { fontFamily: 'monospace' }
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange?.(update.state.doc.toString());
          }
        })
      ]
    });

    const view = new EditorView({
      state,
      parent: containerRef.current
    });

    return () => view.destroy();
  }, [initialValue, onChange]);

  return <div className="glass overflow-hidden rounded-xl" ref={containerRef} />;
}
