import { atom } from 'recoil';
import { ethers } from 'ethers';

const amountForTransmissionState = atom({
  key: 'amountForTransmissionState',
  default: ethers.utils.parseEther('0'),
});

export default amountForTransmissionState;
