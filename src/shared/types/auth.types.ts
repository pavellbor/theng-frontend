import type { User } from "./user.types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  name?: string;
  password: string;
}

export interface LoginRdo {
  user: User;
  token: string;
}

export interface RegisterRdo {
  user: User;
  token: string;
}
