import type { CEFRLevel } from './enums'
import type { Sentence, Word, GrammarTopic } from './learning-content.types'

export interface ExerciseSession {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  startedAt: Date
  endedAt: Date | null
  exercisesCompleted: number
  correctAnswers: number
  incorrectAnswers: number
}

export interface Exercise {
  id: number
  userId: number
  sentenceId: number
  exerciseSessionId: number
  createdAt: Date
  isCorrect: boolean
  lastTranslation: string | null
  wordCorrect: boolean
  grammarCorrect: boolean
  sentence: Sentence & {
    word: Word
    grammarTopic: GrammarTopic
  }
}

export interface StartSessionRdo {
  session: ExerciseSession
  exercise: Exercise
  isCompleted: boolean
}

export interface EndSessionRdo extends ExerciseSession {
  duration: number
  accuracy: number
}

export interface CheckTranslationDto {
  userTranslation: string
}

export interface CheckTranslationRdo {
  session: ExerciseSession
  isCorrect: boolean
  feedback: TranslationFeedback
  levelUp: boolean
  newCefrLevel: CEFRLevel
  isCompleted: boolean
  exercise: Exercise | null
}

export interface TranslationFeedback {
  overall: {
    isCorrect: boolean
    feedback: string
  }
  word: {
    isCorrect: boolean
    feedback: string
  }
  grammarTopic: {
    isCorrect: boolean
    feedback: string
  }
}
