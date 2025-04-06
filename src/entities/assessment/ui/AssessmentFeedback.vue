<script setup lang="ts">
import { Button, Card, Textarea, Badge, Panel } from 'primevue'
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
            {{ assessmentStore.sentence?.russianTranslation }}<br />
            <span class="text-indigo-400">{{ assessmentStore.sentence?.englishSentence }}</span>
          </p>
          <div class="flex gap-2">
            <Badge :value="`Уровень: ${assessmentStore.sentence?.cefrLevel}`" severity="secondary" />
            <Badge :value="`Слово: ${assessmentStore.sentence?.word}`" severity="secondary" />
            <Badge
              :value="`Грамматика: ${assessmentStore.sentence?.grammarTopic}`"
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
            v-model="assessmentStore.userTranslation"
            :invalid="!assessmentStore.feedback?.overall.isCorrect"
            :disabled="!!assessmentStore.feedback"
          />
          <div class="grid gap-4 my-4">
            <Panel>
              <template #header>
                <div class="flex items-center gap-2">
                  <i
                    v-if="assessmentStore.feedback?.overall.isCorrect"
                    class="pi pi-check text-green-500"
                  ></i>
                  <i v-else class="pi pi-times text-red-500"></i>
                  <span class="font-bold">Общая оценка</span>
                </div>
              </template>
              <p class="text-sm">{{ assessmentStore.feedback?.overall.feedback }}</p>
            </Panel>
            <Panel>
              <template #header>
                <div class="flex items-center gap-2">
                  <i
                    v-if="assessmentStore.feedback?.word.isCorrect"
                    class="pi pi-check text-green-500"
                  ></i>
                  <i v-else class="pi pi-times text-red-500"></i>
                  <span class="font-bold">Ключевое слово</span>
                </div>
              </template>
              <p class="text-sm">{{ assessmentStore.feedback?.word.feedback }}</p>
            </Panel>
            <Panel>
              <template #header>
                <div class="flex items-center gap-2">
                  <i
                    v-if="assessmentStore.feedback?.grammarTopic.isCorrect"
                    class="pi pi-check text-green-500"
                  ></i>
                  <i v-else class="pi pi-times text-red-500"></i>
                  <span class="font-bold">Грамматика</span>
                </div>
              </template>
              <p class="text-sm">{{ assessmentStore.feedback?.grammarTopic.feedback }}</p>
            </Panel>
          </div>
          <Button v-if="assessmentStore.nextSentence" label="Следующее предложение" @click="assessmentStore.showNextSentence()" />
          <Button v-else label="Завершить тестирование" @click="assessmentStore.finishAssessment()" />
        </div>
      </template>
    </Card>
  </div>
</template>
