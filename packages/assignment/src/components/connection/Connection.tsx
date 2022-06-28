import { useRecoilValue, useResetRecoilState } from 'recoil';
import { ReactNode, useEffect } from 'react';
import Container from '../Container';
import signUpState from '../../store/signUpState';
import emailState from '../../store/emailState';
import { SignUpState } from '../../types/signUpState';
import Email from './Email';
import Header from '../Header';
import Footer from '../Footer';

const signUpComponents: Record<SignUpState, ReactNode> = {
  Email: <Email />,
  Password: undefined,
  Success: undefined,
  Verification: undefined,
};

export default function Connection() {
  const signUp = useRecoilValue(signUpState);
  const resetEmailState = useResetRecoilState(emailState);
  const resetSignUpState = useResetRecoilState(signUpState);

  useEffect(() => {
    resetEmailState();
    resetSignUpState();
  }, [resetEmailState, resetSignUpState]);

  return <Container>{signUpComponents[signUp]}</Container>;
}
