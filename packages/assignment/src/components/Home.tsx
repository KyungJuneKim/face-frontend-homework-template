import { useNavigate } from 'react-router-dom';
import { css, useTheme } from '@emotion/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRef, useState } from 'react';
import { ethers } from 'ethers';
import { FaceSDK } from '@face/sdk';
import Container from './Container';
import createStyles from '../utils/createStyles';
import receiverAddressState from '../store/receiverAddressState';
import TextField from './TextField';
import amountForTransmissionState from '../store/amountForTransmissionState';
import availableBalanceState from '../store/availableBalanceState';
import transactionFeeState from '../store/transactionFeeState';

const useStyles = createStyles({
  margin: css({ margin: '2px 0' }),
  divider: css({
    height: '1px',
    backgroundColor: '#313A45',
  }),
});

export default function Home() {
  const styles = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const sdk = useRef(
    new FaceSDK('https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59')
  );
  const [loading, setLoading] = useState(false);
  const [receiver, setReceiver] = useRecoilState(receiverAddressState);
  const setAmountForTransmission = useSetRecoilState(
    amountForTransmissionState
  );
  const setBalance = useSetRecoilState(availableBalanceState);
  const setFee = useSetRecoilState(transactionFeeState);
  const [amount, setAmount] = useState('0');

  const createBill = async () => {
    const provider = new ethers.providers.Web3Provider(
      sdk.current.getProvider()
    );
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const txRequest = await signer.populateTransaction({
      to: receiver,
      value: ethers.utils.parseEther(amount),
    });

    setAmountForTransmission(txRequest.value as ethers.BigNumber);
    setBalance(await provider.getBalance(address));
    setFee(
      (txRequest.maxFeePerGas as ethers.BigNumber).mul(
        txRequest.gasLimit as ethers.BigNumber
      )
    );
  };

  return (
    <Container>
      <button
        type="button"
        css={[theme.styles.button, styles.margin]}
        onClick={() => navigate('connection')}
      >
        회원가입
      </button>
      <span css={[styles.divider, css({ margin: '12px 0' })]} />
      <div css={styles.margin}>
        <TextField
          value={receiver}
          onChange={(event) => setReceiver(event.target.value)}
          placeholder="receiver address"
        />
      </div>
      <div css={styles.margin}>
        <TextField
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="eth amount for transmission"
        />
      </div>
      <button
        type="button"
        css={[theme.styles.button, styles.margin]}
        disabled={!receiver || !amount || loading}
        onClick={async () => {
          setLoading(true);
          await createBill();
          setLoading(false);
          navigate('transaction');
        }}
      >
        트랜잭션 전송
      </button>
    </Container>
  );
}
