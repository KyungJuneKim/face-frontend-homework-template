import { css } from '@emotion/react';
import { Clear } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as OpenSeaSymbol } from '../assets/images/icons/opensea_symbol.svg';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div
      css={css({
        display: 'flex',
        justifyContent: 'space-between',
      })}
    >
      <OpenSeaSymbol />
      <Clear htmlColor="#A1B2BE" onClick={() => navigate('/')} />
    </div>
  );
}
