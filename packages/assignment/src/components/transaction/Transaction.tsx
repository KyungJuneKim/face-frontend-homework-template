import { ReactNode, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Container from '../Container';
import Sender from './Sender';
import { TransactionStep } from '../../types/TransactionStep';
import transactionStepState from '../../store/transactionStepState';

const transactionComponents: Record<TransactionStep, ReactNode> = {
  Sender: <Sender />,
  Bill: undefined,
};

export default function Transaction() {
  const transactionStep = useRecoilValue(transactionStepState);
  const resetTransactionStep = useResetRecoilState(transactionStepState);

  useEffect(() => {
    resetTransactionStep();
  }, [resetTransactionStep]);

  return <Container>{transactionComponents[transactionStep]}</Container>;
}
