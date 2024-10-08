<script>
export default {
  name: 'DayDayAssess',
};
</script>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { createID } from '../utils/idnoCreater';
import { randomChineseName } from '../utils/fakeData';
import { randomDate } from '../utils/createDate';

defineProps({
  msg: String,
});

let dayJson = ref([]);
let totalPeople = ref('');
let email = ref('');
let isDisabled1 = true;

function create(totalPeople) {
  dayJson.value = [];
  isDisabled1 = false;
  for (var i = 0; i < totalPeople; i++) {
    dayJson.value.push({
      employeeEmail: `${email.value}${i}@mailtest.com`,
      employeeNumber: Math.floor(Math.random() * 99999),
      onBoardAt: randomDate(new Date(2020, 0, 1), new Date(2023, 4, 1)),
      identityNumber: autoCreateNewId(),
      employeeName: randomChineseName(),
      departmentName: null,
      jobTitle: null,
      jobGrade: null,
      jobRank: null,
      initPoint: null,
      previousJobTenureYears: null,
      previousJobTenureMonths: null,
      previousJobTenureDays: null,
      basicPointNames: null,
      employeeComment: null,
    });
  }
  console.log('dayJson', dayJson.value);
}

//身分證字號
const autoNewId = ref('');
function autoCreateNewId() {
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
  const randomCity = Math.floor(Math.random() * selectCity.length);
  const selectGender = [1, 2];
  const randomGender = Math.floor(Math.random() * selectGender.length);
  autoNewId.value = createID(
    selectCity[randomCity],
    selectGender[randomGender],
  );
  return autoNewId.value;
}

const ExportXlsx = () => {
  // 創建工作表
  const importEmployeeTemplate = XLSX.utils.json_to_sheet(dayJson.value);
  // 創建工作簿
  const workbook = XLSX.utils.book_new();
  // 將工作表放入工作簿中
  XLSX.utils.book_append_sheet(workbook, importEmployeeTemplate, '員工資料');

  XLSX.utils.sheet_add_aoa(
    importEmployeeTemplate,
    [
      [
        'Email',
        '員工編號',
        '到職日期',
        '身分證字號',
        '姓名',
        '部門',
        '職稱',
        '職等',
        '職級',
        '起始分數',
        '過往年資-年',
        '過往年資-月',
        '過往年資-天',
        '基礎分',
        '員工備註',
      ],
    ],
    { origin: 'A1' },
  );

  importEmployeeTemplate['!cols'] = [
    { wch: 25 },
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 10 },
  ];

  //新增說明工作表
  const explainSheet = XLSX.utils.json_to_sheet([
    {
      name: '員工編號',
      description:
        '若公司編號模式為自動, 非必填, 填了也不使用。 若模式為手動, 必填, 請依照格式手動輸入',
    },
    {
      name: '到職日期',
      description:
        '必填, 請依照西元/月/日格式, 例如 1988 年 3 月 15 日, 請輸入 1988/03/15, 若格式錯誤該筆資料不予處理',
    },
    { name: '姓名', description: '必填, 請勿超過 100 個字' },
    {
      name: '身分證字號',
      description:
        '必填, 請輸入合法的身分證字號。 若公司已有某位員工使用某身分證字號註冊, 請勿再次使用該身分證字號。 若不合法, 則該筆資料不予處理',
    },
    {
      name: 'Email',
      description:
        '必填, 員工之電子郵件，此為員工預設之帳號，也是員工的註冊連結寄送信箱，若公司已有某位員工使用某 Email, 請勿再次使用該 Email',
    },
    {
      name: '起始分數',
      description:
        '非必填, 若公司有自己原本的計算分數基礎，可以在這邊給予起始分數，請輸入最小為 0 的整數。 若留空則系統判定為 0。 若輸入值不合法, 則該筆資料不予處理',
    },
    {
      name: '過往年資-年',
      description:
        '非必填, 若留空則系統預設判定為 0。 請輸入最小為 0 的整數，若輸入值不合法，則該筆資料不予處理',
    },
    {
      name: '過往年資-月',
      description:
        '非必填, 若留空則系統預設判定為 0。 請輸入介於 0 ~ 12 的整數，若輸入值不合法，則該筆資料不予處理',
    },
    {
      name: '過往年資-日',
      description:
        '非必填, 若留空則系統預設判定為 0。 請輸入介於 0 ~ 31 的整數，若輸入值不合法，則該筆資料不予處理',
    },
    {
      name: '職稱',
      description: '非必填, 只可帶下拉選單提供的值, 若希望無職稱則請留空',
    },
    {
      name: '部門',
      description: '非必填, 只可帶下拉選單提供的值, 若希望無部門則請留空',
    },
    {
      name: '職等',
      description: '非必填, 請輸入數字, 最低為 0, 若留空則代表該員工無職等',
    },
    {
      name: '職級',
      description: '非必填, 請輸入數字, 最低為 0, 若留空則該代表該員工無職級',
    },
    {
      name: '基礎分',
      description:
        "非必填, 若要一次性輸入多個基礎分, 請使用逗號隔開不同的基礎分, 例如 '基礎分名稱1,基礎分名稱2,基礎分名稱3'",
    },
    { name: '員工備註', description: "員工備註', '非必填" },
  ]);

  // 將工作表放入工作簿中
  XLSX.utils.book_append_sheet(workbook, explainSheet, '說明');

  XLSX.utils.sheet_add_aoa(explainSheet, [['欄位', '欄位說明']], {
    origin: 'A1',
  });

  explainSheet['!cols'] = [{ wch: 15 }, { wch: 100 }];

  // 生成文件並下載
  XLSX.writeFile(workbook, '日日考核-人員資料.xlsx');
};

const ExportXlsxBehaviorPoint = () => {
  let behaviorPointJson = [
    {
      behaviorPointCategoryName: '工作態度',
      name: '工作態度良好' + Math.floor(Math.random() * 100),
      method: '固定給分',
      sign: '加',
      maximum: 20,
      minimum: null,
      criteria: null,
      notDuplicateIn: null,
      employees: null,
    },
    {
      behaviorPointCategoryName: '日常工作',
      name: '值日生' + Math.floor(Math.random() * 100),
      method: '範圍給分',
      sign: '加',
      maximum: 70,
      minimum: 20,
      criteria: null,
      notDuplicateIn: null,
      employees: null,
    },
  ];
  const importBehaviorPointTemplate =
    XLSX.utils.json_to_sheet(behaviorPointJson);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    importBehaviorPointTemplate,
    '行為分資料',
  );

  XLSX.utils.sheet_add_aoa(
    importBehaviorPointTemplate,
    [
      [
        '類別',
        '項目名稱',
        '給分方式',
        '加減分',
        '最高分數',
        '最低分數',
        '評分標準',
        '不得重複計分',
        '可評分人',
      ],
    ],
    { origin: 'A1' },
  );

  XLSX.writeFile(workbook, '行為分資料.xlsx');
};

const ExportXlsxBasicPoint = () => {
  let basicPointJson = [
    {
      basicPointCategoryName: '學歷',
      name: '碩士',
      point: 80,
      cycle: '年',
      executeDate: '01/01',
      criteria: null,
      expiredAt: null,
    },
    {
      basicPointCategoryName: '學歷',
      name: '專科及大學',
      point: 30,
      cycle: '年',
      executeDate: '01/01',
      criteria: null,
      expiredAt: null,
    },
    {
      basicPointCategoryName: '學歷',
      name: '高中職(含)以下',
      point: 20,
      cycle: '年',
      executeDate: '01/01',
      criteria: null,
      expiredAt: null,
    },
    {
      basicPointCategoryName: '證照',
      name: '國家考試證照',
      point: 100,
      cycle: '一次性給分',
      executeDate: null,
      criteria: null,
      expiredAt: null,
    },
  ];

  const importBasicPointTemplate = XLSX.utils.json_to_sheet(basicPointJson);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    importBasicPointTemplate,
    '基礎分資料',
  );

  XLSX.utils.sheet_add_aoa(
    importBasicPointTemplate,
    [['類別', '項目名稱', '分數', '週期', '週期設定', '評分標準', '有效日期']],
    { origin: 'A1' },
  );

  XLSX.writeFile(workbook, '基礎分資料.xlsx');
};
</script>

<template>
  <h2 class="page-name">日日考核</h2>
  <div class="card">
    <div style="padding-bottom: 8px">
      員工人數 <input type="number" v-model="totalPeople" />
    </div>
    <div>
      Email <input type="text" v-model="email" /> @mailtest.com
      <button
        class="create-btn"
        style="margin-left: 8px"
        @click="create(totalPeople)"
        :disabled="!totalPeople || !email"
      >
        產生
      </button>
    </div>
  </div>
  
  <button class="create-btn" :disabled="isDisabled1" @click="ExportXlsx">
    匯出人員列表
  </button>

  <button class="create-btn" @click="ExportXlsxBehaviorPoint">
    匯出行為分
  </button>
  <button @click="ExportXlsxBasicPoint">匯出基礎分</button>

  <div class="id-table fix-width">
    <table>
      <thead>
        <tr>
          <th width="200px">Email</th>
          <th width="120px">員工編號</th>
          <th width="120px">到職日期</th>
          <th width="120px">身分證字號</th>
          <th width="140px">姓名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dayJson" :key="item">
          <td>{{ item.employeeEmail }}</td>
          <td>{{ item.employeeNumber }}</td>
          <td>{{ item.onBoardAt }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.employeeName }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <hr />
</template>

<style lang="scss" scoped>
.page-name {
  color: #1e305f;
  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
}

table,
td {
  border: 1px solid #333;
}

thead,
tfoot {
  background-color: #333;
  color: #fff;
}

.id-table {
  margin: 20px 0;
}
.fix-width {
  max-width: 800px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.create-btn {
  margin-right: 10px;
}
</style>
