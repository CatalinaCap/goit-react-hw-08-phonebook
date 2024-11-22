import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ContactsPage from '../pages/ContactsPage';
import RegisterPage from '../pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
