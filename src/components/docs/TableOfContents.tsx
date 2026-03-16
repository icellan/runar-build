import { useState, useEffect } from 'react';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const [activeSlug, setActiveSlug] = useState('');
  const filtered = headings.filter(h => h.depth >= 2 && h.depth <= 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );

    for (const heading of filtered) {
      const el = document.getElementById(heading.slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [filtered]);

  if (filtered.length === 0) return null;

  return (
    <nav className="sticky top-20 w-48 hidden xl:block" aria-label="On this page">
      <h4 className="font-mono text-xs uppercase tracking-wider text-text-tertiary mb-3">
        On this page
      </h4>
      <ul className="space-y-1">
        {filtered.map(h => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              className={[
                'block text-sm py-0.5 transition-colors',
                h.depth === 3 ? 'pl-3' : '',
                activeSlug === h.slug
                  ? 'text-accent-500'
                  : 'text-text-tertiary hover:text-text-secondary',
              ].join(' ')}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
