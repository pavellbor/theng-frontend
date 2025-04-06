import { CEFRLevel } from './enums'

export interface Exercise {
  id: number
  userId: number
  sessionId: number
  sentenceId: number
  userAnswer: string | null
  isCorrect: boolean | null
  createdAt: Date
  updatedAt: Date
  completedAt: Date | null
}

export interface ExerciseSession {
  id: number
  userId: number
  exercises: Exercise[]
  createdAt: Date
  updatedAt: Date
  startedAt: Date
  endedAt: Date | null
  exercisesCompleted: number
  correctAnswers: number
  incorrectAnswers: number
}
