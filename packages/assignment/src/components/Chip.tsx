import { css } from '@emotion/react';

type ChipProps = {
  label?: string | undefined;
  disabled?: boolean | undefined;
};

export default function Chip({ label, disabled }: ChipProps) {
  return (
    <span
      css={css({
        display: 'flex',
        alignItems: 'center',
        padding: '4px 6px',
        backgroundColor: disabled ? '#F3F4F6' : '#F0F5FF',
        borderRadius: '4px',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '0.01em',
        color: disabled ? '#B9C5CE' : '#195DEE',
      })}
    >
      {label}
    </span>
  );
}
