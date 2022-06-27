import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div
      css={css({
        position: 'relative',
        width: '100vw',
        height: '100vh',
      })}
    >
      <Outlet />
    </div>
  );
}
