import { DateTime } from 'luxon';
import {
  determineSeason,
  heraldColour,
  seasonsOfCurrentYear,
  sonataProbability,
} from './calculations';
import type { BreedCallback } from '@/types/types';

export function getBreedsLocal() {
  const breeds: Array<BreedCallback> = [
    (d) => {
      const season = determineSeason(d);
      return {
        name: 'Seasonal (Winter)',
        biome: 'Alpine',
        image: new URL('/public/eggs/seasonal_winter.gif', import.meta.url)
          .pathname,
        backgroundColour: '#B0E0E6',
        accentColour: '#000',
        availability: season.name === 'winter',
        begin: seasonsOfCurrentYear(d)['winter'].start,
        end: seasonsOfCurrentYear(d)['winter'].end,
        probability: null,
      };
    },

    (d) => {
      const season = determineSeason(d);
      return {
        name: 'Seasonal (Spring)',
        biome: 'Forest',
        image: new URL('/public/eggs/seasonal_spring.webp', import.meta.url)
          .pathname,
        backgroundColour: '#228B22',
        accentColour: '255, 237, 253',
        availability: season.name === 'spring',
        begin: seasonsOfCurrentYear(d)['spring'].start,
        end: seasonsOfCurrentYear(d)['spring'].end,
        probability: null,
      };
    },

    (d) => {
      const season = determineSeason(d);
      return {
        name: 'Seasonal (Summer)',
        biome: 'Forest',
        image: new URL('/public/eggs/seasonal_summer.webp', import.meta.url)
          .pathname,
        backgroundColour: '#217d00',
        accentColour: '250, 224, 158',
        availability: season.name === 'summer',
        begin: seasonsOfCurrentYear(d)['summer'].start,
        end: seasonsOfCurrentYear(d)['summer'].end,
        probability: null,
      };
    },

    (d) => {
      const season = determineSeason(d);
      return {
        name: 'Seasonal (Autumn)',
        biome: 'Forest',
        image: new URL('/public/eggs/seasonal_autumn.webp', import.meta.url)
          .pathname,
        backgroundColour: '#7d4824',
        accentColour: '255, 255, 255',
        availability: season.name === 'autumn',
        begin: seasonsOfCurrentYear(d)['autumn'].start,
        end: seasonsOfCurrentYear(d)['autumn'].end,
        probability: null,
      };
    },

    (d) => {
      const begin = DateTime.fromObject({ day: 8, month: 2, year: d.year });
      const end = DateTime.fromObject({
        day: 14,
        month: 2,
        year: d.year,
        hour: 23,
        minute: 59,
        second: 59,
      });
      return {
        name: 'Previous Valentines',
        biome: 'Holiday',
        image: new URL('/public/eggs/mint_valentines.png', import.meta.url)
          .pathname,
        backgroundColour: '#FFC0CB',
        accentColour: '#000',
        availability: d >= begin && d <= end,
        begin,
        end,
        probability: null,
      };
    },

    (d) => {
      const begin = DateTime.fromObject({ day: 25, month: 10, year: d.year });
      const end = DateTime.fromObject({
        day: 31,
        month: 10,
        year: d.year,
        hour: 23,
        minute: 59,
        second: 59,
      });
      return {
        name: 'Previous Halloweens',
        biome: 'Holiday',
        image: new URL('/public/eggs/mint_halloween.png', import.meta.url)
          .pathname,
        backgroundColour: '#993300',
        accentColour: '#000',
        availability: d >= begin && d <= end,
        begin,
        end,
        probability: null,
      };
    },

    (d) => {
      const begin = DateTime.fromObject({ day: 31, month: 10, year: d.year });
      const end = DateTime.fromObject({
        day: 31,
        month: 10,
        year: d.year,
        hour: 23,
        minute: 59,
        second: 59,
      });
      return {
        name: `${d.year} Halloween`,
        biome: 'All',
        image: new URL('/public/eggs/mystery.gif', import.meta.url).pathname,
        backgroundColour: '#993300',
        accentColour: '#000',
        availability: d.toISODate() === begin.toISODate(),
        begin,
        end,
        probability: null,
      };
    },

    (d) => {
      const begin = DateTime.fromObject({ day: 19, month: 12, year: d.year });
      const end = DateTime.fromObject({
        day: 25,
        month: 12,
        year: d.year,
        hour: 23,
        minute: 59,
        second: 59,
      });
      return {
        name: 'Previous Holidays',
        biome: 'Holiday',
        image: new URL('/public/eggs/mint_christmas.png', import.meta.url)
          .pathname,
        backgroundColour: '#FFC0CB',
        accentColour: '#000',
        availability: d >= begin && d <= end,
        begin,
        end,
        probability: null,
      };
    },

    (d) => {
      const begin = DateTime.fromObject({
        day: 25,
        month: 12,
        year: d.year,
      });

      const end = DateTime.fromObject({
        day: 27,
        month: 12,
        year: d.year,
        hour: 23,
        minute: 59,
        second: 59,
      });

      return {
        name: `${d.year} Holiday`,
        biome: 'All',
        image: new URL('/public/eggs/mystery.gif', import.meta.url).pathname,
        backgroundColour: '#FFC0CB',
        accentColour: '#000',
        availability: d >= begin && d <= end,
        begin,
        end,
        probability: null,
      };
    },

    (d) => {
      const begin = DateTime.fromObject({ day: 21, month: 5, year: d.year });
      return {
        name: 'Birthday Release',
        biome: 'Holiday',
        image: new URL('/public/eggs/mint_birthday.png', import.meta.url)
          .pathname,
        backgroundColour: '#ecdfbf',
        accentColour: '#000',
        availability: d.toISODate() === begin.toISODate(),
        begin,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const begin = DateTime.fromObject({
        day: 14,
        month: 2,
        year: d.year,
      });

      const end = DateTime.fromObject({
        day: 16,
        month: 2,
        year: d.year,
        hour: 23,
        minute: 59,
        second: 59,
      });

      return {
        name: `${d.year} Valentine`,
        biome: 'All',
        image: new URL('/public/eggs/mystery.gif', import.meta.url).pathname,
        backgroundColour: '#FFC0CB',
        accentColour: '#000',
        availability: d >= begin && d <= end,
        begin,
        end,
        probability: null,
      };
    },

    (d) => {
      const availability = d.weekday === 1;
      return {
        name: `Gemshard (Jade)`,
        biome: 'Jungle',
        image: new URL('/public/eggs/gemshard_jade.webp', import.meta.url)
          .pathname,
        backgroundColour: '#055e48',
        accentColour: '255, 255, 255',
        availability,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const availability = d.weekday === 2;
      return {
        name: `Gemshard (Ruby)`,
        biome: 'Jungle',
        image: new URL('/public/eggs/gemshard_ruby.webp', import.meta.url)
          .pathname,
        backgroundColour: '#B22222',
        accentColour: '255, 255, 255',
        availability,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const availability = d.weekday === 3;
      return {
        name: `Gemshard (Sapphire)`,
        biome: 'Jungle',
        image: new URL('/public/eggs/gemshard_sapphire.webp', import.meta.url)
          .pathname,
        backgroundColour: '#000587',
        accentColour: '255, 255, 255',
        availability,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const availability = d.weekday === 4;
      return {
        name: `Gemshard (Amethyst)`,
        biome: 'Jungle',
        image: new URL('/public/eggs/gemshard_amethyst.webp', import.meta.url)
          .pathname,
        backgroundColour: '#47078c',
        accentColour: '255, 255, 255',
        availability,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const availability = d.weekday === 5;
      return {
        name: `Gemshard (Aqua)`,
        biome: 'Jungle',
        image: new URL('/public/eggs/gemshard_aqua.webp', import.meta.url)
          .pathname,
        backgroundColour: '#007791',
        accentColour: '255, 255, 255',
        availability,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const availability = d.weekday === 6;
      return {
        name: `Gemshard (Citrine)`,
        biome: 'Jungle',
        image: new URL('/public/eggs/gemshard_citrine.webp', import.meta.url)
          .pathname,
        backgroundColour: '#a67400',
        accentColour: '255, 255, 255',
        availability,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const probability = sonataProbability(d, 0);
      return {
        name: `Sonata (Gold)`,
        biome: 'All',
        image: new URL('/public/eggs/sonata_gold.webp', import.meta.url)
          .pathname,
        backgroundColour: '#9c5300',
        accentColour: '255, 231, 204',
        availability: probability > 0,
        probability,
        begin: null,
        end: null,
      };
    },

    (d) => {
      const probability = sonataProbability(d, 1);
      return {
        name: `Sonata (Blue)`,
        biome: 'All',
        image: new URL('/public/eggs/sonata_blue.webp', import.meta.url)
          .pathname,
        backgroundColour: '#172f99',
        accentColour: '211, 218, 248',
        availability: probability > 0,
        probability,
        begin: null,
        end: null,
      };
    },

    (d) => {
      const probability = sonataProbability(d, 2);
      return {
        name: `Sonata (Silver)`,
        biome: 'All',
        image: new URL('/public/eggs/sonata_silver.webp', import.meta.url)
          .pathname,
        backgroundColour: '#616161',
        accentColour: '230, 230, 230',
        availability: probability > 0,
        probability,
        begin: null,
        end: null,
      };
    },

    (d) => {
      const colour = heraldColour(d);
      return {
        name: `Lunar Herald (Indigo)`,
        biome: ['Alpine', 'Desert', 'Volcano'],
        image: new URL('/public/eggs/lunar_herald_indigo.webp', import.meta.url)
          .pathname,
        backgroundColour: '#00008B',
        accentColour: '255, 255, 255',
        availability: colour === 3,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const colour = heraldColour(d);
      return {
        name: `Lunar Herald (Bronze)`,
        biome: ['Alpine', 'Desert', 'Volcano'],
        image: new URL('/public/eggs/lunar_herald_bronze.webp', import.meta.url)
          .pathname,
        backgroundColour: '#A0522D',
        accentColour: '255, 255, 255',
        availability: colour === 2,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const colour = heraldColour(d);
      return {
        name: `Lunar Herald (Gold)`,
        biome: ['Alpine', 'Desert', 'Volcano'],
        image: new URL('/public/eggs/lunar_herald_gold.webp', import.meta.url)
          .pathname,
        backgroundColour: '#5c3700',
        accentColour: '240, 197, 41',
        availability: colour === 1,
        begin: null,
        end: null,
        probability: null,
      };
    },

    (d) => {
      const colour = heraldColour(d);
      return {
        name: `Lunar Herald (Silver)`,
        biome: ['Alpine', 'Desert', 'Volcano'],
        image: new URL('/public/eggs/lunar_herald_silver.webp', import.meta.url)
          .pathname,
        backgroundColour: '#C0C0C0',
        accentColour: '#000',
        availability: colour === 0,
        begin: null,
        end: null,
        probability: null,
      };
    },
  ];

  return breeds;
}
