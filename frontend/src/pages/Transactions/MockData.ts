import type { Transaction } from './types'

export const transactions: Transaction[] = [
  { description: 'Pagamento de salário', date: '01/04/2026', category: 'salary',        amount:  8200    },
  { description: 'Supermercado Extra',   date: '02/04/2026', category: 'grocery',       amount: -430.50  },
  { description: 'Academia Smart Fit',   date: '03/04/2026', category: 'gym',           amount: -99.90   },
  { description: 'Netflix',             date: '03/04/2026', category: 'entertainment', amount: -55.90   },
  { description: 'Farmácia Nissei',      date: '04/04/2026', category: 'health',        amount: -87.30   },
  { description: 'Uber',                date: '04/04/2026', category: 'transport',     amount: -32.00   },
  { description: 'Restaurante Madero',   date: '05/04/2026', category: 'food',          amount: -78.00   },
  { description: 'Conta de luz',         date: '05/04/2026', category: 'utilities',     amount: -210.00  },
]
