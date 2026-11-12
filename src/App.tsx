import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DeckPage from './deck/pages/DeckPage';
import PresenterPage from './deck/pages/PresenterPage';
import DemoPage from './deck/pages/DemoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/deck" replace />} />
        <Route path="/deck" element={<DeckPage />} />
        <Route path="/deck/presenter" element={<PresenterPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="*" element={<Navigate to="/deck" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
