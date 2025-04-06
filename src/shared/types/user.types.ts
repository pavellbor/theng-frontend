import { CEFRLevel, Role } from './enums';

export interface User {
  id: number;
  email: string;
  name: string | null;
  cefrLevel: CEFRLevel | null;
  role: Role;
  lastActive: Date;
  dailyGoal: number;
  streak: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  name?: string;
  password: string;
  dailyGoal?: number;
  role?: Role;
  cefrLevel?: CEFRLevel;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export interface UserRdo {
  id: number;
  email: string;
  name: string | null;
  cefrLevel: CEFRLevel | null;
  role: Role;
  lastActive: Date;
  dailyGoal: number;
  streak: number;
  createdAt: Date;
  updatedAt: Date;
} 