<script setup lang="ts">
import { t } from '@/utils/locale';
</script>

<template>
  <div
    style="display: flex; flex-direction: row; justify-content: space-evenly; align-items: center; padding: 2rem 1rem; border-top: .2rem solid var(--disabled); margin-top: 3rem; background-color: var(--bg-2);">
    <div style="text-align: center;">
      @2026 Hector Vernet <br> <!-- TODO: build year -->
      <a class="link" href="https://github.com/pixup1/portfolio/blob/main/LICENSE.md">{{ t("License MIT") }}</a>
    </div>
    <div style="text-align: center;">
      {{ t("Fait avec Vue") }} <br>
      <a class="link" href="https://github.com/pixup1/portfolio"> {{ t("Sources") }} </a>
    </div>
  </div>
</template>
