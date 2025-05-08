<script setup lang="ts">
import { Button, Card, Textarea, Badge, FloatLabel, Panel, DataTable, Column } from 'primevue'
import ProgressBar from 'primevue/progressbar'
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import { useRouter } from 'vue-router'

const exercisesStore = useExercisesStore()
const router = useRouter()
</script>

<template>
  <div class="container mx-auto max-w-2xl py-10">
    <Card>
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <h1>Сессия завершена</h1>
        </div>
      </template>
      <template #subtitle>
        <p>Поздравляем! Вы завершили все упражнения в этой сессии</p>
      </template>
      <template #content>
        <div class="my-20 flex flex-col items-center text-center">
          <p class="mb-4 text-6xl font-bold text-indigo-500">
            {{ exercisesStore.session?.correctAnswers }}
          </p>
          <p class="text-gray-500">правильных ответов из {{ exercisesStore.session?.exercisesCompleted }}</p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between gap-4">
          <Button label="Вернуться на главную" variant="outlined" @click="router.push('/')" />
          <Button :loading="exercisesStore.isLoading" label="Продолжить обучение" @click="exercisesStore.startSession" />
        </div>
      </template>
    </Card>
  </div>
</template>
