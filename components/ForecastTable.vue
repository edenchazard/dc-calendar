<template>
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
          <div class="breed">
            <TooltipBreed :hoveredBreed="breed">
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
            </TooltipBreed>
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
            />
            {{ breed?.end?.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { getBreedsLocal } from '@/utils/breeds';
import TooltipBreed from '@/components/TooltipBreed.vue';

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

.badge {
  font-size: 0.7rem;
  width: 2rem;
  height: 1rem;
  color: #fff;
  display: block;
  z-index: 10;
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
