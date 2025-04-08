import type { GetUserLearningStatsAndProgressRdo } from '@/shared/types/user-progress.type'
import * as userProgressApi from './user-progress.api'
import { defineStore } from 'pinia'

interface UserProgressState {
  stats: GetUserLearningStatsAndProgressRdo | null
}

export const useUserProgressStore = defineStore('user-progress', {
  state: (): UserProgressState => ({
    stats: null,
  }),

  actions: {
    async fetchUserStats() {
      const data = await userProgressApi.getUserLearningStatsAndProgress()
      this.stats = data
    },
  },
})
