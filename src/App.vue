<template>
  <header>
    <div class="max-content">
      <div id="time">
        <span>Your time: {{ localIntlTime.format() }} </span>
        <span>DC time: {{ dcIntlTime.format() }}</span>
      </div>
    </div>
  </header>

  <main class="max-content">
    <div>
      <form @submit.prevent="" id="period">
        <select v-model="timezone">
          <option v-for="timezone in timezones" :value="timezone">{{ timezone }}</option>
        </select>

        <fieldset>
          <legend>Range</legend>
          <div class="range">
            <label for="from">From</label>
            <input type="date" id="from" name="from" v-model="from" />
            <label for="to">To</label>
            <input type="date" id="to" name="to" v-model="end" />
          </div>
        </fieldset>
      </form>
    </div>

    <section id="forecast">
      <h2>Forecast</h2>
      <p>
        Between {{ localDateTime.begin.toFormat('MMM d HH:mm:ss') }} and
        {{ localDateTime.end.toFormat('MMM d HH:mm:ss') }}, the following breeds will be available.
        <span class="italic">These times are local to you.</span>
      </p>

      <p class="italic">
        (This period corresponds to {{ dcDateTime.begin.toFormat('MMM d HH:mm:ss') }} to
        {{ dcDateTime.end.toFormat('MMM d HH:mm:ss') }} on DragCave)
      </p>

      <div id="forecast-table">
        <div v-for="date in forecast" class="forecast-cell">
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
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { getSeasonalCycle } from './utils/utils'
import { DateTime } from 'luxon'

const breeds = [
  /*   {
    callback(d: DateTime) {
      const seasons = getSeasonalCycle(d.toJSDate())

      const now = d.toSeconds()
      return {
        name: 'Harvest',
        biome:
          now >= seasons.decemberSolstice.toSeconds() && now <= seasons.marchEquinox.toSeconds()
            ? 'Alpine'
            : 'Forest',
        availability: true,
        image: new URL('./assets/eggs/harvest.gif', import.meta.url).pathname,
        backgroundColour: '99, 83, 52',
        accentColour: '237, 202, 135'
      }
    }
  }, */

  {
    callback(d: DateTime) {
      const seasons = getSeasonalCycle(d)
      const now = d.toSeconds()

      const begin = seasons.decemberSolstice
      const end = seasons.marchEquinox

      console.log(begin.toISO())
      console.log(d.toISO())
      console.log(end.toISO())
      return {
        name: 'Seasonal (Winter)',
        biome: 'Alpine',
        image: new URL('./assets/eggs/winter.gif', import.meta.url).pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: now >= begin.toSeconds() && now <= end.toSeconds(),
        begin,
        end
      }
    }
  },

  {
    callback(d: DateTime) {
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
    }
  },

  {
    callback(d: DateTime) {
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
  },

  {
    callback(d: DateTime) {
      const ts = d.toSeconds()
      /*   console.log({
        dcTime: d.toISO(),
        local: d.toLocal().toISO(),
        dctime2: DateTime.fromSeconds(1705712400).setZone('America/New_York').toLocal().toISO()
      })
 */
      return {
        name: `Sonata (Silver)`,
        biome: 'All',
        availability: false,
        image: new URL('./assets/eggs/mystery.gif', import.meta.url).pathname,
        backgroundColour: '122, 122, 122',
        accentColour: '255, 255, 255'
      }
    }
  }
]

const timezones = Intl.supportedValuesOf('timeZone')

const localIntlTime = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'long',
  dateStyle: 'medium',
  hour12: false
})

const dcIntlTime = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'long',
  dateStyle: 'medium',
  hour12: false,
  timeZone: 'America/New_York'
})

const from = ref(DateTime.now().toISODate())
const end = ref(DateTime.now().plus({ days: 7 }).toISODate())
const timezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone)

const forecast = computed(() => {
  const dateBegin = DateTime.fromISO(from.value).setZone(timezone.value)
  const dateEnd = DateTime.fromISO(end.value).setZone(timezone.value)
  let curDate = dateBegin
  const dayForecast = []

  while (curDate.toSeconds() < dateEnd.toSeconds()) {
    const results = breeds.map((breed) => {
      const result = breed.callback(curDate)
      return {
        ...result,
        appearing: isAppearing(result, curDate),
        leaving: isLeaving(result, curDate)
      }
    })

    dayForecast.push({
      date: curDate,
      dc: curDate.setZone('America/New_York'),
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

function isAppearing(breed, d) {
  return breed.begin?.toISODate() === d.toISODate()
}

function isLeaving(breed, d) {
  return breed.end?.toISODate() === d.toISODate()
}

watchEffect(() => console.log(forecast.value))
</script>

<style scoped>
header {
  background: navy;
  padding: 1rem;
  color: white;
}

#period {
  background: darkslateblue;
  padding: 1rem;
  color: white;
  border-radius: 0.5rem;
}
#period .range {
  display: grid;
  grid-template-columns: 1fr;
}

#time {
  display: flex;
  justify-content: space-between;
}
#forecast {
  text-align: center;
  width: 100%;
}
#forecast .forecast-header {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.breeds-available .breed {
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

.italic {
  font-style: italic;
}
</style>
