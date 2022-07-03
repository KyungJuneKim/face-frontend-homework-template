import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FaceSDK } from '@face/sdk';
import { ethers } from 'ethers';
import Container from '../Container';
import Sender from './Sender';
import transactionStepState from '../../store/transactionStepState';
import Bill from './Bill';
import amountForTransmissionState from '../../store/amountForTransmissionState';
import receiverAddressState from '../../store/receiverAddressState';

export default function Transaction() {
  const transactionStep = useRecoilValue(transactionStepState);
  const setTransactionStep = useSetRecoilState(transactionStepState);

  const amount = useRecoilValue(amountForTransmissionState);
  const receiver = useRecoilValue(receiverAddressState);
  const [balance, setBalance] = useState<ethers.BigNumber | null>(null);
  const [fee, setFee] = useState<ethers.BigNumber | null>(null);
  const [isBillLoading, setIsBillLoading] = useState(false);
  const handleSenderConfirmButtonClick = useRef<
    MouseEventHandler<HTMLButtonElement> | undefined
  >(undefined);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    (async () => {
      const sdk = new FaceSDK(
        'https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59'
      );
      const provider = new ethers.providers.Web3Provider(sdk.getProvider());
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      let insufficient = false;
      try {
        await signer.populateTransaction({
          to: address,
          value: amount,
        });
      } catch {
        insufficient = true;
      }
      const [available, txRequest] = await Promise.all([
        provider.getBalance(address),
        signer.populateTransaction({
          to: address,
          value: amount,
          gasLimit: insufficient ? 0 : undefined,
        }),
      ]);

      setBalance(available);
      setFee(
        (txRequest.maxFeePerGas as ethers.BigNumber).mul(
          txRequest.gasLimit as ethers.BigNumber
        )
      );

      handleSenderConfirmButtonClick.current = async () => {
        const tx = await signer.sendTransaction(txRequest);
        setTransactionHash(tx.hash);
        setTransactionStep('Bill');
        setIsBillLoading(true);
        await tx.wait();
        setIsBillLoading(false);
      };
    })();
  }, [amount, setTransactionStep]);

  return (
    <Container>
      {transactionStep === 'Sender' && balance !== null && fee !== null && (
        <Sender
          balance={balance}
          receiver={receiver}
          amount={amount}
          fee={fee}
          onConfirmButtonClick={handleSenderConfirmButtonClick.current}
        />
      )}
      {transactionStep === 'Bill' && fee !== null && !!transactionHash && (
        <Bill
          loading={isBillLoading}
          receiver={receiver}
          amount={amount}
          fee={fee}
          txHash={transactionHash}
        />
      )}
    </Container>
  );
}
