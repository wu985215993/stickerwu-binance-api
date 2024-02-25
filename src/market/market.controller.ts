import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MarketService } from './market.service';
import type {
  CurrentAveragePriceResponse,
  TradingDayTickerOptions,
  TradingDayTickerResponse,
} from './market.service';
interface GetTradingDayParamType {
  symbol: string;
  options: TradingDayTickerOptions;
}
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
  ): Promise<CurrentAveragePriceResponse> {
    return await this.marketService.getCurrentAveragePrice(symbol);
  }
  @Post('getTradingDay')
  /**
   * FIXME: 目前传入多个 symbol有BUG只支持传一个symbol
   */
  /** 获取交代币易日行情(Ticker) */
  async getTradingDay(
    @Body() body: GetTradingDayParamType,
  ): Promise<TradingDayTickerResponse | TradingDayTickerResponse[]> {
    const options: TradingDayTickerOptions = body.options && {
      ...body.options,
      symbols: body.options.symbols && JSON.stringify(body.options.symbols),
    };
    delete options.symbols;
    return await this.marketService.getTradingDay(body.symbol, options);
  }
}
