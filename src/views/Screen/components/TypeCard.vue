<template>
  <ul class="type-card">
    <li v-for="(item, index) in info" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup>
defineProps({
  info: {
    default: () => [],
    type: Array
  }
})
</script>

<style lang="scss" scoped>
.type-card {
  // padding: 18px;
  font-size: 28px;
  font-weight: 500;
  li {
    background: var(--primary-gradient-bg-color);
    color: var(--font-color-fff);
    border-radius: 8px;
    width: 268px;
    line-height: 80px;
    text-align: center;
    margin-bottom: 38px;
  }
}
</style>
