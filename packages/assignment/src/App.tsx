import { Route, Routes } from 'react-router-dom';
import Connection from './components/connection/Connection';
import RootLayout from './components/RootLayout';
import TransactionSender from './components/transaction-sender/TransactionSender';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/transaction" element={<TransactionSender />} />
      </Route>
    </Routes>
  );
}

export default App;
