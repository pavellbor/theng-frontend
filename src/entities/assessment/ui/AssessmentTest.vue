<script setup lang="ts">
import { Button, Card, Textarea, Badge, FloatLabel, Panel } from 'primevue'
import ProgressBar from 'primevue/progressbar'
import { useAssessmentStore } from '@/entities/assessment/assessment.store'
import { ref } from 'vue'

const assessmentStore = useAssessmentStore()

const translation = ref('')
</script>

<template>
  <div class="container mx-auto max-w-2xl py-10">
    <Card>
      <template #title>
        <div class="flex items-center justify-between gap-2">
          <h1>Тестирование уровня</h1>
          <p class="text-sm text-gray-500">
            {{ assessmentStore.progress?.completed }} из {{ assessmentStore.progress?.total }}
          </p>
        </div>
      </template>
      <template #subtitle>
        <ProgressBar class="my-2" :value="assessmentStore.progress?.percentage"></ProgressBar>
      </template>
      <template #content>
        <div class="my-20 flex flex-col items-center text-center">
          <p class="mb-4 text-3xl text-indigo-500">
            {{ assessmentStore.sentence?.russianTranslation }}
          </p>
          <div class="flex gap-2">
            <Badge :value="`Уровень: ${assessmentStore.sentence?.cefrLevel}`" severity="secondary" />
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
            @click="assessmentStore.checkTranslation(translation)"
            :loading="assessmentStore.isLoading"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
