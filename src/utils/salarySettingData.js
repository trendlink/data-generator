export function basicSalarySetting(arr) {
  return arr.map((employee) => {
    return {
      ...employee,
      paymentMethod: '月薪',
      isNotWithholding: '是',
      effectiveDate: '2023/06/01',
    };
  });
}
export function paymentInfoSetting(arr) {
  return arr.map((employee) => {
    return {
      ...employee,
      paymentMethod: '銀行轉帳',
      bankName: '臺灣銀行',
      accountNumber: '47382748274274',
    };
  });
}
export function laborInsuranceSetting(arr) {
  return arr.map((employee) => {
    return {
      ...employee,
      identity: '一般勞工', //勞保身份
      typeForNormalEmployee: '一般勞工', //類型（一般勞工）
      typeForForeignEmployee: null, //類型（外籍勞工）
      isInLaborInsurance: '是', //參加勞保
      insuredDate: '2023/06/01', //加保日期
      scaleAmount: '30300', //勞保投保薪資
      customAmount: null, //約定自付勞保費
      isInJobInsurance: '是', //參加就業保險
      isInGuild: '否', //自行投保於公會
    };
  });
}
//健保
export function healthInsuranceSetting(arr) {
  return arr.map((employee) => {
    return {
      ...employee,
      identity: '一般勞工', //健保身份
      isInHealthInsurance: '是', //參加健保
      insuredDate: '2023/06/01', //加保日期
      scaleAmount: '30300', //健保投保薪資
      customAmount: null, //約定自付勞保費
      isInGuild: '否', //自行投保於公會
    };
  });
}
//所得稅代扣
export function incomeWithholdingSetting(arr) {
  return arr.map((employee) => {
    return {
      ...employee,
      identity: '居住者', //納稅身份
      entryDate: null, //入境日
      withholdingType: '自行申報(不扣繳)', //扣繳方式
      dependentsNumber: 0, //扶養人數
      withholdingAmount: null, //申報金額
      withholdingMethod: null, //所得申報方式
      withholdingProfessionalIncome: '否', //是否扣繳執行業務所得(9A、9B、佣金)
    };
  });
}

//職災
export function laborInjuryInsuranceSetting(arr) {
  return arr.map((employee) => {
    return {
      ...employee,
      identity: '一般員工', //災保身份
      insuredDate: '2023/06/01', //加保日期
      isInLaborInjuryInsurance: '是', //參加職業災害保險
      scaleAmount: '30300', //職災投保薪資
    };
  });
}

//勞退
export function laborPensionInsuranceSetting(arr) {
  return arr.map((employee) => {
    return {
      ...employee,
      identity: '一般員工', //勞退身份
      isInLaborPension: '是', //參加勞退
      laborPensionType: '新制', //勞退制度選擇
      transferedDate: null, //轉換日期
      insuredDate: '2023/06/01', //加保日期
      scaleAmount: '30300', //勞退投保薪資
      typeForForeignEmployee: null, //類型（外籍勞工適用）
      employerRate: 6, //勞退雇主提繳率
      employeeRate: 0, //勞退員工提繳率
    };
  });
}
