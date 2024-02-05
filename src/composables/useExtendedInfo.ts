import { determineSeason } from '@/utils/utils';
import { Interval, DateTime } from 'luxon';
import type { Ref } from 'vue';
import { computed } from 'vue';

export function useExtendedInfo(
  dragCaveTime: Ref<DateTime>,
  localTime: Ref<DateTime>,
) {
  const season = computed(() => determineSeason(dragCaveTime.value));

  const seasonIcon = computed(() => {
    switch (determineSeason(dragCaveTime.value).name) {
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
    if ([0, 3, 6, 9, 12, 15, 18, 21].includes(dragCaveTime.value.hour)) {
      return {
        name: 'Blue',
        image: new URL('/public/eggs/fire_gem_blue.webp', import.meta.url)
          .pathname,
      };
    } else if (
      [1, 4, 7, 10, 13, 16, 19, 22].includes(dragCaveTime.value.hour)
    ) {
      return {
        name: 'Red',
        image: new URL('/public/eggs/fire_gem_red.webp', import.meta.url)
          .pathname,
      };
    }

    return {
      name: 'Green',
      image: new URL('/public/eggs/fire_gem_green.webp', import.meta.url)
        .pathname,
    };
  });

  const zombies = computed(() => dragCaveTime.value.hour < 6);

  const sunbeamMoonglow = computed(() => {
    const sunbeam = Interval.fromDateTimes(
      dragCaveTime.value
        .set({
          hour: 6,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .setZone(localTime.value.zone),

      dragCaveTime.value
        .set({
          hour: 17,
          minute: 59,
          second: 59,
          millisecond: 0,
        })
        .setZone(localTime.value.zone),
    );

    const moonglow = Interval.fromDateTimes(
      dragCaveTime.value
        .set({
          hour: 18,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .minus({ days: 1 })
        .setZone(localTime.value.zone),

      dragCaveTime.value
        .set({ hour: 5, minute: 59, second: 59, millisecond: 0 })
        .setZone(localTime.value.zone),
    );

    let image: string = new URL(
      '/public/eggs/sunbeam_moonglow.webp',
      import.meta.url,
    ).pathname;

    if (sunbeam.contains(dragCaveTime.value)) {
      image = new URL('/public/eggs/sunbeam.webp', import.meta.url).pathname;
    } else if (moonglow.contains(dragCaveTime.value)) {
      image = new URL('/public/eggs/moonglow.webp', import.meta.url).pathname;
    }

    return {
      image,
      sunbeam,
      moonglow,
    };
  });

  const sunriseSunset = computed(() => {
    const sunrise = Interval.fromDateTimes(
      DateTime.fromObject({
        hour: 6,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).setZone(localTime.value.zone),
      DateTime.fromObject({
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).setZone(localTime.value.zone),
    );

    const sunset = Interval.fromDateTimes(
      DateTime.fromObject({
        hour: 18,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).setZone(localTime.value.zone),
      dragCaveTime.value
        .plus({ days: 1 })
        .startOf('day')
        .setZone(localTime.value.zone),
    );

    let image: string = new URL(
      '/public/eggs/sunrise_sunset.webp',
      import.meta.url,
    ).pathname;
    if (sunset.contains(dragCaveTime.value)) {
      image = new URL('/public/eggs/sunset.webp', import.meta.url).pathname;
    } else if (sunrise.contains(dragCaveTime.value)) {
      image = new URL('/public/eggs/sunrise.webp', import.meta.url).pathname;
    }

    return {
      image,
      sunrise,
      sunset,
    };
  });

  return {
    season,
    seasonIcon,
    offsetWording,
    fireGem,
    zombies,
    sunbeamMoonglow,
    sunriseSunset,
  };
}
