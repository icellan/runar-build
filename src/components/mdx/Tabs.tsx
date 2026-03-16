import { useState, type ReactNode } from 'react';

interface TabItemProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  children: ReactNode;
  labels: string[];
}

export function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
}

export default function Tabs({ children, labels }: TabsProps) {
  const [active, setActive] = useState(0);
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className="my-6">
      <div className="flex border-b border-border">
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={[
              'px-4 py-2 text-sm font-mono transition-colors border-b-2 -mb-px',
              active === i
                ? 'border-accent-500 text-accent-500'
                : 'border-transparent text-text-tertiary hover:text-text-secondary',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {items[active]}
      </div>
    </div>
  );
}
