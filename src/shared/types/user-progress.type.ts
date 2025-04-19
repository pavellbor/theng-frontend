import type { CEFRLevel } from './enums'

export interface GetUserLearningStatsAndProgressRdo {
  progress: {
    daily: {
      completed: number
      total: number
      percentage: number
    }
    streak: number
    words: {
      mastered: number
      total: number
      percentage: number
      inProgress: number
    }
    grammarTopics: {
      mastered: number
      total: number
      percentage: number
      inProgress: number
    }
    levelProgress: {
      currentLevel: CEFRLevel
      percentage: number
      nextLevel: CEFRLevel
    }
  }
  stats: {
    totalExercises: number
    totalCorrectExercises: number
    accuracy: number
    sessionsCompleted: number
    totalTimeSpent: number
    sessionsHistory: {
      date: string
      exercisesCompleted: number
    }[]
  }
}
