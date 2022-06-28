import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import Connection from './components/connection/Connection';
import RootLayout from './components/RootLayout';
import TransactionSender from './components/transaction-sender/TransactionSender';
import Home from './components/Home';
import theme from './assets/theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/transaction" element={<TransactionSender />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
