<script setup lang="ts">
import { Button, Card, Textarea, Badge } from 'primevue'
import ProgressBar from 'primevue/progressbar'
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/entities/auth'

const exercisesStore = useExercisesStore()
const authStore = useAuthStore()

const progress = computed(() => {
  return (exercisesStore.session?.exercisesCompleted! / authStore.user?.dailyGoal!) * 100
})

const translation = ref('')
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
          <div class="flex gap-2">
            <Badge
              :value="`Уровень: ${exercisesStore.exercise?.sentence.cefrLevel}`"
              severity="secondary"
            />
            <Badge :value="`Слово: ${exercisesStore.exercise?.sentence.word.word}`" severity="secondary" />
            <Badge
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
            v-model="translation"
          />
          <Button
            label="Проверить"
            @click="exercisesStore.checkTranslation(translation)"
            :loading="exercisesStore.isLoading"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
