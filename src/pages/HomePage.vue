<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useAuthStore } from '@/entities/auth'
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
</script>

<template>
  <div class="container mx-auto space-y-8">
    <Card>
      <template #title>
        <h2>Прогресс обучения</h2>
        <p class="text-sm text-gray-500">Отслеживайте свой прогресс и достижения</p>
      </template>
      <template #content>
        <div class="grid grid-cols-3 gap-4 my-4">
          <div class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
            <p>Серия дней</p>
            <p class="text-2xl font-bold text-indigo-500">{{ authStore.user?.streak }}</p>
          </div>
          <div class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
            <p>Дневная цель</p>
            <p class="text-2xl font-bold text-indigo-500">3 / {{ authStore.user?.dailyGoal }}</p>
          </div>
          <div class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
            <p>Выполнено упражнений</p>
            <p class="text-2xl font-bold text-indigo-500">120</p>
          </div>
        </div>
      </template>
    </Card>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card v-if="authStore.user?.cefrLevel">
        <template #title>
          <h2>Начать обучение</h2>
          <p class="text-sm text-gray-500">Продолжите изучение английского языка</p>
        </template>
        <template #content>
          <Button class="my-4 mt-3" label="Начать упражнения" @click="router.push('/exercises')" />
          <p class="text-sm text-gray-500">
            Сегодня вы выполнили 3 из 10 упражнений. Продолжайте обучение, чтобы достичь дневной
            цели!
          </p>
        </template>
      </Card>
      <Card v-else>
        <template #title>
          <h2>Начать обучение</h2>
        </template>
        <template #subtitle>
          <p>Продолжите изучение английского языка</p>
        </template>
        <template #content>
          <Button label="Начать упражнения" />
        </template>
        <template #footer>
          <p>
            Сегодня вы выполнили 3 из 10 упражнений. Продолжайте обучение, чтобы достичь дневной
            цели!
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>
