<template>
  <div>
    <section class="section">
      <p>
        All times are
        <strong class="bold">local to your selected timezone</strong> and shown
        in 24 hour format, unless otherwise stated.
      </p>
      <p><strong class="bold">This tool is experimental.</strong></p>
    </section>

    <ClientOnly>
      <template #fallback>
        <div
          id="waiting"
          class="section center"
        >
          <p>Magic is happening! Be patient...</p>
          <p>
            If this message persists, please ensure that JavaScript is enabled
            in your browser.
          </p>
        </div>
      </template>
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
              <FontAwesomeIcon :icon="seasonIcon" />
              <p>
                The current season is
                {{
                  season.name.slice(0, 1).toUpperCase() + season.name.slice(1)
                }}
                {{ season.begin.toLocaleString({ dateStyle: 'short' }) }}
                &mdash; {{ season.end.toLocaleString({ dateStyle: 'short' }) }}.
                {{
                  daytime.contains(dcIntlTime) ? 'It is day.' : 'It is night.'
                }}
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
                  }}. Server time will go forwards 1 hour and backwards 1 hour
                  at these times respectively.
                  <ActiveBadge :condition="dst.contains(dcIntlTime)" />
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
                    moonSwitchOver.toLocaleString(
                      DateTime.TIME_24_WITH_SECONDS,
                    )
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
              <div>
                <p>
                  <b>Undead Dragons</b> will be active between
                  {{
                    zombies.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                  }}
                  and
                  {{
                    zombies.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                  }}.
                  <ActiveBadge :condition="zombies.contains(dcIntlTime)" />
                </p>
                <p>
                  On
                  {{ zombieMonth.toLocaleString(DateTime.DATETIME_MED) }},
                  dragons will have an increased chance of zombifying
                  successfully.
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
                  {{
                    daytime.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                  }}.
                  <ActiveBadge :condition="daytime.contains(dcIntlTime)" />
                </p>
                <p>
                  <b>Moonglow Drakes</b> can be caught or bred between
                  {{
                    nighttime.start.toLocaleString(
                      DateTime.TIME_24_WITH_SECONDS,
                    )
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
                    nighttime.start.toLocaleString(
                      DateTime.TIME_24_WITH_SECONDS,
                    )
                  }}
                  and
                  {{
                    nighttime.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                  }}.
                  <ActiveBadge :condition="nighttime.contains(dcIntlTime)" />
                </p>
              </div>

              <img
                :src="impishImage"
                alt=""
              />
              <div>
                <p>
                  <b>Impish Pygmies</b> will transform when fed between
                  {{
                    nighttime.start.toLocaleString(
                      DateTime.TIME_24_WITH_SECONDS,
                    )
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
                    nighttime.start.toLocaleString(
                      DateTime.TIME_24_WITH_SECONDS,
                    )
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
                  {{
                    sunrise.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                  }}.
                  <ActiveBadge :condition="sunrise.contains(dcIntlTime)" />
                </p>
                <p>
                  <b>Sunset Dragons</b> will hatch between
                  {{
                    sunset.start.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                  }}
                  and
                  {{
                    sunset.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
                  }}.
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

              <img
                :src="stratos.image"
                alt=""
              />
              <div>
                <p>
                  <b>Stratos Dragons</b> are currently in their
                  <b>{{ stratos.colour.toLowerCase() }}</b> form between
                  {{
                    stratos.interval.start.toLocaleString(
                      DateTime.TIME_24_WITH_SECONDS,
                    )
                  }}
                  and
                  {{
                    stratos.interval.end.toLocaleString(
                      DateTime.TIME_24_WITH_SECONDS,
                    )
                  }}. Over the next {{ stratosForecast.length }} hours:
                </p>
                <HourlyTable
                  :forecast="stratosForecast"
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
          id="period"
          class="subsection"
          @submit.prevent
        >
          <div id="period-wrapper">
            <span>
              <label for="timezone">Timezone</label>
            </span>
            <select
              id="timezone"
              v-model="localTimezone"
              name="timezone"
            >
              <option
                v-for="timezone in timezones"
                :key="timezone.toString()"
                :value="timezone"
              >
                {{ timezone }}
              </option>
            </select>
            <span>
              <label for="from">From</label>
            </span>
            <input
              id="from"
              v-model="from"
              type="date"
              name="from"
            />
            <span>
              <label for="to">To</label>
            </span>
            <input
              id="to"
              v-model="end"
              type="date"
              name="to"
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
              dcDateTime.begin.toLocaleString(
                DateTime.DATETIME_MED_WITH_SECONDS,
              )
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
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DateTime } from 'luxon';
import ActiveBadge from '@/components/ActiveBadge.vue';
import ForecastTable from '@/components/ForecastTable.vue';
import { useExtendedInfo } from '@/composables/useExtendedInfo';
import HourlyTable from '@/components/HourlyTable.vue';

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
  stratos,
  stratosForecast,
  spiritWard,
  spiritWardForecast,
  offsetWording,
  sunbeamMoonglowImage,
  sunrise,
  sunset,
  sunriseSunsetImage,
  harkfrostImage,
  impishImage,
  nocturneImage,
  zombieImage,
  zombies,
  zombieMonth,
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

@media (min-width: 10rem) {
  #period-wrapper {
    gap: 1rem;
  }
}

@media (min-width: 40rem) {
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
  #timezone-wrapper {
    grid-column: unset;
  }

  #period-wrapper {
    display: flex;
  }
}
</style>
