export enum Role {
  Basic = 1,
  Admin = 2
}

export interface User {
  id: string;
  email: string;
  role: Role;
  active: boolean;
  member?: Member;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
}