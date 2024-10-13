<template>
  <template v-if="hoveredBreed">
    <div
      class="tooltip"
      ref="tooltip"
      :style="{
        ...floatingStyles,
        '--background-colour': hoveredBreed.backgroundColour,
        '--accent-colour': hoveredBreed.accentColour,
      }"
    >
      <b class="name">{{ hoveredBreed.name }}</b>

      <div class="biomes">
        <b
          :key="biome"
          class="biome"
          :class="biome.toLowerCase()"
          v-for="biome in Array.isArray(hoveredBreed.biome)
            ? hoveredBreed.biome
            : [hoveredBreed.biome]"
        >
          {{ biome }}
        </b>
      </div>
    </div>
  </template>
  <div class="forecast-table">
    <div
      v-for="date in forecast"
      class="forecast-cell"
      :key="date.date.toSeconds()"
    >
      <b class="year">{{
        date.date.toLocaleString({ year: 'numeric', month: 'long' })
      }}</b>
      <b class="day">{{
        date.date.toLocaleString({ weekday: 'short', day: '2-digit' })
      }}</b>
      <div class="breeds-available">
        <template
          v-for="breed in date.continuing"
          :key="`${date.date.toSeconds()}-${breed.name}`"
        >
          <div
            class="breed"
            @mouseenter="openTooltip(breed, $event)"
            @mouseleave="closeTooltip"
          >
            <div class="egg-container">
              <div class="egg-wrapper">
                <img
                  :alt="breed.name"
                  :src="breed.image"
                  class="egg"
                />
                <span
                  class="badge"
                  v-if="breed.probability"
                >
                  {{
                    Intl.NumberFormat(language, { style: 'percent' }).format(
                      breed.probability,
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div
        v-if="date.appearing.length > 0"
        class="incoming-outgoing"
      >
        <span class="block">Appearing</span>
        <ul
          v-for="breed in date.appearing"
          :key="`${date.date.toSeconds()}-${breed.name}`"
        >
          <li>
            <img
              :alt="breed.name"
              :src="breed.image"
              @mouseenter="openTooltip(breed, $event)"
              @mouseleave="closeTooltip"
            />
            {{ breed.begin?.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
          </li>
        </ul>
      </div>

      <div
        v-if="date.leaving.length > 0"
        class="incoming-outgoing"
      >
        <span class="block">Leaving</span>
        <ul
          v-for="breed in date.leaving"
          :key="`${date.date.toSeconds()}-${breed.name}`"
        >
          <li>
            <img
              :alt="breed.name"
              :src="breed.image"
              @mouseenter="openTooltip(breed, $event)"
              @mouseleave="closeTooltip"
            />
            {{ breed?.end?.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFloating, autoUpdate, flip, offset } from '@floating-ui/vue';
import { DateTime } from 'luxon';
import { getBreedsLocal } from '@/utils/breeds';

const props = defineProps({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
  },
});

const language = navigator.language;
const hoveredBreed = ref();
const hoveredEgg = ref<HTMLElement>();
const tooltip = ref<HTMLElement>();

const forecast = computed(() => {
  const breeds = getBreedsLocal();
  const dateBegin = DateTime.fromISO(props.from);
  const dateEnd = DateTime.fromISO(props.to);
  const dayForecast = [];
  let curDate = dateBegin;

  while (curDate < dateEnd) {
    const results = breeds.map((breed) => {
      const result = breed(curDate);
      const range = {
        appearing: null,
        leaving: null,
        begin: null,
        end: null,
      };

      if (result.begin) {
        Object.assign(range, {
          appearing: curDate.toISODate() === result.begin.toISODate(),
          begin: result.begin.setZone(props.timezone),
        });
      }

      if (result.end) {
        const end = result.end.setZone(props.timezone);

        Object.assign(range, {
          leaving: curDate.toISODate() === end.toISODate(),
          end: result.end.setZone(props.timezone),
        });
      }

      return {
        ...result,
        ...range,
      };
    });

    dayForecast.push({
      date: curDate,
      continuing: results.filter(
        (breed) => !breed.appearing && !breed.leaving && breed.availability,
      ),
      leaving: results.filter((breed) => breed.leaving),
      appearing: results.filter((breed) => breed.appearing),
    });

    curDate = curDate.plus({ day: 1 });
  }
  return dayForecast;
});

const { floatingStyles } = useFloating(hoveredEgg, tooltip, {
  whileElementsMounted: autoUpdate,
  transform: true,
  placement: 'top',
  strategy: 'fixed',
  middleware: [
    offset(({ placement }) => {
      if (placement.startsWith('bottom')) {
        return 20;
      }
      if (hoveredBreed.value.appearing || hoveredBreed.value.leaving) {
        return 10;
      }
      return 60;
    }),
    flip({
      fallbackPlacements: [
        'top-end',
        'top-start',
        'bottom',
        'bottom-start',
        'bottom-end',
      ],
    }),
  ],
});

function openTooltip(breed, e: Event) {
  if (e.target instanceof HTMLElement) {
    hoveredBreed.value = breed;
    hoveredEgg.value = (e.target.querySelector('.egg') ??
      e.target) as HTMLElement;
  }
}

function closeTooltip() {
  hoveredBreed.value = null;
  hoveredEgg.value = undefined;
}
</script>

<style scoped lang="postcss">
.forecast-table {
  margin: auto;
  display: inline-grid;
  justify-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 11rem);
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
}
.forecast-cell {
  width: 100%;
}
.forecast-cell .year {
  font-size: 0.7rem;
}
.forecast-cell .day {
  display: block;
  font-size: 1.5rem;
  border-radius: 0.4rem;
  background: #7f466f;
  text-align: center;
}

.breeds-available {
  position: relative;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6%;
  margin-top: 1rem;
}

.breeds-available .breed:nth-child(1n + 1) {
  position: relative;
}

.breeds-available .egg-container {
  height: 3rem;
  position: relative;
  width: 2rem;
}
.breeds-available .egg-container .egg-wrapper {
  transition: transform 0.2s;
  position: absolute;
}

.breeds-available .egg-container:hover .egg-wrapper {
  transform: translateY(-100%);
}

.badge {
  font-size: 0.7rem;
  width: 2rem;
  height: 1rem;
  color: #fff;
  display: block;
  z-index: 10;
}

.tooltip {
  background-color: var(--background-colour);
  color: var(--accent-colour);
  box-shadow: 0px 0px 7px 0px #000;
  padding: 0.25rem;
  border-radius: 0.25rem;
  width: 12rem;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 10;

  & .biomes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  & .biome {
    display: inline-block;
    border-radius: 5px;
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

.breed-tile .name {
  font-weight: bold;
  flex: 1;
}

.incoming-outgoing .block {
  display: block;
  font-size: 0.8rem;
  background: #5f214d;
}

.incoming-outgoing {
  margin-top: 1rem;
}

.incoming-outgoing ul {
  margin: 0;
  padding: 0;
}

.incoming-outgoing li {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  justify-content: space-between;
  margin-top: 0.25rem;
}
</style>
