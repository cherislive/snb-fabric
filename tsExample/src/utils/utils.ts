import math from 'mathjs';

/**
 * 延时器 Sleep
 * @param { Number } time
 */
export const waitTime = (time: number = 100) => new Promise((resolve) => {
  const timer = setTimeout(() => {
    resolve(true);
    clearTimeout(timer);
  }, time);
});

/**
 * 去空格 字符串
 * @param {string} 要去掉空格的字符串
 * @param   {Boolean} 是否去掉字符串中间的空格
 * @return  {String}  处理过的字符串
 */
export function trim(str: string, isGlobal: boolean) {
  if (!str) return;
  let result = str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  if (isGlobal) result = result.replace(/\s/g, '');
  return result;
}

/**
 * 数值格式化
 * @param {Number} val 要格式化的数值
 * @param {Object | Number} option 格式化选项，
 * @returns {String} 返回格式化后的值，如果value不是数字，则返回原始值
 *      如果是Object，含有三个属性：
 *          less:（小于10部分）含有decimal和isFillZeroInFront属性
 *          more:（大于等于10部分）含有decimal属性
 *          isRemoveExtraZero:是否移去小数部分多余的0（默认值：true）
 *      如果是Number，则等效于:{less: {decimal: 传递的数值}, isRemoveExtraZero: true}
 */
export function numberFormat(val: any, option: any) {
  const value = Number(val);
  if (!value || Number.isNaN(value)) return '';
  let formatOption = option;
  switch (typeof formatOption) {
    case 'number':
      formatOption = {
        less: {
          decimal: formatOption,
          isFillZeroInFront: false,
        },
      };
      break;
    case 'object':
      break;
    default:
      formatOption = {};
      break;
  }

  // 默认保留2位小数
  let nextDecimal = 2;
  if (value < 10) {
    let lessOption = formatOption.less;
    if (!lessOption) {
      lessOption = {};
    }

    // 小于10默认保留8位小数
    nextDecimal = 8;
    if (typeof lessOption.decimal === 'number') {
      nextDecimal = lessOption.decimal;
    }
  } else {
    let moreOption = formatOption.more;
    if (!moreOption) {
      moreOption = {};
    }

    if (typeof moreOption.decimal === 'number') {
      nextDecimal = moreOption.decimal;
    }
  }
  // 因为JavaScript的小数位精度比较低，导致Number.toFixed方法四舍五入的时候值不对，因此改用第三方数字计算类
  let formatValue = math.format(value, {
    notation: 'fixed',
    precision: nextDecimal,
  });

  // 去掉保留小数位数后，小数部分多余的0
  if (nextDecimal > 0 && formatOption.isRemoveExtraZero !== false) {
    formatValue = formatValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // 千分位
    formatValue = formatValue.replace(/([^0])0*$/, '$1');
    // 如果去掉末尾的0之后，只剩“.”，则删除掉
    formatValue = formatValue.replace(/\.$/, '');
  }

  if (value < 10 && formatOption.less && formatOption.less.isFillZeroInFront) {
    formatValue = `0${formatValue}`;
  }
  return formatValue;
}

/**
 * 百分比格式化
 * @param {Number} val 要格式化的值
 * @param {Boolean} symbolState 正数符号是否显示
 * @returns {String} 返回格式化后的值
 */
// export function dateFormat (str, fmt) {
export function percentFormat(val: any, symbolState = true) {
  let value = val;
  if (typeof value !== 'number') {
    value = 0;
  }

  value *= 100;
  let symbol = '';
  if (value > 0 && symbolState) {
    symbol = '+';
  }
  value = math.format(value, { notation: 'fixed', precision: 2 });
  if (Math.abs(value * 1) > 1000) {
    value = parseInt(`${value * 1}`, 10);
  }
  return `${symbol + value}%`;
}

/**
 * Date 格式化
 * @param {*} str 要格式化的数值
 * @param {*} fmt 格式：yyyy-MM-dd hh:mm:ss:S
 * @returns 格式化的时间
 */
export function dateFormat(str: any, fmt: string) {
  if (!fmt) {
    const tmpData: any = str ? new Date(str) : new Date();
    return Date.parse(tmpData);
  }
  if (!str) return '';
  let nextFormat = fmt;
  const date = new Date(str);
  const o: { [key: string]: any } = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(nextFormat)) {
    nextFormat = nextFormat.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  const week: { [key: string]: any } = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  if (/(E+)/.test(nextFormat)) {
    let nextWeekStr = '';
    if (RegExp.$1.length > 1) {
      nextWeekStr = '周';
    }
    if (RegExp.$1.length > 2) {
      nextWeekStr = '星期';
    }
    nextFormat = nextFormat.replace(RegExp.$1, nextWeekStr + week[`${date.getDay()}`]);
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(nextFormat)) {
      nextFormat = nextFormat.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  }
  return nextFormat;
}
