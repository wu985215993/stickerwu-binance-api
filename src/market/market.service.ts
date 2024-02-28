import { Spot, Interval } from '@binance/connector-typescript';
import { Injectable } from '@nestjs/common';
import { BinanceRestService } from 'src/binance/shared/binance.rest.service';

@Injectable()
export class MarketService {
  private readonly client: Spot;

  constructor(private readonly binanceRestService: BinanceRestService) {
    this.client = binanceRestService.getClient();
  }
  /** 获取服务器时间 */
  async getServerTime(): Promise<number> {
    const { serverTime } = await this.client.checkServerTime();
    return serverTime;
  }
  /** 获取代币的当前平均价格 */
  async getCurrentAveragePrice(
    symbol: string,
  ): Promise<MARKET_API.CurrentAveragePriceResponse> {
    return await this.client.currentAveragePrice(symbol);
  }
  /** 获取交代币易日行情(Ticker) */
  async getTradingDay(
    symbol: string,
    options?: MARKET_API.TradingDayTickerOptions,
  ): Promise<
    MARKET_API.TradingDayTickerResponse | MARKET_API.TradingDayTickerResponse[]
  > {
    return await this.client.tradingDayTicker(symbol, options);
  }
  /** 获取交易币 K 线蜡烛图数据
   *  TODO ts修复
   */
  async getKlineCandlestickData(
    symbol: string,
    /** K线间隔 */
    interval: Interval,
    options?: MARKET_API.KlineCandlestickDataOptions,
  ): Promise<MARKET_API.KlineCandlestickDataResponse> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.client.klineCandlestickData(symbol, interval, options);
  }
}
