<script>
export default {
  name: 'TaxIdNumber',
};
</script>

<script setup>
import { createTaxID } from '../utils/TaxIdCreater';
import { ref } from 'vue';
import { useSystemwiseStore } from '../store/systemwise';
import { taxIdList } from '../utils/tax';

const autoTaxId = ref('');
const getTaxId = ref('');
const store = useSystemwiseStore();

function autoCreateTaxId() {
  autoTaxId.value = createTaxID();
}

function copyPixCodeClick(result) {
  let ele = document.getElementById(result);
  navigator.clipboard.writeText(ele.innerHTML);
}

async function test() {
  await store.fetchData(autoTaxId.value);
}

function getRandomTaxId() {
  const taxId = taxIdList[Math.floor(Math.random() * taxIdList.length)];

  getTaxId.value = taxId;
}
</script>

<template>
  <!-- 1 -->
  <h2 class="page-name">
    1.資料來源<a href="https://data.gov.tw/dataset/9400" target="_blank"
      >政府資料開放平臺</a
    >
  </h2>
  <QBtn class="btn" type="button" @click="getRandomTaxId" label="取得統編" />

  <div class="result-wrapper">
    <div>結果:</div>
    <div class="result" id="getTaxIdResult">{{ getTaxId }}</div>
  </div>

  <QBtn
    class="btn"
    type="button"
    @click="copyPixCodeClick('getTaxIdResult')"
    label="複製"
    :disabled="!getTaxId"
    style="margin-right: 8px"
  />

  <!-- 2 -->
  <h2 class="page-name">2.隨機產生統一編號(公司可能不存在)</h2>
  <QBtn class="btn" type="button" @click="autoCreateTaxId" label="自動產生" />
  <div class="result-wrapper">
    <div>產生結果:</div>
    <div class="result" id="autoTaxIdResult">{{ autoTaxId }}</div>
  </div>

  <QBtn
    class="btn"
    type="button"
    @click="copyPixCodeClick('autoTaxIdResult')"
    label="複製"
    :disabled="!autoTaxId"
    style="margin-right: 8px"
  />

  <div style="margin: 6px 0">
    <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank"
      >Request temporary access to the demo server</a
    >
  </div>

  <QBtn
    class="btn"
    type="button"
    @click="test"
    label="檢查"
    :disabled="!autoTaxId"
  />

  <div>公司是否存在 ==> {{ store.companyExist }}</div>

  <div>公司: {{ store.componeyData[0]?.exist }}</div>
  <div>分公司: {{ store.componeyData[1]?.exist }}</div>
  <div>商業: {{ store.componeyData[2]?.exist }}</div>

  <div class="hint" style="width: 520px; margin-top: 6px">
    <div class="icon-container">
      <QIcon name="question_mark" size="14px" />
    </div>
    <p class="content">
      檢查結果依據<a href="https://findbiz.nat.gov.tw/fts/query/QueryBar/queryInit.do" target="_blank"
        >經濟部商工登記</a>
      ，非<a href="https://www.etax.nat.gov.tw/etwmain/etw113w1/ban/query" target="_blank"
        >財政部稅籍登記</a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.page-name {
  color: #1e305f;
  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
}
.btn {
  margin-bottom: 10px;
}
.result-wrapper {
  height: 60px;
  font-size: 16px;
}

.result {
  font-size: 20px;
}
.hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1.5px solid #939dae;
  border-radius: 8px;
  background: #f2f5f7;

  .icon-container {
    flex-basis: 28px;
    max-width: 18px;
    min-width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #939dae;
    line-height: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.q-icon) {
      padding-bottom: 1px;
      color: white;
    }
  }

  p.content {
    color: #333333;
    font-size: 16px;
    line-height: 24px;
    white-space: pre-wrap; // 可以用 \n 斷行
    margin: 0;
  }
}
</style>
