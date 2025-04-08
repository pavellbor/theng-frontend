import { api } from '@/shared/libs/api'
import type { GetUserLearningStatsAndProgressRdo } from '@/shared/types/user-progress.type'

export const getUserLearningStatsAndProgress = async () => {
  const response = await api.get<GetUserLearningStatsAndProgressRdo>('/user-progress/stats')

  return response.data
}
