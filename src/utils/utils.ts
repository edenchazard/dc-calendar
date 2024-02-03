import { solstice, julian } from 'astronomia';
import { DateTime, Zone } from 'luxon';
import { cache } from './cache';

interface Seasons {
  decemberSolstice: DateTime;
  marchEquinox: DateTime;
  juneSolstice: DateTime;
  septemberEquinox: DateTime;
}

interface JDSeasonalCycle {
  decemberSolstice: number;
  marchEquinox: number;
  juneSolstice: number;
  septemberEquinox: number;
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
  name: 'winter' | 'autumn' | 'summer' | 'spring';
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

export function jdToDateTime(jD: number, zone?: Zone) {
  return DateTime.fromJSDate(julian.JDToDate(jD), { zone });
}

export function mapJDSeasonsToDateTime(
  jDSeasons: JDSeasonalCycle,
  zone?: Zone,
): Seasons {
  return Object.fromEntries(
    Object.entries(jDSeasons).map(([season, date]) => [
      season,
      date instanceof DateTime ? date : jdToDateTime(date, zone),
    ]),
  );
}
