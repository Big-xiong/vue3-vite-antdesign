<template>
  <div class="disease-card">
    <h3>病症：</h3>
    <p>{{ info?.[0] }}</p>
  </div>
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
.disease-card {
  padding: 18px;
  background: var(--light-gradient-bg-color);
  font-weight: 500;
  margin-top: 30px;
  border-radius: var(--border-radius);
  padding: 18px 18px 38px 18px;
  h3 {
    color: var(--primary-color);
    font-size: 28px;
    text-align: left;
  }
  p {
    color: var(--primary-color);
    font-size: 34px;
    text-align: center;
  }
}
</style>
