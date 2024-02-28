import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MarketService } from './market.service';
import { convertKlineCandlestickDataToObjData } from '../utils';
import type {
  FormattedKlineCandlestickItem,
  KlineCandlestickDataItem,
} from '../utils';
@Controller('api/rest/market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('getServerTime')
  /** 获取服务器时间 */
  async getServerTime(): Promise<number> {
    return await this.marketService.getServerTime();
  }
  @Get('getCurrentAveragePrice')
  /** 获取代币的当前平均价格 */
  async getCurrentAveragePrice(
    @Query('symbol') symbol: string,
  ): Promise<MARKET_API.CurrentAveragePriceResponse> {
    return await this.marketService.getCurrentAveragePrice(symbol);
  }
  @Post('getTradingDay')
  /**
   * FIXME: 目前传入多个 symbol有BUG只支持传一个symbol
   */
  /** 获取交代币易日行情(Ticker) */
  async getTradingDay(
    @Body() body: MARKET_API.GetTradingDayParamType,
  ): Promise<
    MARKET_API.TradingDayTickerResponse | MARKET_API.TradingDayTickerResponse[]
  > {
    const options: MARKET_API.TradingDayTickerOptions = body.options && {
      ...body.options,
      symbols: body.options.symbols && JSON.stringify(body.options.symbols),
    };
    delete options.symbols;
    return await this.marketService.getTradingDay(body.symbol, options);
  }
  /** 获取交易币 K 线蜡烛图数据 */
  @Post('getKlineCandlestickData')
  /** 获取代币的当前平均价格 
   * @example 返回数据的例
   * TODO TS 报错修复
   * [
        [
          1499040000000,      // k线开盘时间
          "0.01634790",       // 开盘价
          "0.80000000",       // 最高价
          "0.01575800",       // 最低价
          "0.01577100",       // 收盘价(当前K线未结束的即为最新价)
          "148976.11427815",  // 成交量
          1499644799999,      // k线收盘时间
          "2434.19055334",    // 成交额
          308,                // 成交笔数
          "1756.87402397",    // 主动买入成交量
          "28.46694368",      // 主动买入成交额
          "17928899.62484339" // 请忽略该参数
        ]
      ]
  */
  async getKlineCandlestickData(
    @Body() body: MARKET_API.GetKlineCandlestickDataParamType,
  ): Promise<FormattedKlineCandlestickItem[]> {
    const { symbol, interval, options } = body;
    const rawData = await this.marketService.getKlineCandlestickData(
      symbol,
      interval,
      options,
    );

    const formattedData = convertKlineCandlestickDataToObjData(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rawData as KlineCandlestickDataItem[],
    );
    return formattedData;
  }
}
