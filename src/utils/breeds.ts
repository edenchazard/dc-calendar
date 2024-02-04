import { DateTime } from 'luxon';
import { determineSeason, seasonsOfCurrentYear } from './utils';

export function getBreedsLocal() {
  const breeds: Array<
    (d: DateTime) => {
      name: string;
      biome: string;
      image: string;
      backgroundColour: string;
      accentColour: string;
      availability: boolean;
      begin: DateTime | null;
      end: DateTime | null;
    }
  > = [
    (d) => {
      const season = determineSeason(d);
      return {
        name: 'Seasonal (Winter)',
        biome: 'Alpine',
        image: new URL('../assets/eggs/seasonal_winter.gif', import.meta.url)
          .pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: season.name === 'winter',
        begin: seasonsOfCurrentYear(d)['winter'].start,
        end: seasonsOfCurrentYear(d)['winter'].end,
      };
    },

    (d) => {
      const season = determineSeason(d);
      return {
        name: 'Seasonal (Spring)',
        biome: 'Alpine',
        image: new URL('../assets/eggs/seasonal_spring.webp', import.meta.url)
          .pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: season.name === 'spring',
        begin: seasonsOfCurrentYear(d)['spring'].start,
        end: seasonsOfCurrentYear(d)['spring'].end,
      };
    },

    (d) => {
      const season = determineSeason(d);
      return {
        name: 'Seasonal (Summer)',
        biome: 'Alpine',
        image: new URL('../assets/eggs/seasonal_summer.webp', import.meta.url)
          .pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: season.name === 'summer',
        begin: seasonsOfCurrentYear(d)['summer'].start,
        end: seasonsOfCurrentYear(d)['summer'].end,
      };
    },

    (d) => {
      const season = determineSeason(d);
      return {
        name: 'Seasonal (Autumn)',
        biome: 'Alpine',
        image: new URL('../assets/eggs/seasonal_autumn.webp', import.meta.url)
          .pathname,
        backgroundColour: '106, 162, 171',
        accentColour: '4, 63, 181',
        availability: season.name === 'autumn',
        begin: seasonsOfCurrentYear(d)['autumn'].start,
        end: seasonsOfCurrentYear(d)['autumn'].end,
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
        image: new URL('../assets/eggs/amarignis_egg.webp', import.meta.url)
          .pathname,
        backgroundColour: '204, 188, 209',
        accentColour: '181, 0, 6',
        availability: d >= begin && d <= end,
        begin,
        end,
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
        image: new URL('../assets/eggs/mystery.gif', import.meta.url).pathname,
        backgroundColour: '176, 141, 141',
        accentColour: '255, 0, 0',
        availability: d >= begin && d <= end,
        begin,
        end,
      };
    },

    (d) => {
      const availability = d.weekday === 1;
      return {
        name: `Gemshard (Jade)`,
        biome: 'Jungle',
        image: new URL('../assets/eggs/gemshard_jade.webp', import.meta.url)
          .pathname,
        backgroundColour: '176, 141, 141',
        accentColour: '255, 0, 0',
        availability,
        begin: availability ? d.startOf('day') : null,
        end: null,
      };
    },

    (d) => {
      const availability = d.weekday === 2;
      return {
        name: `Gemshard (Ruby)`,
        biome: 'Jungle',
        image: new URL('../assets/eggs/gemshard_ruby.webp', import.meta.url)
          .pathname,
        backgroundColour: '176, 141, 141',
        accentColour: '255, 0, 0',
        availability,
        begin: availability ? d.startOf('day') : null,
        end: null,
      };
    },

    (d) => {
      const availability = d.weekday === 3;
      return {
        name: `Gemshard (Sapphire)`,
        biome: 'Jungle',
        image: new URL('../assets/eggs/gemshard_sapphire.webp', import.meta.url)
          .pathname,
        backgroundColour: '176, 141, 141',
        accentColour: '255, 0, 0',
        availability,
        begin: availability ? d.startOf('day') : null,
        end: null,
      };
    },

    (d) => {
      const availability = d.weekday === 4;
      return {
        name: `Gemshard (Amethyst)`,
        biome: 'Jungle',
        image: new URL('../assets/eggs/gemshard_amethyst.webp', import.meta.url)
          .pathname,
        backgroundColour: '176, 141, 141',
        accentColour: '255, 0, 0',
        availability,
        begin: availability ? d.startOf('day') : null,
        end: null,
      };
    },

    (d) => {
      const availability = d.weekday === 5;
      return {
        name: `Gemshard (Aqua)`,
        biome: 'Jungle',
        image: new URL('../assets/eggs/gemshard_aqua.webp', import.meta.url)
          .pathname,
        backgroundColour: '176, 141, 141',
        accentColour: '255, 0, 0',
        availability,
        begin: availability ? d.startOf('day') : null,
        end: null,
      };
    },

    (d) => {
      const availability = d.weekday === 6;
      return {
        name: `Gemshard (Citrine)`,
        biome: 'Jungle',
        image: new URL('../assets/eggs/gemshard_citrine.webp', import.meta.url)
          .pathname,
        backgroundColour: '176, 141, 141',
        accentColour: '255, 0, 0',
        availability,
        begin: availability ? d.startOf('day') : null,
        end: null,
      };
    },
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
  ];
  return breeds;
}
