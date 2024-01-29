import { DateTime } from 'luxon'
import type { Zone } from 'luxon'
import { determineSeason, seasonsOfCurrentYear } from './utils'

export function getBreedsLocal(zone: string | Zone) {
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
        image: new URL('../assets/eggs/seasonal_winter.gif', import.meta.url).pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: season.name === 'winter',
        begin: seasonsOfCurrentYear(d)['winter'].start,
        end: seasonsOfCurrentYear(d)['winter'].end
      }
    },

    (d) => {
      const season = determineSeason(d)
      return {
        name: 'Seasonal (Spring)',
        biome: 'Alpine',
        image: new URL('../assets/eggs/seasonal_spring.webp', import.meta.url).pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: season.name === 'spring',
        begin: seasonsOfCurrentYear(d)['spring'].start,
        end: seasonsOfCurrentYear(d)['spring'].end
      }
    },

    (d) => {
      const season = determineSeason(d)
      return {
        name: 'Seasonal (Summer)',
        biome: 'Alpine',
        image: new URL('../assets/eggs/seasonal_summer.webp', import.meta.url).pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: season.name === 'summer',
        begin: seasonsOfCurrentYear(d)['summer'].start,
        end: seasonsOfCurrentYear(d)['summer'].end
      }
    },

    (d) => {
      const season = determineSeason(d)
      return {
        name: 'Seasonal (Autumn)',
        biome: 'Alpine',
        image: new URL('../assets/eggs/seasonal_autumn.webp', import.meta.url).pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: season.name === 'autumn',
        begin: seasonsOfCurrentYear(d)['autumn'].start,
        end: seasonsOfCurrentYear(d)['autumn'].end
      }
    },

    (d) => {
      const now = d.toSeconds()
      const begin = DateTime.fromISO(`${d.year}-02-08T00:00:00`, {
        zone: 'America/New_York'
      }).setZone(zone)
      const end = DateTime.fromISO(`${d.year}-02-14T23:59:59`, {
        zone: 'America/New_York'
      }).setZone(zone)

      return {
        name: 'Previous Valentines',
        biome: 'Holiday',
        image: new URL('../assets/eggs/amarignis_egg.webp', import.meta.url).pathname,
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
      }).setZone(zone)
      const end = DateTime.fromISO(`${d.year}-02-16T23:59:59`, {
        zone: 'America/New_York'
      }).setZone(zone)

      return {
        name: `${d.year} Valentine`,
        biome: 'All',
        image: new URL('../assets/eggs/mystery.gif', import.meta.url).pathname,
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
  return breeds
}
