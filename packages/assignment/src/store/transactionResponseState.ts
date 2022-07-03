import { atom } from 'recoil';
import { ethers } from 'ethers';

const transactionResponseState =
  atom<ethers.providers.TransactionResponse | null>({
    key: 'transactionResponseState',
    default: null,
  });

export default transactionResponseState;
