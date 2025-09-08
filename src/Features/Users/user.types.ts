export interface CreateUser {
  username: string;
  password: string;
  role: 'admin' | 'client';
}
