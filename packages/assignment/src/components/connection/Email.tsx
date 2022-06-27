import { css, keyframes } from '@emotion/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Fragment, useState } from 'react';
import emailState from '../../store/emailState';
import createStyles from '../../utils/createStyles';
import signUpState from '../../store/signUpState';
import faceSdkState from '../../store/faceSdkState';
import circularProgress from '../../assets/images/pictures/circular_progress.png';

const useStyles = createStyles({
  title: css({
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '36px',
    color: '#313A45',
    margin: '16px 0 0 0',
  }),
  subTitle: css({
    fontSize: '14px',
    lineHeight: '22px',
    color: '#465365',
    margin: 0,
  }),
  email: css({
    height: '54px',
    boxSizing: 'border-box',
    padding: '14px 12px',
    marginTop: '24px',
    alignSelf: 'stretch',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#D9E0E5',
    borderRadius: '4px',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.001em',
    color: '#3A4044',
    resize: 'none',
    '::placeholder': {
      color: '#A1B2BE',
    },
    ':focus-visible': {
      outline: 'none',
      borderColor: '#3A4044',
    },
  }),
  signButton: css({
    padding: '14px 24px',
    marginTop: '24px',
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.001em',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#195DEE',
    color: '#FFFFFF',
    ':disabled': {
      backgroundColor: '#D7DBE0',
      color: '#737E91',
    },
  }),
  loading: css({
    animationName: keyframes({
      from: {transform: 'rotate(0deg)' },
      to: {transform: 'rotate(360deg)' },
    }),
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  }),
  description: css({
    margin: '16px 0 0 0',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.01em',
    color: '#919DB6',
  }),
  link: css({
    textDecoration: 'none',
  }),
});

export default function Email() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const sdk = useRecoilValue(faceSdkState);
  const [id, setId] = useRecoilState(emailState);
  const setSignUp = useSetRecoilState(signUpState);

  return (
    <Fragment>
      <h1 css={styles.title}>Connect Face Wallet</h1>
      <h2 css={styles.subTitle}>Enter the world of Web3 with Face</h2>
      <textarea
        css={styles.email}
        value={id}
        onChange={(event) => setId(event.target.value)}
        placeholder="satoshi@facewallet.xyz"
      />
      <button
        type="button"
        css={styles.signButton}
        disabled={!id || loading}
        onClick={async () => {
          setLoading(true);
          if (await sdk.checkEmail(id)) setSignUp('Verification');
          setLoading(false);
        }}
      >
        {loading && <img css={styles.loading} src={circularProgress} alt="" />}
        Sign up / Login
      </button>
      <p css={styles.description}>
        By clicking the button, I acknowledge that I have read and agree to Face
        Wallet&apos;s&nbsp;
        <a css={styles.link} href="https://haechi.io/ko">
          Term of Service
        </a>
        ,&nbsp;
        <a css={styles.link} href="https://haechi.io/ko">
          Privacy Policy
        </a>
        &nbsp; and&nbsp;
        <a css={styles.link} href="https://haechi.io/ko">
          Cookie Policy
        </a>
        &nbsp; in their entirety.
      </p>
    </Fragment>
  );
}
