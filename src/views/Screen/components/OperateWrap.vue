<template>
  <div class="operate-wrap">
    <div class="operate-wrap-alert">
      <h3>提醒事项</h3>
      <a-switch
        :checkedValue="1"
        :unCheckedValue="0"
        v-model:checked="isRemind"
        @change="handleSwitch"
      />
    </div>
    <div class="operate-wrap-swipe">
      <h3>{{ info?.checkRemindList?.[activeIdx]?.checkName }}</h3>
      <a-carousel autoplay dotPosition="bottom" dotsClass="dot-wrap" :afterChange="handleChange">
        <div
          class="operate-wrap-swipe-content"
          v-for="(item, index) in info?.checkRemindList"
          :key="index"
        >
          <p>{{ item?.checkTime }}</p>
          <p>{{ item?.deptName }}</p>
        </div>
      </a-carousel>
      <div
        class="operate-wrap-ercode"
        v-qrcode="info?.checkRemindList?.[activeIdx]?.qrcode ?? 'allwona.com'"
      ></div>
      <div class="operate-wrap-action">
        <span>
          <SvgIcon icon-class="home" />
        </span>
        <a-button>护理</a-button>
      </div>
    </div>
    <a-button class="operate-wrap-call">呼叫</a-button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { setDefaultReminder } from '../../../api'
import { useRequest } from 'ahooks-vue'

const props = defineProps({
  info: {
    default: () => ({}),
    type: Object
  }
})
const isRemind = ref(0)
watch(
  () => props.info.isRemind,
  (val) => {
    isRemind.value = val
  },
  {
    immediate: true
  }
)
const activeIdx = ref(0)
const { run } = useRequest(setDefaultReminder, {
  manual: true
})

function handleChange(cIdx) {
  activeIdx.value = cIdx
}

function handleSwitch(val) {
  run({ patientId: props?.info?.patientId, isEnable: val })
}
</script>

<style lang="scss" scoped>
.operate-wrap {
  &-alert {
    width: 446px;
    padding: 14px 26px;
    background: var(--light-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--border-radius);
    h3 {
      color: var(--primary-color);
      font-size: 24px;
    }
  }
  &-swipe {
    width: 446px;
    margin-top: 24px;
    > h3 {
      color: var(--primary-color);
      font-size: 28px;
      padding-left: 26px;
      margin-bottom: 24px;
    }
    &-content {
      color: #79c3d1;
      font-size: 20px;
      margin-bottom: 10px;
      padding: 0 64px;
    }
    .ant-carousel {
      margin-bottom: 50px;
    }
  }
  &-action {
    display: flex;
    justify-content: space-between;
    padding: 0 45px 0 33px;
    > span {
      background: var(--light-color);
      border-radius: var(--border-radius);
      width: 74px;
      height: 74px;
      display: flex;
      align-items: center;
      justify-content: center;
      .svg-icon {
        width: 54px;
        height: 54px;
      }
    }
    .ant-btn {
      width: 270px;
      height: 74px;
      background: var(--light-gradient-bg-color);
      color: var(--primary-color);
      font-size: 28px;
      border: 0;
      border-radius: var(--border-radius);
    }
  }
  &-call {
    width: 446px;
    height: 74px;
    background: var(--primary-alert-color);
    color: var(--font-color-fff);
    font-size: 28px;
    border: 0;
    border-radius: var(--border-radius);
    margin-top: 26px;
  }
  &-ercode {
    margin-bottom: 22px;
    :deep(img) {
      margin: 0 auto;
      width: 190px;
    }
  }
  :deep(.dot-wrap) {
    bottom: -32px;
    .slick-active {
      button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--primary-color);
      }
    }
    li {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #d8d8d8;
    }
  }
}
</style>
