export interface Feature {
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    title: 'Multi-Language Compiler',
    description: 'Write contracts in TypeScript, Go, Rust, Python, Solidity, or Move. One compiler, many languages.',
  },
  {
    title: 'Type-Safe SDK',
    description: 'Deploy and call contracts with full type inference. Catch errors at compile time, not on-chain.',
  },
  {
    title: 'Inductive Contracts',
    description: 'Build stateful applications using UTXO-native state machines. No account model needed.',
  },
  {
    title: 'Token Standard',
    description: 'First-class support for fungible and non-fungible tokens with built-in compliance.',
  },
  {
    title: 'Built-In Testing',
    description: 'Test contracts locally with a purpose-built test runner. No network required.',
  },
  {
    title: 'Deterministic Output',
    description: 'Same source always compiles to the same Bitcoin Script. Reproducible and auditable.',
  },
];
