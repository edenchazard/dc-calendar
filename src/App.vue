<template>
  <header
    id="top"
    class="max-content"
  >
    <h1 id="site-title">Dragon Cave Calendar</h1>
    <nav id="menu">
      <a href="https://github.com/edenchazard/dc-calendar"
        ><FontAwesomeIcon icon="fa-brands fa-github" /> Github
      </a>
      <a href="https://ko-fi.com/dctools"
        ><FontAwesomeIcon icon="fa-solid fa-coffee" /> Donation link
      </a>
      <a href="https://chazza.me/dc/tools"
        ><FontAwesomeIcon icon="fa-solid fa-toolbox" /> More tools
      </a>
    </nav>
    <div id="timezone-wrapper">
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
    </div>
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
              localIntlTime.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
            }}
          </span>
          <span class="time">DC time</span>
          <span class="font-mono">{{
            dcIntlTime.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
          }}</span>
        </div>
        <div id="extended-info-container">
          <h2>Right now...</h2>
          <div id="extended-info">
            <FontAwesomeIcon :icon="`fa-solid fa-${seasonIcon}`" />
            <p>
              The current season is
              {{ season.name.slice(0, 1).toUpperCase() + season.name.slice(1) }}
              {{ season.begin.toLocaleString({ dateStyle: 'short' }) }} &mdash;
              {{ season.end.toLocaleString({ dateStyle: 'short' }) }}.
              {{ daytime.contains(dcIntlTime) ? 'It is day.' : 'It is night.' }}
              {{ sunrise.contains(dcIntlTime) ? 'The sun is rising.' : '' }}
              {{ sunset.contains(dcIntlTime) ? 'The sun is setting.' : '' }}
            </p>

            <FontAwesomeIcon icon="fa-solid fa-clock" />
            <div>
              <p>
                <b>Dragon Cave</b> is in
                <abbr :title="dcIntlTime.offsetNameLong ?? ''">{{
                  dcIntlTime.toFormat('ZZZZ', { locale: 'en-us' })
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

            <FontAwesomeIcon icon="fa-solid fa-gem" />
            <p>
              <b>Gemshard Dragons</b> switch at
              {{
                gemshardSwitchOver.toLocaleString(
                  DateTime.TIME_24_WITH_SECONDS,
                )
              }}.
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
                <b>Sonata Dragons</b> and <b>Lunar Herald Dragons</b> will
                change at this time.
              </p>
            </div>

            <img
              :src="zombieImage"
              alt=""
            />
            <p>
              <b>Undead Dragons</b> will be active between
              {{ zombies.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
              and
              {{ zombies.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}.
              <ActiveBadge :condition="zombies.contains(dcIntlTime)" />
            </p>

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
                {{ daytime.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}.
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
                }}.
                <ActiveBadge :condition="nighttime.contains(dcIntlTime)" />
              </p>
            </div>

            <img
              :src="nocturneImage"
              alt=""
            />
            <div>
              <p>
                <b>Nocturne Dragons</b> will be active between
                {{
                  nighttime.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}
                and
                {{
                  nighttime.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}.
                <ActiveBadge :condition="nighttime.contains(dcIntlTime)" />
              </p>
            </div>

            <img
              :src="harkfrostImage"
              alt=""
            />
            <div>
              <p>
                <b>Harkfrost Dragons</b> will be surrounded by snowflakes
                between
                {{
                  nighttime.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}
                and
                {{
                  nighttime.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                }}.
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
                {{ sunrise.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}.
                <ActiveBadge :condition="sunrise.contains(dcIntlTime)" />
              </p>
              <p>
                <b>Sunset Dragons</b> will hatch between
                {{ sunset.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}
                and
                {{ sunset.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS) }}.
                <ActiveBadge :condition="sunset.contains(dcIntlTime)" />
              </p>
            </div>

            <img
              :src="fireGem.image"
              alt=""
            />
            <div>
              <p>
                <b>Fire Gem Dragons</b> caught or bred now will be
                <b>{{ fireGem.colour.toLowerCase() }}</b> until
                {{
                  fireGem.interval.end.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}. Over the next {{ fireGemForecast.length }} hours:
              </p>
              <HourlyTable
                :forecast="fireGemForecast"
                class="hourly-table"
              />
            </div>

            <img
              :src="spiritWard.image"
              alt=""
            />
            <div>
              <p>
                <b>Spirit Ward Dragons</b> are currently in their
                <b>{{ spiritWard.colour.toLowerCase() }}</b> form between
                {{
                  spiritWard.interval.start.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}
                and
                {{
                  spiritWard.interval.end.toLocaleString(
                    DateTime.TIME_24_WITH_SECONDS,
                  )
                }}. Over the next {{ spiritWardForecast.length }} hours:
              </p>
              <HourlyTable
                :forecast="spiritWardForecast"
                class="hourly-table"
              />
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
          Between
          {{
            localDateTime.begin.toLocaleString(
              DateTime.DATETIME_MED_WITH_SECONDS,
            )
          }}
          and
          {{
            localDateTime.end.toLocaleString(
              DateTime.DATETIME_MED_WITH_SECONDS,
            )
          }}, the following breeds will be available.
        </p>

        <p class="italic">
          (This period corresponds to
          {{
            dcDateTime.begin.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
          }}
          to
          {{
            dcDateTime.end.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
          }}
          on Dragon Cave)
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
      &copy; Dragon Cave and artists.
    </p>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DateTime } from 'luxon';
import ActiveBadge from './components/ActiveBadge.vue';
import ForecastTable from './components/ForecastTable.vue';
import { useExtendedInfo } from '@/composables/useExtendedInfo';
import HourlyTable from './components/HourlyTable.vue';

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
  fireGemForecast,
  spiritWard,
  spiritWardForecast,
  offsetWording,
  sunbeamMoonglowImage,
  sunrise,
  sunset,
  sunriseSunsetImage,
  harkfrostImage,
  nocturneImage,
  zombieImage,
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
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.25rem 1rem;
  background: #15366a;
  padding: 0.5rem 1rem;
  justify-items: center;
}

#site-title {
  line-height: 2.7rem;
  grid-column: 1/-1;
  text-align: center;
}

#menu {
  grid-column: 1/-1;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  > a {
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    text-underline-offset: 0.3rem;
    text-decoration-style: dotted;

    > svg {
      height: 1.5rem;
    }
  }
}

#timezone-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  grid-column: 1/-1;
}

#timezone {
  max-width: 20rem;
  width: 100%;
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
  max-width: 42rem;
}

#extended-info > *:nth-child(odd) {
  justify-self: center;
  text-align: center;
}

#extended-info p:first-child {
  margin-top: 0;
}

#extended-info p {
  margin: 0;
}

#extended-info img {
  max-height: 3rem;
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

.hourly-table {
  margin-top: 0.5rem;
}

#bottom {
  text-align: center;
  font-size: 0.8rem;
}

@media (min-width: 10rem) {
  #period-wrapper {
    gap: 1rem;
  }
}

@media (min-width: 37rem) {
  #top {
    grid-template-columns: auto 1fr;
    justify-items: unset;
  }

  #site-title {
    grid-column: unset;
    text-align: left;
  }

  #menu {
    justify-content: end;
    grid-column: unset;
  }

  #timezone-wrapper {
    justify-self: end;
  }

  #period-wrapper {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  #period-wrapper label {
    display: inline;
  }
}

@media (min-width: 58rem) {
  #top {
    grid-template-columns: 1fr auto auto;
  }

  #timezone-wrapper {
    grid-column: unset;
  }

  #period-wrapper {
    display: flex;
  }
}
</style>
