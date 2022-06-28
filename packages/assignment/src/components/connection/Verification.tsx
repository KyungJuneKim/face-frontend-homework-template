import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { Edit } from '@mui/icons-material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FaceSDK } from '@face/sdk';
import createStyles from '../../utils/createStyles';
import emailState from '../../store/emailState';
import signUpState from '../../store/signUpState';
import TextField from '../TextField';
import CircularProgress from '../CircularProgress';
import Header from '../Header';
import Footer from '../Footer';
import useTimer from '../../hooks/useTimer';

const useStyles = createStyles((theme) => ({
  title: css([theme.styles.title, { margin: '16px 0 0 0' }]),
  email: css({
    marginTop: '8px',
    height: '38px',
    boxSizing: 'border-box',
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.005em',
    color: '#737E91',
    ':hover': {
      backgroundColor: '#F0F5FF',
    },
  }),
  timer: css({
    fontSize: '16px',
    lineHeight: '26px',
    letterSpacing: '0.001em',
    color: '#195DEE',
  }),
  invalidMessage: css({
    marginTop: '8px',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.005em',
    color: '#E61244',
  }),
  description: css({
    margin: '16px 0 0 0',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.01em',
    color: '#919DB6',
    textAlign: 'center',
  }),
  link: css({
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    color: '#7FA5FF',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.01em',
  }),
}));

export default function Verification() {
  const styles = useStyles();
  const theme = useTheme();
  const setSignUp = useSetRecoilState(signUpState);
  const sdk = useRef(
    new FaceSDK('https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59')
  );
  const id = useRecoilValue(emailState);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [time, resetTimer] = useTimer();
  const [timeOver, setTimeOver] = useState(false);

  const reset = useCallback(async () => {
    await sdk.current.sendVerificationEmail(id);
    setTimeOver(false);
    resetTimer(300, () => setTimeOver(true));
  }, [id, resetTimer]);

  useEffect(() => {
    (async () => {
      await reset();
    })();
  }, [reset]);

  return (
    <Fragment>
      <Header />
      <h1 css={styles.title}>Email Verification</h1>
      <h2 css={theme.styles.subTitle}>Enter code sent to</h2>
      <button
        type="button"
        css={styles.email}
        onClick={() => setSignUp('Email')}
      >
        {id}
        <Edit sx={{ width: '16px', height: '16px' }} />
      </button>
      {!timeOver || loading ? (
        <div css={css({ marginTop: '24px' })}>
          <TextField
            value={verificationCode}
            onChange={async (event) => {
              setVerificationCode(event.target.value);
              setInvalid(false);
              if (event.target.value.length === 6) {
                setLoading(true);
                if (
                  await sdk.current.verifyEmailVerificationCode(
                    id,
                    verificationCode
                  )
                )
                  setSignUp('Password');
                else setInvalid(true);
                setLoading(false);
              }
            }}
            placeholder="Enter verification code"
          >
            {loading && <CircularProgress />}
            {!loading && !!time && <span css={styles.timer}>{time}</span>}
          </TextField>
        </div>
      ) : (
        <button
          type="button"
          css={[theme.styles.button, css({ marginTop: '24px' })]}
          onClick={reset}
        >
          Resend verification code
        </button>
      )}
      {invalid && <span css={styles.invalidMessage}>Invalid code.</span>}
      <p css={styles.description}>
        Didn&apos;t get a code?&nbsp;
        <button type="button" css={styles.link} onClick={reset}>
          Click to resend
        </button>
        .
      </p>
      <Footer />
    </Fragment>
  );
}
