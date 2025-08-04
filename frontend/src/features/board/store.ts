import { create } from 'zustand';
import { getVulnerabilities, createVulnerability, updateVulnerability } from './api';
import { VulnerabilityState } from '../../types/allTypes';

export const useVulnerabilityStore = create<VulnerabilityState>((set, get) => ({
  vulnerabilities: [],
  loading: false,
  error: null,

  fetchVulnerabilities: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getVulnerabilities();
      set({ vulnerabilities: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  postVulnerability: async payload => {
    try {
      const created = await createVulnerability(payload);
      set({ vulnerabilities: [...get().vulnerabilities, created] });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  patchVulnerability: async (id, payload) => {
    try {
      const updated = await updateVulnerability(id, payload);
      set({
        vulnerabilities: get().vulnerabilities.map(v => (v.id === id ? updated : v))
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));
