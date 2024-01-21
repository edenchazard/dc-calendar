<template>
  <header id="top">
    <div class="max-content"><h1>DragCave Calendar</h1></div>
  </header>

  <main class="max-content">
    <section id="currently" class="section">
      <h2 class="center">At a glance</h2>
      <div id="info">
        <div id="now" :key="intervalKey">
          <span class="time">Local time</span>
          <span>
            {{ localIntlTime.toLocaleString({ dateStyle: 'medium', timeStyle: 'medium' }) }}
          </span>
          <span class="time">DC time</span>
          <span>{{ dcIntlTime.toLocaleString({ dateStyle: 'medium', timeStyle: 'medium' }) }}</span>
        </div>
        <div id="extended-info">
          <div class="cell">
            <FontAwesomeIcon :icon="`fa-solid fa-${extended.seasonIcon}`" />
            <span>{{ extended.season.name }} {{ extended.season.begin.toLocaleString() }}</span>
          </div>

          <div class="cell">
            <FontAwesomeIcon icon="fa-solid fa-clock" />
            <span>
              Dragcave is in
              <abbr :title="dcIntlTime.offsetNameLong">{{
                dcIntlTime.toFormat('ZZZZ')
              }}</abbr></span
            >
          </div>

          <div class="cell">
            <span class="offset">{{ Math.abs(dcIntlTime.offset / 60) }} </span>
            <span>hours {{ dcIntlTime.offset > 0 ? 'ahead' : 'behind' }} you</span>
          </div>

          <div class="cell">
            <img :src="extended.fireGem.image" />
            <span>{{ extended.fireGem.name }} Fire Gems are dropping</span>
          </div>
        </div>
      </div>
    </section>

    <div class="section center">
      <h2>Forecast</h2>
      <form @submit.prevent id="period" class="subsection">
        <div id="period-wrapper">
          <span>
            <label for="from">From</label>
          </span>
          <input type="date" id="from" name="from" v-model="from" />
          <span>
            <label for="to">To</label>
          </span>
          <input type="date" id="to" name="to" v-model="end" />
          <span>
            <label for="timezone">Timezone</label>
          </span>
          <select v-model="timezone" id="timezone">
            <option v-for="timezone in timezones" :value="timezone">{{ timezone }}</option>
          </select>
        </div>
      </form>

      <section id="forecast" class="subsection">
        <p>
          Between {{ localDateTime.begin.toFormat('MMM d HH:mm:ss') }} and
          {{ localDateTime.end.toFormat('MMM d HH:mm:ss') }}, the following breeds will be
          available.
          <strong class="bold">These times are local to you.</strong>
        </p>

        <p class="italic">
          (This period corresponds to {{ dcDateTime.begin.toFormat('MMM d HH:mm:ss') }} to
          {{ dcDateTime.end.toFormat('MMM d HH:mm:ss') }} on DragCave)
        </p>

        <div id="forecast-table">
          <div v-for="date in forecast" class="forecast-cell">
            <b class="year">{{ date.date.toFormat('y') }}</b>
            <b class="day">{{ date.date.toFormat('d') }}</b>
            <b class="month">{{ date.date.toFormat('MMM') }}</b>
            <div class="breeds-available">
              <template v-for="(breed, index) in date.available">
                <div
                  class="breed"
                  :style="{
                    '--background-colour': `rgb(${breed.backgroundColour})`,
                    '--accent-colour': `rgb(${breed.accentColour})`,
                    left: -(index * 7.5) + '%'
                  }"
                >
                  <div class="egg-container">
                    <div class="egg-wrapper">
                      <div class="tooltip">
                        <b class="name">{{ breed.name }}</b>
                        <b class="biome">
                          {{ Array.isArray(breed.biome) ? breed.biome.join(', ') : breed.biome }}
                        </b>
                      </div>
                      <img :alt="breed.name" :src="breed.image" class="egg" />
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div v-if="date.appearing.length > 0" class="incoming-outgoing">
              <span class="block">Appearing</span>
              <ul v-for="(breed, index) in date.appearing">
                <li>
                  <img :alt="breed.name" :src="breed.image" />
                  {{ breed?.begin?.toFormat('HH:mm:ss') }}
                </li>
              </ul>
            </div>

            <div v-if="date.leaving.length > 0" class="incoming-outgoing">
              <span class="block">Leaving</span>
              <ul v-for="(breed, index) in date.leaving">
                <li>
                  <img :alt="breed.name" :src="breed.image" />
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { determineSeason } from './utils/utils'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const breeds: Array<
  (d: DateTime) => {
    name: string
    biome: string
    image: string
    backgroundColour: string
    accentColour: string
    availability: boolean
    begin: DateTime
    end: DateTime
  }
> = [
  (d) => {
    const season = determineSeason(d)
    return {
      name: 'Seasonal (Winter)',
      biome: 'Alpine',
      image: new URL('./assets/eggs/seasonal_winter.gif', import.meta.url).pathname,
      backgroundColour: '106, 162, 171',
      accentColour: '4, 63, 181',
      availability: season.name === 'winter',
      begin: season.begin,
      end: season.end
    }
  },

  (d) => {
    const season = determineSeason(d)
    return {
      name: 'Seasonal (Spring)',
      biome: 'Alpine',
      image: new URL('./assets/eggs/seasonal_spring.webp', import.meta.url).pathname,
      backgroundColour: '106, 162, 171',
      accentColour: '4, 63, 181',
      availability: season.name === 'spring',
      begin: season.begin,
      end: season.end
    }
  },

  (d) => {
    const season = determineSeason(d)
    return {
      name: 'Seasonal (Summer)',
      biome: 'Alpine',
      image: new URL('./assets/eggs/seasonal_summer.webp', import.meta.url).pathname,
      backgroundColour: '106, 162, 171',
      accentColour: '4, 63, 181',
      availability: season.name === 'summer',
      begin: season.begin,
      end: season.end
    }
  },

  (d) => {
    const season = determineSeason(d)
    return {
      name: 'Seasonal (Autumn)',
      biome: 'Alpine',
      image: new URL('./assets/eggs/seasonal_autumn.webp', import.meta.url).pathname,
      backgroundColour: '106, 162, 171',
      accentColour: '4, 63, 181',
      availability: season.name === 'autumn',
      begin: season.begin,
      end: season.end
    }
  },

  (d) => {
    const now = d.toSeconds()
    const begin = DateTime.fromISO(`${d.year}-02-08T00:00:00`, {
      zone: 'America/New_York'
    }).setZone(timezone.value)
    const end = DateTime.fromISO(`${d.year}-02-14T23:59:59`, {
      zone: 'America/New_York'
    }).setZone(timezone.value)

    return {
      name: 'Previous Valentines',
      biome: 'Holiday',
      image: new URL('./assets/eggs/amarignis_egg.webp', import.meta.url).pathname,
      backgroundColour: '204, 188, 209',
      accentColour: '181, 0, 6',
      availability: now >= begin.toSeconds() && now <= end.toSeconds(),
      begin,
      end
    }
  },

  (d) => {
    const now = d.toSeconds()
    const begin = DateTime.fromISO(`${d.year}-02-14T00:00:00`, {
      zone: 'America/New_York'
    }).setZone(timezone.value)
    const end = DateTime.fromISO(`${d.year}-02-16T23:59:59`, {
      zone: 'America/New_York'
    }).setZone(timezone.value)

    return {
      name: `${d.year} Valentine`,
      biome: 'All',
      image: new URL('./assets/eggs/mystery.gif', import.meta.url).pathname,
      backgroundColour: '176, 141, 141',
      accentColour: '255, 0, 0',
      availability: now >= begin.toSeconds() && now <= end.toSeconds(),
      begin,
      end
    }
  }
  /* (d) => {
    const ts = d.toSeconds()
       console.log({
        dcTime: d.toISO(),
        local: d.toLocal().toISO(),
        dctime2: DateTime.fromSeconds(1705712400).setZone('America/New_York').toLocal().toISO()
      })

    return {
      name: `Sonata (Silver)`,
      biome: 'All',
      availability: false,
      image: new URL('./assets/eggs/mystery.gif', import.meta.url).pathname,
      backgroundColour: '122, 122, 122',
      accentColour: '255, 255, 255'
    }
  }*/
]

const timezones = Intl.supportedValuesOf('timeZone')

let interval: number = 0
const intervalKey = ref(DateTime.local().toSeconds())

const from = ref(DateTime.now().toISODate())
const end = ref(DateTime.now().plus({ days: 7 }).toISODate())
const timezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone)

const localIntlTime = computed(() => DateTime.fromSeconds(intervalKey.value))
const dcIntlTime = computed(() =>
  DateTime.fromSeconds(intervalKey.value).setZone('America/New_York')
)

const forecast = computed(() => {
  const dateBegin = DateTime.fromISO(from.value).setZone(timezone.value)
  const dateEnd = DateTime.fromISO(end.value).setZone(timezone.value)
  let curDate = dateBegin
  const dayForecast = []

  while (curDate.toSeconds() < dateEnd.toSeconds()) {
    const results = breeds.map((breed) => {
      const result = breed(curDate)
      // console.log(result.begin.diff(curDate, 'days').days, curDate.toISO())
      const begin = result.begin.setZone(timezone.value)
      const end = result.end.setZone(timezone.value)
      const startDiff = begin.diff(curDate, 'days').days
      const endDiff = end.diff(curDate, 'days').days
      return {
        ...result,
        begin,
        end,
        appearing: result.availability && startDiff > -1,
        leaving: result.availability && endDiff < 1
      }
    })

    dayForecast.push({
      date: curDate,
      dragCaveTime: curDate.setZone('America/New_York'),
      available: results.filter(
        (breed) => !breed.appearing && !breed.leaving && breed.availability
      ),
      leaving: results.filter((breed) => breed.leaving),
      appearing: results.filter((breed) => breed.appearing)
    })

    curDate = curDate.plus({ day: 1 })
  }
  return dayForecast
})

const localDateTime = computed(() => ({
  begin: DateTime.fromISO(from.value).setZone(timezone.value),
  end: DateTime.fromISO(end.value).setZone(timezone.value)
}))

const dcDateTime = computed(() => ({
  begin: localDateTime.value.begin.setZone('America/New_York'),
  end: localDateTime.value.end.setZone('America/New_York')
}))

const extended = computed(() => ({
  season: determineSeason(dcIntlTime.value),
  seasonIcon: 'snowflake',
  timezone: dcIntlTime.value.toFormat('ZZZZ'),
  offset: dcIntlTime.value.offset,
  fireGem: (() => {
    if ([0, 3, 6, 9, 12, 15, 18, 21].includes(dcIntlTime.value.hour)) {
      return {
        name: 'Blue',
        image: new URL('./assets/eggs/fire_gem_blue.webp', import.meta.url).pathname
      }
    } else if ([1, 4, 7, 10, 13, 16, 19, 22].includes(dcIntlTime.value.hour)) {
      return {
        name: 'Red',
        image: new URL('./assets/eggs/fire_gem_red.webp', import.meta.url).pathname
      }
    }

    return {
      name: 'Green',
      image: new URL('./assets/eggs/fire_gem_green.webp', import.meta.url).pathname
    }
  })()
}))

onMounted(
  () => (interval = setInterval(() => (intervalKey.value = DateTime.local().toSeconds()), 1000))
)

onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
#top {
  padding-top: 1rem;
  color: white;
}

#top .max-content {
  background: navy;
  padding: 1rem;
}

#info {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

#now {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

#now .time {
  font-size: 0.8rem;
  background-color: darkslateblue;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
}

#extended-info {
  gap: 1rem;
  justify-self: center;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
}

#extended-info .cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px dashed #fff;
  padding: 1rem;
  text-align: center;
  width: 10rem;
}

#extended-info .cell .svg-inline--fa {
  width: 4rem;
  height: 4rem;
}

#extended-info .cell .offset {
  font-size: 3rem;
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
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6%;
}

.breeds-available .breed:nth-child(1n + 1) {
  position: relative;
}

.breeds-available .egg-container {
  height: 30px;
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
