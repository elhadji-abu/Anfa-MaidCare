import { apiRequest } from "./queryClient";

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiRequest("POST", "/api/auth/login", credentials);
    const data = await response.json();
    return data.user;
  },

  async logout(): Promise<void> {
    await apiRequest("POST", "/api/auth/logout");
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiRequest("GET", "/api/auth/me");
      const data = await response.json();
      return data.user;
    } catch (error) {
      return null;
    }
  }
};
