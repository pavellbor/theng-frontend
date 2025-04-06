<script setup lang="ts">
import AssessmentIntro from '@/entities/assessment/ui/AssessmentIntro.vue';
import AssessmentTest from '@/entities/assessment/ui/AssessmentTest.vue';
import { useAssessmentStore } from '@/entities/assessment/assessment.store';
import AssessmentFeedback from '@/entities/assessment/ui/AssessmentFeedback.vue';
import AssessmentResult from '@/entities/assessment/ui/AssessmentResult.vue';

const assessmentStore = useAssessmentStore()
</script>

<template>
  <AssessmentIntro v-if="assessmentStore.screen === 'intro'" />
  <AssessmentTest v-if="assessmentStore.screen === 'test'" />
  <AssessmentFeedback v-if="assessmentStore.screen === 'feedback'" />
  <AssessmentResult v-if="assessmentStore.screen === 'result'" />
</template>