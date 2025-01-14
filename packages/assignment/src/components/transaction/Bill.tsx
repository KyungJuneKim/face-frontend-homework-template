import { Fragment, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { CheckCircle, HelpOutline, OpenInNew } from '@mui/icons-material';
import { ethers } from 'ethers';
import { Popper } from '@mui/material';
import createStyles from '../../utils/createStyles';
import ellipseMiddleText from '../../utils/ellipseMiddleText';
import formatStringNumber from '../../utils/formatStringNumber';
import Header from '../Header';
import Footer from '../Footer';
import CircularProgress from '../CircularProgress';

const useStyles = createStyles((theme) => ({
  title: css([theme.styles.title, { margin: '16px 0 0 0' }]),
  bill: css({
    marginTop: '24px',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#FAFBFC',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.005em',
    color: '#748089',
  }),
  margin: css({ margin: '4px' }),
  divider: css({
    height: '1px',
    backgroundColor: '#EAEEF1',
  }),
  button: css({
    marginTop: '24px',
    height: '32px',
    boxSizing: 'border-box',
    padding: '6px, 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6.5px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#737E91',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '0.04em',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: '#F3F4F6',
    },
  }),
  tooltip: css({
    maxWidth: '290px',
    boxSizing: 'border-box',
    padding: '6px 12px',
    backgroundColor: '#3A4044',
    borderRadius: '4px',
    color: '#FFFFFF',
    wordBreak: 'break-word',
  }),
}));

type BillProps = {
  loading: boolean;
  receiver: string;
  amount: ethers.BigNumber;
  fee: ethers.BigNumber;
  txHash: string;
};

export default function Bill({
  loading,
  receiver,
  amount,
  fee,
  txHash,
}: BillProps) {
  const styles = useStyles();
  const theme = useTheme();

  const [anchorElement, setAnchorElement] = useState<Element | null>(null);
  const [tooltipText, setTooltipText] = useState('');

  return (
    <Fragment>
      <Header />
      <h1 css={styles.title}>{loading ? 'Processing...' : 'Complete!'}</h1>
      <h2 css={theme.styles.subTitle}>
        {loading
          ? 'It should be confirmed on the blockchain shortly.'
          : "It's been confirmed on the blockchain!"}
      </h2>
      <div css={styles.bill}>
        <span css={[styles.margin, css({ gridRow: 1, gridColumn: 1 })]}>
          Status
        </span>
        <span
          css={[
            styles.margin,
            css({
              gridRow: 1,
              gridColumn: 2,
              textAlign: 'right',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '6px',
            }),
          ]}
        >
          {loading ? <CircularProgress /> : <CheckCircle htmlColor="#05A67B" />}
          {loading ? 'Processing' : 'Complete'}
        </span>
        <span css={[styles.divider, css({ gridRow: 2, gridColumn: '1/3' })]} />
        <span css={[styles.margin, css({ gridRow: 3, gridColumn: 1 })]}>
          To
        </span>
        <span
          css={[
            styles.margin,
            css({ gridRow: 3, gridColumn: 2, textAlign: 'right' }),
          ]}
          onMouseEnter={(event) => {
            setAnchorElement(event.currentTarget);
            setTooltipText(receiver);
          }}
          onMouseLeave={() => {
            setAnchorElement(null);
            setTooltipText('');
          }}
        >
          {ellipseMiddleText(receiver, 12)}
        </span>
        <span css={[styles.margin, css({ gridRow: 4, gridColumn: 1 })]}>
          Amount
        </span>
        <span
          css={[
            styles.margin,
            css({ gridRow: 4, gridColumn: 2, textAlign: 'right' }),
          ]}
        >
          {formatStringNumber(ethers.utils.formatEther(amount))} ETH
        </span>
        <span
          css={[
            styles.margin,
            css({
              gridRow: 5,
              gridColumn: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }),
          ]}
        >
          Fee
          <HelpOutline
            htmlColor="#B9C5CE"
            onMouseEnter={(event) => {
              setAnchorElement(event.currentTarget);
              setTooltipText(
                'The Ethereum network charges a transaction fee which varies based on blockchain usage.'
              );
            }}
            onMouseLeave={() => {
              setAnchorElement(null);
              setTooltipText('');
            }}
          />
        </span>
        <span
          css={[
            styles.margin,
            css({ gridRow: 5, gridColumn: 2, textAlign: 'right' }),
          ]}
        >
          {formatStringNumber(ethers.utils.formatEther(fee))} ETH
        </span>
        <span css={[styles.margin, css({ gridRow: 6, gridColumn: 1 })]}>
          Total
        </span>
        <span
          css={[
            styles.margin,
            css({ gridRow: 6, gridColumn: 2, textAlign: 'right' }),
          ]}
        >
          <span css={css({ fontWeight: 700, color: '#3A4044' })}>
            {formatStringNumber(ethers.utils.formatEther(amount.add(fee)))}
          </span>
          &nbsp;ETH
        </span>
      </div>
      <button
        type="button"
        css={styles.button}
        onClick={() => {
          window.open(`https://ropsten.etherscan.io/tx/${txHash}`);
        }}
      >
        View on block explorer <OpenInNew />
      </button>
      <Footer />
      <Popper
        open={anchorElement !== null}
        anchorEl={anchorElement}
        placement="top"
      >
        <div css={styles.tooltip}>{tooltipText}</div>
      </Popper>
    </Fragment>
  );
}
