<script setup lang="ts">
import { Button, Card, DataTable, Column } from 'primevue'
import { useAssessmentStore } from '@/entities/assessment/assessment.store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const assessmentStore = useAssessmentStore()
const router = useRouter()

const formattedLevelStats = computed(() => {
  return Object.entries(assessmentStore.result?.levelStats || {}).map(([level, stats]) => ({
    level,
    ...stats,
  }))
})

const rowClass = (data: any) => {
  return [{ 'bg-indigo-50!': data.level === assessmentStore.result?.determinedLevel }]
}
</script>

<template>
  <div class="container mx-auto max-w-2xl py-10">
    <Card>
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <h1>Результат тестирования</h1>
        </div>
      </template>
      <template #subtitle>
        <p>На основе ваших ответов мы определили ваш уровень владения английским</p>
      </template>
      <template #content>
        <div class="my-20 flex flex-col items-center text-center">
          <p class="mb-4 text-6xl font-bold text-indigo-500">
            {{ assessmentStore.result?.determinedLevel }}
          </p>
          <p class="text-gray-500">Ваш уровень по шкале CEFR</p>
        </div>
        <DataTable
          :value="formattedLevelStats"
          showGridlines
          class="mb-10 w-full"
          :rowClass="rowClass"
        >
          <Column field="level" header="Уровень"></Column>
          <Column field="attempts" header="Попытки"></Column>
          <Column field="correct" header="Правильно"></Column>
          <Column field="percentage" header="Процент"></Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end gap-4">
          <Button
            label="Пройти тест снова"
            variant="outlined"
            @click="assessmentStore.startAssessment"
          />
          <Button label="Перейти к упражнениям" @click="router.push('/exercises')" />
        </div>
      </template>
    </Card>
  </div>
</template>
