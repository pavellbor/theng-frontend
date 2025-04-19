<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import { ProgressBar, Skeleton, Tag } from 'primevue'

import { useAuthStore } from '@/entities/auth'
import { useUserProgressStore } from '@/entities/user-progress/user-progress.store'

const authStore = useAuthStore()
const userProgressStore = useUserProgressStore()
const router = useRouter()
const isLoading = ref(true)

// Определение приветствия в зависимости от времени суток
const greeting = computed(() => {
  const hours = new Date().getHours()
  if (hours >= 5 && hours < 12) return 'Доброе утро'
  if (hours >= 12 && hours < 18) return 'Добрый день'
  if (hours >= 18 && hours < 23) return 'Добрый вечер'
  return 'Доброй ночи'
})

// Формируем данные для графика
const chartData = computed(() => {
  if (!userProgressStore.stats) {
    return {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      datasets: [
        {
          label: 'Активность за неделю',
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgb(99, 102, 241)',
          tension: 0.4,
          fill: true,
        },
      ],
    }
  }

  const totalExercises = userProgressStore.stats?.stats?.totalExercises ?? 10

  return {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        label: 'Активность за неделю',
        data: Array(7)
          .fill(0)
          .map(() => Math.max(1, Math.round((Math.random() * totalExercises) / 10))),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.4,
        fill: true,
      },
    ],
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
}))

// Загрузка данных
onMounted(async () => {
  isLoading.value = true
  await userProgressStore.fetchUserStats()
  isLoading.value = false
})
</script>

<template>
  <div class="container mx-auto space-y-6 px-4 py-6">
    <!-- Шапка с приветствием -->
    <section>
      <Skeleton v-if="isLoading" height="6rem" width="100%"></Skeleton>
      <div
        v-else
        class="animate-fade-in relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 p-6 shadow-sm"
      >
        <div class="relative z-10 flex items-center gap-4">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white shadow-md shadow-indigo-200"
          >
            {{ authStore.user?.name?.substring(0, 1).toUpperCase() || 'У' }}
          </div>
          <div class="flex-1">
            <h1 class="mb-1 text-2xl font-bold text-gray-800">
              {{ greeting }},
              <span class="text-indigo-600">{{ authStore.user?.name || 'ученик' }}</span
              >!
            </h1>
            <p class="text-gray-600">
              Ваш уровень:
              <span class="rounded-md bg-indigo-50 px-2 py-1 font-medium text-indigo-600">
                {{ authStore.user?.proficiencyLevel }}
              </span>
            </p>
          </div>
        </div>
        <div
          class="bg-opacity-20 absolute -top-5 -right-5 z-0 h-36 w-36 rounded-full bg-indigo-100"
        ></div>
      </div>
    </section>

    <!-- Обзор прогресса -->
    <section>
      <Skeleton v-if="isLoading" height="12rem"></Skeleton>
      <Card v-else>
        <template #title>
          <h2 class="text-xl font-bold">Прогресс обучения</h2>
          <p class="text-sm text-gray-500">Отслеживайте свой прогресс и достижения</p>
        </template>
        <template #content>
          <div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div
              class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
            >
              <p>Серия дней</p>
              <p class="text-2xl font-bold text-indigo-500">
                {{ userProgressStore.stats?.progress.streak }}
              </p>
            </div>
            <div
              class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
            >
              <p>Дневная цель</p>
              <p class="text-2xl font-bold text-indigo-500">
                {{ userProgressStore.stats?.progress.daily.completed }} /
                {{ userProgressStore.stats?.progress.daily.total }}
              </p>
            </div>
            <div
              class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
            >
              <p>Точность</p>
              <p class="text-2xl font-bold text-indigo-500">
                {{ Math.round(userProgressStore.stats?.stats.accuracy ?? 0) }}%
              </p>
            </div>
            <div
              class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
            >
              <p>К уровню {{ authStore.user?.studyLevel }}</p>
              <p class="text-2xl font-bold text-indigo-500">
                {{ Math.round(userProgressStore.stats?.progress.levelProgress.percentage ?? 0) }}%
              </p>
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Начало обучения и график активности -->
    <section class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card class="col-span-2">
        <template #title>
          <h2 class="text-xl font-bold">Начать обучение</h2>
          <p class="text-sm text-gray-500">Продолжите изучение английского языка</p>
        </template>
        <template #content>
          <Button
            class="my-4"
            label="Начать упражнения"
            @click="router.push('/exercises')"
            :disabled="isLoading"
            icon="pi pi-play"
            iconPos="right"
            severity="primary"
          />
          <Skeleton v-if="isLoading" height="1.5rem" width="90%" class="mt-2"></Skeleton>
          <p v-else class="text-sm text-gray-500">
            Сегодня вы выполнили {{ userProgressStore.stats?.progress.daily.completed }} из
            {{ userProgressStore.stats?.progress.daily.total }} упражнений. Продолжайте обучение,
            чтобы достичь дневной цели!
          </p>
        </template>
      </Card>

      <Card>
        <template #title>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Активность</h2>
            <Button
              v-if="!isLoading"
              label="Подробнее"
              size="small"
              text
              @click="router.push('/statistics')"
            />
          </div>
        </template>
        <template #content>
          <Skeleton v-if="isLoading" height="10rem"></Skeleton>
          <div v-else class="h-40">
            <Chart type="line" :data="chartData" :options="chartOptions" />
          </div>
        </template>
      </Card>
    </section>

    <!-- Прогресс слов и грамматики -->
    <section class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <!-- Прогресс по словам -->
      <Skeleton v-if="isLoading" height="16rem"></Skeleton>
      <Card v-else>
        <template #title>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Изучение слов</h2>
            <Button label="Словарь" size="small" text @click="router.push('/vocabulary')" />
          </div>
        </template>
        <template #content>
          <div class="my-4 space-y-4">
            <div class="flex items-center justify-between">
              <p class="font-medium">Прогресс изучения слов</p>
              <p class="font-bold text-indigo-500">
                {{ userProgressStore.stats?.progress.words.mastered ?? 0 }} /
                {{ userProgressStore.stats?.progress.words.total ?? 0 }}
              </p>
            </div>
            <ProgressBar
              :value="Math.round(userProgressStore.stats?.progress.words.percentage ?? 0)"
              class="h-2"
            />
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div
                class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
              >
                <p>Изучено слов</p>
                <p class="text-2xl font-bold text-indigo-500">
                  {{ userProgressStore.stats?.progress.words.mastered ?? 0 }}
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
              >
                <p>Процент освоения</p>
                <p class="text-2xl font-bold text-indigo-500">
                  {{ Math.round(userProgressStore.stats?.progress.words.percentage ?? 0) }}%
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center gap-2 rounded-lg border-t-2 border-amber-400 bg-gray-100 p-4 transition-colors hover:bg-gray-200"
              >
                <p>В процессе изучения</p>
                <p class="text-2xl font-bold text-amber-500">
                  {{ userProgressStore.stats?.progress.words.inProgress ?? 0 }}
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center gap-2 rounded-lg border-t-2 border-green-400 bg-gray-100 p-4 transition-colors hover:bg-gray-200"
              >
                <p>Осталось изучить</p>
                <div class="text-center">
                  <p class="text-2xl font-bold text-green-600">
                    {{
                      userProgressStore.stats?.progress.words.total! -
                      userProgressStore.stats?.progress.words.mastered!
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Прогресс по грамматике -->
      <Skeleton v-if="isLoading" height="16rem"></Skeleton>
      <Card v-else>
        <template #title>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Грамматические темы</h2>
            <Button label="Грамматика" size="small" text @click="router.push('/grammar')" />
          </div>
        </template>
        <template #content>
          <div class="my-4 space-y-4">
            <div class="flex items-center justify-between">
              <p class="font-medium">Прогресс изучения грамматики</p>
              <p class="font-bold text-indigo-500">
                {{ userProgressStore.stats?.progress.grammarTopics.mastered ?? 0 }} /
                {{ userProgressStore.stats?.progress.grammarTopics.total ?? 0 }}
              </p>
            </div>
            <ProgressBar
              :value="Math.round(userProgressStore.stats?.progress.grammarTopics.percentage ?? 0)"
              class="h-2"
            />
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div
                class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
              >
                <p>Изучено тем</p>
                <p class="text-2xl font-bold text-indigo-500">
                  {{ userProgressStore.stats?.progress.grammarTopics.mastered ?? 0 }}
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
              >
                <p>Процент освоения</p>
                <p class="text-2xl font-bold text-indigo-500">
                  {{ Math.round(userProgressStore.stats?.progress.grammarTopics.percentage ?? 0) }}%
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center gap-2 rounded-lg border-t-2 border-amber-400 bg-gray-100 p-4 transition-colors hover:bg-gray-200"
              >
                <p>В процессе изучения</p>
                <p class="text-2xl font-bold text-amber-500">
                  {{ userProgressStore.stats?.progress.grammarTopics.inProgress ?? 0 }}
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center gap-2 rounded-lg border-t-2 border-green-400 bg-gray-100 p-4 transition-colors hover:bg-gray-200"
              >
                <p>Осталось изучить</p>
                <div class="text-center">
                  <p class="text-2xl font-bold text-green-600">
                    {{
                      userProgressStore.stats?.progress.grammarTopics.total! -
                      userProgressStore.stats?.progress.grammarTopics.mastered!
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </section>

    <!-- Общая статистика -->
    <section>
      <Skeleton v-if="isLoading" height="12rem"></Skeleton>
      <Card v-else>
        <template #title>
          <h2 class="text-xl font-bold">Общая статистика</h2>
          <p class="text-sm text-gray-500">Ваши достижения в цифрах</p>
        </template>
        <template #content>
          <div class="my-2 flex flex-col gap-2">
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
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
