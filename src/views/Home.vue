<script setup lang="ts">
import InfoProjects from '@/components/InfoProjects.vue';
import ProjectModal from '@/components/ProjectModal.vue';
import type { Project } from '@/types/project';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import KeyboardDoubleArrowDown from '@/assets/icons/keyboard_double_arrow_down.svg';
import { t } from '@/utils/locale';

const route = useRoute();

const modal_project = ref(undefined as Project | undefined);

const activeMode = computed<'info' | '3d'>(() => {
  return route.params.mode === '3d' ? '3d' : 'info';
});
const decodedEmail = atob('bWFpbEBodmVyLm5ldA==');

onMounted(() => {
  const invactive = document.querySelector('.half-body:not(.active)');

  invactive?.classList.add('straight-up-not-there'); // This is hell

  const arrow = document.getElementById('arrow-down');
  // const title = document.getElementById('title');
  const topTitle = document.getElementById('top-title');

  window.addEventListener('scroll', () => {
    if (arrow) {
      if (window.scrollY > 85) {
        arrow.classList.add('hidden');
      } else {
        arrow.classList.remove('hidden');
      }
    }
    if (topTitle) {
      if (window.scrollY > window.innerHeight * 0.6) {
        topTitle.classList.remove('hidden');
      } else {
        topTitle.classList.add('hidden');
      }
    }
  });
});

const scrollSome = () => {
  window.scrollBy({
    top: window.innerHeight * 0.9,
    behavior: 'smooth',
  });
};

let hideHalfTimer: number | undefined;
let wipeClassTimer: number | undefined;

const waitAndRemove = () => {
  const halfStack = document.querySelector('.half-stack');
  if (halfStack) {
    halfStack.classList.add('is-wiping');
  }

  if (wipeClassTimer !== undefined) {
    window.clearTimeout(wipeClassTimer);
  }

  wipeClassTimer = window.setTimeout(() => {
    if (halfStack) {
      halfStack.classList.remove('is-wiping');
    }
  }, 600);

  document.querySelectorAll('.half-body').forEach((el) => {
    el.classList.remove('straight-up-not-there');
  });

  if (hideHalfTimer !== undefined) {
    window.clearTimeout(hideHalfTimer);
  }

  hideHalfTimer = window.setTimeout(() => {
    const hiddenHalf = document.querySelector('.half-body:not(.active)');
    if (hiddenHalf) {
      hiddenHalf.classList.add('straight-up-not-there');
    }
  }, 600);
};

onUnmounted(() => {
  if (hideHalfTimer !== undefined) {
    window.clearTimeout(hideHalfTimer);
  }
  if (wipeClassTimer !== undefined) {
    window.clearTimeout(wipeClassTimer);
  }
});
</script>

<template>
  <div
    style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
    <div class="blur-blob" style="position: absolute;" />
    <span class="flash2"
      style="position: absolute; font-size: clamp(5rem, 25vw, 20rem); line-height: 1; font-weight: 400;">
      Hector
    </span>
    <span class="flash3"
      style="position: absolute; font-size: clamp(5rem, 25vw, 20rem); line-height: 1; font-weight: 300;">
      Vernet
    </span>
    <span class="flash1"
      style="position: absolute; font-size: clamp(5rem, 25vw, 20rem); line-height: 1; font-weight: 500;">
      Portfolio
    </span>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <span class="appear-opacity" style="font-size: clamp(2.5rem, 5vw, 3rem); font-weight: 500; line-height: 1;">
        {{ t("Portfolio") }}
      </span>
      <div id="title" class="appear-weight" style="font-size: clamp(3rem, 14vw, 12rem); line-height: 1;">
        Hector Vernet
      </div>
    </div>
    <div class="appear-opacity2" style="position: absolute; bottom: 9%;" v-on:click="scrollSome">
      <KeyboardDoubleArrowDown id="arrow-down" class="icon-btn" style="height: clamp(3rem, 7vw, 10rem);" />
    </div>
  </div>
  <div id="top-title" class="hidden top-title">
    Hector Vernet
  </div>
  <div class="body-pad">
    <h1> {{ t("À propos") }} </h1>
    {{ t("Email :") }} <a class="link" :href="`mailto:${decodedEmail}`">{{ decodedEmail }}</a><br>
    {{ t("Github :") }} <a class="link" href="https://github.com/pixup1">pixup1</a><br>
    {{ t("Instagram :") }} <a class="link" href="https://instagram.com/hctvrn">hctvrn</a><br>
    {{ t("LinkedIn :") }} <a class="link" href="https://www.linkedin.com/in/hector-vernet-589a3b251/">Hector Vernet</a>
  </div>
  <div style="text-align: center; display: flex; justify-content: space-evenly; margin-top: 2rem;">
    <router-link to="/info" :class="['switch-text left', { active: activeMode === 'info' }]" v-on:click="waitAndRemove">
      {{ t("Info") }}
    </router-link>
    <router-link to="/3d" :class="['switch-text right', { active: activeMode === '3d' }]" v-on:click="waitAndRemove">
      {{ t("3D") }}
    </router-link>
  </div>
  <h1 class="body-pad"> {{ t("Projets") }} </h1>
  <div class="half-stack">
    <div :class="['body-pad half-body left', { active: activeMode === 'info' }]">
      <info-projects @open-project="(it: Project) => { modal_project = it }" />
    </div>
    <div :class="['body-pad half-body right', { active: activeMode === '3d' }]">
      <!-- TODO: fjx this popping out instantly instead of fading to the rigt-->
      <div
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh; text-align: center;">
        Soon&trade;
      </div>
      <h1> {{ t("Modèles 3D") }} </h1>
      <p>
        {{ t("Des modèles 3D issus de mes projets sont en vente sur") }}
        <a class="link" href="https://www.turbosquid.com/Search/Artists/hctvrn">Turbosquid</a>
        {{ t("et") }}
        <a class="link" href="https://www.cgtrader.com/designers/hctvrn">cgtrader</a>.
      </p>
    </div>
  </div>
  <project-modal :p="modal_project" v-if="modal_project !== undefined" @close="modal_project = undefined" />
</template>

<style scoped>
.top-title {
  position: fixed;
  top: 0;
  width: 100vw;
  padding: 0.5rem;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  transition: opacity 0.5s ease;
  background-image: linear-gradient(in oklch, oklch(0.18 0.03 250 / 0.8), oklch(0.12 0.02 250 / 0.3), oklch(0.10 0.01 250 / 0));
  z-index: 10;
  pointer-events: none;
  box-sizing: border-box;
}

.appear-weight {
  opacity: 0;
  animation: appear-weight 3s ease-out 1.5s forwards, fadein 1s ease 1.5s forwards, flex-width 6s ease-in-out infinite 4.5s alternate;
}

/* .hidden[id="title"] {
  animation: appear-weight 3s ease-out 1.5s forwards, flex-width 6s ease-in-out infinite 4.5s alternate;
} */

@keyframes appear-weight {
  0% {
    font-weight: 100;
    transform: translateY(40px);
  }

  100% {
    font-weight: 850;
    transform: translateY(0);
  }
}

@keyframes flex-width {
  0% {
    transform: scale(1, 1);
  }

  100% {
    transform: scale(1.035, 1);
  }
}

.appear-opacity {
  opacity: 0;
  animation: fadein 1.5s ease-in-out .6s forwards;
}

.appear-opacity2 {
  display: inline-block;
  opacity: 0;
  animation: fadein 1s ease-in-out 5s forwards, shift-up 1s ease-in-out 5s forwards, twitch 5s ease-in-out 8s infinite;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes shift-up {
  0% {
    transform: translateY(40px);
  }

  100% {
    transform: translateY(0);
  }
}

.flash1 {
  opacity: 0;
  animation: flash 0.3s ease-in-out;
}

.flash2 {
  opacity: 0;
  animation: flash 0.3s ease-in-out 0.25s;
}

.flash3 {
  opacity: 0;
  animation: flash 0.3s ease-in-out 0.5s;
}

@keyframes flash {
  0% {
    opacity: 0;
    transform: scale(1, 1);
  }

  40% {
    /* opacity: 1; */
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: scale(1.05, 1);
  }
}

@keyframes twitch {
  0% {
    transform: translate(0, 0);
  }

  5% {
    transform: translate(0px, 5px);
  }

  10% {
    transform: translate(0px, 0px);
  }

  15% {
    transform: translate(0px, 5px);
  }

  20% {
    transform: translate(0px, 0px);
  }

  100% {
    transform: translate(0, 0);
  }
}

.blur-blob {
  --blob-h: 320deg;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background:
    /* TODO: Deal with banding */
    radial-gradient(ellipse at center, rgba(7, 163, 134, 0.327), transparent 70%);
  animation: rgblob 25s linear infinite, blob-appear 2.5s ease-out 1.7s forwards, blob-oscillate 3.5s ease-in-out 4.2s infinite alternate;
}

@keyframes rgblob {
  from {
    filter: hue-rotate(0deg);
  }

  to {
    filter: hue-rotate(360deg);
  }
}

@keyframes blob-appear {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

@keyframes blob-oscillate {
  from {
    transform: scale(1, 1);
  }

  to {
    transform: scale(.9, .9);
  }
}

.switch-text {
  font-size: clamp(3rem, 4vw, 5rem);
  font-weight: 700;
  cursor: pointer;
  transition: filter 250ms ease;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.switch-text:hover {
  /* color: var(--text); */
  filter: brightness(150%);
  transition: filter 250ms ease;
}

.switch-text.left {
  background-image: linear-gradient(90deg in oklch,
      var(--disabled) 33.333%,
      hsl(90, 70%, 77%) 66.666%,
      hsl(180, 70%, 77%) 100%);
  background-size: 300% 100%;
  background-position: 0% 0%;
  transition: background-position .3s ease-in-out, filter 250ms ease;
}

.switch-text.left.active {
  /* color: var(--text); */
  background-position: 100% 0%;
  transition: background-position .3s ease-in-out, filter 250ms ease;
}

.switch-text.right {
  background-image: linear-gradient(90deg in oklch,
      hsl(270, 70%, 77%) 0%,
      hsl(0, 70%, 77%) 33.333%,
      var(--disabled) 66.666%);
  background-size: 300% 100%;
  background-position: 100% 0%;
  transition: background-position .3s ease-in-out, filter 250ms ease;
}

.switch-text.right.active {
  /* color: var(--text); */
  background-position: 0% 0%;
  transition: background-position .3s ease-in-out, filter 250ms ease;
}

.half-stack {
  position: relative;
}

.half-body {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.half-body.active {
  -webkit-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  position: static;
  pointer-events: auto;
}

.half-stack.is-wiping .half-body.left {
  mask-image: linear-gradient(90deg in oklch,
      white 33.333%,
      transparent 66.666%);
  mask-size: 300% 100%;
  mask-position: 100% 0%;
  mask-repeat: no-repeat;
  transition: mask-position .6s ease-in-out, filter 250ms ease;
}

.half-stack.is-wiping .half-body.left.active {
  /* color: var(--text); */
  mask-position: 0% 0%;
  transition: mask-position .6s ease-in-out, filter 250ms ease;
}

.half-stack.is-wiping .half-body.right {
  mask-image: linear-gradient(90deg in oklch,
      transparent 33.333%,
      white 66.666%);
  mask-size: 300% 100%;
  mask-position: 0% 0%;
  mask-repeat: no-repeat;
  transition: mask-position .6s ease-in-out, filter 250ms ease;
}

.half-stack.is-wiping .half-body.right.active {
  /* color: var(--text); */
  mask-position: 100% 0%;
  transition: mask-position .6s ease-in-out, filter 250ms ease;
}
</style>
