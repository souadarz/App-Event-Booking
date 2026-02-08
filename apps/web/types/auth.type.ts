export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'PARTICIPANT';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}