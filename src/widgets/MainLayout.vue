<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/entities/auth'
import { ref } from 'vue'
import { Badge, Button, Menu } from 'primevue'

const authStore = useAuthStore()
const menu = ref()

const toggleMenu = (event: Event) => {
  menu.value?.toggle(event)
}
</script>

<template>
  <div class="grid min-h-screen w-full grid-rows-[auto_1fr] bg-gray-50">
    <header class="my-4">
      <div
        class="container mx-auto flex min-h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <RouterLink
          to="/"
          class="text-3xl font-black text-indigo-600 transition-colors duration-300 hover:text-indigo-700"
        >
          Theng
        </RouterLink>
        <div class="flex items-center gap-4">
          <template v-if="authStore.isLoggedIn">
            <div class="relative flex justify-center">
              <span class="font-medium text-indigo-800">
                {{ authStore.user?.name || authStore.user?.email.split('@')[0] }}
              </span>
            </div>
            <Badge v-if="authStore.user?.proficiencyLevel" :value="authStore.user.proficiencyLevel" />
            <div class="card flex justify-center">
              <Button icon="pi pi-ellipsis-v" variant="text" size="small" @click="toggleMenu" />
              <Menu
                ref="menu"
                :model="[{ label: 'Выйти', command: authStore.logout }]"
                :popup="true"
              />
            </div>
          </template>
          <template v-else>
            <Button asChild v-slot="slotProps" variant="text" size="small">
              <RouterLink :class="slotProps.class" to="/login">Войти</RouterLink>
            </Button>

            <Button asChild v-slot="slotProps" size="small">
              <RouterLink :class="slotProps.class" to="/register">Регистрация</RouterLink>
            </Button>
          </template>
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>
