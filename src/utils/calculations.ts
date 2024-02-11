import { solstice } from 'astronomia';
import { DateTime, Interval } from 'luxon';
import { getOverlappingRangeOrNearest, mapJDSeasonsToDateTime } from './utils';
import moon from './moon.json' assert { type: 'json' };
import type { JDSeasonalCycle, SeasonName } from './types';
import { cache } from './cache';

/**
 * @param d Date to test against
 * @param colour 0 = gold, 1 = blue, 2 = silver
 */
export function sonataProbability(d: DateTime, colour: number): number {
  const ts = Math.floor(
    ((((d.toMillis() / 100000 - 16835652) / 864) % 128) + 128) % 128,
  );
  return moon.sonata[ts][colour];
}

/**
 *
 * @param d Date to test against
 * @returns The herald colour. 0 = Silver, 1 = Gold, 2 = Bronze, 3 = Indigo
 */
export function heraldColour(d: DateTime): number {
  const ts = Math.floor(
    ((((d.toMillis() / 100000 - 16833924) / 864) % 32) + 32) % 32,
  );
  return moon.herald[ts];
}

export function getJDSolsticesAndEquinoxes(year: number): JDSeasonalCycle {
  return {
    marchEquinox: solstice.march(year),
    juneSolstice: solstice.june(year),
    septemberEquinox: solstice.september(year),
    decemberSolstice: solstice.december(year),
  };
}

export function determineSeason(date: DateTime): {
  name: SeasonName;
  begin: DateTime;
  end: DateTime;
} {
  const tricycle = [date.year - 1, date.year, date.year + 1];
  const [previousYear, currentYear, nextYear] = tricycle.map((year) =>
    cache(`eqsol-${year}`, () =>
      mapJDSeasonsToDateTime(getJDSolsticesAndEquinoxes(year)),
    ),
  );

  if (date >= currentYear.decemberSolstice) {
    return {
      name: 'winter',
      begin: currentYear.decemberSolstice,
      end: nextYear.marchEquinox,
    };
  }
  if (date >= currentYear.septemberEquinox) {
    return {
      name: 'autumn',
      begin: currentYear.septemberEquinox,
      end: currentYear.decemberSolstice,
    };
  }
  if (date >= currentYear.juneSolstice) {
    return {
      name: 'summer',
      begin: currentYear.juneSolstice,
      end: currentYear.septemberEquinox,
    };
  }
  if (date >= currentYear.marchEquinox) {
    return {
      name: 'spring',
      begin: currentYear.marchEquinox,
      end: currentYear.juneSolstice,
    };
  }
  if (date >= previousYear.decemberSolstice) {
    return {
      name: 'winter',
      begin: previousYear.decemberSolstice,
      end: currentYear.marchEquinox,
    };
  }

  throw new Error('unable to deduce season');
}

export function seasonsOfCurrentYear(date: DateTime) {
  const previousYear = mapJDSeasonsToDateTime(
    getJDSolsticesAndEquinoxes(date.year - 1),
  );
  const currentYear = mapJDSeasonsToDateTime(
    getJDSolsticesAndEquinoxes(date.year),
  );
  const nextYear = mapJDSeasonsToDateTime(
    getJDSolsticesAndEquinoxes(date.year + 1),
  );

  const seasons = {
    winter: {
      start:
        date < currentYear.marchEquinox
          ? previousYear.decemberSolstice
          : currentYear.decemberSolstice,
      end:
        date < currentYear.marchEquinox
          ? currentYear.marchEquinox
          : nextYear.marchEquinox,
    },
    spring: {
      start: currentYear.marchEquinox,
      end: currentYear.juneSolstice,
    },
    summer: {
      start: currentYear.juneSolstice,
      end: currentYear.septemberEquinox,
    },
    autumn: {
      start: currentYear.septemberEquinox,
      end: currentYear.decemberSolstice,
    },
  };

  return seasons;
}

/**
 * @returns A Interval calculating the DST period for new york of the given year.
 */
export function getNewYorkDSTPeriodForYear(year: number): Interval<true> {
  return Interval.fromDateTimes(
    DateTime.local()
      .set({ year, month: 2 })
      .endOf('month')
      .startOf('day')
      .set({ weekday: 7, hour: 1, minute: 59, second: 59 })
      .plus({ days: 7 }),
    DateTime.local()
      .set({ year, month: 10 })
      .endOf('month')
      .startOf('day')
      .set({ weekday: 7, hour: 1, minute: 59, second: 59 }),
  ) as Interval<true>;
}

export function getDaytimeIntervalForDateTime(dt: DateTime): Interval<true> {
  return getOverlappingRangeOrNearest(
    dt,
    Interval.fromDateTimes(
      dt.set({
        hour: 6,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
      dt.set({
        hour: 17,
        minute: 59,
        second: 59,
        millisecond: 0,
      }),
    ),
  );
}

export function getNighttimeIntervalForDateTime(dt: DateTime): Interval<true> {
  return getOverlappingRangeOrNearest(
    dt,
    Interval.fromDateTimes(
      dt
        .set({
          hour: 18,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .minus({ days: 1 }),
      dt.set({
        hour: 5,
        minute: 59,
        second: 59,
        millisecond: 0,
      }),
    ),
  );
}

export function getSunriseIntervalForDateTime(dt: DateTime): Interval<true> {
  return getOverlappingRangeOrNearest(
    dt,
    Interval.fromDateTimes(
      dt.set({
        hour: 6,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
      dt.set({
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
    ),
  );
}

export function getSunsetIntervalForDateTime(dt: DateTime): Interval<true> {
  return Interval.fromDateTimes(
    dt.set({
      hour: 18,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    dt.plus({ days: 1 }).startOf('day'),
  ) as Interval<true>;
}

export function getZombieIntervalForDateTime(dt: DateTime): Interval<true> {
  return getOverlappingRangeOrNearest(
    dt,
    Interval.fromDateTimes(
      dt.set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
      dt.set({
        hour: 6,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
    ),
  );
}

export function getFireGemForDateTime(dt: DateTime): {
  colour: string;
  image: string;
  interval: Interval<true>;
} {
  let colour: string;
  let image: URL;

  switch (dt.hour % 3) {
    case 0:
      colour = 'Blue';
      image = new URL('/public/eggs/fire_gem_blue.webp', import.meta.url);
      break;
    case 1:
      colour = 'Red';
      image = new URL('/public/eggs/fire_gem_red.webp', import.meta.url);
      break;
    case 2:
      colour = 'Green';
      image = new URL('/public/eggs/fire_gem_green.webp', import.meta.url);
      break;
    default:
      throw new Error('bad fire gem');
  }

  return {
    colour,
    image: image.pathname,
    interval: Interval.fromDateTimes(
      dt.startOf('hour'),
      dt.endOf('hour'),
    ) as Interval<true>,
  };
}
