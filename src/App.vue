<template>
  <header
    id="top"
    class="max-content"
  >
    <h1>Dragcave Calendar</h1>
    <label for="timezone">Timezone</label>
    <select
      v-model="timezone"
      id="timezone"
    >
      <option
        v-for="timezone in timezones"
        :key="timezone.toString()"
        :value="timezone"
      >
        {{ timezone }}
      </option>
    </select>
  </header>

  <main class="max-content">
    <section class="section">
      <p>
        All times are
        <strong class="bold">local to your selected timezone</strong> and shown
        in 24 hour format, unless otherwise stated.
      </p>
      <p><strong class="bold">This tool is experimental.</strong></p>
    </section>
    <section
      id="currently"
      class="section"
    >
      <div id="info">
        <div
          id="now"
          :key="intervalKey"
        >
          <span class="time">Local time</span>
          <span>
            {{
              localIntlTime.toLocaleString({
                dateStyle: 'medium',
                timeStyle: 'medium',
              })
            }}
          </span>
          <span class="time">DC time</span>
          <span>{{
            dcIntlTime.toLocaleString({
              dateStyle: 'medium',
              timeStyle: 'medium',
            })
          }}</span>
        </div>
        <div id="extended-info-container">
          <h2>Right now...</h2>
          <div id="extended-info">
            <FontAwesomeIcon :icon="`fa-solid fa-${extended.seasonIcon}`" />
            <p>
              {{
                extended.season.name.slice(0, 1).toUpperCase() +
                extended.season.name.slice(1)
              }}
              {{ extended.season.begin.toLocaleString() }} &mdash;
              {{ extended.season.end.toLocaleString() }}
            </p>

            <FontAwesomeIcon icon="fa-solid fa-clock" />
            <p>
              Dragcave is in
              <abbr :title="dcIntlTime.offsetNameLong ?? ''">{{
                dcIntlTime.toFormat('ZZZZ')
              }}</abbr
              >,
              {{ extended.offsetWording }}
            </p>

            <FontAwesomeIcon icon="fa-solid fa-skull" />
            <p>
              {{
                extended.zombies
                  ? `Zombies are active (Inactive at ${dcIntlTime.plus({ days: 1 }).set({ hour: 5, minute: 59, second: 59 }).setZone(timezone).toLocaleString(DateTime.TIME_24_WITH_SECONDS)})`
                  : `Zombies are inactive (Returning at ${dcIntlTime.plus({ days: 1 }).startOf('day').setZone(timezone).toLocaleString(DateTime.TIME_24_WITH_SECONDS)})`
              }}
            </p>

            <FontAwesomeIcon icon="fa-solid fa-gem" />
            <p>
              Gemshards switch at
              {{
                dcIntlTime
                  .startOf('day')
                  .plus({ days: 1 })
                  .setZone(timezone)
                  .toLocaleString(DateTime.TIME_24_WITH_SECONDS)
              }}
            </p>

            <FontAwesomeIcon icon="fa-solid fa-moon" />
            <div>
              <p>
                Moon phases will occur at
                {{
                  dcIntlTime
                    .startOf('day')
                    .set({ hour: 20 })
                    .setZone(timezone)
                    .toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}.
              </p>
              <p>
                <b>Sonatas</b> and <b>Lunar Heralds</b> will change at this
                time.
              </p>
            </div>

            <img
              :src="extended.moonbeam.image"
              alt=""
            />
            <p>
              <b>Sunbeam</b> and <b>Moonglow drakes</b> caught or bred now will
              hatch into <b>{{ extended.moonbeam.type }} drakes</b> (until
              {{
                extended.moonbeam.until.toLocaleString(
                  DateTime.TIME_24_WITH_SECONDS,
                )
              }})
            </p>

            <img
              :src="extended.fireGem.image"
              alt=""
            />
            <p>{{ extended.fireGem.name }} Fire Gems are dropping.</p>
          </div>
        </div>
      </div>
    </section>

    <div class="section center">
      <h2>Forecast</h2>
      <form
        @submit.prevent
        id="period"
        class="subsection"
      >
        <div id="period-wrapper">
          <span>
            <label for="from">From</label>
          </span>
          <input
            type="date"
            id="from"
            name="from"
            v-model="from"
          />
          <span>
            <label for="to">To</label>
          </span>
          <input
            type="date"
            id="to"
            name="to"
            v-model="end"
          />
        </div>
      </form>

      <section
        id="forecast"
        class="subsection"
      >
        <p>
          Between {{ localDateTime.begin.toFormat('MMM d HH:mm:ss') }} and
          {{ localDateTime.end.toFormat('MMM d HH:mm:ss') }}, the following
          breeds will be available.
        </p>

        <p class="italic">
          (This period corresponds to
          {{ dcDateTime.begin.toFormat('MMM d HH:mm:ss') }} to
          {{ dcDateTime.end.toFormat('MMM d HH:mm:ss') }} on DragCave)
        </p>

        <div id="forecast-table">
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
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DateTime } from 'luxon';
import { determineSeason } from './utils/utils';
import { getBreedsLocal } from './utils/breeds';

const timezones = Intl.supportedValuesOf('timeZone');
let interval: ReturnType<typeof setInterval>;
const intervalKey = ref(DateTime.local().toSeconds());

const from = ref(DateTime.now().toISODate());
const end = ref(DateTime.now().plus({ days: 7 }).toISODate());

const timezone = useLocalStorage(
  'timezone',
  Intl.DateTimeFormat().resolvedOptions().timeZone,
);

const localIntlTime = computed(() =>
  DateTime.fromSeconds(intervalKey.value).setZone(timezone.value),
);

const dcIntlTime = computed(() => DateTime.fromSeconds(intervalKey.value));

const forecast = computed(() => {
  const breeds = getBreedsLocal();
  const dateBegin = DateTime.fromISO(from.value);
  const dateEnd = DateTime.fromISO(end.value);
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
          begin: result.begin.setZone(timezone.value),
        });
      }

      if (result.end) {
        const end = result.end.setZone(timezone.value);

        Object.assign(range, {
          leaving: curDate.toISODate() === end.toISODate(),
          end: result.end.setZone(timezone.value),
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

const localDateTime = computed(() => ({
  begin: DateTime.fromISO(from.value).setZone(timezone.value),
  end: DateTime.fromISO(end.value).setZone(timezone.value),
}));

const dcDateTime = computed(() => ({
  begin: localDateTime.value.begin.setZone('America/New_York'),
  end: localDateTime.value.end.setZone('America/New_York'),
}));

const extended = computed(() => ({
  season: determineSeason(dcIntlTime.value),
  seasonIcon: (() => {
    switch (determineSeason(dcIntlTime.value).name) {
      case 'autumn':
        return 'canadian-maple-leaf';
      case 'spring':
        return 'leaf';
      case 'summer':
        return 'sun';
    }
    return 'snowflake';
  })(),
  timezone: dcIntlTime.value.toFormat('ZZZZ'),
  offset: (dcIntlTime.value.offset - localIntlTime.value.offset) / 60,
  offsetWording: (() => {
    const offset = (dcIntlTime.value.offset - localIntlTime.value.offset) / 60;
    console.log(offset);
    if (offset === 0) {
      return 'the same time as you.';
    }

    return (
      Math.abs(offset).toString() +
      ' hours ' +
      (offset > 0 ? 'ahead of you.' : 'behind you.')
    );
  })(),
  fireGem: (() => {
    if ([0, 3, 6, 9, 12, 15, 18, 21].includes(dcIntlTime.value.hour)) {
      return {
        name: 'Blue',
        image: new URL('/public/eggs/fire_gem_blue.webp', import.meta.url)
          .pathname,
      };
    } else if ([1, 4, 7, 10, 13, 16, 19, 22].includes(dcIntlTime.value.hour)) {
      return {
        name: 'Red',
        image: new URL('/public/eggs/fire_gem_red.webp', import.meta.url)
          .pathname,
      };
    }

    return {
      name: 'Green',
      image: new URL('/public/eggs/fire_gem_green.webp', import.meta.url)
        .pathname,
    };
  })(),
  zombies: dcIntlTime.value.hour < 6,
  moonbeam: (() => {
    const type =
      dcIntlTime.value.hour >= 6 && dcIntlTime.value.hour < 18
        ? 'Sunbeam'
        : 'Moonglow';

    if (type === 'Sunbeam') {
      return {
        type,
        image: new URL('/public/eggs/sunbeam.webp', import.meta.url).pathname,
        until: dcIntlTime.value
          .startOf('day')
          .set({ hour: 18 })
          .setZone(timezone.value),
      };
    }

    return {
      type,
      image: new URL('/public/eggs/moonglow.webp', import.meta.url).pathname,
      until: dcIntlTime.value
        .startOf('day')
        .plus({ days: 1 })
        .set({ hour: 6 })
        .setZone(timezone.value),
    };
  })(),
}));

onMounted(
  () =>
    (interval = setInterval(
      () => (intervalKey.value = DateTime.local().toSeconds()),
      1000,
    )),
);

onUnmounted(() => clearInterval(interval));
</script>

<style scoped>
#top {
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  background: navy;
  padding: 0.2rem 1rem;
}

#info {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

#now {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

#now .time {
  font-size: 0.8rem;
  background-color: darkslateblue;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
}

#extended-info-container {
  border: 1px dashed #fff;
  padding: 1rem;
}

#extended-info {
  gap: 1rem;
  justify-self: center;
  display: grid;
  grid-template-columns: auto 1fr;
}

#extended-info > *:nth-child(odd) {
  justify-self: center;
  text-align: center;
}

#extended-info .cell .svg-inline--fa {
  width: 4rem;
  height: 4rem;
}

#extended-info .cell .offset {
  font-size: 3rem;
}

#extended-info p:first-child {
  margin-top: 0;
}

#extended-info p {
  margin: 0;
}

#period {
  background: darkslateblue;
  padding: 1rem;
  color: white;
}

#period-wrapper {
  border-radius: 0.5rem;
  max-width: 44rem;
  margin: 0 auto;
  display: grid;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

#period-wrapper span {
  text-align: center;
}

#period-wrapper label {
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  background: #1a005d;
  border-radius: 0.4rem;
}

#forecast {
  text-align: center;
  width: 100%;
}

#forecast-table {
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

.local {
  font-size: 0.5rem;
  display: block;
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

@media (min-width: 22rem) {
  #period-wrapper {
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }

  #period-wrapper label {
    display: inline;
  }
}

@media (min-width: 46rem) {
  #period-wrapper {
    display: flex;
  }
}

@media (min-width: 30rem) {
  #info {
    /*  flex-wrap: nowrap; */
  }
}

@media (min-width: 50rem) {
}
</style>
