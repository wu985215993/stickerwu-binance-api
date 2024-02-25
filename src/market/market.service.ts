import { Spot } from '@binance/connector-typescript';
import { Injectable } from '@nestjs/common';
import { BinanceRestService } from 'src/binance/shared/binance.rest.service';
export interface CurrentAveragePriceResponse {
  mins: number;
  price: string;
  closeTime: number;
}
export interface TradingDayTickerOptions {
  symbols?: string;
  timeZone?: string;
  type?: 'FULL' | 'MINI';
}

export interface TradingDayTickerResponse {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

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
  ): Promise<CurrentAveragePriceResponse> {
    return await this.client.currentAveragePrice(symbol);
  }
  /** 获取交代币易日行情(Ticker) */
  async getTradingDay(
    symbol: string,
    options?: TradingDayTickerOptions,
  ): Promise<TradingDayTickerResponse | TradingDayTickerResponse[]> {
    return await this.client.tradingDayTicker(symbol, options);
  }
}
