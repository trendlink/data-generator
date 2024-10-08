<script>
export default {
  name: 'OneKeyPay',
};
</script>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { createID } from '../utils/idnoCreater';
import {
  randomChineseNameMale,
  randomChineseNameFemale,
  randomDepartment,
  randomSchool,
} from '../utils/fakeData';
import { randomDate } from '../utils/createDate';
import {
  basicSalarySetting,
  paymentInfoSetting,
  laborInsuranceSetting,
  healthInsuranceSetting,
  incomeWithholdingSetting,
  laborInjuryInsuranceSetting,
  laborPensionInsuranceSetting,
} from '../utils/salarySettingData';

defineProps({
  msg: String,
});

let totalPeople = ref('');
let email = ref('');
let isDisabled1 = true;
let isDisabled2 = true;
let addEmployer = ref(false);

let keyJson = ref([]);
let basicSalary = ref([]);
let paymentInfo = ref([]);
let laborInsurance = ref([]);
let healthInsurance = ref([]);
let incomeWithholding = ref([]);
let laborInjuryInsurance = ref([]);
let laborPensionInsurance = ref([]);

function createKey(totalPeople) {
  keyJson.value = [];
  isDisabled2 = false;
  for (var i = 0; i < totalPeople; i++) {
    keyJson.value.push({
      employeeEmail: `${email.value}${i}@keytest.com`, //必填
      employeeNumber: Math.floor(Math.random() * 99999), //必填
      onBoardAt: randomDate(new Date(2020, 0, 1), new Date(2023, 4, 1)), //必填
      identityNumber: autoCreateNewId(), //必填
      employeeName:
        i % 2 === 0 ? randomChineseNameMale() : randomChineseNameFemale(), //必填
      departmentName: null,
      jobTitle: null,
      jobGrade: 0,
      jobRank: 0,
      previousJobTenureYears: 0,
      previousJobTenureMonths: 0,
      previousJobTenureDays: 0,
      contractType:
        addEmployer.value === true && i === 0 ? '委任契約' : '僱傭契約', //契約種類 必填
      employmentType:
        addEmployer.value === true && i === 0 ? null : '不定期契約', //僱傭種類
      workingHoursType: addEmployer.value === true && i === 0 ? null : '全時', // 全時/部分工時
      agreeHoursOfWeek: null,
      contractDeadline: null,
      passportNumber: null,
      organisationEmail: `${email.value}${i}@keytest.com`, //公司 Email 必填
      contactInfoTelephoneInfo: '07-2324288', //公司電話 必填
      contactInfoExtensionInfo: null,
      contactInfoPhoneInfo: null,
      personalContactInfoPhoneInfo: '886982122123', //個人行動電話 必填
      personalContactInfoResidentialTelephoneInfo: null,
      gender: i % 2 === 0 ? '生理男性' : '生理女性', //性別 必填
      birthdate: randomDate(new Date(1975, 0, 1), new Date(2005, 0, 1)), //生日 必填
      highestGraduatedEducation: '大學', //最高學歷 必填
      highestGraduatedSchool: randomSchool(), //畢業學校 必填
      highestGraduatedDepartment: randomDepartment(), //畢業科系 必填
      nextHighestGraduatedEducation: null, //次高學歷
      nextHighestGraduatedSchool: null,
      nextHighestGraduatedDepartment: null,
      residenceAddressInfoCountry: null, //戶籍地址-國家
      residenceAddressInfoState: null,
      residenceAddressInfoCity: null,
      residenceAddressInfoDistrict: null,
      residenceAddressInfoCurrentAddress: null,
      sameAsResidenceAddressInfo: '是', //與戶籍地址相同
      currentAddressInfoCountry: null, //通訊地址-國家
      currentAddressInfoState: null,
      currentAddressInfoCity: null,
      currentAddressInfoDistrict: null,
      currentAddressInfoCurrentAddress: null,
      emergencyContactInfoName: null,
      emergencyContactInfoRelationship: null,
      emergencyContactInfoPhoneInfo: null,
      employeeComment: null,
    });
  }

  let newKey = keyJson.value.map((key) => {
    return {
      employeeName: key.employeeName,
      identityNumber: key.identityNumber,
    };
  });
  basicSalary = basicSalarySetting(newKey);
  paymentInfo = paymentInfoSetting(newKey);
  laborInsurance = laborInsuranceSetting(newKey);
  healthInsurance = healthInsuranceSetting(newKey);
  incomeWithholding = incomeWithholdingSetting(newKey);
  laborInjuryInsurance = laborInjuryInsuranceSetting(newKey);
  laborPensionInsurance = laborPensionInsuranceSetting(newKey);
  console.log('keyJson', keyJson.value);
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

const ExportXlsxKey = () => {
  // 創建工作表
  const importEmployeeTemplate = XLSX.utils.json_to_sheet(keyJson.value);
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
        '過往年資-年',
        '過往年資-月',
        '過往年資-天',
        '契約種類',
        '僱傭種類',
        '全時/部分工時',
        '每週約定工時',
        '契約期限',
        '護照號碼',
        '公司 Email',
        '公司電話',
        '公司分機',
        '公司手機',
        '個人行動電話',
        '個人住宅',
        '性別',
        '生日',
        '最高學歷',
        '畢業學校',
        '畢業科系',
        '次高學歷',
        '畢業學校',
        '畢業科系',
        '戶籍地址-國家',
        '戶籍地址-省、州',
        '戶籍地址-城市',
        '戶籍地址-區域',
        '戶籍地址-街道地址',
        '與戶籍地址相同',
        '通訊地址-國家',
        '通訊地址-省、州',
        '通訊地址-城市',
        '通訊地址-區域',
        '通訊地址-街道地址',
        '緊急聯絡人-姓名',
        '緊急聯絡人-關係',
        '緊急聯絡人-行動電話',
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
    { wch: 10 },
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 25 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  // 生成文件並下載
  XLSX.writeFile(workbook, '一鍵發薪-人員資料.xlsx');

  console.log('keyJson.value', keyJson.value);
};

const ExportSalarySettings = () => {
  const workbook = XLSX.utils.book_new();

  const importSalaryEmployeeSettingsTemplate =
    XLSX.utils.json_to_sheet(basicSalary);
  const paymentInfoSettingsTemplate = XLSX.utils.json_to_sheet(paymentInfo);
  const laborInsuranceSettingImportTemplate =
    XLSX.utils.json_to_sheet(laborInsurance);
  const healthInsuranceSettingImportTemplate =
    XLSX.utils.json_to_sheet(healthInsurance);
  const incomeWithholdingSettingImportTemplate =
    XLSX.utils.json_to_sheet(incomeWithholding);
  const laborInjuryInsuranceSettingBatchImport =
    XLSX.utils.json_to_sheet(laborInjuryInsurance);
  const laborPensionInsuranceSettingImportTemplate = XLSX.utils.json_to_sheet(
    laborPensionInsurance,
  );
  const employeeCommentImportTemplate = XLSX.utils.json_to_sheet([]);

  XLSX.utils.book_append_sheet(
    workbook,
    importSalaryEmployeeSettingsTemplate,
    '基本薪資資料',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    paymentInfoSettingsTemplate,
    '付款資訊',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    laborInsuranceSettingImportTemplate,
    '勞工保險資料',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    healthInsuranceSettingImportTemplate,
    '健康保險資料',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    incomeWithholdingSettingImportTemplate,
    '所得稅代扣資料',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    laborInjuryInsuranceSettingBatchImport,
    '職業災害保險資料',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    laborPensionInsuranceSettingImportTemplate,
    '勞工退休金資料',
  );
  XLSX.utils.book_append_sheet(workbook, employeeCommentImportTemplate, '備註');

  XLSX.utils.sheet_add_aoa(
    importSalaryEmployeeSettingsTemplate,
    [['姓名', '身分證字號', '計薪方式', '薪資不申報所得', '變更生效日期']],
    { origin: 'A1' },
  );
  importSalaryEmployeeSettingsTemplate['!cols'] = [
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  XLSX.utils.sheet_add_aoa(
    paymentInfoSettingsTemplate,
    [['姓名', '身分證字號', '付款方式', '付款銀行', '帳戶號碼']],
    { origin: 'A1' },
  );
  paymentInfoSettingsTemplate['!cols'] = [
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
  ];

  XLSX.utils.sheet_add_aoa(
    laborInsuranceSettingImportTemplate,
    [
      [
        '姓名',
        '身分證字號',
        '勞保身份',
        '類型(一般勞工)',
        '類型(外籍勞工)',
        '參加勞保',
        '加保日期',
        '勞保投保薪資',
        '約定自付勞保費',
        '參加就業保險',
        '自行投保於公會',
      ],
    ],
    { origin: 'A1' },
  );
  laborInsuranceSettingImportTemplate['!cols'] = [
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  XLSX.utils.sheet_add_aoa(
    healthInsuranceSettingImportTemplate,
    [
      [
        '姓名',
        '身分證字號',
        '健保身份',
        '參加健保',
        '加保日期',
        '健保投保薪資',
        '約定自付勞保費',
        '自行投保於公會',
      ],
    ],
    { origin: 'A1' },
  );
  healthInsuranceSettingImportTemplate['!cols'] = [
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  XLSX.utils.sheet_add_aoa(
    incomeWithholdingSettingImportTemplate,
    [
      [
        '姓名',
        '身分證字號',
        '納稅身份',
        '入境日',
        '扣繳方式',
        '扶養人數',
        '申報金額',
        '所得申報方式',
        '是否扣繳執行業務所得',
      ],
    ],
    { origin: 'A1' },
  );
  incomeWithholdingSettingImportTemplate['!cols'] = [
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 20 },
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  XLSX.utils.sheet_add_aoa(
    laborInjuryInsuranceSettingBatchImport,
    [
      [
        '姓名',
        '身分證字號',
        '災保身份',
        '參加職業災害保險',
        '加保日期',
        '職災投保薪資',
      ],
    ],
    { origin: 'A1' },
  );
  laborInjuryInsuranceSettingBatchImport['!cols'] = [
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  XLSX.utils.sheet_add_aoa(
    laborPensionInsuranceSettingImportTemplate,
    [
      [
        '姓名',
        '身分證字號',
        '勞退身份',
        '參加勞退',
        '勞退制度選擇',
        '轉換日期',
        '加保日期',
        '勞退投保薪資',
        '類型(外籍勞工適用)',
        '勞退雇主提繳率',
        '勞退員工提繳率',
      ],
    ],
    { origin: 'A1' },
  );
  laborPensionInsuranceSettingImportTemplate['!cols'] = [
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 15 },
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  XLSX.writeFile(workbook, '一鍵發薪-人員設定.xlsx');
};
</script>

<template>
  <h2 class="page-name">一鍵發薪</h2>

  <div class="card">
    <div style="padding-bottom: 8px">
      員工人數 <input type="number" v-model="totalPeople" />
    </div>
    <div>
      Email <input type="text" v-model="email" /> @keytest.com
      <button
        class="create-btn"
        style="margin-left: 8px"
        @click="createKey(totalPeople)"
        :disabled="!totalPeople || !email"
      >
        產生
      </button>
    </div>
  </div>

  <QCheckbox size="sm" v-model="addEmployer" label="添加一位委任契約(第一位)" />

  <div style="margin-top: 10px">
    <button class="create-btn" :disabled="isDisabled2" @click="ExportXlsxKey">
      匯出人員列表
    </button>
  </div>

  <div class="id-table">
    <table>
      <thead>
        <tr>
          <th width="120px">Email</th>
          <th width="80px">員工編號</th>
          <th width="86px">到職日期</th>
          <th width="86px">身分證字號</th>
          <th width="80px">姓名</th>
          <th width="80px">契約種類</th>
          <th width="100px">僱傭種類</th>
          <th width="80px">全時/部分工時</th>
          <th width="80px">個人行動電話</th>
          <th width="70px">性別</th>
          <th width="100px">生日</th>
          <th width="50px">最高學歷</th>
          <th width="70px">畢業學校</th>
          <th width="60px">畢業科系</th>
          <th width="60px">與戶籍地址相同</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in keyJson" :key="item">
          <td>{{ item.employeeEmail }}</td>
          <td>{{ item.employeeNumber }}</td>
          <td>{{ item.onBoardAt }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.employeeName }}</td>
          <td>{{ item.contractType }}</td>
          <td>{{ item.employmentType }}</td>
          <td>{{ item.workingHoursType }}</td>
          <td>{{ item.personalContactInfoPhoneInfo }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.birthdate }}</td>
          <td>{{ item.highestGraduatedEducation }}</td>
          <td>{{ item.highestGraduatedSchool }}</td>
          <td>{{ item.highestGraduatedDepartment }}</td>
          <td>{{ item.sameAsResidenceAddressInfo }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <hr />
  <button :disabled="isDisabled2" @click="ExportSalarySettings">
    匯出人員設定
  </button>
  <!-- 基本薪資資料 -->
  <div class="id-table fix-width">
    <div>基本薪資資料</div>
    <table>
      <thead>
        <tr>
          <th width="140px">姓名</th>
          <th width="120px">身分證字號</th>
          <th width="140px">計薪方式</th>
          <th width="140px">薪資不申報所得</th>
          <th width="140px">變更生效日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in basicSalary" :key="item">
          <td>{{ item.employeeName }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.paymentMethod }}</td>
          <td>{{ item.isNotWithholding }}</td>
          <td>{{ item.effectiveDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="id-table fix-width">
    <div>付款資訊</div>
    <table>
      <thead>
        <tr>
          <th width="140px">姓名</th>
          <th width="120px">身分證字號</th>
          <th width="140px">付款方式</th>
          <th width="140px">付款銀行</th>
          <th width="140px">帳戶號碼</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paymentInfo" :key="item">
          <td>{{ item.employeeName }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.paymentMethod }}</td>
          <td>{{ item.bankName }}</td>
          <td>{{ item.accountNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 勞保 -->
  <div class="id-table">
    <div>勞保</div>
    <table>
      <thead>
        <tr>
          <th width="120px">姓名</th>
          <th width="120px">身分證字號</th>
          <th width="120px">勞保身份</th>
          <th width="130px">類型(一般勞工)</th>
          <!-- <th width="130px">類型(外籍勞工)</th> -->
          <th width="70px">參加勞保</th>
          <th width="120px">加保日期</th>
          <th width="100px">勞保投保薪資</th>
          <th width="110px">參加就業保險</th>
          <th width="120px">自行投保於公會</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in laborInsurance" :key="item">
          <td>{{ item.employeeName }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.identity }}</td>
          <td>{{ item.typeForNormalEmployee }}</td>
          <!-- <td>{{ item.typeForForeignEmployee }}</td> -->
          <td>{{ item.isInLaborInsurance }}</td>
          <td>{{ item.insuredDate }}</td>
          <td>{{ item.scaleAmount }}</td>
          <td>{{ item.isInJobInsurance }}</td>
          <td>{{ item.isInGuild }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 健保 -->
  <div class="id-table">
    <div>健保</div>
    <table>
      <thead>
        <tr>
          <th width="120px">姓名</th>
          <th width="120px">身分證字號</th>
          <th width="120px">健保身份</th>
          <th width="70px">參加健保</th>
          <th width="100px">加保日期</th>
          <th width="100px">健保投保薪資</th>
          <th width="120px">自行投保於公會</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in healthInsurance" :key="item">
          <td>{{ item.employeeName }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.identity }}</td>
          <td>{{ item.isInHealthInsurance }}</td>
          <td>{{ item.insuredDate }}</td>
          <td>{{ item.scaleAmount }}</td>
          <td>{{ item.isInGuild }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 所得稅代扣 -->
  <div class="id-table">
    <div>薪資所得稅代扣</div>
    <table>
      <thead>
        <tr>
          <th width="120px">姓名</th>
          <th width="120px">身分證字號</th>
          <th width="120px">納稅身份</th>
          <th width="120px">扣繳方式</th>
          <th width="100px">扶養人數</th>
          <th width="150px">是否扣繳執行業務所得</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in incomeWithholding" :key="item">
          <td>{{ item.employeeName }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.identity }}</td>
          <td>{{ item.withholdingType }}</td>
          <td>{{ item.dependentsNumber }}</td>
          <td>{{ item.withholdingProfessionalIncome }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 職災 -->
  <div class="id-table">
    <div>職業災害保險</div>
    <table>
      <thead>
        <tr>
          <th width="120px">姓名</th>
          <th width="120px">身分證字號</th>
          <th width="120px">災保身份</th>
          <th width="100px">加保日期</th>
          <th width="120px">參加職業災害保險</th>
          <th width="100px">職災投保薪資</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in laborInjuryInsurance" :key="item">
          <td>{{ item.employeeName }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.identity }}</td>
          <td>{{ item.insuredDate }}</td>
          <td>{{ item.isInLaborInjuryInsurance }}</td>
          <td>{{ item.scaleAmount }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 勞退 -->
  <div class="id-table">
    <div>勞退</div>
    <table>
      <thead>
        <tr>
          <th width="120px">姓名</th>
          <th width="120px">身分證字號</th>
          <th width="120px">勞退身份</th>
          <th width="80px">參加勞退</th>
          <th width="120px">勞退制度選擇</th>
          <th width="100px">加保日期</th>
          <th width="100px">勞退投保薪資</th>
          <th width="100px">勞退雇主提繳率</th>
          <th width="100px">勞退員工提繳率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in laborPensionInsurance" :key="item">
          <td>{{ item.employeeName }}</td>
          <td>{{ item.identityNumber }}</td>
          <td>{{ item.identity }}</td>
          <td>{{ item.isInLaborPension }}</td>
          <td>{{ item.laborPensionType }}</td>
          <td>{{ item.insuredDate }}</td>
          <td>{{ item.scaleAmount }}</td>
          <td>{{ item.employerRate }}</td>
          <td>{{ item.employeeRate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
  max-height: 700px;
  overflow-y: auto;
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
