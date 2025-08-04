import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from '../layout/Dashboard';
import LoginPage from '../features/auth/pages/LoginPage';
import BoardPage from '../features/board/pages/BoardPage';
import PrivateRoute from './PrivateRoute';
import RegisterPage from '../features/auth/pages/RegisterPage';
import { AppRoutesProps } from '../types/allTypes';

const AppRoutes: React.FC<AppRoutesProps> = ({ mode, handleThemeChange }) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={<DashboardLayout mode={mode} handleThemeChange={handleThemeChange} />}
        >
          <Route index element={<BoardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
