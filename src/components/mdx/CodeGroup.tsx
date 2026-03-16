import { useState, type ReactNode } from 'react';

interface Props {
  labels: string[];
  children: ReactNode;
}

export default function CodeGroup({ labels, children }: Props) {
  const [active, setActive] = useState(0);
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className="my-6 rounded-xl border border-border bg-surface overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border bg-surface-alt px-2">
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={[
              'px-3 py-2 text-xs font-mono transition-colors border-b-2 -mb-px',
              active === i
                ? 'border-accent-500 text-accent-500'
                : 'border-transparent text-text-tertiary hover:text-text-secondary',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 overflow-x-auto [&>pre]:m-0 [&>pre]:border-0 [&>pre]:bg-transparent">
        {items[active]}
      </div>
    </div>
  );
}
