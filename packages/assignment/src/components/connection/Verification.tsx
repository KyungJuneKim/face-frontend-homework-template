import { Fragment, useRef, useState } from 'react';
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
        </TextField>
      </div>
      {invalid && <span css={styles.invalidMessage}>Invalid code.</span>}
      <p css={styles.description}>
        Didn&apos;t get a code?&nbsp;
        <a css={theme.styles.link} href="https://haechi.io/ko">
          Click to resend
        </a>
        .
      </p>
      <Footer />
    </Fragment>
  );
}
