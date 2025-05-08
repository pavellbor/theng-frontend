<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Divider, Card } from 'primevue'
import { useAuthStore } from '@/entities/auth'

const router = useRouter()
const authStore = useAuthStore()

const features = ref([
  {
    icon: 'pi pi-sync',
    title: 'Интервальное повторение',
    description: 'Система эффективного запоминания для долгосрочного усвоения слов и грамматики'
  },
  {
    icon: 'pi pi-user-edit',
    title: 'Персонализация',
    description: 'Контент адаптируется под ваш уровень и прогресс обучения'
  },
  {
    icon: 'pi pi-check-circle',
    title: 'Практический подход',
    description: 'Обучение через активный перевод предложений с использованием изучаемых слов'
  },
  {
    icon: 'pi pi-comments',
    title: 'Детальная обратная связь',
    description: 'Подробный анализ ваших переводов с рекомендациями на русском языке'
  },
  {
    icon: 'pi pi-chart-line',
    title: 'Отслеживание прогресса',
    description: 'Визуализация вашего прогресса и достижений во время обучения'
  },
  {
    icon: 'pi pi-bolt',
    title: 'Интеллектуальный анализ',
    description: 'Использование ИИ для оценки точности и естественности переводов'
  }
])

const isLoggedIn = computed(() => authStore.isLoggedIn)

const redirectToLogin = () => {
  router.push('/login')
}

const redirectToRegister = () => {
  router.push('/register')
}

const redirectToDashboard = () => {
  router.push('/dashboard')
}

const redirectToAssessment = () => {
  router.push('/assessment')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <!-- Главный баннер -->
    <section class="mb-16 text-center">
      <h1 class="mb-6 text-4xl font-extrabold tracking-tight text-indigo-900 sm:text-5xl md:text-6xl">
        Изучайте английский <span class="text-indigo-600">эффективно</span>
      </h1>
      <p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
        Погрузитесь в английский через перевод предложений! Наша интерактивная платформа с ИИ и интервальным повторением ускорит ваш путь к свободному владению.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <template v-if="!isLoggedIn">
          <Button
            label="Регистрация"
            icon="pi pi-user-plus"
            severity="primary"
            size="large"
            @click="redirectToRegister"
          />
          <Button
            label="Войти"
            icon="pi pi-sign-in"
            outlined
            severity="primary"
            size="large"
            @click="redirectToLogin"
          />
        </template>
        <template v-else>
          <Button
            v-if="authStore.user?.studyLevel"
            label="Мои упражнения"
            icon="pi pi-book"
            severity="primary"
            size="large"
            @click="redirectToDashboard"
          />
          <Button
            v-else
            label="Определить уровень"
            icon="pi pi-chart-bar"
            severity="primary"
            size="large"
            @click="redirectToAssessment"
          />
        </template>
      </div>
    </section>

    <Divider />

    <!-- Ключевые особенности -->
    <section class="mb-16">
      <h2 class="mb-10 text-center text-3xl font-bold text-indigo-800">Ключевые особенности</h2>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card v-for="feature in features" :key="feature.title" class="transition-all hover:shadow-lg">
          <template #header>
            <div class="flex justify-center p-4">
              <i :class="[feature.icon, 'text-4xl text-indigo-600']"></i>
            </div>
          </template>
          <template #title>
            <h3 class="text-center text-xl font-semibold text-indigo-700">{{ feature.title }}</h3>
          </template>
          <template #content>
            <p class="text-center text-gray-600">{{ feature.description }}</p>
          </template>
        </Card>
      </div>
    </section>

    <Divider />

    <!-- Наш подход к обучению -->
    <section class="mb-16 bg-indigo-50 py-12 rounded-lg">
      <div class="flex justify-center mb-6">
        <i class="pi pi-book text-5xl text-indigo-600"></i>
      </div>
      <h2 class="mb-10 text-center text-3xl font-bold text-indigo-800">Наш подход к обучению</h2>
      <div class="mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
        <p class="mb-4 text-lg text-gray-700">
          Мы верим, что самый эффективный способ выучить язык – это сразу начать его использовать. Вместо того чтобы разделять изучение грамматики и запоминание слов, мы объединяем их в одном увлекательном процессе.
        </p>
        <p class="text-lg text-gray-700">
          Наша платформа фокусируется на **активном переводе предложений**. Вы работаете с реальными языковыми конструкциями, видите, как слова и грамматические правила взаимодействуют друг с другом в контексте. Это не только помогает глубже понять материал, но и значительно ускоряет процесс обучения, делая его более естественным и интуитивным.
        </p>
      </div>
    </section>

    <Divider />

    <!-- Как это работает -->
    <section class="mb-16">
      <h2 class="mb-10 text-center text-3xl font-bold text-indigo-800">Как это работает</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="flex flex-col justify-center">
          <h3 class="mb-4 text-2xl font-semibold text-indigo-700">Шаг за шагом к свободному владению</h3>
          <ul class="space-y-4">
            <li class="flex items-start">
              <i class="pi pi-check-circle mr-2 mt-1 text-green-500"></i>
              <span
                >Регистрируйтесь и определяйте свой начальный уровень владения английским языком</span
              >
            </li>
            <li class="flex items-start">
              <i class="pi pi-check-circle mr-2 mt-1 text-green-500"></i>
              <span
                >Получайте персонализированные упражнения на перевод с учетом вашего уровня</span
              >
            </li>
            <li class="flex items-start">
              <i class="pi pi-check-circle mr-2 mt-1 text-green-500"></i>
              <span>Переводите предложения с английского на русский и получайте оценку</span>
            </li>
            <li class="flex items-start">
              <i class="pi pi-check-circle mr-2 mt-1 text-green-500"></i>
              <span
                >Система интервального повторения автоматически планирует, когда вам нужно
                вернуться к сложным словам и темам</span
              >
            </li>
            <li class="flex items-start">
              <i class="pi pi-check-circle mr-2 mt-1 text-green-500"></i>
              <span
                >Отслеживайте свой прогресс и наблюдайте, как растет ваш словарный запас</span
              >
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-center">
          <div class="relative w-fit overflow-hidden rounded-lg bg-indigo-100 shadow-md">
            <img src="../app/assets/exercise-screenshot.png" alt="Скриншот упражнения: перевод предложения с английского на русский с отображением целевого слова и грамматической темы, а также оценка ответа." class="block w-full h-auto object-contain rounded-lg max-h-[360px]" />
          </div>
        </div>
      </div>
    </section>

    <Divider />

    <!-- Призыв к действию -->
    <section class="rounded-2xl bg-indigo-100 p-8 text-center">
      <h2 class="mb-4 text-3xl font-bold text-indigo-800">Начните изучать английский уже сейчас</h2>
      <p class="mx-auto mb-6 max-w-2xl text-lg text-gray-700">
        Присоединяйтесь к платформе и откройте для себя эффективный способ изучения английского языка
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <template v-if="!isLoggedIn">
          <Button
            label="Создать аккаунт"
            severity="primary"
            size="large"
            @click="redirectToRegister"
          />
        </template>
        <template v-else>
          <Button
            v-if="authStore.user?.studyLevel"
            label="Перейти к упражнениям"
            severity="primary"
            size="large"
            @click="redirectToDashboard"
          />
          <Button
            v-else
            label="Определить уровень"
            severity="primary"
            size="large"
            @click="redirectToAssessment"
          />
        </template>
      </div>
    </section>
  </div>
</template>
