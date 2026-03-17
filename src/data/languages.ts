export interface Language {
  name: string;
  status: 'stable' | 'beta' | 'experimental';
  snippet: string;
  lang: string;
}

export const languages: Language[] = [
  {
    name: 'TypeScript',
    status: 'stable',
    lang: 'typescript',
    snippet: `class Counter extends StatefulSmartContract {
  count: bigint;

  constructor(count: bigint) {
    super(count);
    this.count = count;
  }

  public increment() {
    this.count++;
  }
}`,
  },
  {
    name: 'Go',
    status: 'stable',
    lang: 'go',
    snippet: `type Counter struct {
    runar.StatefulSmartContract
    Count runar.Bigint
}

func (c *Counter) Increment() {
    c.Count++
}`,
  },
  {
    name: 'Rust',
    status: 'stable',
    lang: 'rust',
    snippet: `#[runar::contract(stateful)]
pub struct Counter {
    pub count: i64,
}

#[runar::methods]
impl Counter {
    #[public]
    pub fn increment(&mut self) {
        self.count += 1;
    }
}`,
  },
  {
    name: 'Python',
    status: 'stable',
    lang: 'python',
    snippet: `class Counter(StatefulSmartContract):
    count: Bigint

    def __init__(self, count: Bigint):
        super().__init__(count)
        self.count = count

    @public
    def increment(self):
        self.count += 1`,
  },
  {
    name: 'Solidity',
    status: 'experimental',
    lang: 'solidity',
    snippet: `contract Counter is StatefulSmartContract {
    int64 count;

    function increment() public {
        count++;
    }
}`,
  },
  {
    name: 'Move',
    status: 'experimental',
    lang: 'move',
    snippet: `module Counter {
    resource struct Counter {
        count: bigint,
    }

    public fun increment(c: &mut Counter) {
        c.count = c.count + 1;
    }
}`,
  },
];
