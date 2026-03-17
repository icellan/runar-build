export interface NavItem {
  title: string;
  slug: string;
}

export interface NavSection {
  title: string;
  key: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    title: 'Getting Started',
    key: 'getting-started',
    items: [
      { title: 'Overview', slug: 'overview' },
      { title: 'Installation', slug: 'installation' },
      { title: 'Quick Start', slug: 'quick-start' },
      { title: 'Project Structure', slug: 'project-structure' },
    ],
  },
  {
    title: 'Bitcoin & BSV Basics',
    key: 'bitcoin-bsv-basics',
    items: [
      { title: 'The UTXO Model', slug: 'utxo-model' },
      { title: 'Bitcoin Script', slug: 'bitcoin-script' },
      { title: 'Transactions & Outputs', slug: 'transactions-and-outputs' },
      { title: 'How Smart Contracts Work on BSV', slug: 'how-smart-contracts-work-on-bsv' },
    ],
  },
  {
    title: 'Writing Contracts',
    key: 'writing-contracts',
    items: [
      { title: 'Contract Basics', slug: 'contract-basics' },
      { title: 'TypeScript Contracts', slug: 'typescript-contracts' },
      { title: 'Go Contracts', slug: 'go-contracts' },
      { title: 'Rust Contracts', slug: 'rust-contracts' },
      { title: 'Python Contracts', slug: 'python-contracts' },
      { title: 'Solidity Contracts', slug: 'solidity-contracts' },
      { title: 'Move Contracts', slug: 'move-contracts' },
      { title: 'Language Feature Matrix', slug: 'language-feature-matrix' },
    ],
  },
  {
    title: 'The Compiler',
    key: 'compiler',
    items: [
      { title: 'How the Compiler Works', slug: 'how-it-works' },
      { title: 'Compilation Pipeline', slug: 'compilation-pipeline' },
      { title: 'Compiler Configuration', slug: 'configuration' },
      { title: 'Output Artifacts', slug: 'output-artifacts' },
    ],
  },
  {
    title: 'The SDK',
    key: 'sdk',
    items: [
      { title: 'SDK Overview', slug: 'overview' },
      { title: 'Deploying a Contract', slug: 'deploying' },
      { title: 'Calling a Contract', slug: 'calling' },
      { title: 'Multi-Signer Transactions', slug: 'multi-signer' },
      { title: 'Stateful Contracts', slug: 'inductive-contracts' },
      { title: 'Token Contracts', slug: 'token-contracts' },
      { title: 'Wallet Integration', slug: 'wallet-integration' },
      { title: 'Fee & Change Handling', slug: 'fee-and-change-handling' },
      { title: 'Providers Reference', slug: 'providers-reference' },
      { title: 'Code Generation', slug: 'code-generation' },
    ],
  },
  {
    title: 'Testing & Debugging',
    key: 'testing-and-debugging',
    items: [
      { title: 'Writing Tests', slug: 'writing-tests' },
      { title: 'The Test Runner', slug: 'test-runner' },
      { title: 'Advanced Testing', slug: 'advanced-testing' },
      { title: 'Test Fixtures & Mocks', slug: 'mock-and-fixtures' },
      { title: 'Debugging Compiled Script', slug: 'debugging-script' },
      { title: 'Fuzzing & Property Testing', slug: 'fuzzing' },
      { title: 'Common Errors', slug: 'common-errors' },
    ],
  },
  {
    title: 'Advanced',
    key: 'advanced',
    items: [
      { title: 'Covenant Architecture', slug: 'covenant-architecture' },
      { title: 'Recursive Contracts & ZK Proofs', slug: 'recursive-contracts-and-zk-proofs' },
      { title: 'DAG Topology & Token Merges', slug: 'dag-topology-and-token-merges' },
      { title: 'Security Considerations', slug: 'security-considerations' },
    ],
  },
  {
    title: 'API Reference',
    key: 'api-reference',
    items: [
      { title: 'Compiler API', slug: 'compiler-api' },
      { title: 'SDK API', slug: 'sdk-api' },
      { title: 'Contract Decorators & Types', slug: 'contract-decorators-and-types' },
      { title: 'CLI Reference', slug: 'cli-reference' },
    ],
  },
  {
    title: 'Tutorials',
    key: 'tutorials',
    items: [
      { title: 'Hello World Contract', slug: 'hello-world' },
      { title: 'Fungible Token', slug: 'fungible-token' },
      { title: 'NFT Contract', slug: 'nft' },
      { title: 'Multi-Party Escrow', slug: 'multi-party-escrow' },
    ],
  },
  {
    title: 'Examples',
    key: 'examples',
    items: [
      { title: 'Example Gallery', slug: 'gallery' },
      { title: 'Counter', slug: 'counter' },
      { title: 'Tic-Tac-Toe', slug: 'tic-tac-toe' },
      { title: 'Auction', slug: 'auction' },
      { title: 'Blackjack Betting', slug: 'blackjack-betting' },
      { title: 'Price Bet', slug: 'price-bet' },
    ],
  },
];

/**
 * Get a flat list of all doc pages in order, for prev/next navigation.
 */
export function getFlatNavigation() {
  return docsNavigation.flatMap(section =>
    section.items.map(item => ({
      title: item.title,
      sectionTitle: section.title,
      sectionKey: section.key,
      slug: item.slug,
      path: `/docs/${section.key}/${item.slug}`,
    }))
  );
}
