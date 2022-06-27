import { css } from '@emotion/react';
import { Clear } from '@mui/icons-material';
import { PropsWithChildren } from 'react';
import createStyles from '../utils/createStyles';
import { ReactComponent as OpenSeaSymbol } from '../assets/images/icons/opensea_symbol.svg';
import { ReactComponent as FaceWalletLogo } from '../assets/images/icons/face_wallet_logo.svg';

const useStyles = createStyles({
  container: css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    width: '360px',
    boxSizing: 'border-box',
    padding: '36px',
    boxShadow:
      '0 10px 15px rgba(54, 62, 76, 0.3), 0 10px 15px rgba(54, 62, 76, 0.1), 0 15px 40px rgba(54, 62, 76, 0.2)',
    borderRadius: '16px',
    backgroundColor: '#FFFFFF',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  footer: css({
    margin: '32px 0 0 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '19px',
    letterSpacing: '0.005em',
    color: '#B9C5CE',
  }),
});

type ContainerProps = PropsWithChildren<Record<string, unknown>>;

export default function Container({ children }: ContainerProps) {
  const styles = useStyles();
  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <OpenSeaSymbol />
        <Clear />
      </div>
      {children}
      <div css={styles.footer}>
        Secured by
        <FaceWalletLogo />
      </div>
    </div>
  );
}
