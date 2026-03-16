export interface Language {
  name: string;
  status: 'stable' | 'beta' | 'planned';
  snippet: string;
  lang: string;
}

export const languages: Language[] = [
  {
    name: 'TypeScript',
    status: 'stable',
    lang: 'typescript',
    snippet: `@contract
class Counter {
  @state count: bigint = 0n;

  @method
  increment() {
    this.count++;
  }
}`,
  },
  {
    name: 'Go',
    status: 'stable',
    lang: 'go',
    snippet: `type Counter struct {
    Count int64 \`state\`
}

func (c *Counter) Increment() {
    c.Count++
}`,
  },
  {
    name: 'Rust',
    status: 'beta',
    lang: 'rust',
    snippet: `#[contract]
struct Counter {
    #[state]
    count: i64,
}

impl Counter {
    pub fn increment(&mut self) {
        self.count += 1;
    }
}`,
  },
  {
    name: 'Python',
    status: 'stable',
    lang: 'python',
    snippet: `@contract
class Counter:
    count: int = state(0)

    @method
    def increment(self):
        self.count += 1`,
  },
  {
    name: 'Solidity',
    status: 'planned',
    lang: 'solidity',
    snippet: `contract Counter {
    int64 count;

    function increment() public {
        count++;
    }
}`,
  },
  {
    name: 'Move',
    status: 'planned',
    lang: 'move',
    snippet: `module counter {
    struct Counter has key {
        count: u64,
    }

    public fun increment(c: &mut Counter) {
        c.count = c.count + 1;
    }
}`,
  },
];
