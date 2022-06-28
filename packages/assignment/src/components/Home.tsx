import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import Container from './Container';
import createStyles from '../utils/createStyles';

const useStyles = createStyles((theme) => ({
  button: css([theme.styles.button, { margin: '4px' }]),
}));

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <Container>
      <button
        type="button"
        css={styles.button}
        onClick={() => navigate('connection')}
      >
        회원가입
      </button>
      <button
        type="button"
        css={styles.button}
        onClick={() => navigate('transaction')}
      >
        트랜잭션 전송
      </button>
    </Container>
  );
}
