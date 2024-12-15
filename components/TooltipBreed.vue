<template>
  <TooltipBase
    theme="breed"
    instant-move
    :popper-class="breed.canonical"
  >
    <slot />
    <template #popper>
      <b class="name">{{ breed.name }}</b>
      <div class="biomes">
        <b
          v-for="biome in breed.biome"
          :key="biome"
          class="biome"
          :class="biome.toLowerCase()"
        >
          {{ biome }}
        </b>
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
  border: none;
  border-radius: 0px;
  box-shadow: 0;
  padding: 0.5rem;
  background-color: var(--background);
  color: var(--accent);
}

.v-popper--theme-breed .v-popper__arrow-outer {
  border-color: var(--background);
}

.v-popper--theme-breed .v-popper__arrow-inner {
  visibility: hidden;
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

.biomes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.5rem;
}

.biome {
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
  }
}

.seasonal-winter {
  --background: #318f9b;
  --accent: #ecf7f9;
}
.seasonal-spring {
  --background: #228b22;
  --accent: #ffedfd;
}
.seasonal-summer {
  --background: #217d00;
  --accent: #fae09e;
}
.seasonal-autumn {
  --background: #7a2d00;
  --accent: #ffd269;
}
.valentines-previous {
  --background: #ffffff;
  --accent: #000;
}
.valentines-unknown {
  --background: #ffffff;
  --accent: #000;
}
.halloween-previous {
  --background: #ffffff;
  --accent: #000;
}
.halloween-unknown {
  --background: #ffffff;
  --accent: #000;
}
.holidays-previous {
  --background: #ffffff;
  --accent: #000;
}
.holidays-unknown {
  --background: #ffffff;
  --accent: #000;
}
.birthday-release {
  --background: #ffffff;
  --accent: #000;
}
.gemshard-jade {
  --background: #055e48;
  --accent: #fff;
}
.gemshard-ruby {
  --background: #b22222;
  --accent: #fff;
}
.gemshard-sapphire {
  --background: #000587;
  --accent: #fff;
}
.gemshard-amethyst {
  --background: #60007a;
  --accent: #fff;
}
.gemshard-aqua {
  --background: #007791;
  --accent: #fff;
}
.gemshard-citrine {
  --background: #a67400;
  --accent: #fff;
}
.sonata-gold {
  --background: #9c5300;
  --accent: #ffe7cc;
}
.sonata-blue {
  --background: #172f99;
  --accent: #d3daf8;
}
.sonata-silver {
  --background: #616161;
  --accent: #e6e6e6;
}
.lunar-herald-indigo {
  --background: #091852;
  --accent: #a6b0d9;
}
.lunar-herald-bronze {
  --background: #522e00;
  --accent: #ffdeb3;
}
.lunar-herald-gold {
  --background: #5c3700;
  --accent: #f0c529;
}
.lunar-herald-silver {
  --background: #c0c0c0;
  --accent: #000;
}
</style>
