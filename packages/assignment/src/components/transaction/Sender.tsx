import { Fragment, useState } from 'react';
import { css } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ethers } from 'ethers';
import { FaceSDK } from '@face/sdk';
import createStyles from '../../utils/createStyles';
import Header from '../Header';
import Footer from '../Footer';
import CircularProgress from '../CircularProgress';
import receiverAddressState from '../../store/receiverAddressState';
import ellipseMiddleText from '../../utils/ellipseMiddleText';
import amountForTransmissionState from '../../store/amountForTransmissionState';
import availableBalanceState from '../../store/availableBalanceState';
import transactionFeeState from '../../store/transactionFeeState';
import transactionResponseState from '../../store/transactionResponseState';

const useStyles = createStyles((theme) => ({
  title: css([theme.styles.title, { margin: '16px 0 0 0' }]),
  expense: (insufficient: boolean) =>
    css({
      margin: '4px 0 0 0',
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '36px',
      color: insufficient ? '#E61244' : '#3A4044',
    }),
  unit: css({
    marginLeft: '6px',
    color: '#A1B2BE',
  }),
  available: css({
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#EAEEF1',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.005em',
    color: '#748089',
  }),
  table: css({
    marginTop: '8px',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#FAFBFC',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.005em',
    color: '#748089',
  }),
  insufficientFundsMessage: css({
    marginTop: '16px',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.005em',
    color: '#E61244',
    textAlign: 'center',
  }),
  button: css([theme.styles.button, { marginTop: '24px', gap: '8px' }]),
}));

export default function Sender() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const setTransactionResponse = useSetRecoilState(transactionResponseState);
  const receiver = useRecoilValue(receiverAddressState);
  const amount = useRecoilValue(amountForTransmissionState);
  const balance = useRecoilValue(availableBalanceState);
  const fee = useRecoilValue(transactionFeeState);
  const insufficientFunds = fee.add(amount).sub(balance);
  const insufficient = insufficientFunds.gt(ethers.utils.parseEther('0'));

  const transmitTransaction = async () => {
    const sdk = new FaceSDK(
      'https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59'
    );
    const provider = new ethers.providers.Web3Provider(sdk.getProvider());
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const txRequest = await signer.populateTransaction({
      to: address,
      value: amount,
    });
    setTransactionResponse(await signer.sendTransaction(txRequest));
  };

  return (
    <Fragment>
      <Header />
      <h1 css={styles.title}>Send</h1>
      <h2 css={styles.expense(insufficient)}>
        {ethers.utils.formatEther(amount.add(fee))}
        <span css={styles.unit}>ETH</span>
      </h2>
      <div css={styles.available}>
        <span>Available</span>
        <span>
          {ethers.utils.formatEther(balance)}
          <span css={css({ marginLeft: '6px' })}>ETH</span>
        </span>
      </div>
      <div css={styles.table}>
        <span css={css({ gridRow: 1, gridColumn: 1 })}>To</span>
        <span css={css({ gridRow: 1, gridColumn: 2, textAlign: 'right' })}>
          {ellipseMiddleText(receiver, 12)}
        </span>
        <span css={css({ gridRow: 2, gridColumn: 1 })}>Amount</span>
        <span css={css({ gridRow: 2, gridColumn: 2, textAlign: 'right' })}>
          {ethers.utils.formatEther(amount)} ETH
        </span>
        <span css={{ gridRow: 3, gridColumn: 1 }}>Fee</span>
        <span css={css({ gridRow: 3, gridColumn: 2, textAlign: 'right' })}>
          {ethers.utils.formatEther(fee)} ETH
        </span>
      </div>
      {insufficient && (
        <span css={styles.insufficientFundsMessage}>
          Insufficient funds {ethers.utils.formatEther(insufficientFunds)} ETH
        </span>
      )}
      <button
        type="button"
        css={styles.button}
        disabled={loading || insufficient}
        onClick={async () => {
          setLoading(true);
          await transmitTransaction();
          setLoading(false);
        }}
      >
        {loading && <CircularProgress />}
        Confirm
      </button>
      <Footer />
    </Fragment>
  );
}
