import { SerializedStyles, useTheme } from '@emotion/react';

const createStyles =
  <
    T extends Record<
      string,
      SerializedStyles | ((...arg: never[]) => SerializedStyles)
    >
  >(
    styles: T | ((theme: ReturnType<typeof useTheme>) => T)
  ): (() => Readonly<T>) =>
  () => {
    const theme = useTheme();
    return typeof styles === 'function' ? styles(theme) : styles;
  };

export default createStyles;
