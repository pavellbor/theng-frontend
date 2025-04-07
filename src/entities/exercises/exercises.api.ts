import { api } from '@/shared/libs/api'
import type {
  StartSessionRdo,
  EndSessionRdo,
  CheckTranslationRdo,
  CheckTranslationDto,
} from '@/shared/types'

export const startSession = async () => {
  const response = await api.post<StartSessionRdo>('/exercises/start')
  return response.data
}

export const endSession = async () => {
  const response = await api.post<EndSessionRdo>('/exercises/end')
  return response.data
}

export const checkTranslation = async (checkTranslationDto: CheckTranslationDto) => {
  const response = await api.post<CheckTranslationRdo>('/exercises/check', checkTranslationDto)
  return response.data
}
