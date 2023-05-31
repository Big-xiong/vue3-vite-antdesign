<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  iconClass: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  overflow: hidden;
  fill: currentColor;
}
</style>
