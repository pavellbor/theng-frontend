import { defineStore } from 'pinia'
import * as exercisesApi from './exercises.api'
import type { ExerciseSession, TranslationFeedback } from '@/shared/types'
import type { Exercise, TranslationHint } from '@/shared/types'
import { HintType } from './exercises.api'

interface ExercisesState {
  isLoading: boolean
  screen: 'intro' | 'test' | 'feedback' | 'result'
  session: ExerciseSession | null
  exercise: Exercise | null
  isCorrect: boolean
  feedback: TranslationFeedback | null
  levelUp: boolean
  newCefrLevel: string
  isCompleted: boolean
  accuracy: number
  duration: number
  userTranslation: string
  nextExercise: Exercise | null
  isHintLoading: boolean
  hint: TranslationHint | null
  isHintVisible: boolean
  requestedHintType: HintType | null
  isTranslationShown: boolean
  translationHint?: string
}

export const useExercisesStore = defineStore('exercises', {
  state: (): ExercisesState => ({
    isLoading: false,
    screen: 'intro',
    session: null,
    exercise: null,
    accuracy: 0,
    duration: 0,
    isCompleted: false,
    isCorrect: false,
    feedback: null,
    levelUp: false,
    newCefrLevel: '',
    userTranslation: '',
    nextExercise: null,
    isHintLoading: false,
    hint: null,
    isHintVisible: false,
    requestedHintType: null,
    isTranslationShown: false,
    translationHint: undefined,
  }),

  actions: {
    setScreen(screen: ExercisesState['screen']) {
      this.screen = screen
    },

    async startSession() {
      this.isLoading = true
      try {
        const response = await exercisesApi.startSession()
        this.$reset()
        this.session = response.session
        this.exercise = response.exercise

        if (response.isCompleted) {
          this.setScreen('result')
          await this.finishSession()
        } else {
          this.setScreen('test')
        }
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async endSession() {
      this.isLoading = true
      try {
        const { accuracy, duration, ...session } = await exercisesApi.endSession()
        this.session = session
        this.accuracy = accuracy
        this.duration = duration
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async checkTranslation(userTranslation: string) {
      this.isLoading = true
      try {
        this.userTranslation = userTranslation

        const response = await exercisesApi.checkTranslation({
          userTranslation,
        })
        this.session = response.session
        this.isCompleted = response.isCompleted
        this.isCorrect = response.isCorrect
        this.feedback = response.feedback
        this.levelUp = response.levelUp
        this.newCefrLevel = response.newCefrLevel
        this.nextExercise = response.exercise

        this.setScreen('feedback')
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async loadTranslationHint(type?: HintType) {
      this.isHintLoading = true
      this.requestedHintType = type || HintType.BOTH
      try {
        this.hint = await exercisesApi.getTranslationHint(type)
        this.isHintVisible = true
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isHintLoading = false
      }
    },

    async loadWordHint() {
      this.requestedHintType = HintType.WORD
      return this.loadTranslationHint(HintType.WORD)
    },

    async loadGrammarHint() {
      this.requestedHintType = HintType.GRAMMAR
      return this.loadTranslationHint(HintType.GRAMMAR)
    },

    hideHint() {
      this.isHintVisible = false
    },

    clearHint() {
      this.hint = null
      this.isHintVisible = false
      this.requestedHintType = null
    },

    async showTranslation() {
      this.isHintLoading = true
      try {
        const hint = await exercisesApi.getTranslationHint(HintType.TRANSLATION)
        this.translationHint = hint.translationHint
        this.isTranslationShown = true
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isHintLoading = false
      }
    },

    resetTranslationShown() {
      this.isTranslationShown = false
      this.translationHint = undefined
    },

    async showNextSentence() {
      this.exercise = this.nextExercise
      this.userTranslation = ''
      this.isCorrect = false
      this.nextExercise = null
      this.feedback = null
      this.clearHint()
      this.resetTranslationShown()
      this.setScreen('test')
    },

    async finishSession() {
      this.isLoading = true
      try {
        const { accuracy, duration, ...session } = await exercisesApi.endSession()
        this.session = session
        this.accuracy = accuracy
        this.duration = duration

        this.setScreen('result')
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})
