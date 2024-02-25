import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RestMarketTypes, Spot } from '@binance/connector-typescript';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(8888);
}
bootstrap();

// test 币安api连接状态
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const BASE_URL = process.env.BASE_URL || 'https://api.binance.com/api/v3';

const client = new Spot(API_KEY, API_SECRET, {
  baseURL: 'https://api.binance.com/api/v3' || BASE_URL,
});

client
  .checkServerTime()
  .then((res: RestMarketTypes.checkServerTimeResponse) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
