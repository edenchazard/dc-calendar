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
        canonical: 'seasonal-winter',
        biome: ['Alpine'],
        image: new URL('/public/sprites/seasonal_winter.webp', import.meta.url)
          .pathname,
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
        canonical: 'seasonal-spring',
        biome: ['Forest'],
        image: new URL('/public/sprites/seasonal_spring.webp', import.meta.url)
          .pathname,
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
        canonical: 'seasonal-summer',
        biome: ['Forest'],
        image: new URL('/public/sprites/seasonal_summer.webp', import.meta.url)
          .pathname,
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
        canonical: 'seasonal-autumn',
        biome: ['Forest'],
        image: new URL('/public/sprites/seasonal_autumn.webp', import.meta.url)
          .pathname,
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
        canonical: 'valentines-previous',
        biome: ['Holiday'],
        image: new URL('/public/sprites/mint_valentines.webp', import.meta.url)
          .pathname,
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
        canonical: 'halloween-previous',
        biome: ['Holiday'],
        image: new URL('/public/sprites/mint_halloween.webp', import.meta.url)
          .pathname,
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
        canonical: 'halloween-unknown',
        biome: ['All'],
        image: new URL('/public/sprites/mystery.webp', import.meta.url)
          .pathname,

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
        canonical: 'holidays-previous',
        biome: ['Holiday'],
        image: new URL('/public/sprites/mint_christmas.webp', import.meta.url)
          .pathname,
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
        canonical: 'holidays-unknown',
        biome: ['All'],
        image: new URL('/public/sprites/mystery.webp', import.meta.url)
          .pathname,

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
        canonical: 'birthday-release',
        biome: ['Holiday'],
        image: new URL('/public/sprites/mint_birthday.webp', import.meta.url)
          .pathname,
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
        canonical: 'valentines-unknown',
        biome: ['All'],
        image: new URL('/public/sprites/mystery.webp', import.meta.url)
          .pathname,

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
        canonical: 'gemshard-jade',
        biome: ['Jungle'],
        image: new URL('/public/sprites/gemshard_jade.webp', import.meta.url)
          .pathname,
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
        canonical: 'gemshard-ruby',
        biome: ['Jungle'],
        image: new URL('/public/sprites/gemshard_ruby.webp', import.meta.url)
          .pathname,
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
        canonical: 'gemshard-sapphire',
        biome: ['Jungle'],
        image: new URL(
          '/public/sprites/gemshard_sapphire.webp',
          import.meta.url,
        ).pathname,
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
        canonical: 'gemshard-amethyst',
        biome: ['Jungle'],
        image: new URL(
          '/public/sprites/gemshard_amethyst.webp',
          import.meta.url,
        ).pathname,
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
        canonical: 'gemshard-aqua',
        biome: ['Jungle'],
        image: new URL('/public/sprites/gemshard_aqua.webp', import.meta.url)
          .pathname,
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
        canonical: 'gemshard-citrine',
        biome: ['Jungle'],
        image: new URL('/public/sprites/gemshard_citrine.webp', import.meta.url)
          .pathname,
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
        canonical: 'sonata-gold',
        biome: ['All'],
        image: new URL('/public/sprites/sonata_gold.webp', import.meta.url)
          .pathname,
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
        canonical: 'sonata-blue',
        biome: ['All'],
        image: new URL('/public/sprites/sonata_blue.webp', import.meta.url)
          .pathname,
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
        canonical: 'sonata-silver',
        biome: ['All'],
        image: new URL('/public/sprites/sonata_silver.webp', import.meta.url)
          .pathname,
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
        canonical: 'lunar-herald-indigo',
        biome: ['Alpine', 'Desert', 'Volcano'],
        image: new URL(
          '/public/sprites/lunar_herald_indigo.webp',
          import.meta.url,
        ).pathname,
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
        canonical: 'lunar-herald-bronze',
        biome: ['Alpine', 'Desert', 'Volcano'],
        image: new URL(
          '/public/sprites/lunar_herald_bronze.webp',
          import.meta.url,
        ).pathname,
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
        canonical: 'lunar-herald-gold',
        biome: ['Alpine', 'Desert', 'Volcano'],
        image: new URL(
          '/public/sprites/lunar_herald_gold.webp',
          import.meta.url,
        ).pathname,
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
        canonical: 'lunar-herald-silver',
        biome: ['Alpine', 'Desert', 'Volcano'],
        image: new URL(
          '/public/sprites/lunar_herald_silver.webp',
          import.meta.url,
        ).pathname,
        availability: colour === 0,
        begin: null,
        end: null,
        probability: null,
      };
    },
  ];

  return breeds;
}
