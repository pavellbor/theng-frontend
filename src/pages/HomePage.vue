<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useAuthStore } from '@/entities/auth'
import { useRouter } from 'vue-router'
import { useUserProgressStore } from '@/entities/user-progress/user-progress.store'
import { onMounted } from 'vue'
import { ProgressBar } from 'primevue'

const authStore = useAuthStore()
const router = useRouter()
const userProgressStore = useUserProgressStore()

onMounted(async () => {
  await userProgressStore.fetchUserStats()
})
</script>

<template>
  <div class="container mx-auto space-y-8">
    <Card>
      <template #title>
        <h2>Прогресс обучения</h2>
        <p class="text-sm text-gray-500">Отслеживайте свой прогресс и достижения</p>
      </template>
      <template #content>
        <div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
            <p>Серия дней</p>
            <p class="text-2xl font-bold text-indigo-500">
              {{ userProgressStore.stats?.progress.streak }}
            </p>
          </div>
          <div class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
            <p>Дневная цель</p>
            <p class="text-2xl font-bold text-indigo-500">
              {{ userProgressStore.stats?.progress.daily.completed }} /
              {{ userProgressStore.stats?.progress.daily.total }}
            </p>
          </div>
          <div class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
            <p>Точность</p>
            <p class="text-2xl font-bold text-indigo-500">
              {{ Math.round(userProgressStore.stats?.stats.accuracy ?? 0) }}%
            </p>
          </div>
          <div class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
            <p>На пути к {{ authStore.user?.studyLevel }}</p>
            <p class="text-2xl font-bold text-indigo-500">
              {{ Math.round(userProgressStore.stats?.progress.levelProgress.percentage ?? 0) }}%
            </p>
          </div>
        </div>
      </template>
    </Card>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card class="col-span-2">
        <template #title>
          <h2>Начать обучение</h2>
          <p class="text-sm text-gray-500">Продолжите изучение английского языка</p>
        </template>
        <template #content>
          <Button class="my-4 mt-3" label="Начать упражнения" @click="router.push('/exercises')" />
          <p class="text-sm text-gray-500">
            Сегодня вы выполнили {{ userProgressStore.stats?.progress.daily.completed }} из
            {{ userProgressStore.stats?.progress.daily.total }} упражнений. Продолжайте обучение,
            чтобы достичь дневной цели!
          </p>
        </template>
      </Card>
      <Card class="col-span-1">
        <template #title>
          <h2>Статистика</h2>
          <p class="text-sm text-gray-500">Ваши достижения в цифрах</p>
        </template>
        <template #content>
          <div class="my-2 flex flex-col gap-1">
            <div class="flex justify-between gap-4 text-sm">
              <p class="text-gray-500">Изучено слов</p>
              <p class="text-indigo-500">
                {{ userProgressStore.stats?.progress.words.mastered }} /
                {{ userProgressStore.stats?.progress.words.total }}
              </p>
            </div>
            <div class="flex justify-between gap-4 text-sm">
              <p class="text-gray-500">Изучено грамматических тем</p>
              <p class="text-indigo-500">
                {{ userProgressStore.stats?.progress.grammarTopics.mastered }} /
                {{ userProgressStore.stats?.progress.grammarTopics.total }}
              </p>
            </div>
            <div class="flex justify-between gap-4 text-sm">
              <p class="text-gray-500">Выполнено упражнений</p>
              <p class="text-indigo-500">
                {{ userProgressStore.stats?.stats.totalExercises }}
              </p>
            </div>
            <div class="flex justify-between gap-4 text-sm">
              <p class="text-gray-500">Завершено сессий</p>
              <p class="text-indigo-500">
                {{ userProgressStore.stats?.stats.sessionsCompleted }}
              </p>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
