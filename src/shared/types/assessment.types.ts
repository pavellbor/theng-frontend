import { CEFRLevel } from './enums'

/**
 * Интерфейс предложения для оценки уровня
 */
export interface AssessmentSentence {
  id: number
  englishSentence: string
  russianTranslation: string
  grammarTopic: string
  word: string
  cefrLevel: CEFRLevel
}

/**
 * Интерфейс прогресса тестирования
 */
export interface AssessmentProgress {
  completed: number
  total: number
  percentage: number
}

/**
 * Интерфейс для обратной связи по переводу
 */
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

/**
 * Интерфейс для запроса на проверку перевода
 */
export interface CheckTranslationDto {
  sessionId: string
  userTranslation: string
}

/**
 * Интерфейс для начала тестирования
 */
export interface AssessmentStartRdo {
  sessionId: string
  progress: AssessmentProgress
  sentence: AssessmentSentence
  isCompleted: boolean
}

/**
 * Интерфейс для результата проверки перевода
 */
export interface TranslationCheckRdo {
  isCorrect: boolean
  progress: AssessmentProgress
  nextSentence: AssessmentSentence | null
  feedback: TranslationFeedback
  isCompleted: boolean
}

/**
 * Интерфейс для запроса завершения тестирования
 */
export interface FinishAssessmentDto {
  sessionId: string
}

/**
 * Интерфейс для статистики уровня
 */
export interface AssessmentLevelStats {
  attempts: number
  correct: number
  percentage: number
}

/**
 * Интерфейс для результата тестирования
 */
export interface AssessmentResultRdo {
  determinedLevel: CEFRLevel
  completedSentences: number
  levelStats: Record<CEFRLevel, AssessmentLevelStats>
}
