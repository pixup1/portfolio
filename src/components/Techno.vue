<script setup lang="ts">
import { localizedData as data } from '@/utils/locale';
import technos from '@/assets/technos-icons.json';
import { getCurrentInstance, onMounted } from 'vue';

interface Props {
  id: string;
  tooltip_left: boolean;
  tooltip_up: boolean;
}

const props = defineProps<Props>();

const language = data.technos.find((l: { id: string; }) => l.id === props.id);
const icon = technos.technos.find((t) => t.id === props.id)?.icon;

const instance = getCurrentInstance();
const uniqueId = instance ? instance.uid : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();

const positionViewport = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const bodyWidth = document.body.clientWidth;
  const bodyHeight = document.body.clientHeight;

  const tooltip = document.getElementById("tooltip-text-" + uniqueId);
  const rect = tooltip?.getBoundingClientRect();

  if (rect && tooltip) {
    if (rect.right > viewportWidth || rect.right > bodyWidth || props.tooltip_left) {
      tooltip.classList.add('left');
    } else if (rect.left < 0) {
      tooltip.classList.remove('left');
    }
    if (rect.bottom > viewportHeight || rect.bottom > bodyHeight || props.tooltip_up) {
      tooltip.classList.add('up');
    } else if (rect.top < 0) {
      tooltip.classList.remove('up');
    }
  }
}

onMounted(() => {
  const tooltip = document.getElementById('tooltip-' + uniqueId);

  if (tooltip) {
    tooltip.addEventListener('mouseover', () => { positionViewport() })
    positionViewport();
  }
})
</script>

<template>
  <div :id="'tooltip-' + uniqueId" v-if="language !== undefined && icon !== undefined" :aria-label="language.name"
    class="tooltip" style="width: 1.8rem; height: 1.8rem;">
    <!-- Icons colors are picked by varying the hue in hsl(hue, 80%, 75%) -->
    <div style="width: 100%; height: 100%" v-html="icon" />
    <div :id="'tooltip-text-' + uniqueId"
      :class="['tooltiptext', { left: props.tooltip_left }, { up: props.tooltip_up }]">
      <!-- TODO: fix overflow on the right -->
      <div style="font-weight: 700">
        {{ language.name }}
      </div>
      <div style="font-size: 1.1rem;">
        {{ language.description }}
      </div>
    </div>
    <!-- Fuck it this literally doesn't work at all i'm done i'm putting it all in the json -->
    <!-- <img :src="`/src/assets/technos/${language.id}.svg`" :alt="language.name" style="width: 1.5rem; height: 1.5rem;" /> -->
  </div>
</template>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltiptext {
  opacity: 0;
  text-align: left;
  padding: .5rem;
  width: 10rem;
  border-radius: .5rem;
  background-color: var(--bg-2);
  position: absolute;
  z-index: 1;
  top: -.3rem;
  left: calc(100% + .2rem);
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
  pointer-events: none;
  transition: opacity ease .25s;
}

@media (max-width: 900px) {
  .tooltiptext {
    width: 8rem;
    font-size: 1rem;
  }
}

.tooltiptext.left {
  left: unset;
  right: calc(100% + .2rem);
}

.tooltiptext.up {
  top: unset;
  bottom: -.3rem;
}

/* Show the tooltip text on hover */
.tooltip:hover .tooltiptext {
  opacity: 1;
  transition: opacity ease .25s;
}
</style>
