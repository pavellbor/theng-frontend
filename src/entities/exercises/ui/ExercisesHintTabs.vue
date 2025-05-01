<script setup lang="ts">
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import { Button, TabView, TabPanel } from 'primevue'

const exercisesStore = useExercisesStore()
</script>

<template>
  <TabView class="mt-4">
    <TabPanel header="Слово">
      <h3 class="text-lg font-bold text-indigo-600 mb-1">
        Слово "{{ exercisesStore.exercise?.sentence.word.russianTranslation }}"
      </h3>
      <p>{{ exercisesStore.hint?.wordHint }}</p>
    </TabPanel>
    <TabPanel header="Грамматика">
      <h3 class="text-lg font-bold text-indigo-600 mb-1">Грамматика</h3>
      <p>{{ exercisesStore.hint?.grammarHint }}</p>
    </TabPanel>
    <TabPanel header="Общая подсказка">
      <h3 class="text-lg font-bold text-indigo-600 mb-1">Общая подсказка</h3>
      <p>{{ exercisesStore.hint?.generalHint }}</p>
    </TabPanel>
    <TabPanel header="Перевод">
      <div class="flex flex-col items-center">
        <Button
          label="Показать перевод"
          severity="info"
          outlined
          :disabled="exercisesStore.isTranslationShown || exercisesStore.isHintLoading"
          @click="exercisesStore.showTranslation"
        />
        <Transition name="fade">
          <div
            v-if="exercisesStore.isTranslationShown"
            class="mt-4 p-3 rounded bg-green-50 border border-green-300 text-green-800 text-xl flex flex-col items-center"
          >
            <span class="font-bold">Эталонный перевод:</span>
            <span>{{ exercisesStore.translationHint }}</span>
            <small class="mt-2 text-gray-500">
              Показ перевода засчитан как использование подсказки, ответ не будет засчитан как правильный.
            </small>
          </div>
        </Transition>
      </div>
    </TabPanel>
  </TabView>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 