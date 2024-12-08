<template>
  <div class="forecast-table">
    <template
      v-for="date in forecast"
      :key="date.date.toSeconds()"
    >
      <h3
        v-if="date.firstOfTheMonth"
        class="month-header"
      >
        {{ date.date.toLocaleString({ month: 'long', year: 'numeric' }) }}
      </h3>
      <div class="row">
        <div class="row-section">
          <span class="date label">
            {{
              date.date.toLocaleString({
                day: 'numeric',
                weekday: 'short',
              })
            }}</span
          >
          <div class="breeds-available">
            <div
              v-for="breed in date.continuing"
              :key="`${date.date.toSeconds()}-${breed.name}`"
              class="breed"
            >
              <TooltipBreed :breed="breed">
                <img
                  :alt="breed.name"
                  :src="breed.image"
                  class="egg"
                />
                <span
                  v-if="breed.probability"
                  class="badge"
                >
                  {{
                    Intl.NumberFormat(language, { style: 'percent' }).format(
                      breed.probability,
                    )
                  }}
                </span>
              </TooltipBreed>
            </div>
          </div>
        </div>

        <div
          v-if="date.appearing.length > 0"
          class="row-section"
        >
          <span class="label">Appearing</span>
          <div class="incoming-outgoing">
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
        </div>

        <div
          v-if="date.leaving.length > 0"
          class="row-section"
        >
          <span class="label">Leaving</span>
          <div class="incoming-outgoing">
            <ul
              v-for="breed in date.leaving"
              :key="`${date.date.toSeconds()}-${breed.name}`"
            >
              <li>
                <img
                  :alt="breed.name"
                  :src="breed.image"
                />
                {{ breed.end?.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
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
    required: true,
  },
});

const language = navigator.language;

const forecast = computed(() => {
  const monthHeaders = new Set();

  const breeds = getBreedsLocal();
  const dateBegin = DateTime.fromISO(props.from);
  const dateEnd = DateTime.fromISO(props.to);
  const dayForecast = [];
  let curDate = dateBegin;

  while (curDate < dateEnd) {
    const monthYear = curDate.toFormat('MMMM-yyyy');

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
      firstOfTheMonth: !monthHeaders.has(monthYear),
      date: curDate,
      continuing: results.filter(
        (breed) => !breed.appearing && !breed.leaving && breed.availability,
      ),
      leaving: results.filter((breed) => breed.leaving),
      appearing: results.filter((breed) => breed.appearing),
    });

    monthHeaders.add(monthYear);

    curDate = curDate.plus({ day: 1 });
  }
  return dayForecast;
});
</script>

<style scoped lang="postcss">
.forecast-table {
  display: grid;
  gap: 2rem;
  max-width: 100%;
  overflow-x: auto;
  padding-top: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(27rem, 1fr));
}

.row {
  position: relative;
  display: flex;
  border: 1px solid hsl(317, 29%, 20%);
  gap: 1rem;
}

.row-section {
  position: relative;
  padding: 1rem 0.5rem 1rem 0.5rem;
}

.label {
  background: hsl(317, 29%, 20%);
  font-size: 0.7rem;
  position: absolute;
  left: 0;
  letter-spacing: 0.1rem;
  top: -1.25rem;
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
}

.month-header {
  font-weight: bold;
  grid-column: 1 / -1;
  text-align: left;
  padding: 0;
  margin: 0;
}

.date {
  left: -1px;
  font-weight: bold;
}

.breeds-available {
  position: relative;
  min-height: 3rem;
  display: flex;
}

.badge {
  font-size: 0.7rem;
  width: 2rem;
  height: 1rem;
  color: #fff;
  display: block;
  z-index: 10;
}

.incoming-outgoing {
  position: relative;
  margin-right: 1rem;
}

.incoming-outgoing ul {
  margin: 0;
  padding: 0;
}

.incoming-outgoing li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  font-size: 0.8rem;
}
</style>
