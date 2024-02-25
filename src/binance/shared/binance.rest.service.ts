// binance.service.ts
import { Injectable } from '@nestjs/common';
import { Spot, RestMarketTypes } from '@binance/connector-typescript';
import * as dotenv from 'dotenv';

@Injectable()
/** 币安 REST接口API */
export class BinanceRestService {
  private readonly client: Spot;

  constructor() {
    dotenv.config();
    const API_KEY = process.env.API_KEY;
    const API_SECRET = process.env.API_SECRET;
    const BASE_URL = process.env.BASE_URL || 'https://api.binance.com/api/v3';

    this.client = new Spot(API_KEY, API_SECRET, {
      baseURL: BASE_URL,
    });
  }
  // 公共方法，用于返回 client
  getClient(): Spot {
    return this.client;
  }
}
