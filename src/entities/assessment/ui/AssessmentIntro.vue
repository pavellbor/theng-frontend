<script setup lang="ts">
import { Button, Card } from 'primevue'
import { useAssessmentStore } from '@/entities/assessment/assessment.store'

const assessmentStore = useAssessmentStore()
</script>

<template>
  <div class="container mx-auto max-w-4xl py-10">
    <Card>
      <template #title>
        <h1 class="text-2xl font-bold">Определение уровня владения английским</h1>
      </template>
      <template #subtitle>
        <p class="text-sm text-gray-500">
          Перед началом обучения мы определим ваш текущий уровень владения английским языком
        </p>
      </template>
      <template #content>
        <div class="my-4 flex flex-col gap-4">
          <p>
            Вам будет предложено перевести несколько предложений с русского на английский. На основе
            ваших ответов мы определим ваш уровень по шкале CEFR (от A1 до C1).
          </p>
          <p>
            Тест займет около 5-10 минут. Постарайтесь переводить предложения самостоятельно, без
            использования переводчиков, чтобы мы могли точно определить ваш уровень.
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <Button
            label="Пропустить (начать с A1)"
            variant="outlined"
            @click="assessmentStore.skipAssessment"
          />
          <Button label="Начать тестирование" @click="assessmentStore.startAssessment" />
        </div>
      </template>
    </Card>
  </div>
</template>
