import { create } from 'zustand';
import { AuthState } from '../../types/allTypes';

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  isHydrated: false,
  login: (user, token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },

  setIsHydrated: value => set({ isHydrated: value }),
}));
