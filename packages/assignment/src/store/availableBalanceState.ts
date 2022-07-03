import { atom } from 'recoil';
import { ethers } from 'ethers';

const availableBalanceState = atom({
  key: 'availableBalanceState',
  default: ethers.utils.parseEther('0'),
});

export default availableBalanceState;
