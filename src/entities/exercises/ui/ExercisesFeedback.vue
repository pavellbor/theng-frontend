<script setup lang="ts">
import { Button, Card, Textarea, Badge, Panel } from 'primevue'
import ProgressBar from 'primevue/progressbar'
import { useAssessmentStore } from '@/entities/assessment/assessment.store'
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import { computed } from 'vue'
import { useAuthStore } from '@/entities/auth'

const exercisesStore = useExercisesStore()
const authStore = useAuthStore()

const progress = computed(() => {
  return (exercisesStore.session?.exercisesCompleted! / authStore.user?.dailyGoal!) * 100
})
</script>

<template>
  <div class="container mx-auto max-w-2xl py-10">
    <Card>
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <h1>Упражнение {{ exercisesStore.session?.exercisesCompleted }}</h1>
          <p class="text-sm text-gray-500">
            {{ exercisesStore.session?.exercisesCompleted }} из {{ authStore.user?.dailyGoal }}
          </p>
        </div>
      </template>
      <template #subtitle>
        <ProgressBar class="my-2" :value="progress"></ProgressBar>
      </template>
      <template #content>
        <div class="my-20 flex flex-col items-center text-center">
          <p class="mb-4 text-3xl text-indigo-500">
            {{ exercisesStore.exercise?.sentence.russianTranslation }}<br />
            <span class="text-indigo-400">{{
              exercisesStore.exercise?.sentence.englishSentence
            }}</span>
          </p>
          <div class="flex gap-2">
            <Badge
              v-if="exercisesStore.exercise?.isWordRepetition"
              :value="`Слово: ${exercisesStore.exercise?.sentence.word.word}`"
              severity="secondary"
            />
            <Badge
              v-if="exercisesStore.exercise?.isGrammarRepetition"
              :value="`Грамматика: ${exercisesStore.exercise?.sentence.grammarTopic.name}`"
              severity="secondary"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-col gap-2">
          <Textarea
            size="large"
            placeholder="Введите ваш перевод здесь"
            style="resize: none"
            class="w-full"
            :value="exercisesStore.userTranslation"
            :invalid="!exercisesStore.feedback?.overall.isCorrect"
            :disabled="!!exercisesStore.feedback"
          />
          <div class="my-4 grid gap-4">
            <Panel>
              <template #header>
                <div class="flex items-center gap-2">
                  <i
                    v-if="exercisesStore.feedback?.overall.isCorrect"
                    class="pi pi-check text-green-500"
                  ></i>
                  <i v-else class="pi pi-times text-red-500"></i>
                  <span class="font-bold">Общая оценка</span>
                </div>
              </template>
              <p class="text-sm">{{ exercisesStore.feedback?.overall.feedback }}</p>
            </Panel>
          </div>
          <Button
            v-if="exercisesStore.nextExercise"
            label="Следующее предложение"
            @click="exercisesStore.showNextSentence()"
          />
          <Button v-else label="Завершить" @click="exercisesStore.finishSession()" />
        </div>
      </template>
    </Card>
  </div>
</template>
