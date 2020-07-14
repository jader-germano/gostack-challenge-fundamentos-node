import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((next, transaction) => {
      if (transaction.type === 'income') {
        return next + transaction.value;
      }
      return next;
    }, 0);
    const total = income;
    const outcome = this.transactions.reduce((next, transaction) => {
      if (transaction.type === 'outcome') {
        return next + transaction.value;
      }
      return next;
    }, 0);
    return { income, outcome, total: total - outcome } as Balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    const size = this.transactions.length;
    if (size < 1) throw Error('Error saving transaction');
    return this.transactions[size - 1];
  }
}

export default TransactionsRepository;
