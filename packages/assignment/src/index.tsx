import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { css, Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/fonts/fonts.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Global
          styles={css({
            body: {
              margin: 0,
            },
            '*': {
              fontFamily: 'Inter',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            },
          })}
        />
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
