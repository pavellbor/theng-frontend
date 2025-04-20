import { api } from '@/shared/libs/api'
import type {
  StartSessionRdo,
  EndSessionRdo,
  CheckTranslationRdo,
  CheckTranslationDto,
  TranslationHint,
} from '@/shared/types'

export enum HintType {
  WORD = 'word',
  GRAMMAR = 'grammar',
  BOTH = 'both',
}

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

export const getTranslationHint = async (type?: HintType) => {
  const response = await api.get<TranslationHint>('/exercises/hint', {
    params: type ? { type } : undefined,
  })
  return response.data
}
