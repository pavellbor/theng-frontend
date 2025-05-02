<script setup lang="ts">
import { Card, Button } from 'primevue'
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import { HintType } from '@/entities/exercises/exercises.api'

const exercisesStore = useExercisesStore()

const handleGetHint = async () => {
  await exercisesStore.loadTranslationHint()
}

const handleGetWordHint = async () => {
  await exercisesStore.loadWordHint()
}

const handleGetGrammarHint = async () => {
  await exercisesStore.loadGrammarHint()
}

const handleHideHint = () => {
  exercisesStore.hideHint()
}
</script>

<template>
  <div class="mt-4">
    <div v-if="!exercisesStore.isHintVisible" class="flex gap-1">
      <Button
        :label="`Слово - ${exercisesStore.exercise?.sentence.word.russianTranslation}`"
        outlined
        severity="info"
        size="small"
        icon="pi pi-book"
        :loading="exercisesStore.isHintLoading"
        @click="handleGetWordHint"
        class="text-xs px-2 py-1"
      />
      <Button
        label="Грамматика"
        outlined
        severity="info"
        size="small"
        icon="pi pi-pencil"
        :loading="exercisesStore.isHintLoading"
        @click="handleGetGrammarHint"
        class="text-xs px-2 py-1"
      />
      <Button
        label="Показать перевод"
        outlined
        severity="info"
        size="small"
        :disabled="exercisesStore.isTranslationShown || exercisesStore.isHintLoading"
        @click="exercisesStore.showTranslation"
        class="text-xs px-2 py-1"
      />
    </div>
    <div v-if="exercisesStore.isTranslationShown && !exercisesStore.isHintVisible" class="mt-2 text-sm text-green-700">
      {{ exercisesStore.translationHint }}
    </div>

    <Card v-if="exercisesStore.isHintVisible && exercisesStore.hint" class="mt-2">
      <template #title>
        <div class="flex items-center justify-between">
          <span>
            <template v-if="exercisesStore.requestedHintType === HintType.WORD">
              Подсказка по слову
            </template>
            <template v-else-if="exercisesStore.requestedHintType === HintType.GRAMMAR">
              Подсказка по грамматике
            </template>
            <template v-else>
              Подсказки для перевода
            </template>
          </span>
          <Button
            icon="pi pi-times"
            text
            rounded
            severity="secondary"
            @click="handleHideHint"
          />
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div 
            v-if="exercisesStore.hint.wordHint && 
                 (exercisesStore.requestedHintType === HintType.WORD || 
                  exercisesStore.requestedHintType === HintType.BOTH)"
          >
            <h3 class="text-base font-bold text-indigo-600 mb-0.5">Слово "{{ exercisesStore.exercise?.sentence.word.russianTranslation }}"</h3>
            <p class="text-sm">{{ exercisesStore.hint.wordHint }}</p>
          </div>
          <div 
            v-if="exercisesStore.hint.grammarHint && 
                 (exercisesStore.requestedHintType === HintType.GRAMMAR || 
                  exercisesStore.requestedHintType === HintType.BOTH)"
          >
            <h3 class="text-base font-bold text-indigo-600 mb-0.5">Грамматика</h3>
            <p class="text-sm">{{ exercisesStore.hint.grammarHint }}</p>
          </div>
          <div 
            v-if="exercisesStore.hint.generalHint && 
                 exercisesStore.requestedHintType === HintType.BOTH"
          >
            <h3 class="text-base font-bold text-indigo-600 mb-0.5">Общая подсказка</h3>
            <p class="text-sm">{{ exercisesStore.hint.generalHint }}</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template> 