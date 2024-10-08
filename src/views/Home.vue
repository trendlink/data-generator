<script>
export default {
  name: 'Home',
};
</script>

<script setup>
import DayDayAssess from '../components/DayDayAssess.vue';
import OneKeyPay from '../components/OneKeyPay.vue';
import IdentityNumber from '../components/IdentityNumber.vue';
import TaxIdNumber from '../components/TaxIdNumber.vue';
import { ref } from 'vue';

const tab = ref('taxIdNumber');
</script>

<template>
  <h2 class="page-name">資料產生器</h2>
  <QTabs
    v-model="tab"
    inline-label
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
  >
    <QTab name="dayday" icon="mail" label="日日考核" />
    <QTab name="onekey" icon="alarm" label="一鍵發薪" />
    <QTab name="idNumber" icon="people" label="身分證字號" />
    <QTab name="taxIdNumber" icon="thumb_up" label="統編" />
  </QTabs>

  <QTabPanels v-model="tab" animated>
    <QTabPanel name="dayday">
      <DayDayAssess/>
    </QTabPanel>

    <QTabPanel name="onekey">
      <OneKeyPay/>
    </QTabPanel>

    <QTabPanel name="idNumber">
      <IdentityNumber/>
    </QTabPanel>

    <QTabPanel name="taxIdNumber">
      <TaxIdNumber/>
    </QTabPanel>
  </QTabPanels>
</template>

<style lang="scss" scoped>
.page-name {
  color: #1e305f;
  font-size: 24px;
  font-weight: 600;
  line-height: 18px;
}

.q-tab-panels {
  background-color: whitesmoke;
}
</style>
