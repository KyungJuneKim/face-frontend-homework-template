import { atom } from 'recoil';
import { ethers } from 'ethers';

const transactionFeeState = atom({
  key: 'transactionFeeState',
  default: ethers.utils.parseEther('0'),
});

export default transactionFeeState;
