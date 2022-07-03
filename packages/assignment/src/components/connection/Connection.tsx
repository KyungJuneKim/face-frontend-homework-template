import { useRecoilValue, useResetRecoilState } from 'recoil';
import { ReactNode, useEffect } from 'react';
import Container from '../Container';
import connectionStepState from '../../store/connectionStepState';
import emailState from '../../store/emailState';
import { ConnectionStep } from '../../types/ConnectionStep';
import Email from './Email';
import Verification from './Verification';
import Password from './Password';
import Success from './Success';

const connectionComponents: Record<ConnectionStep, ReactNode> = {
  Email: <Email />,
  Verification: <Verification />,
  Password: <Password />,
  Success: <Success />,
};

export default function Connection() {
  const connectionStep = useRecoilValue(connectionStepState);
  const resetEmailState = useResetRecoilState(emailState);
  const resetConnectionStep = useResetRecoilState(connectionStepState);

  useEffect(() => {
    resetEmailState();
    resetConnectionStep();
  }, [resetEmailState, resetConnectionStep]);

  return <Container>{connectionComponents[connectionStep]}</Container>;
}
