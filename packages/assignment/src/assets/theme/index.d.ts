import styles from './styles';

declare module '@emotion/react' {
  export interface Theme {
    styles: typeof styles;
  }
}
