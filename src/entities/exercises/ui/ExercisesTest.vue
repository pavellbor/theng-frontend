<script setup lang="ts">
import { Button, Card, Textarea, Badge } from 'primevue'
import ProgressBar from 'primevue/progressbar'
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/entities/auth'
import ExercisesHint from './ExercisesHint.vue'

const exercisesStore = useExercisesStore()
const authStore = useAuthStore()

const progress = computed(() => {
  return (exercisesStore.session?.exercisesCompleted! / authStore.user?.dailyGoal!) * 100
})

const translation = ref('')

const handleSubmit = () => {
  if (translation.value.trim()) {
    exercisesStore.checkTranslation(translation.value)
  }
}
</script>

<template>
  <div class="container mx-auto max-w-2xl py-10">
    <Card>
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <h1>Упражнение {{ exercisesStore.session?.exercisesCompleted! + 1 }}</h1>
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
            {{ exercisesStore.exercise?.sentence.russianTranslation }}
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <Badge
              v-if="
                exercisesStore.exercise?.isWordRepetition &&
                exercisesStore.exercise?.isGrammarRepetition
              "
              value="Повторение слова и грамматики"
              severity="secondary"
            />
            <Badge
              v-else-if="exercisesStore.exercise?.isWordRepetition"
              value="Повторение слова"
              severity="secondary"
            />
            <Badge
              v-else-if="exercisesStore.exercise?.isGrammarRepetition"
              value="Повторение грамматики"
              severity="secondary"
            />
          </div>

          <!-- Компонент с подсказками -->
          <ExercisesHint class="mt-4" />
        </div>
      </template>
      <template #footer>
        <div class="flex flex-col gap-2">
          <Textarea
            size="large"
            placeholder="Введите ваш перевод здесь"
            style="resize: none"
            class="w-full"
            v-model="translation"
            @keyup.enter="handleSubmit"
          />
          <Button
            label="Проверить"
            @click="handleSubmit"
            :loading="exercisesStore.isLoading"
            class="mt-2"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
