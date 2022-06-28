import { Fragment, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { css, useTheme } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import createStyles from '../../utils/createStyles';
import TextField from '../TextField';
import Header from '../Header';
import Footer from '../Footer';
import emailState from '../../store/emailState';
import Chip from '../Chip';
import signUpState from '../../store/signUpState';

const useStyles = createStyles((theme) => ({
  title: css([theme.styles.title, { margin: '16px 0 0 0' }]),
  email: css({
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.005em',
    color: '#465365',
  }),
  chips: css({
    marginTop: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  }),
  button: css([theme.styles.button, { margin: '24px' }]),
}));

export default function Password() {
  const styles = useStyles();
  const theme = useTheme();
  const id = useRecoilValue(emailState);
  const setSignUp = useSetRecoilState(signUpState);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pair, setPair] = useState('');
  const [pairVisible, setPairVisible] = useState(false);

  const disabled8Chars = password.length < 8;
  const disabledUppercase = !/[A-Z]/g.test(password);
  const disabledLowercase = !/[a-z]/g.test(password);
  const disabledNumber = !/[0-9]/g.test(password);
  const disabledPasswordMatch = !password || password !== pair;

  return (
    <Fragment>
      <Header />
      <h1 css={styles.title}>Password</h1>
      <h2 css={theme.styles.subTitle}>Almost done setting up your account</h2>
      <h2 css={styles.email}>{id}</h2>
      <div css={css({ marginTop: '24px' })}>
        <TextField
          type={passwordVisible ? undefined : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        >
          {passwordVisible ? (
            <Visibility onClick={() => setPasswordVisible(false)} />
          ) : (
            <VisibilityOff onClick={() => setPasswordVisible(true)} />
          )}
        </TextField>
      </div>
      <div css={css({ marginTop: '8px' })}>
        <TextField
          type={pairVisible ? undefined : 'password'}
          value={pair}
          onChange={(event) => setPair(event.target.value)}
          placeholder="Re-enter password"
        >
          {pairVisible ? (
            <Visibility onClick={() => setPairVisible(false)} />
          ) : (
            <VisibilityOff onClick={() => setPairVisible(true)} />
          )}
        </TextField>
      </div>
      <div css={styles.chips}>
        <Chip label="8+ chars" disabled={disabled8Chars} />
        <Chip label="Uppercase" disabled={disabledUppercase} />
        <Chip label="Lowercase" disabled={disabledLowercase} />
        <Chip label="Number" disabled={disabledNumber} />
        <Chip label="Password match" disabled={disabledPasswordMatch} />
      </div>
      <button
        type="button"
        css={styles.button}
        disabled={
          disabled8Chars ||
          disabledUppercase ||
          disabledLowercase ||
          disabledNumber ||
          disabledPasswordMatch
        }
        onClick={() => setSignUp('Success')}
      >
        Sign up
      </button>
      <Footer />
    </Fragment>
  );
}
