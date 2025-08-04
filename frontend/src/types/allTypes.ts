export type Role = {
  id: number;
  name: 'ADMIN' | 'DEVELOPER' | 'ANALYST' | string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  role: Role;
};

export type Vulnerability = {
  id: number;
  title: string;
  description: string;
  criticality: string;
  cwe: string;
  suggestedFix: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reporter: User;
  assignee: User;
};

export type CreateVulnerabilityModalProps = {
  handleClose: () => void;
  open: boolean;
  vulnerability?: Vulnerability | null;
};

export type CreateVulnerabilityPayload = {
  title: string;
  description: string;
  criticality: string;
  cwe: string;
  suggestedFix: string;
  status: string;
  reporterId: number;
  assigneeId?: number;
};

export type UpdateVulnerabilityPayload = Partial<CreateVulnerabilityPayload>;

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  roleId: number;
};

export type LoginResponse = {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: Role;
    createdAt?: string;
    updatedAt?: string;
  };
};

export type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isHydrated: boolean;
  setIsHydrated: (value: boolean) => void;
};

export type VulnerabilityState = {
  vulnerabilities: Vulnerability[];
  loading: boolean;
  error: string | null;

  fetchVulnerabilities: () => Promise<void>;
  postVulnerability: (payload: any) => Promise<void>;
  patchVulnerability: (id: number, payload: any) => Promise<void>;
};

export type AppRoutesProps = {
  handleThemeChange: () => void;
  mode: 'light' | 'dark';
};