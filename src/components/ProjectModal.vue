<script setup lang="ts">
import type { Project } from '@/types/project';
import Techno from './Techno.vue';
import { onMounted, onUnmounted } from 'vue';
import Close from '@/assets/icons/close.svg';

interface Props {
  p: Project;
}

defineProps<Props>();

// Prevent scrolling when the modal is open
onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

const emit = defineEmits(['close']);

const close = () => {
  window.setTimeout(() => {
    emit('close');
  }, 250);

  document.body.style.overflow = '';

  const overlay = document.querySelector('.dark-overlay');
  const popup = document.querySelector('.popup');

  overlay?.classList.add('closing');
  popup?.classList.add('closing');
}
</script>


<template>
  <div class="dark-overlay" @click="close()" />
  <div class="card popup">
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <div>
          <div style="font-weight: 850; font-size: 1.5rem; flex: 1 1 0;">{{ p.name }}</div>
          <div style="color: var(--disabled);">
            <div v-if="p.year_start && p.year_end && p.year_start !== p.year_end">
              {{ p.year_start }} - {{ p.year_end }}
            </div>
            <div v-else-if="p.year_start && p.year_end && p.year_start === p.year_end">
              {{ p.year_start }}
            </div>
          </div>
        </div>
        <Close class="icon-btn" @click="close()"></Close>
      </div>
      <a v-if="p.link" class="link" style="width: fit-content" :href="p.link">{{ p.link }}</a>
      <div>{{ p.long_description }}</div>
      <div
        style="margin-top: auto; display: flex; flex-direction: row; flex-wrap: wrap; gap: .4rem; justify-content: end;">
        <div v-for="techno in p.technologies" :key="techno" style="height: 1.8rem;"> <!-- TODO: sort by color uwu -->
          <Techno :id="techno" :tooltip_left="true" :tooltip_up="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  animation: fadeIn 0.25s ease forwards;
}

.dark-overlay.closing {
  animation: fadeOut 0.25s ease forwards !important;
  pointer-events: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.popup {
  animation: fadeIn 0.25s ease, popup 0.25s ease forwards;
  max-height: calc(100% - 10.4rem);
  width: 50vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  overflow-y: scroll;
  overflow-x: clip;
}

@media (max-width: 768px) {
  .popup {
    width: 80vw;
  }
}

.popup.closing {
  animation: fadeOut 0.25s ease forwards, popupReverse 0.25s ease forwards !important;
}

@keyframes popup {
  from {
    transform: translate(-50%, -50%) scale(0.9);
  }

  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes popupReverse {
  from {
    transform: translate(-50%, -50%) scale(1);
  }

  to {
    transform: translate(-50%, -50%) scale(0.9);
  }
}
</style>
