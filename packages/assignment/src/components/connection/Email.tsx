import { css, useTheme } from '@emotion/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Fragment, useRef, useState } from 'react';
import { FaceSDK } from '@face/sdk';
import emailState from '../../store/emailState';
import createStyles from '../../utils/createStyles';
import connectionStepState from '../../store/connectionStepState';
import TextField from '../TextField';
import CircularProgress from '../CircularProgress';
import Header from '../Header';
import Footer from '../Footer';

const useStyles = createStyles((theme) => ({
  title: css([theme.styles.title, { margin: '16px 0 0 0' }]),
  signButton: css([theme.styles.button, { marginTop: '24px', gap: '8px' }]),
  description: css({
    margin: '16px 0 0 0',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.01em',
    color: '#919DB6',
  }),
}));

export default function Email() {
  const styles = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const sdk = useRef(
    new FaceSDK('https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59')
  );
  const [id, setId] = useRecoilState(emailState);
  const setConnectionStep = useSetRecoilState(connectionStepState);

  return (
    <Fragment>
      <Header />
      <h1 css={styles.title}>Connect Face Wallet</h1>
      <h2 css={theme.styles.subTitle}>Enter the world of Web3 with Face</h2>
      <div css={css({ marginTop: '24px' })}>
        <TextField
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="satoshi@facewallet.xyz"
        />
      </div>
      <button
        type="button"
        css={styles.signButton}
        disabled={!id || loading}
        onClick={async () => {
          setLoading(true);
          if (await sdk.current.checkEmail(id)) setConnectionStep('Verification');
          setLoading(false);
        }}
      >
        {loading && <CircularProgress />}
        Sign up / Login
      </button>
      <p css={styles.description}>
        By clicking the button, I acknowledge that I have read and agree to Face
        Wallet&apos;s&nbsp;
        <a css={theme.styles.link} href="https://haechi.io/ko">
          Term of Service
        </a>
        ,&nbsp;
        <a css={theme.styles.link} href="https://haechi.io/ko">
          Privacy Policy
        </a>
        &nbsp; and&nbsp;
        <a css={theme.styles.link} href="https://haechi.io/ko">
          Cookie Policy
        </a>
        &nbsp; in their entirety.
      </p>
      <Footer />
    </Fragment>
  );
}
