<template>
  <span
    class="active-badge"
    v-if="condition"
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
  background: lightgreen;
  color: #000;
  border-radius: 5px;
  display: inline-block;
  padding: 0.1rem 0.5rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  margin-left: 0.5rem;
}
</style>
