import { Fragment, useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import createStyles from '../../utils/createStyles';
import Header from '../Header';

const useStyles = createStyles((theme) => ({
  title: css([theme.styles.title, { margin: '16px 0 0 0' }]),
}));

export default function Success() {
  const styles = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Fragment>
      <div css={css({ paddingLeft: '120px' })}>
        <Header />
      </div>
      <div css={css({ textAlign: 'center' })}>
        <h1 css={styles.title}>Success!</h1>
        <h2 css={theme.styles.subTitle}>Your account read for use</h2>
      </div>
      <Footer />
    </Fragment>
  );
}
