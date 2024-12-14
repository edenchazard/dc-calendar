<template>
  <span
    v-if="condition"
    class="active-badge"
    >active</span
  >
</template>

<script setup lang="ts">
defineProps({
  condition: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.active-badge {
  background: linear-gradient(
    90deg,
    rgba(7, 41, 1, 1) 0%,
    rgba(57, 125, 20, 1) 100%
  );
  color: #fff;
  border-radius: 5px;
  display: inline-block;
  padding: 0.1rem 0.5rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  margin-left: 0.5rem;
  letter-spacing: 0.075rem;
}
</style>
