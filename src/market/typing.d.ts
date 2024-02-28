declare namespace MARKET_API {
  interface GetTradingDayParamType {
    symbol: string;
    options: TradingDayTickerOptions;
  }

  interface CurrentAveragePriceResponse {
    mins: number;
    price: string;
    closeTime: number;
  }
  interface TradingDayTickerOptions {
    symbols?: string;
    timeZone?: string;
    type?: 'FULL' | 'MINI';
  }

  interface TradingDayTickerResponse {
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

  interface KlineCandlestickDataOptions {
    startTime?: number;
    endTime?: number;
    timeZone?: string;
    limit?: number;
  }
  type KlineCandlestickDataResponse = (string | number)[];

  type GetKlineCandlestickDataParamType = {
    symbol: string;
    interval: Interval;
    options: KlineCandlestickDataOptions;
  };
}

declare enum Interval {
  '1s' = '1s',
  '1m' = '1m',
  '3m' = '3m',
  '5m' = '5m',
  '15m' = '15m',
  '30m' = '30m',
  '1h' = '1h',
  '2h' = '2h',
  '4h' = '4h',
  '6h' = '6h',
  '8h' = '8h',
  '12h' = '12h',
  '1d' = '1d',
  '3d' = '3d',
  '1w' = '1w',
  '1M' = '1M',
}
