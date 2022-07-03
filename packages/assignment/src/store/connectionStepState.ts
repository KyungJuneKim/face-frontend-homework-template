import { atom } from 'recoil';
import { ConnectionStep } from '../types/ConnectionStep';

const connectionStepState = atom<ConnectionStep>({
  key: 'connectionStepState',
  default: 'Email',
});

export default connectionStepState;
