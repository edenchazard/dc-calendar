import { solstice, julian } from 'astronomia';
import { DateTime } from 'luxon';
import type { JDSeasonalCycle, SeasonName, Seasons } from './types';
import { cache } from './cache';
import moon from './moon.json' assert { type: 'json' };

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

export function jdToDateTime(jD: number) {
  return DateTime.fromJSDate(julian.JDToDate(jD));
}

export function mapJDSeasonsToDateTime(jDSeasons: JDSeasonalCycle): Seasons {
  const fmt = (date: DateTime | number) =>
    date instanceof DateTime ? date : jdToDateTime(date);
  return {
    decemberSolstice: fmt(jDSeasons.decemberSolstice),
    juneSolstice: fmt(jDSeasons.juneSolstice),
    marchEquinox: fmt(jDSeasons.marchEquinox),
    septemberEquinox: fmt(jDSeasons.septemberEquinox),
  };
}

/**
 * @param d Date to test against
 * @param colour 0 = gold, 1 = blue, 2 = silver
 */
export function sonataProbability(d: DateTime, colour: number): number {
  const ts = Math.floor(((d.toMillis() / 100000 - 16835652) / 864) % 128);
  return moon.sonata[ts][colour];
}

/**
 *
 * @param d Date to test against
 * @returns The herald colour. 0 = Silver, 1 = Gold, 2 = Bronze, 3 = Indigo
 */
export function heraldColour(d: DateTime): number {
  const ts = Math.floor(((d.toMillis() / 100000 - 16833924) / 864) % 32);
  return moon.herald[ts];
}
