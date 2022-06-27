import { css } from '@emotion/react';
import { ReactComponent as FaceWalletLogo } from '../assets/images/icons/face_wallet_logo.svg';

export default function Footer() {
  return (
    <div
      css={css({
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
      })}
    >
      Secured by
      <FaceWalletLogo />
    </div>
  );
}
