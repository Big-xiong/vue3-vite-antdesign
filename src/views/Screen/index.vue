<template>
  <div class="screen-wrap">
    <header>
      <div class="screen-wrap-head-left">
        <a-avatar :size="54" :src="info?.hospitalLogo">
          <!-- <template #icon><UserOutlined /></template> -->
        </a-avatar>
        <span class="screen-wrap-head-left-hospital">{{ info?.hospitalName }}</span>
      </div>
      <div class="screen-wrap-head-mid">病区：{{ info?.areaName }}</div>
      <div class="screen-wrap-head-date">{{ time }}</div>
    </header>
    <main>
      <div>
        <InfoCard :info="info" />
        <DiseaseCard :info="info.diseaseList" />
      </div>
      <TypeCard :info="info.nurseList" />
      <OperateWrap
        :info="{
          checkRemindList: info.checkRemindList,
          isRemind: info.isRemind,
          patientId: info.patientId
        }"
      />
    </main>
  </div>
</template>

<script setup>
import { useFormatTime, useWebSocket } from '../../utils/hooks'
import InfoCard from './components/InfoCard.vue'
import DiseaseCard from './components/DiseaseCard.vue'
import TypeCard from './components/TypeCard.vue'
import OperateWrap from './components/OperateWrap.vue'
import { ref, onBeforeUnmount } from 'vue'

const info = ref({})
const time = ref(null)
let timer = null

const { wsInit, ws } = useWebSocket(
  'ws://8.134.57.215/ws/base/bedScreen/socket/532ff4d2f017ff804edacbeee2f21cfc',
  handleMsg
)
wsInit(() => {
  handleSend()
})
handleTime()

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

function handleTime() {
  if (timer) {
    clearInterval(timer)
    timer = null
    handleTime()
  } else {
    timer = setInterval(() => {
      time.value = useFormatTime('yyyy/MM/dd 星期 HH:mm:ss')
    }, 1000)
  }
}

function handleSend() {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify({ cmd: 'PATI_BED_SCREEN_DATA', data: { deviceId: 'C1141232' } }))
  } else {
    setTimeout(() => {
      handleSend()
    }, 100)
  }
}

function handleMsg(data) {
  info.value = data?.data?.bedScreenDto ?? {}
  console.log(info.value)
}
</script>

<style lang="scss" scoped>
.screen-wrap {
  width: 1440px;
  margin: 0 auto;
  padding: 58px 0;
  color: var(--primary-font-color);
  &-head-left {
    display: flex;
    align-items: center;
    &-hospital {
      font-size: 28px;
      font-weight: 500;
      margin-left: 34px;
    }
  }
  &-head-mid {
    color: var(--primary-color);
    font-size: 46px;
  }
  &-head-date {
    font-size: 28px;
  }
  // background: var(--primary-gradient-bg-color);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 44px;
  }
  main {
    display: flex;
    justify-content: space-between;
  }
}
</style>
