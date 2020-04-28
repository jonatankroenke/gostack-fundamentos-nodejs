import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface ReturnAll {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ReturnAll {
    if (this.transactions.length > 0) {
      return { transactions: this.transactions, balance: this.getBalance() };
    }
    throw Error('Sem transações disponiveis');
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((a, b) => a + b.value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((a, b) => a + b.value, 0);

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
