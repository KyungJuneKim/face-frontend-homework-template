import { css, keyframes } from '@emotion/react';
import circularProgress from '../assets/images/pictures/circular_progress.png';

export default function CircularProgress() {
  return (
    <img
      css={css({
        animationName: keyframes({
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        }),
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      })}
      src={circularProgress}
      alt=""
    />
  );
}
