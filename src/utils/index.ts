import { map } from 'lodash';

// 定义原始数据类型
export type KlineCandlestickDataItem = [
  number, // k线开盘时间
  string, // 开盘价
  string, // 最高价
  string, // 最低价
  string, // 收盘价(当前K线未结束的即为最新价)
  string, // 成交量
  number, // k线收盘时间
  string, // 成交额
  number, // 成交笔数
  string, // 主动买入成交量
  string, // 主动买入成交额
  string, // 请忽略该参数
];

// 定义转换后的数据类型
export interface FormattedKlineCandlestickItem {
  openTime: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  volume: number;
  closeTime: number;
  quoteAssetVolume: number;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: number;
  takerBuyQuoteAssetVolume: number;
}

/**
 * 将原始 K 线蜡烛图数据转换为对象数组形式
 * @param rawData 原始数据数组
 * @returns 转换后的对象数组
 */
export function convertKlineCandlestickDataToObjData(
  rawData: KlineCandlestickDataItem[],
): FormattedKlineCandlestickItem[] {
  return map(
    rawData,
    (item: KlineCandlestickDataItem): FormattedKlineCandlestickItem => ({
      openTime: item[0],
      openPrice: parseFloat(item[1]),
      highPrice: parseFloat(item[2]),
      lowPrice: parseFloat(item[3]),
      closePrice: parseFloat(item[4]),
      volume: parseFloat(item[5]),
      closeTime: item[6],
      quoteAssetVolume: parseFloat(item[7]),
      numberOfTrades: item[8],
      takerBuyBaseAssetVolume: parseFloat(item[9]),
      takerBuyQuoteAssetVolume: parseFloat(item[10]),
    }),
  );
}
