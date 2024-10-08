export function randomChineseName() {
  function random(a, l) {
    let x = [];
    x.push(a[Math.ceil(Math.random() * a.length) - 1]);
    while (l > 1) {
      x.push(a[Math.ceil(Math.random() * a.length) - 1]);
      l--;
    }
    return x.join('');
  }

  return (
    random(
      '李 王 張 劉 陳 楊 黃 趙 周 吳 徐 孫 朱 馬 胡 郭 林 何 高 梁 鄭 羅 宋 謝 唐 曹 許 鄧 蕭 馮 曾 程 蔡 彭 潘 袁 董 蘇 葉 呂 魏 蔣 田 杜 丁 沈 姜 江 傅 鐘 盧 汪 戴 任 廖 姚 方 邱 夏 譚 韋 鄒 石 薛 侯 雷 白 龍 段 郝 孔 邵 史 常 萬 顧 賴 賀 嚴 尹 施 洪'.split(
        ' ',
      ),
    ) +
    random(
      '詩 世 中 仁 伶 佩 佳 俊 信 倫 偉 傑 儀 元 冠 凱 君 哲 嘉 國 士 如 娟 婷 琦 子 姿 京 孟 宇 安 宏 宗 宜 家 建 弘 強 彥 彬 德 心 志 忠 怡 惠 慧 慶 憲 成 政 敏 文 昌 明 智 曉 柏 榮 欣 馨 博 正 民 永 淑 玉 玲 珊 珍 珮 琪 瑋 瑜 瑞 瑩 盈 真 祥 秀 秋 穎 立 維 美 翔 翰 聖 育 良 芬 芳 英 菁 華 萍 蓉 裕 豪 貞 賢 郁 鈴 銘 雅 雯 霖 青 靜 韻 鴻 麗 龍 基 庭 廷 芸 峰'.split(
        ' ',
      ),
      2,
    )
  );
}

export function randomChineseNameMale() {
  function random(a, l) {
    let x = [];
    x.push(a[Math.ceil(Math.random() * a.length) - 1]);
    while (l > 1) {
      x.push(a[Math.ceil(Math.random() * a.length) - 1]);
      l--;
    }
    return x.join('');
  }

  return (
    random(
      '李 王 張 劉 陳 楊 黃 趙 周 吳 徐 孫 朱 馬 胡 郭 林 何 高 梁 鄭 羅 宋 謝 唐 曹 許 鄧 蕭 馮 曾 程 蔡 彭 潘 袁 董 蘇 葉 呂 魏 蔣 田 杜 丁 沈 江 傅 鐘 盧 汪 戴 任 廖 姚 方 邱 夏 譚 鄒 石 薛 侯 雷 白 段 郝 孔 邵 萬 顧 賴 嚴 尹 施 洪'.split(
        ' ',
      ),
    ) +
    random(
      '世 中 仁 佳 俊 信 倫 偉 傑 澤 朝 展 儀 鋒 睿 鵬 雨 元 玹 修 益 新 冠 凱 堯 宥 哲 嘉 振 國 士 子 勝 軒 誠 京 孟 宇 安 浩 宏 宗 宜 家 建 弘 天 強 彥 彬 德 心 志 忠 慶 憲 成 政 敏 文 昌 明 輝 智 曉 柏 榮 博 正 民 永 瑋 瑞 盈 祥 穎 立 維 翔 翰 聖 育 良 英 華 裕 豪 貞 賢 郁 銘 霖 青 鴻 耀 龍 基 庭 廷 峰'.split(
        ' ',
      ),
      2,
    )
  );
}

export function randomChineseNameFemale() {
  function random(a, l) {
    let x = [];
    x.push(a[Math.ceil(Math.random() * a.length) - 1]);
    while (l > 1) {
      x.push(a[Math.ceil(Math.random() * a.length) - 1]);
      l--;
    }
    return x.join('');
  }

  return (
    random(
      '李 王 張 劉 陳 楊 黃 趙 周 吳 徐 孫 朱 馬 胡 郭 林 何 高 梁 鄭 羅 宋 謝 唐 曹 許 鄧 蕭 馮 曾 程 蔡 彭 潘 袁 董 蘇 葉 呂 魏 蔣 田 杜 丁 沈 江 傅 鐘 盧 汪 戴 任 廖 姚 方 邱 夏 譚 鄒 石 薛 侯 雷 白 段 郝 孔 邵 萬 顧 賴 嚴 尹 施 洪'.split(
        ' ',
      ),
    ) +
    random(
      '詩 佳 儀 冠 如 子 妍 詠 舒 孟 霏 語 柔 潔 沐 曼 安 書 莉 竹 羿 晏 僑 心 沛 映 芷 萱 婉 歆 君 可 樺 茹 敏 琳 文 涵 思 曉 嘉 琦 婷 欣 馨 淑 玉 玲 珊 珍 珮 琪 瑋 瑜 瑞 瑩 盈 真 秀 秋 穎 維 美 育 良 芬 怡 惠 慧 芳 英 菁 華 蓉 裕 貞 嫻 郁 雅 青 靜 彤 韻 雯 璇 庭 昀 芸'.split(
        ' ',
      ),
      2,
    )
  );
}

export function randomSchool() {
  let index = Math.floor(Math.random() * 25);
  let schoolList = [
    '臺灣大學',
    '中山大學',
    '中央大學',
    '政治大學',
    '清華大學',
    '中興大學',
    '臺北大學',
    '聯合大學',
    '高雄大學',
    '嘉義大學',
    '宜蘭大學',
    '東華大學',
    '屏東大學',
    '金門大學',
    '東吳大學',
    '淡江大學',
    '大同大學',
    '逢甲大學',
    '中原大學',
    '文化大學',
    '長榮大學',
    '輔仁大學',
    '銘傳大學',
    '世新大學',
    '長庚大學',
  ];
  return schoolList[index];
}

export function randomDepartment() {
  let index = Math.floor(Math.random() * 25);
  let departmentList = [
    '戲劇系',
    '政治系',
    '法律系',
    '財金系',
    '心理系',
    '森林系',
    '電機系',
    '土木系',
    '化工系',
    '資工系',
    '會計系',
    '中文系',
    '英文系',
    '日文系',
    '醫學系',
    '機械系',
    '社工系',
    '企管系',
    '資管系',
    '大傳系',
    '歷史系',
    '體育系',
    '化學系',
    '新聞系',
    '財管系',
  ];
  return departmentList[index];
}
