import { useState } from 'react';

const steps = [
  {
    label: '1. Write',
    code: `import { contract, state, method } from 'runar';

@contract
class Counter {
  @state count: bigint = 0n;

  @method
  increment() {
    this.count++;
  }

  @method
  getCount(): bigint {
    return this.count;
  }
}`,
    lang: 'TypeScript',
  },
  {
    label: '2. Compile',
    code: `$ npx runar compile

  ✓ Parsed Counter.ts
  ✓ Type-checked 2 methods
  ✓ Generated AST
  ✓ Optimized IR
  ✓ Emitted Bitcoin Script

  Output: dist/Counter.script
  Size:   142 bytes
  Time:   23ms`,
    lang: 'Terminal',
  },
  {
    label: '3. Deploy',
    code: `import { RunarSDK } from 'runar/sdk';
import { Counter } from './dist/Counter';

const sdk = new RunarSDK({ network: 'mainnet' });
const counter = await sdk.deploy(Counter);

console.log('Deployed:', counter.txid);

// Call the contract
await counter.increment();
const count = await counter.getCount();
console.log('Count:', count); // 1n`,
    lang: 'TypeScript',
  },
];

export default function CodeStepper() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Step tabs */}
      <div className="flex border-b border-border mb-0">
        {steps.map((step, i) => (
          <button
            key={step.label}
            onClick={() => setActive(i)}
            className={[
              'px-4 py-2.5 text-sm font-mono transition-colors border-b-2 -mb-px',
              active === i
                ? 'border-accent-500 text-accent-500'
                : 'border-transparent text-text-tertiary hover:text-text-secondary',
            ].join(' ')}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Code panel */}
      <div className="bg-surface border border-border border-t-0 rounded-b-xl p-5 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-text-tertiary">{steps[active].lang}</span>
          <CopyButton text={steps[active].code} />
        </div>
        <pre className="text-sm font-mono text-text-secondary leading-relaxed whitespace-pre">
          <code>{steps[active].code}</code>
        </pre>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="text-xs font-mono text-text-tertiary hover:text-text-secondary transition-colors px-2 py-1 rounded border border-border hover:border-border-strong"
      aria-label="Copy code"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
