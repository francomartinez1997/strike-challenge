import AxiosService from '../../services/axios';
import { CreateVulnerabilityPayload, UpdateVulnerabilityPayload, Vulnerability } from '../../types/allTypes';
import { useAuthStore } from '../auth/store';

const token = useAuthStore.getState().token;

export async function getVulnerabilities(): Promise<Vulnerability[]> {
  try {
    const res = await AxiosService.get<Vulnerability[]>('/vulnerabilities', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Error while getting vulnerabilities';
    throw new Error(message);
  }
}

export async function createVulnerability(payload: CreateVulnerabilityPayload): Promise<Vulnerability> {
  try {
    const res = await AxiosService.post<Vulnerability>('/vulnerabilities', payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Error while creating vulnerability';
    throw new Error(message);
  }
}

export async function updateVulnerability(id: number, payload: UpdateVulnerabilityPayload): Promise<Vulnerability> {
  try {
    const res = await AxiosService.patch<Vulnerability>(`/vulnerabilities/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Error while updating vulnerability';
    throw new Error(message);
  }
}
