import type { CategoryItem } from './types'

export const mockCategories: CategoryItem[] = [
  { category: 'food',          title: 'Alimentação',    subtitle: 'Refeições, lanches e restaurantes', itemCount: 12 },
  { category: 'grocery',       title: 'Mercado',        subtitle: 'Compras em supermercados',          itemCount: 8  },
  { category: 'health',        title: 'Saúde',          subtitle: 'Farmácias, consultas e exames',     itemCount: 5  },
  { category: 'transport',     title: 'Transporte',     subtitle: 'Combustível, Uber e transporte',    itemCount: 9  },
  { category: 'entertainment', title: 'Entretenimento', subtitle: 'Streaming, cinema e lazer',         itemCount: 4  },
  { category: 'gym',           title: 'Academia',       subtitle: 'Mensalidade e suplementos',         itemCount: 2  },
]
