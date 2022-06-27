import { useRecoilValue } from 'recoil';
import { ReactNode } from 'react';
import Container from '../Container';
import signUpState from '../../store/signUpState';
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

  return (
    <Container>
      <Header />
      {signUpComponents[signUp]}
      <Footer />
    </Container>
  );
}
