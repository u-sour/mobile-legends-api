<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import StickyFooter from './components/StickyFooter.vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <div class="light-theme" :class="{ 'dark-theme': isDark }">
    <NavBar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="route" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </RouterView>
    </main>
    <StickyFooter />
  </div>
</template>

<style scoped>
main {
  min-height: calc(100vh - 91.59px - 72px);
  padding: 3rem 0;
}
.light-theme {
  background-color: var(--bg-color-light);
  color: var(--text-color-light);
}
.dark-theme {
  background-color: var(--bg-color-dark);
  color: var(--text-color-dark);
}

.route-enter-from {
  opacity: 0;
  transform: translateX(7rem);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-7rem);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
