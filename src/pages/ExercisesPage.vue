<script lang="ts" setup>
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import ExercisesIntro from '@/entities/exercises/ui/ExercisesIntro.vue';
import ExercisesTest from '@/entities/exercises/ui/ExercisesTest.vue';
import ExercisesFeedback from '@/entities/exercises/ui/ExercisesFeedback.vue';
import ExercisesResult from '@/entities/exercises/ui/ExercisesResult.vue';
const exercisesStore = useExercisesStore()
</script>

<template>
  <ExercisesIntro v-if="exercisesStore.screen === 'intro'" />
  <ExercisesTest v-if="exercisesStore.screen === 'test'" />
  <ExercisesFeedback v-if="exercisesStore.screen === 'feedback'" />
  <ExercisesResult v-if="exercisesStore.screen === 'result'" />
</template>