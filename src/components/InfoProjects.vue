<script setup lang="ts">
import data from '@/assets/data-fr.json';
import { type Project } from '@/types/project';
import Techno from './Techno.vue';

const projects = data['it_projects'] as Project[];
</script>

<template>
  <div class="grid-4">
    <div v-for="p in projects" :key="p.name" class="card" style="cursor: pointer;" @click="$emit('open-project', p)">
      <div style="display: flex; flex-direction: row; gap: .4rem; justify-content: space-between;">
        <div style="font-weight: 850; font-size: 1.5rem; flex: 1 1 0;">{{ p.name }}</div>
        <div style="color: var(--disabled); margin: .2rem; text-align: right;">
          <div v-if="p.year_start && p.year_end && p.year_start !== p.year_end">
            {{ p.year_start }} - {{ p.year_end }}
          </div>
          <div v-else-if="p.year_start && p.year_end && p.year_start === p.year_end">
            {{ p.year_start }}
          </div>
        </div>
      </div>
      <div style="margin-bottom: .4rem;">{{ p.description }}</div>
      <div
        style="margin-top: auto; display: flex; flex-direction: row; flex-wrap: wrap; gap: .4rem; justify-content: end;">
        <div v-for="techno in p.technologies" :key="techno" style="height: 1.8rem;">
          <!-- TODO: sort by color uwu -->
          <Techno :id="techno" :tooltip_left="false" :tooltip_up="false" />
        </div>
      </div>
    </div>
  </div>
</template>
