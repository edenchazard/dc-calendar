<template>
  <header
    id="top"
    class="max-content"
  >
    <h1>Dragcave Calendar</h1>
    <label for="timezone">Timezone</label>
    <select
      v-model="localTimezone"
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
            <FontAwesomeIcon :icon="`fa-solid fa-${seasonIcon}`" />
            <p>
              {{ season.name.slice(0, 1).toUpperCase() + season.name.slice(1) }}
              {{ season.begin.toLocaleString() }} &mdash;
              {{ season.end.toLocaleString() }}
            </p>

            <FontAwesomeIcon icon="fa-solid fa-clock" />
            <div>
              <p>
                <b>Dragcave</b> is in
                <abbr :title="dcIntlTime.offsetNameLong ?? ''">{{
                  dcIntlTime.toFormat('ZZZZ')
                }}</abbr
                >, {{ offsetWording }}
              </p>
              <p>
                DST will occur on
                {{
                  dst.start.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
                }}
                and end on
                {{
                  dst.end.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
                }}. Server time will go forwards 1 hour and backwards 1 hour at
                these times respectively.
                <ActiveBadge :condition="dcIntlTime.isInDST" />
              </p>
            </div>

            <FontAwesomeIcon icon="fa-solid fa-skull" />
            <p>
              <b>Zombies</b> will be active between
              {{ zombies.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
              and
              {{ zombies.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}.
              <ActiveBadge :condition="zombies.contains(dcIntlTime)" />
            </p>

            <FontAwesomeIcon icon="fa-solid fa-gem" />
            <p>
              <b>Gemshards</b> switch at
              {{
                gemshardSwitchOver.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
              }}
            </p>

            <FontAwesomeIcon icon="fa-solid fa-moon" />
            <div>
              <p>
                Moon phases will occur at
                {{
                  moonSwitchOver.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}.
              </p>
              <p>
                <b>Sonatas</b> and <b>Lunar Heralds</b> will change at this
                time.
              </p>
            </div>

            <img
              :src="sunbeamMoonglowImage"
              alt=""
            />
            <div>
              <p>
                <b>Sunbeam Drakes</b> can be caught or bred between
                {{
                  daytime.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}
                and
                {{ daytime.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
                <ActiveBadge :condition="daytime.contains(dcIntlTime)" />
              </p>
              <p>
                <b>Moonglow Drakes</b> can be caught or bred between
                {{
                  nighttime.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}
                and
                {{
                  nighttime.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}
                <ActiveBadge :condition="nighttime.contains(dcIntlTime)" />
              </p>
            </div>

            <img
              :src="sunriseSunsetImage"
              alt=""
            />
            <div>
              <p>
                <b>Sunrise Dragons</b> will hatch between
                {{
                  sunrise.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}
                and
                {{ sunrise.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
                <ActiveBadge :condition="sunrise.contains(dcIntlTime)" />
              </p>
              <p>
                <b>Sunset Dragons</b> will hatch between
                {{ sunset.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
                and
                {{ sunset.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
                <ActiveBadge :condition="sunset.contains(dcIntlTime)" />
              </p>
            </div>

            <img
              :src="fireGem.image"
              alt=""
            />
            <div>
              <p>
                <b>Fire Gems</b> caught or bred now will be
                <b>{{ fireGem.colour.toLowerCase() }}</b> until
                {{
                  fireGem.interval.end.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}. Over the next 24 hours:
              </p>
              <div class="fire-gem-table">
                <span
                  :title="`${dt.start
                    .setZone(localIntlTime.zone)
                    .toLocaleString(
                      DateTime.TIME_24_WITH_SECONDS,
                    )} – ${dt.end.setZone(localIntlTime.zone).toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`"
                  :class="getFireGemForDateTime(dt.start).colour.toLowerCase()"
                  :key="dt.start?.toSeconds()"
                  v-for="dt in Interval.fromDateTimes(
                    dcIntlTime.startOf('hour').plus({ hours: 1 }),
                    dcIntlTime.startOf('hour').plus({ hours: 25 }),
                  ).splitBy({ hours: 1 })"
                >
                  {{ dt.start?.setZone(localIntlTime.zone).toFormat('HH') }}
                </span>
              </div>
            </div>
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
          :timezone="localTimezone"
        />
      </section>
    </div>
  </main>
  <footer id="bottom">
    <p>
      &copy; eden chazard. Graphics courtesy of <b>Winya</b> with programming
      contributions from <b>Mu-Cephei (endulum)</b> and <b>Hourai</b>. Art
      &copy; Dragcave and artists.
    </p>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DateTime, Interval } from 'luxon';
import ActiveBadge from './components/ActiveBadge.vue';
import ForecastTable from './components/ForecastTable.vue';
import { useExtendedInfo } from '@/composables/useExtendedInfo';
import { getFireGemForDateTime } from './utils/calculations';

const timezones = Intl.supportedValuesOf('timeZone');
let interval: ReturnType<typeof setInterval>;
const intervalKey = ref(DateTime.local().toSeconds());

const from = ref(DateTime.now().toISODate());
const end = ref(DateTime.now().plus({ days: 7 }).toISODate());

const localTimezone = useLocalStorage(
  'localTimezone',
  Intl.DateTimeFormat().resolvedOptions().timeZone,
);

const localIntlTime = computed(() =>
  DateTime.fromSeconds(intervalKey.value).setZone(localTimezone.value),
);

const dcIntlTime = computed(() => DateTime.fromSeconds(intervalKey.value));

const localDateTime = computed(() => ({
  begin: DateTime.fromISO(from.value).setZone(localTimezone.value),
  end: DateTime.fromISO(end.value).setZone(localTimezone.value),
}));

const dcDateTime = computed(() => ({
  begin: localDateTime.value.begin.setZone('America/New_York'),
  end: localDateTime.value.end.setZone('America/New_York'),
}));

const {
  nighttime,
  daytime,
  season,
  seasonIcon,
  gemshardSwitchOver,
  fireGem,
  offsetWording,
  sunbeamMoonglowImage,
  sunrise,
  sunset,
  sunriseSunsetImage,
  zombies,
  dst,
  moonSwitchOver,
} = useExtendedInfo(dcIntlTime, localIntlTime);

onMounted(
  () =>
    (interval = setInterval(
      () => (intervalKey.value = DateTime.local().toSeconds()),
      1000,
    )),
);

onUnmounted(() => clearInterval(interval));
</script>

<style scoped lang="postcss">
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
  max-width: 40rem;
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

#bottom {
  text-align: center;
  font-size: 0.8rem;
}

.fire-gem-table {
  margin-top: 0.4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1.5rem));

  > span {
    text-align: center;
    display: block;
    font-size: 0.8rem;
    padding: 0.5rem 0;
  }
  > .blue {
    background: rgb(69, 69, 114);
  }
  > .green {
    background: rgb(87, 128, 87);
  }
  > .red {
    background: rgb(110, 73, 73);
  }
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
