import {
  determineSeason,
  getDaytimeIntervalForDateTime,
  getFireGemForDateTime,
  getNewYorkDSTPeriodForYear,
  getNighttimeIntervalForDateTime,
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
  function local(obj: Interval): Interval;
  function local(obj: DateTime): DateTime;
  function local(obj: DateTime | Interval) {
    return DateTime.isDateTime(obj)
      ? obj.setZone(localTime.value.zone)
      : localiseInterval(obj, localTime.value.zone);
  }

  const season = computed(() => determineSeason(dragCaveTime.value));

  const daytime = computed(() =>
    local(getDaytimeIntervalForDateTime(dragCaveTime.value)),
  );

  const nighttime = computed(() =>
    local(getNighttimeIntervalForDateTime(dragCaveTime.value)),
  );

  const sunrise = computed(() =>
    local(getSunriseIntervalForDateTime(dragCaveTime.value)),
  );

  const sunset = computed(() =>
    local(getSunsetIntervalForDateTime(dragCaveTime.value)),
  );

  const dst = computed(() =>
    local(getNewYorkDSTPeriodForYear(dragCaveTime.value.year)),
  );

  const gemshardSwitchOver = computed(() =>
    local(dragCaveTime.value.startOf('day').plus({ days: 1 })),
  );

  const moonSwitchOver = computed(() =>
    local(dragCaveTime.value.startOf('day').set({ hour: 20 })),
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

  const fireGem = computed(() => {
    const gem = getFireGemForDateTime(dragCaveTime.value);
    return {
      ...gem,
      interval: local(gem.interval),
    };
  });

  const zombies = computed(() =>
    local(getZombieIntervalForDateTime(dragCaveTime.value)),
  );

  const harkfrostImage = computed<string>(() => {
    if (daytime.value.contains(localTime.value)) {
      return new URL('/public/eggs/harkfrost_daytime.png', import.meta.url)
        .pathname;
    }
    return new URL('/public/eggs/harkfrost_nighttime.webp', import.meta.url)
      .pathname;
  });

  const sunbeamMoonglowImage = computed<string>(() => {
    if (daytime.value.contains(localTime.value)) {
      return new URL('/public/eggs/sunbeam.webp', import.meta.url).pathname;
    }
    return new URL('/public/eggs/moonglow.webp', import.meta.url).pathname;
  });

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
    daytime,
    nighttime,
    sunrise,
    sunset,
    dst,
    zombies,
    gemshardSwitchOver,
    moonSwitchOver,
    fireGem,
    seasonIcon,
    offsetWording,
    sunbeamMoonglowImage,
    sunriseSunsetImage,
    harkfrostImage,
  };
}
