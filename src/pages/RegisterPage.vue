<script setup lang="ts">
import { useAuthStore } from '@/entities/auth'
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms'
import { InputText, Message } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { AxiosError } from 'axios'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const initialValues = reactive<FormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const resolver = (options: FormResolverOptions) => {
  const errors: Record<string, { message: string }[]> = {}

  if (!options.values.email) {
    errors.email = [{ message: 'Заполните поле' }]
  }

  if (!options.values.password) {
    errors.password = [{ message: 'Заполните поле' }]
  }

  if (!options.values.confirmPassword) {
    errors.confirmPassword = [{ message: 'Заполните поле' }]
  }

  if (options.values.confirmPassword && options.values.password !== options.values.confirmPassword) {
    errors.confirmPassword = [{ message: 'Пароли не совпадают' }]
  }

  return { errors, values: options.values }
}

const onSubmit = async (data: FormSubmitEvent) => {
  if (!data.valid) {
    return
  }

  try {
    await authStore.register(data.values as FormData)
    router.push('/dashboard')
  } catch (error) {
    console.error(error)

    let errorMessage =
      error instanceof AxiosError ? error.response?.data.message : 'Не удалось войти в систему'

    if (Array.isArray(errorMessage)) {
      errorMessage = errorMessage.join(', ')
    }

    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: errorMessage,
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="min-h-full w-full">
    <div class="flex min-h-screen flex-col justify-center bg-gray-50 py-12">
      <div class="px-3 text-center">
        <RouterLink to="/"
          ><h1
            class="text-3xl font-black text-indigo-600 transition-colors duration-300 hover:text-indigo-700"
          >
            Theng
          </h1></RouterLink
        >
        <h2 class="mt-3 text-xl font-semibold text-gray-700">Создание аккаунта</h2>
        <p class="mt-2 text-sm text-gray-600">Начните свой путь к совершенству английского языка</p>
      </div>
      <div
        class="mt-8 w-full bg-white px-4 py-8 shadow sm:mx-auto sm:max-w-md sm:rounded-lg sm:px-8"
      >
        <Form
          v-slot="$form"
          :initialValues="initialValues"
          :resolver="resolver"
          validate-on-blur
          @submit="onSubmit"
        >
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700" for="name">Имя</label>
              <InputText name="name" type="text" fluid />
              <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
                $form.name.error?.message
              }}</Message>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
              <InputText name="email" type="email" fluid />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                $form.email.error?.message
              }}</Message>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700" for="password">Пароль</label>
              <InputText name="password" type="password" fluid />
              <Message
                v-if="$form.password?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.password.error?.message }}</Message
              >
              <p v-else class="text-xs text-gray-400">
                Минимум 8 символов, должен содержать буквы и цифры
              </p>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700" for="confirmPassword">
                Подтверждение пароля
              </label>
              <InputText name="confirmPassword" type="password" fluid />
              <Message
                v-if="$form.confirmPassword?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.confirmPassword.error?.message }}</Message
              >
            </div>
          </div>
          <div class="mt-10">
            <Button type="submit" class="w-full" label="Зарегистрироваться" />
          </div>
        </Form>
        <div class="mt-6">
          <div class="relative flex items-center justify-center">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative bg-white px-2 text-sm text-gray-500">Или</div>
          </div>
          <p class="mt-6 text-center text-sm text-gray-600">
            Уже есть аккаунт?
            <RouterLink
              class="font-medium text-indigo-600 transition-colors duration-300 hover:text-indigo-700"
              to="/login"
              >Войти</RouterLink
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
