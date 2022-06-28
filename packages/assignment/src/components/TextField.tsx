import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  PropsWithChildren,
  useState,
} from 'react';
import { css } from '@emotion/react';
import createStyles from '../utils/createStyles';

const useStyles = createStyles({
  container: (focused: boolean) =>
    css({
      height: '54px',
      boxSizing: 'border-box',
      padding: '14px 12px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: focused ? '#3A4044' : '#D9E0E5',
      borderRadius: '4px',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '8px',
    }),
  input: css({
    width: '100%',
    height: '26px',
    padding: 0,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.001em',
    color: '#3A4044',
    border: 'none',
    ':focus-visible': { outline: 'none' },
  }),
});

type TextFieldProps = PropsWithChildren<{
  type?: HTMLInputTypeAttribute | undefined;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string | undefined;
}>;

export default function TextField({
  type,
  value,
  onChange,
  placeholder,
  children,
}: TextFieldProps) {
  const styles = useStyles();
  const [focused, setFocused] = useState(false);
  return (
    <div
      css={styles.container(focused)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <input
        type={type}
        css={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
}
