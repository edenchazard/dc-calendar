<template>
  <div class="table">
    <span
      v-for="(hourly, index) in forecast"
      :key="index"
      :title="`${hourly.colour}: ${hourly.interval.start.toLocaleString(
        DateTime.TIME_24_WITH_SECONDS,
      )} – ${hourly.interval.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`"
      :class="hourly.colour.toLowerCase()"
    >
      {{ hourly.date.toLocaleString(DateTime.TIME_SIMPLE) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import type { Interval } from 'luxon';

defineProps<{
  forecast: Array<{
    interval: Interval<true>;
    colour: string;
    image: string;
    date: DateTime<boolean>;
  }>;
}>();
</script>

<style scoped lang="postcss">
.table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 3rem);

  > span {
    text-align: center;
    display: block;
    font-size: 0.8rem;
    padding: 0.5rem 0;
    word-spacing: 100rem;
    overflow: hidden;
  }
  > .blue {
    background: #1d3f94;
  }
  > .green {
    background: #13623a;
  }
  > .red {
    background: #8e0d14;
  }

  > .day {
    background: #302661;
  }
  > .glowy {
    background: #66062a;
  }
  > .glowier {
    background: #8d142c;
  }
  > .glowiest {
    background: hsl(20, 100%, 30%);
  }
  > .glowmostest {
    background: hsl(35, 100%, 40%);
  }
}
</style>
