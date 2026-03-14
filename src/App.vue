<script setup lang="ts">
</script>

<template>
  <div class="min-full-height">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <component :is="Component" />
      </template>
    </RouterView>
  </div>
</template>

<style scoped>
.min-full-height {
  min-height: 100vh;
}
</style>
