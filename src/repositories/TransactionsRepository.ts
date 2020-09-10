import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionCreate{
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
    const {income, outcome} = this.transactions.reduce((accumulate: Balance, transactionValue: Transaction) => {
      switch ( transactionValue.type ) {
        case 'income':
          accumulate.income += transactionValue.value;
          break;
        case 'outcome':
          accumulate.outcome += transactionValue.value;
          break;
        default:
          break;
      }

      return accumulate;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    const total = income - outcome;

    return {income, outcome, total};
  }

  public create({title, value, type}: TransactionCreate): Transaction {    
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
