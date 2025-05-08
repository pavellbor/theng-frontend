<script setup lang="ts">
import { Button, Card, Message } from 'primevue'
import { useExercisesStore } from '@/entities/exercises/exercises.store'
import { useRouter } from 'vue-router'

const exercisesStore = useExercisesStore()
const router = useRouter()
</script>

<template>
  <div class="container mx-auto max-w-4xl py-10">
    <Card>
      <template #title>
        <h1>Упражнения на перевод</h1>
      </template>
      <template #subtitle>
        <p>Переводите предложения с русского на английский для улучшения навыков</p>
      </template>
      <template #content>
        <div class="my-4 flex flex-col gap-4">
          <p>
            В этой сессии вам предстоит перевести 10 предложений с русского на английский. Каждое
            упражнение фокусируется на определенной грамматической теме и ключевом слове.
          </p>
          <p>
            Вы получите обратную связь по каждому переводу, которая поможет вам улучшить ваши
            навыки.
          </p>
          <Message severity="secondary" icon="pi pi-info-circle" size="small">
            <p class="py-2 text-sm">
              Старайтесь переводить предложения самостоятельно, без использования переводчиков,
              чтобы максимально эффективно улучшать свои навыки.
            </p>
          </Message>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <Button label="Вернуться" variant="outlined" @click="router.push('/')" />
          <Button
            :loading="exercisesStore.isLoading"
            label="Начать упражнения"
            @click="exercisesStore.startSession"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
