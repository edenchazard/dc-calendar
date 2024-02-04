<template>
  <div class="forecast-table">
    <div
      v-for="date in forecast"
      class="forecast-cell"
      :key="date.date.toSeconds()"
    >
      <b class="year">{{ date.date.toFormat('y') }}</b>
      <b class="day">{{ date.date.toFormat('d') }}</b>
      <b class="month">{{ date.date.toFormat('MMM') }}</b>
      <div class="breeds-available">
        <template
          v-for="breed in date.continuing"
          :key="`${date.date.toSeconds()}-${breed.name}`"
        >
          <div
            class="breed"
            :style="{
              '--background-colour': `rgb(${breed.backgroundColour})`,
              '--accent-colour': `rgb(${breed.accentColour})`,
            }"
          >
            <div class="egg-container">
              <div class="egg-wrapper">
                <div class="tooltip">
                  <b class="name">{{ breed.name }}</b>
                  <b class="biome">
                    {{
                      Array.isArray(breed.biome)
                        ? breed.biome.join(', ')
                        : breed.biome
                    }}
                  </b>
                </div>
                <img
                  :alt="breed.name"
                  :src="breed.image"
                  class="egg"
                />
                <span
                  class="badge"
                  v-if="breed.probability"
                >
                  {{ breed.probability * 100 }}%
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
            />
            {{ breed.begin?.toFormat('HH:mm:ss') }}
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
            />
            {{ breed?.end?.toFormat('HH:mm:ss') }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
</script>

<style scoped>
#forecast {
  text-align: center;
  width: 100%;
}

.forecast-table {
  margin: auto;
  display: inline-grid;
  justify-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 10rem);
  gap: 1rem;
  width: 100%;
  max-width: 70rem;
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
  font-size: 3rem;
  background: #7f466f;
  text-align: center;
}

.forecast-cell .month {
  font-size: 1.5rem;
  display: block;
  text-transform: uppercase;
  text-align: center;
}

.breeds-available {
  position: relative;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6%;
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
.breeds-available .egg-container .egg-wrapper .badge {
  display: block;
  z-index: 10;
}
.badge {
  font-size: 0.7rem;
  width: 2rem;
  height: 1rem;
  color: #fff;
}
.breeds-available .egg-container:hover .egg-wrapper {
  transform: translateY(-100%);
}

.breeds-available .egg-container:hover .tooltip {
  display: block;
}
.breeds-available .egg-container .tooltip {
  background: var(--background-colour);
  color: var(--accent-colour);
  display: none;
  padding: 0.25rem;
  border-radius: 0.25rem 0.25rem 0 0;
  width: 6rem;
  left: -2rem;
  bottom: 130%;
  position: absolute;
}

.breeds-available .breed .tooltip .biome {
  display: block;
}

.breed-tile .name {
  font-weight: bold;
  flex: 1;
}

.breed-tile .biome {
  font-size: 0.8rem;
}

.incoming-outgoing .block {
  display: block;
  font-size: 0.8rem;
  background: #5f214d;
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
.incoming-outgoing {
  margin-top: 1rem;
}
</style>
