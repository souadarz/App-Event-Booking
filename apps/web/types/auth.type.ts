export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'participant';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}