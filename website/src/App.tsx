import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { InfoPage } from './pages/InfoPage';
import { NotFoundPage } from './pages/NotFoundPage';

/** Removed pages — old links go to the home page */
const REMOVED = ['products', 'product/:id', 'cart', 'upload-prescription', 'track-order', 'login', 'account', 'admin/*'];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="info/:slug" element={<InfoPage />} />
          {REMOVED.map(p => <Route key={p} path={p} element={<Navigate to="/" replace />} />)}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
