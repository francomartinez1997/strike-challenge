import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme/index.ts';
import AppRoutes from './routes/AppRoutes';
import { useAuthStore } from './features/auth/store.ts';

const App = () => {
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  const setIsHydrated = useAuthStore(state => state.setIsHydrated);

  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => createTheme(mode === 'dark' ? darkTheme : lightTheme), [mode]);
  const handleThemeChange = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        login(user, token);
      } catch {
        logout();
      }
    }
    setIsHydrated(true);
  }, [setIsHydrated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes mode={mode} handleThemeChange={handleThemeChange} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
