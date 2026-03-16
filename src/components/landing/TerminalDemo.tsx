import { useState, useEffect, useRef } from 'react';

const lines = [
  { text: '$ npx runar compile Counter.ts', delay: 0 },
  { text: '', delay: 400 },
  { text: '  Compiling: Counter.ts', delay: 600 },
  { text: '  Artifact written: artifacts/Counter.json', delay: 800 },
  { text: '', delay: 1000 },
  { text: '  Compilation complete: 1 succeeded, 0 failed', delay: 1200 },
  { text: '', delay: 1600 },
  { text: '$ npx runar deploy artifacts/Counter.json --network mainnet', delay: 2000 },
  { text: '', delay: 2400 },
  { text: '  Deploying contract: Counter', delay: 2600 },
  { text: '  Broadcasting...', delay: 2800 },
  { text: '', delay: 3000 },
  { text: '  Deployment successful!', delay: 3200 },
  { text: '  TXID: a1b2c3d4e5f6...', delay: 3400 },
];

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay);
    });
  }, []);

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs font-mono text-text-tertiary">terminal</span>
      </div>

      {/* Terminal body */}
      <div ref={containerRef} className="p-4 font-mono text-sm leading-relaxed min-h-[240px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={[
              'whitespace-pre',
              line.text.startsWith('$') ? 'text-text' : 'text-text-secondary',
              line.text.includes('✓') ? 'text-success' : '',
            ].filter(Boolean).join(' ')}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-accent-500 animate-pulse" />
        )}
      </div>
    </div>
  );
}
