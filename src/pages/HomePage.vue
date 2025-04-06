<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useAuthStore } from '@/entities/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card v-if="authStore.user?.cefrLevel">
        <template #title>
          <h2>Начать обучение</h2>
          <p class="text-sm text-gray-500">Продолжите изучение английского языка</p>
        </template>
        <template #content>
          <Button class="my-4 mt-3" label="Начать упражнения" />
          <p class="text-sm text-gray-500">
            Сегодня вы выполнили 3 из 10 упражнений. Продолжайте обучение, чтобы достичь дневной
            цели!
          </p>
        </template>
      </Card>
      <Card v-else>
        <template #title>
          <h2>Начать тестирование</h2>
        </template>
        <template #subtitle>
          <p>Определите свой уровень английского языка</p>
        </template>
        <template #content>
          <Button label="Начать тестирование" />
        </template>
        <template #footer>
          <p>
            Тестирование поможет определить ваш уровень английского языка и создать индивидуальную
            программу обучения.
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>
