import { atom } from 'recoil';
import { TransactionStep } from '../types/TransactionStep';

const transactionStepState = atom<TransactionStep>({
  key: 'transactionStepState',
  default: 'Sender',
});

export default transactionStepState;
