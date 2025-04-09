import { api } from '../../shared/libs/api'
import type {
  AssessmentResultRdo,
  AssessmentStartRdo,
  AssessmentCheckTranslationDto,
  FinishAssessmentDto,
  AssessmentCheckTranslationRdo,
  UserRdo,
} from '../../shared/types'

export const startAssessment = async () => {
  const response = await api.post<AssessmentStartRdo>('/assessment/start')
  return response.data
}

export const checkTranslation = async (checkTranslationDto: AssessmentCheckTranslationDto) => {
  const response = await api.post<AssessmentCheckTranslationRdo>('/assessment/check', checkTranslationDto)
  return response.data
}

export const finishAssessment = async (finishAssessmentDto: FinishAssessmentDto) => {
  const response = await api.post<AssessmentResultRdo>('/assessment/finish', finishAssessmentDto)
  return response.data
}

export const skipAssessment = async () => {
  const response = await api.post<UserRdo>('/assessment/skip')
  return response.data
}
