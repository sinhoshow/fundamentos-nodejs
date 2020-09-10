import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionServiceDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: CreateTransactionServiceDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    
    if (type == 'outcome' && total - value < 0){
      throw Error('Não há saldo suficiente');
    }
    return this.transactionsRepository.create({title, value, type});
  }
}

export default CreateTransactionService;
