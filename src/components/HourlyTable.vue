<template>
  <div class="table">
    <span
      :title="`${hourly.colour}: ${hourly.interval.start.toLocaleString(
        DateTime.TIME_24_WITH_SECONDS,
      )} – ${hourly.interval.end.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`"
      :key="hourly.interval.start.toSeconds()"
      :class="hourly.colour.toLowerCase()"
      v-for="hourly in forecast"
    >
      {{ hourly.date.toLocaleString(DateTime.TIME_SIMPLE) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { DateTime, Interval } from 'luxon';
import type { PropType } from 'vue';

defineProps({
  forecast: {
    type: Array as PropType<
      {
        interval: Interval<true>;
        colour: string;
        image: string;
        date: DateTime<boolean>;
      }[]
    >,
    required: true,
  },
});
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
    background: rgb(69, 69, 114);
  }
  > .green {
    background: rgb(87, 128, 87);
  }
  > .red {
    background: rgb(110, 73, 73);
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
