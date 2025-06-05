<script setup>
import { twMerge } from 'tailwind-merge'

defineProps({
  textClasses: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="w-full grow flex items-center justify-center flex-col" role="status">
    <p :class="twMerge('text-lg mt-4', textClasses)">
      <slot>No result</slot>
    </p>
  </div>
</template>
