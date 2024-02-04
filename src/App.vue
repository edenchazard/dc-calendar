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
          <span class="font-mono">
            {{
              localIntlTime.toLocaleString({
                dateStyle: 'medium',
                timeStyle: 'medium',
              })
            }}
          </span>
          <span class="time">DC time</span>
          <span class="font-mono">{{
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
            <div>
              <p>
                <b>Sunbeam Drakes</b> will hatch between
                {{
                  extended.moonbeam.sunbeam.begin.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                and
                {{
                  extended.moonbeam.sunbeam.end.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                <ActiveBadge
                  :condition="
                    dcIntlTime >= extended.moonbeam.sunbeam.begin &&
                    dcIntlTime <= extended.moonbeam.sunbeam.end
                  "
                />
              </p>
              <p>
                <b>Moonglow Drakes</b> will hatch between
                {{
                  extended.setrise.sunset.begin.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                and
                {{
                  extended.setrise.sunset.end.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                <ActiveBadge
                  :condition="
                    dcIntlTime >= extended.setrise.sunset.begin &&
                    dcIntlTime <= extended.setrise.sunset.end
                  "
                />
              </p>
            </div>

            <img
              :src="extended.setrise.image"
              alt=""
            />
            <div>
              <p>
                <b>Sunrise Dragons</b> will hatch between
                {{
                  extended.setrise.sunrise.begin.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                and
                {{
                  extended.setrise.sunrise.end.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                <ActiveBadge
                  :condition="
                    dcIntlTime >= extended.setrise.sunrise.begin &&
                    dcIntlTime <= extended.setrise.sunrise.end
                  "
                />
              </p>
              <p>
                <b>Sunset Dragons</b> will hatch between
                {{
                  extended.setrise.sunset.begin.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                and
                {{
                  extended.setrise.sunset.end.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                <ActiveBadge
                  :condition="
                    dcIntlTime >= extended.setrise.sunset.begin &&
                    dcIntlTime <= extended.setrise.sunset.end
                  "
                />
              </p>
            </div>

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

        <ForecastTable
          :from="from"
          :to="end"
          :timezone="timezone"
        />
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
import ActiveBadge from './components/ActiveBadge.vue';
import ForecastTable from './components/ForecastTable.vue';

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
    const sunbeam = {
      begin: dcIntlTime.value
        .set({
          hour: 6,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .setZone(timezone.value),
      end: dcIntlTime.value
        .set({
          hour: 17,
          minute: 59,
          second: 59,
          millisecond: 0,
        })
        .setZone(timezone.value),
    };
    const moonglow = {
      begin: dcIntlTime.value
        .set({
          hour: 18,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .setZone(timezone.value),
      end: dcIntlTime.value
        .startOf('day')
        .plus({ days: 1, hours: 5, minutes: 59, seconds: 59 })
        .setZone(timezone.value),
    };

    let image: string = new URL(
      '/public/eggs/sunbeam_moonglow.webp',
      import.meta.url,
    ).pathname;
    if (dcIntlTime.value >= sunbeam.begin && dcIntlTime.value <= sunbeam.end) {
      image = new URL('/public/eggs/sunbeam.webp', import.meta.url).pathname;
    } else if (
      dcIntlTime.value >= moonglow.begin &&
      dcIntlTime.value <= moonglow.end
    ) {
      image = new URL('/public/eggs/moonglow.webp', import.meta.url).pathname;
    }

    return {
      image,
      sunbeam,
      moonglow,
    };
  })(),
  setrise: (() => {
    const sunrise = {
      begin: dcIntlTime.value
        .set({
          hour: 6,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .setZone(timezone.value),
      end: dcIntlTime.value
        .set({
          hour: 12,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .setZone(timezone.value),
    };
    const sunset = {
      begin: dcIntlTime.value
        .set({
          hour: 18,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .setZone(timezone.value),
      end: dcIntlTime.value
        .startOf('day')
        .plus({ days: 1 })
        .setZone(timezone.value),
    };

    let image: string = new URL(
      '/public/eggs/sunrise_sunset.webp',
      import.meta.url,
    ).pathname;
    if (dcIntlTime.value >= sunset.begin && dcIntlTime.value <= sunset.end) {
      image = new URL('/public/eggs/sunset.webp', import.meta.url).pathname;
    } else if (
      dcIntlTime.value >= sunrise.begin &&
      dcIntlTime.value <= sunrise.end
    ) {
      image = new URL('/public/eggs/sunrise.webp', import.meta.url).pathname;
    }

    return {
      image,
      sunrise,
      sunset,
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

.local {
  font-size: 0.5rem;
  display: block;
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
</style>
