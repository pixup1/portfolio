<script setup lang="ts">
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-full-height">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense timeout="0">
          <component :is="Component" />
          <template #fallback>
            <div
              style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
              Chargement...
            </div>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
  <Footer />
</template>

<style scoped>
.min-full-height {
  min-height: 100vh;
}
</style>
