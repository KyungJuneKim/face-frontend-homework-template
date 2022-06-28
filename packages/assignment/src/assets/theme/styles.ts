import { SerializedStyles, css } from '@emotion/react';
import ofMap from '../../utils/ofMap';

const styles = ofMap<SerializedStyles>()({
  title: css({
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '36px',
    color: '#313A45',
    margin: 0,
  }),
  subTitle: css({
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    color: '#465365',
    margin: 0,
  }),
  button: css({
    padding: '14px 24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.001em',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#195DEE',
    color: '#FFFFFF',
    ':disabled': {
      backgroundColor: '#D7DBE0',
      color: '#737E91',
    },
  }),
  link: css({
    textDecoration: 'none',
  }),
});

export default styles;
