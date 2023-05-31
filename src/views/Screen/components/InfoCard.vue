<template>
  <div class="screen-info-card">
    <div class="screen-info-card-top">
      <div class="screen-info-card-top-bed">{{ info?.bedNo }}床</div>
      <div class="screen-info-card-top-info">
        <span>{{ info?.patientName }}</span>
        <span>{{ ['男', '女'][info?.sex] ?? '其他' }}-{{ info?.age }}岁</span>
      </div>
      <div class="screen-info-card-top-date">
        <span>入院时间：{{ useFormatTime('yyyy-MM-dd', info?.inHospital) }}</span>
        <span>入院时长：{{ info?.inHospitalTime }}天</span>
      </div>
    </div>
    <div class="screen-info-card-bottom">
      <span>责任医生：{{ info?.doctorName ?? '-' }}</span>
      <span>责任护士：{{ info?.nurseName ?? '-' }}</span>
    </div>
  </div>
</template>

<script setup>
import { useFormatTime } from '../../../utils/hooks'
defineProps({
  info: {
    default: () => ({}),
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.screen-info-card {
  width: 530px;
  background: var(--primary-gradient-bg-color);
  color: var(--font-color-fff);
  border-radius: var(--border-radius);
  overflow: hidden;
  &-top {
    &-bed {
      font-size: 56px;
      text-align: center;
      margin-top: 26px;
    }
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 100px;
      margin: 23px 0 69px;
      span {
        &:first-child {
          font-size: 44px;
        }
        &:last-child {
          font-size: 24px;
        }
      }
    }
    &-date {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 28px;
      margin-bottom: 80px;
      span {
        font-size: 24px;
      }
    }
  }
  &-bottom {
    background: var(--primary-color);
    line-height: 100px;
    padding: 0 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 24px;
    }
  }
}
</style>
