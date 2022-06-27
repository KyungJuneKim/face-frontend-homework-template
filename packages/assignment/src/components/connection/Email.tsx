import { css } from '@emotion/react';
import { FaceSDK } from '@face/sdk';
import { useRecoilState, useSetRecoilState } from 'recoil';
import emailState from '../../store/emailState';
import createStyles from '../../utils/createStyles';
import signUpState from '../../store/signUpState';

const useStyles = createStyles({
  title: css({
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '36px',
    color: '#313A45',
    margin: '16px 0 0 0',
  }),
  subTitle: css({
    fontWeight: 400,
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
    fontWeight: 400,
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
  description: css({
    margin: '16px 0 0 0',
    fontWeight: 400,
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
  // const sdk = useRecoilValue(faceSdkState);
  // const sdk = useRef(
  //   new FaceSDK('https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59')
  // );
  const [id, setId] = useRecoilState(emailState);
  const setSignUp = useSetRecoilState(signUpState);

  return (
    <div>
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
        disabled={!id}
        // onClick={async () => {
        //   if (await sdk.checkEmail(id)) setSignUp('Verification');
        // }}
      >
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
    </div>
  );
}
