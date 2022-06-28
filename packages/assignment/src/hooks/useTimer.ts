import dayjs from 'dayjs';
import { useCallback, useRef, useState } from 'react';

const zero = dayjs('2000-01-01T00:00:00.000Z');

export default function useTimer(): [
  string | undefined,
  (time: number, onFinish?: () => void) => void
] {
  const [remainTime, setRemainTime] = useState<dayjs.Dayjs | undefined>(
    undefined
  );
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const reset = useCallback((time: number, onFinish?: () => void) => {
    clearInterval(timer.current);
    setRemainTime(zero.add(time, 'second'));
    timer.current = setInterval(
      () =>
        setRemainTime((prevState) => {
          if (prevState === undefined) return undefined;
          if (prevState.diff(zero, 'second') === 0) {
            onFinish?.();
            clearInterval(timer.current);
            return undefined;
          }
          return prevState.add(-1, 'second');
        }),
      1000
    );
  }, []);

  return [remainTime?.format('mm:ss'), reset];
}
