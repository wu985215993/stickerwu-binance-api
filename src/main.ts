import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { RestMarketTypes, Spot } from '@binance/connector-typescript';
import * as dotenv from 'dotenv';
import { Spot } from '@binance/connector';

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

// const client = new Spot(API_KEY, API_SECRET, {
//   baseURL: 'https://api.binance.com/api/v3' || BASE_URL,
// });

// client
//   .checkServerTime()
//   .then((res: RestMarketTypes.checkServerTimeResponse) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const client = new Spot(API_KEY, API_SECRET);
// Get account information
client.account().then((response) => client.logger.log(response.data));

// Place a new order
client
  .newOrder('BNBUSDT', 'BUY', 'LIMIT', {
    price: '350',
    quantity: 1,
    timeInForce: 'GTC',
  })
  .then((response) => client.logger.log(response.data))
  .catch((error) => client.logger.error(error));
