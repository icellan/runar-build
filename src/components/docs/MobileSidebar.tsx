import { useState, useEffect } from 'react';
import { docsNavigation } from '@data/navigation';

interface Props {
  currentPath: string;
}

export default function MobileSidebar({ currentPath }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary border border-border rounded-lg hover:border-border-strong transition-colors"
        aria-label="Open navigation"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        Menu
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed top-0 left-0 h-full w-72 bg-surface border-r border-border z-50 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-sm font-semibold text-text">Documentation</span>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text hover:bg-surface-alt transition-colors"
                aria-label="Close navigation"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {docsNavigation.map(section => {
              const isActive = section.items.some(
                item => currentPath === `/docs/${section.key}/${item.slug}`
              );
              return (
                <div key={section.key} className="mb-3">
                  <details open={isActive}>
                    <summary className="flex items-center justify-between cursor-pointer font-mono text-xs uppercase tracking-wider text-text-tertiary hover:text-text-secondary py-1 select-none list-none">
                      <span>{section.title}</span>
                      <svg className="w-3.5 h-3.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </summary>
                    <div className="mt-1 space-y-0.5">
                      {section.items.map(item => {
                        const href = `/docs/${section.key}/${item.slug}`;
                        const active = currentPath === href;
                        return (
                          <a
                            key={item.slug}
                            href={href}
                            onClick={() => setOpen(false)}
                            className={[
                              'block text-sm py-1 pl-3 border-l-2 transition-colors',
                              active
                                ? 'border-accent-500 text-accent-500 font-medium'
                                : 'border-transparent text-text-secondary hover:text-text hover:border-border-strong',
                            ].join(' ')}
                          >
                            {item.title}
                          </a>
                        );
                      })}
                    </div>
                  </details>
                </div>
              );
            })}
          </nav>
        </>
      )}
    </>
  );
}
