<template>
  <TooltipBase
    theme="breed"
    instant-move
  >
    <slot />
    <template #popper>
      <div
        class="tooltip-breed"
        :style="{
          'background-color': breed.backgroundColour,
          color: `rgb(${breed.accentColour})`,
        }"
      >
        <b class="name">{{ breed.name }}</b>
        <div
          v-if="breed.biome"
          class="biomes"
        >
          <b
            v-for="biome in Array.isArray(breed.biome)
              ? breed.biome
              : [breed.biome]"
            :key="biome"
            class="biome"
            :class="biome.toLowerCase()"
          >
            {{ biome }}
          </b>
        </div>
      </div>
    </template>
  </TooltipBase>
</template>

<script lang="ts" setup>
import type { Breed } from '@/types/types';

defineProps<{
  breed: Breed;
}>();
</script>

<style lang="postcss">
.v-popper--theme-breed .v-popper__inner {
  width: 12rem;
  border: 1px transparent;
  border-radius: 0px;
  box-shadow: 0;
  padding: 0;
}

.v-popper--theme-breed .v-popper__arrow-inner {
  visibility: visible;
}

/* Transition */
.v-popper--theme-breed.v-popper__popper--hidden {
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.15s,
    visibility 0.15s;
}

.v-popper--theme-breed.v-popper__popper--shown {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

.v-popper--theme-breed.v-popper__popper--skip-transition {
  transition: none !important;
}

.tooltip-breed {
  padding: 0.5rem;

  & .biomes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 0.5rem;
  }

  & .biome {
    display: inline-block;
    padding: 0 0.4rem;
    font-size: 0.8rem !important;
    color: #000;

    &.alpine {
      background: #e5b39b;
    }
    &.forest {
      background: #d4e4df;
    }
    &.desert {
      background: #e6debe;
    }
    &.volcano {
      background: #b890ca;
    }
    &.jungle {
      background: #bfc4bc;
    }
    &.coast {
      background: #a2aabe;
    }
    &.holiday {
      background: #000;
      color: #fff;
    }
    &.all {
      background: #fff;
      color: #000;
    }
  }
}
</style>
