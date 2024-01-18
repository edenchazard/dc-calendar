<template>
  <header>
    <div id="time">
      <span>Your time: {{ localIntlTime.format() }} </span>
      <span>DC time: {{ dcIntlTime.format() }}</span>
    </div>
  </header>

  <main>
    <div>
      <form @submit.prevent="" id="period">
        <input type="checkbox" v-model="formatLocal" />
        <label>Format dates local to me</label>
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
        Between {{ dcTime.begin.toLocal().toFormat('MMM d') }} and
        {{ dcTime.end.toLocal().toFormat('MMM d') }} your time, the following breeds will be
        available.
      </p>
      <p>The first date is in DC's timezone, the second is the time it will be for you.</p>
      <table id="forecast-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Available breeds</th>
          </tr>
          <tr v-for="date in forecast">
            <td>
              {{ date.date.toFormat('MMM d') }}
              <span class="local"
                >({{ date.local.toLocaleString({ dateStyle: 'medium', timeStyle: 'long' }) }})</span
              >
            </td>
            <td>
              <div class="breeds-available">
                <template v-for="breed in date.results">
                  <div
                    class="breed-tile"
                    v-if="breed.availability"
                    :style="{
                      backgroundColor: `rgb(${breed.backgroundColour})`,
                      borderColor: `rgb(${breed.accentColour})`,
                      color: `rgb(${breed.accentColour})`
                    }"
                  >
                    <img :src="breed.image" />
                    <b class="name">{{ breed.name }}</b>
                    <b class="biome">{{
                      Array.isArray(breed.biome) ? breed.biome.join(', ') : breed.biome
                    }}</b>
                  </div>
                </template>
              </div>
            </td>
          </tr>
        </thead>
      </table>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { solstice, julian } from 'astronomia'
import { getSolsticesAndEquinoxes } from './utils/utils'
import { DateTime } from 'luxon'

const breeds = [
  {
    callback(d: DateTime) {
      const seasons = getSeasonalCycle(d.toJSDate())

      return {
        name: 'Harvest',
        biome: isBetween(d.toJSDate(), seasons.decemberSolstice, seasons.marchEquinox)
          ? 'Alpine'
          : 'Forest',
        availability: true,
        image: new URL('./assets/eggs/harvest.gif', import.meta.url).pathname,
        backgroundColour: '99, 83, 52',
        accentColour: '237, 202, 135'
      }
    }
  },

  {
    callback(d: DateTime) {
      const seasons = getSeasonalCycle(d.toJSDate())
      const availability = isBetween(d.toJSDate(), seasons.decemberSolstice, seasons.marchEquinox)

      return {
        name: 'Seasonal (Winter)',
        biome: 'Alpine',
        availability,
        image: new URL('./assets/eggs/winter.gif', import.meta.url).pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181'
      }
    }
  },

  {
    callback(d: DateTime) {
      const start = DateTime.fromISO(`${d.year}-02-08`, { zone: 'America/New_York' })
      const end = DateTime.fromISO(`${d.year}-02-14`, { zone: 'America/New_York' })
      const availability = isBetween(d.toJSDate(), start.toJSDate(), end.toJSDate())

      return {
        name: 'Previous Valentines',
        biome: 'Holiday',
        availability,
        image: new URL('./assets/eggs/winter.gif', import.meta.url).pathname,
        backgroundColour: '204, 188, 209',
        accentColour: '181, 0, 6'
      }
    }
  },

  {
    callback(d: DateTime) {
      const start = DateTime.fromISO(`${d.year}-02-14`, { zone: 'America/New_York' })
      const end = DateTime.fromISO(`${d.year}-02-17`, { zone: 'America/New_York' })
      const availability = isBetween(d.toJSDate(), start.toJSDate(), end.toJSDate())

      return {
        name: `${d.year} Valentine`,
        biome: 'All',
        availability,
        image: new URL('./assets/eggs/mystery.gif', import.meta.url).pathname,
        backgroundColour: '176, 141, 141',
        accentColour: '255, 0, 0'
      }
    }
  },

  {
    callback(d: DateTime) {
      const ts = d.toSeconds()
      const availability = (ts - 1683565200) % (128 * 86400) <= 6 * 86400

      return {
        name: `Sonata (Silver)`,
        biome: 'All',
        availability,
        image: new URL('./assets/eggs/mystery.gif', import.meta.url).pathname,
        backgroundColour: '122, 122, 122',
        accentColour: '255, 255, 255'
      }
    }
  }
]

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

const [a, b] = getDefaultDateRange()
const from = ref(a)
const end = ref(b)
const formatLocal = ref(false)

const forecast = computed(() => {
  const dateBegin = DateTime.fromISO(from.value, { zone: 'America/New_York' })
  const dateEnd = DateTime.fromISO(end.value, { zone: 'America/New_York' })
  let curDate = dateBegin
  const results = []

  while (curDate.toSeconds() < dateEnd.toSeconds()) {
    results.push({
      date: curDate,
      local: curDate.toLocal(),
      results: breeds.map((breed) => breed.callback(curDate))
    })

    curDate = curDate.plus({ day: 1 })
  }
  return results
})

const dcTime = computed(() => ({
  begin: DateTime.fromISO(from.value, { zone: 'America/New_York' }),
  end: DateTime.fromISO(end.value, { zone: 'America/New_York' })
}))

function getSeasonalCycle(theDate: Date) {
  const offset = theDate.getMonth() + 1
  const cycle = getSolsticesAndEquinoxes(theDate.getFullYear())

  if (offset <= 3) {
    cycle.decemberSolstice = julian.JDToDate(solstice.december(theDate.getFullYear() - 1))
  } else if (offset <= 6) {
    cycle.marchEquinox = julian.JDToDate(solstice.march(theDate.getFullYear() - 1))
  } else if (offset <= 9) {
    cycle.juneSolstice = julian.JDToDate(solstice.june(theDate.getFullYear() - 1))
  } else if (offset <= 12) {
    cycle.septemberEquinox = julian.JDToDate(solstice.september(theDate.getFullYear() - 1))
  }

  return cycle
}

function isBetween(d: Date, start: Date, end: Date) {
  return d.getTime() >= start.getTime() && d.getTime() <= end.getTime()
}

function getDefaultDateRange() {
  const fmt = (d: Date) =>
    `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`

  const current = new Date()
  const start = fmt(current)
  current.setDate(current.getDate() + 7)
  const end = fmt(current)
  return [start, end]
}
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
  width: 100%;
  margin: 0 auto;
}
#forecast-table td {
  padding: 0.25rem;
}

.breeds-available {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.breed-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: 1px solid;
  width: 7rem;
  padding: 0.5rem;
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
</style>
