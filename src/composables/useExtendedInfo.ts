import {
  determineSeason,
  getFireGemForDateTime,
  getMoonglowIntervalForDateTime,
  getNewYorkDSTPeriodForYear,
  getSunbeamIntervalForDateTime,
  getSunriseIntervalForDateTime,
  getSunsetIntervalForDateTime,
  getZombieIntervalForDateTime,
} from '@/utils/calculations';
import { localiseInterval } from '@/utils/utils';
import { Interval, DateTime } from 'luxon';
import type { Ref } from 'vue';
import { computed } from 'vue';

export function useExtendedInfo(
  dragCaveTime: Ref<DateTime>,
  localTime: Ref<DateTime>,
) {
  /**
   * Helper to adjust an interval to the zone from the user
   */
  const local = (interval: Interval) =>
    localiseInterval(interval, localTime.value.zone);

  const season = computed(() => determineSeason(dragCaveTime.value));

  const dst = computed(() =>
    local(getNewYorkDSTPeriodForYear(dragCaveTime.value.year)),
  );

  const seasonIcon = computed(() => {
    switch (season.value.name) {
      case 'autumn':
        return 'canadian-maple-leaf';
      case 'spring':
        return 'leaf';
      case 'summer':
        return 'sun';
    }
    return 'snowflake';
  });

  const offsetWording = computed(() => {
    const offset = (dragCaveTime.value.offset - localTime.value.offset) / 60;
    if (offset === 0) {
      return 'the same time as you.';
    }

    return (
      Math.abs(offset).toString() +
      ' hours ' +
      (offset > 0 ? 'ahead of you.' : 'behind you.')
    );
  });

  const fireGem = computed(() => getFireGemForDateTime(dragCaveTime.value));

  const zombies = computed<Interval>(() =>
    local(getZombieIntervalForDateTime(dragCaveTime.value)),
  );

  const sunbeam = computed<Interval>(() =>
    local(getSunbeamIntervalForDateTime(dragCaveTime.value)),
  );

  const moonglow = computed<Interval>(() =>
    local(getMoonglowIntervalForDateTime(dragCaveTime.value)),
  );

  const sunbeamMoonglowImage = computed<string>(() => {
    if (sunbeam.value.contains(localTime.value)) {
      return new URL('/public/eggs/sunbeam.webp', import.meta.url).pathname;
    } else if (moonglow.value.contains(localTime.value)) {
      return new URL('/public/eggs/moonglow.webp', import.meta.url).pathname;
    }

    return new URL('/public/eggs/sunbeam_moonglow.webp', import.meta.url)
      .pathname;
  });

  const sunrise = computed(() =>
    local(getSunriseIntervalForDateTime(dragCaveTime.value)),
  );

  const sunset = computed(() =>
    local(getSunsetIntervalForDateTime(dragCaveTime.value)),
  );

  const sunriseSunsetImage = computed(() => {
    if (sunset.value.contains(dragCaveTime.value)) {
      return new URL('/public/eggs/sunset.webp', import.meta.url).pathname;
    } else if (sunrise.value.contains(dragCaveTime.value)) {
      return new URL('/public/eggs/sunrise.webp', import.meta.url).pathname;
    }

    return new URL('/public/eggs/sunrise_sunset.webp', import.meta.url)
      .pathname;
  });

  return {
    season,
    seasonIcon,
    offsetWording,
    fireGem,
    zombies,
    sunbeamMoonglowImage,
    moonglow,
    sunbeam,
    sunriseSunsetImage,
    sunrise,
    sunset,
    dst,
  };
}
