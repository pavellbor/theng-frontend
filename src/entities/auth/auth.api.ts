import type { UserRdo } from '@/shared/types'
import { api } from '../../shared/libs/api'
import type { LoginDto, RegisterDto, LoginRdo, RegisterRdo } from '../../shared/types/auth.types'

export const login = async (loginDto: LoginDto) => {
  const response = await api.post<LoginRdo>('/auth/login', loginDto)
  return response.data
}

export const register = async (registerDto: RegisterDto) => {
  const response = await api.post<RegisterRdo>('/auth/register', registerDto)
  return response.data
}

export const getUser = async () => {
  const response = await api.get<UserRdo>('/users/me')
  return response.data
}
