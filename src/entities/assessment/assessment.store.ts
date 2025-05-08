import { defineStore } from 'pinia'
import * as assessmentApi from './assessment.api'
import { useAuthStore } from '../auth/auth.store'
import type { AssessmentSentence, TranslationFeedback, AssessmentResultRdo } from '@/shared/types'
import type { AssessmentProgress } from '@/shared/types'
interface AssessmentState {
  isLoading: boolean
  screen: 'intro' | 'test' | 'feedback' | 'result'
  sessionId: string | null
  progress: AssessmentProgress | null
  sentence: AssessmentSentence | null
  isCorrect: boolean | null
  nextSentence: AssessmentSentence | null
  feedback: TranslationFeedback | null
  isCompleted: boolean | null
  userTranslation: string | null
  result: AssessmentResultRdo | null
}

export const useAssessmentStore = defineStore('assessment', {
  state: (): AssessmentState => ({
    isLoading: false,
    screen: 'intro',
    sessionId: null,
    progress: null,
    sentence: null,
    isCorrect: null,
    nextSentence: null,
    feedback: null,
    isCompleted: null,
    userTranslation: null,
    result: null,
  }),

  actions: {
    setScreen(screen: AssessmentState['screen']) {
      this.screen = screen
    },

    async skipAssessment() {
      const authStore = useAuthStore()
      await assessmentApi.skipAssessment()
      await authStore.fetchUser()

      this.$router.push('/dashboard')
    },

    async startAssessment() {
      this.$reset()

      this.isLoading = true

      try {
        const data = await assessmentApi.startAssessment()

        this.sessionId = data.sessionId
        this.progress = data.progress
        this.sentence = data.sentence
        this.isCompleted = data.isCompleted

        this.setScreen('test')
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async checkTranslation(translation: string) {
      this.isLoading = true

      try {
        this.userTranslation = translation

        const data = await assessmentApi.checkTranslation({
          sessionId: this.sessionId!,
          userTranslation: translation,
        })

        this.progress = data.progress
        this.isCorrect = data.isCorrect
        this.nextSentence = data.nextSentence
        this.feedback = data.feedback
        this.isCompleted = data.isCompleted

        this.setScreen('feedback')
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async showNextSentence() {
      this.sentence = this.nextSentence

      this.userTranslation = null
      this.isCorrect = null
      this.nextSentence = null
      this.feedback = null

      this.setScreen('test')
    },

    async finishAssessment() {
      this.isLoading = true

      try {
        const authStore = useAuthStore()

        this.result = await assessmentApi.finishAssessment({
          sessionId: this.sessionId!,
        })

        await authStore.fetchUser()

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
