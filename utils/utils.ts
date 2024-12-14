// @ts-expect-error - No types available for 'astronomia'
import { julian } from 'astronomia';
import { DateTime, Interval } from 'luxon';
import type { Zone } from 'luxon';
import type { JDSeasonalCycle, Seasons } from '../types/types';

export function jdToDateTime(jD: number) {
  return DateTime.fromJSDate(julian.JDToDate(jD));
}

const fmt = (date: DateTime | number) =>
  date instanceof DateTime ? date : jdToDateTime(date);

export function mapJDSeasonsToDateTime(jDSeasons: JDSeasonalCycle): Seasons {
  return {
    decemberSolstice: fmt(jDSeasons.decemberSolstice),
    juneSolstice: fmt(jDSeasons.juneSolstice),
    marchEquinox: fmt(jDSeasons.marchEquinox),
    septemberEquinox: fmt(jDSeasons.septemberEquinox),
  };
}

export function getOverlappingRangeOrNearest(
  date: DateTime,
  interval: Interval,
): Interval {
  const possibleRanges = [
    interval.mapEndpoints((d) => d.minus({ days: 1 })),
    interval,
    interval.mapEndpoints((d) => d.plus({ days: 1 })),
  ];

  return possibleRanges.find(
    (d) => date < (d.start as DateTime) || date < (d.end as DateTime),
  ) as Interval;
}

export function localiseInterval(
  interval: Interval<true>,
  timezone: string | Zone,
) {
  return Interval.fromDateTimes(
    interval.start?.setZone(timezone),
    interval.end?.setZone(timezone),
  );
}
