import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<Record<string, unknown>>;

export default function Container({ children }: ContainerProps) {
  return (
    <div
      css={css({
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
      })}
    >
      {children}
    </div>
  );
}
