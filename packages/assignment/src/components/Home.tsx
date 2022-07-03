import { useNavigate } from 'react-router-dom';
import { css, useTheme } from '@emotion/react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ethers } from 'ethers';
import Container from './Container';
import createStyles from '../utils/createStyles';
import TextField from './TextField';
import amountForTransmissionState from '../store/amountForTransmissionState';
import receiverAddressState from '../store/receiverAddressState';

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

  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const setAmountForTransmission = useSetRecoilState(
    amountForTransmissionState
  );
  const setReceiverAddress = useSetRecoilState(receiverAddressState);

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
        onClick={() => {
          setAmountForTransmission(ethers.utils.parseEther(amount));
          setReceiverAddress(receiver);
          navigate('transaction');
        }}
      >
        트랜잭션 전송
      </button>
    </Container>
  );
}
