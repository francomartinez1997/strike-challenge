import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';

export default function PrivateRoute() {
  const token = useAuthStore(state => state.token);
  const isHydrated = useAuthStore(state => state.isHydrated);

  if (!isHydrated) return null;

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
