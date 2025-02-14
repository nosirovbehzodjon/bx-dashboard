export interface IProfileItem {
  id: string;
  fullname: string | null;
  avatar: string | null;
  role: 'owner' | 'admin' | 'user';
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Profile extends IProfileItem {
  created_at: string;
  updated_at: string;
}

export interface IProfileParams {
  fullname?: string;
  avatar?: string;
}
