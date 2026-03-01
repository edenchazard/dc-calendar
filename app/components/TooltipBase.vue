<template>
  <VDropdown :triggers="['hover']">
    <slot />
    <template #popper>
      <div>
        <slot name="popper" />
      </div>
    </template>
  </VDropdown>
</template>
