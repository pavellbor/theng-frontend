import { defineStore } from 'pinia'
import * as exercisesApi from './exercises.api'
import type { ExerciseSession, TranslationFeedback } from '@/shared/types'
import type { Exercise } from '@/shared/types'

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
  }),

  actions: {
    setScreen(screen: ExercisesState['screen']) {
      this.screen = screen
    },

    async startSession() {
      this.$reset()

      this.isLoading = true
      try {
        const response = await exercisesApi.startSession()
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
      console.log('checkTranslation', userTranslation)
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

    async showNextSentence() {
      this.exercise = this.nextExercise

      this.userTranslation = ''
      this.isCorrect = false
      this.nextExercise = null
      this.feedback = null

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
