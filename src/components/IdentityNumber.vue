<script>
export default {
  name: 'IdentityNumber',
};
</script>

<script setup>
import { createID, createARC } from '../utils/idnoCreater';
import { ref } from 'vue';

const autoNewId = ref('');
const autoARC = ref('');

const selectCity = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Z',
  'L',
  'R',
  'S',
  'Y',
];

function autoCreateNewId() {
  const randomCity = Math.floor(Math.random() * selectCity.length);
  const selectGender = [1, 2];
  const randomGender = Math.floor(Math.random() * selectGender.length);
  autoNewId.value = createID(
    selectCity[randomCity],
    selectGender[randomGender],
  );
}

function copyPixCodeClick(result) {
  let ele = document.getElementById(result);
  navigator.clipboard.writeText(ele.innerHTML);
}

function autoCreateNewResidentPermitId() {
  const randomCity = Math.floor(Math.random() * selectCity.length);
  const selectGender = [8, 9];
  const randomGender = Math.floor(Math.random() * selectGender.length);
  autoARC.value = createID(selectCity[randomCity], selectGender[randomGender]);
}

function autoCreateOldResidentPermitId() {
  const randomCity = Math.floor(Math.random() * selectCity.length);
  const selectGender = ['A', 'B', 'C', 'D'];
  const randomGender = Math.floor(Math.random() * selectGender.length);
  autoARC.value = createARC(selectCity[randomCity], selectGender[randomGender]);
}
</script>

<template>
  <h2 class="page-name">1.身分證字號</h2>
  <QBtn class="btn" type="button" @click="autoCreateNewId" label="自動產生" />
  <div class="result-wrapper">
    <div>產生結果:</div>
    <div class="result" id="getNewIdResult">{{ autoNewId }}</div>
  </div>

  <QBtn
    class="btn"
    type="button"
    @click="copyPixCodeClick('getNewIdResult')"
    label="複製"
    :disabled="!autoNewId"
  />

  <h2 class="page-name">2.居留證號</h2>
  <QBtn
    class="btn"
    type="button"
    @click="autoCreateNewResidentPermitId"
    label="新式"
    style="margin-right: 8px"
  />
  <QBtn
    class="btn"
    type="button"
    @click="autoCreateOldResidentPermitId"
    label="舊式"
  />
  <div class="result-wrapper">
    <div>產生結果:</div>
    <div class="result" id="getARCResult">{{ autoARC }}</div>
  </div>

  <QBtn
    class="btn"
    type="button"
    @click="copyPixCodeClick('getARCResult')"
    label="複製"
    :disabled="!autoARC"
  />

  <div class="hint" style="width: 650px; margin-top: 6px">
    <div class="icon-container">
      <QIcon name="question_mark" size="14px" />
    </div>
    <div class="content">
      <div>新式居留證</div>
      <div>第2碼：性別碼，8為男性、9為女性。</div>
      <div>
        第3碼：身分碼，0-6：外國人、7：無戶籍國民、8：港澳居民、9：大陸地區人民。
      </div>
    </div>
  </div>

  <div class="hint" style="width: 650px; margin-top: 6px">
    <div class="icon-container">
      <QIcon name="question_mark" size="14px" />
    </div>
    <div class="content">
      <div>舊式居留證</div>
      <div>第2碼：性別碼，</div>
      <div>無戶籍國民與中港澳地區人民：男性使用 A、女性使用 B、</div>
      <div>外國人：男性使用 C、女性使用 D。</div>
    </div>
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

  div.content {
    color: #333333;
    font-size: 16px;
    line-height: 24px;
    white-space: pre-wrap; // 可以用 \n 斷行
    margin: 0;
  }
}
table,
th,
td {
  border: 1px solid #333;
}
</style>
