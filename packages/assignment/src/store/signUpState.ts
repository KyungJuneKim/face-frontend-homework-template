import { atom } from 'recoil';
import { SignUpState } from '../types/signUpState';

const signUpState = atom<SignUpState>({
  key: 'signUpState',
  default: 'Email',
});

export default signUpState;
