import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchResult {
  url: string;
  meta: { title: string };
  excerpt: string;
}

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pagefindRef = useRef<any>(null);

  // Global keyboard shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setSelected(0);
    }
  }, [open]);

  // Initialize Pagefind lazily
  const initPagefind = useCallback(async () => {
    if (pagefindRef.current) return pagefindRef.current;
    try {
      // Dynamic import that Vite won't try to resolve at build time
      const pagefindPath = '/pagefind/pagefind.js';
      const pf = await import(/* @vite-ignore */ pagefindPath);
      await pf.init();
      pagefindRef.current = pf;
      return pf;
    } catch {
      return null;
    }
  }, []);

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelected(0);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const pf = await initPagefind();
      if (!pf) {
        setLoading(false);
        return;
      }

      const search = await pf.debouncedSearch(query);
      if (!search) {
        setLoading(false);
        return;
      }

      const data = await Promise.all(
        search.results.slice(0, 8).map((r: any) => r.data())
      );
      setResults(data);
      setSelected(0);
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, initPagefind]);

  // Keyboard navigation in results
  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      window.location.href = results[selected].url;
      setOpen(false);
    }
  }

  const isDev = typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-tertiary border border-border rounded-lg hover:border-border-strong hover:text-text-secondary transition-colors"
        aria-label="Search documentation"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="hidden sm:inline">Search docs...</span>
        <kbd className="hidden sm:inline text-xs font-mono text-text-tertiary bg-surface px-1.5 py-0.5 rounded border border-border">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4">
            <div className="bg-surface border border-border rounded-xl shadow-lg overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search documentation..."
                  className="flex-1 py-3 bg-transparent text-sm text-text outline-none placeholder:text-text-tertiary"
                  aria-label="Search"
                />
                <kbd
                  className="text-xs font-mono text-text-tertiary cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isDev && !query && (
                  <div className="px-4 py-8 text-center text-sm text-text-tertiary">
                    Search is available in production builds.
                  </div>
                )}

                {!isDev && query && loading && (
                  <div className="px-4 py-8 text-center text-sm text-text-tertiary">
                    Searching...
                  </div>
                )}

                {!isDev && query && !loading && results.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-text-tertiary">
                    No results found for "{query}"
                  </div>
                )}

                {results.map((result, i) => (
                  <a
                    key={result.url}
                    href={result.url}
                    onClick={() => setOpen(false)}
                    className={[
                      'block px-4 py-3 border-b border-border last:border-0 transition-colors',
                      selected === i ? 'bg-surface-alt' : 'hover:bg-surface-alt',
                    ].join(' ')}
                  >
                    <div className="text-sm font-medium text-text">{result.meta.title}</div>
                    <div
                      className="text-xs text-text-secondary mt-1 line-clamp-2 [&>mark]:bg-accent-500/20 [&>mark]:text-accent-500 [&>mark]:rounded-sm [&>mark]:px-0.5"
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
