<template>
  <div class="table">
    <span
      v-for="(hourly, index) in forecast"
      :key="index"
      :title="`${hourly.colour.split('_').at(-1)}: ${hourly.interval.start.toLocaleString(
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
  > .firegem_blue {
    background: #1d3f94;
  }
  > .firegem_green {
    background: #13623a;
  }
  > .firegem_red {
    background: #8e0d14;
  }

  > .spward_day {
    background: #302661;
  }
  > .spward_glowy {
    background: #66062a;
  }
  > .spward_glowier {
    background: #8d142c;
  }
  > .spward_glowiest {
    background: hsl(20, 100%, 30%);
  }
  > .spward_glowmostest {
    background: hsl(35, 100%, 40%);
  }

  > .stratos_dawn {
    background: #944697;
  }
  > .stratos_day {
    background: #4f85ac;
  }
  > .stratos_dusk {
    background: #574585;
  }
  > .stratos_night {
    background: #334155;
  }
}
</style>
