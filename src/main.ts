import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebsocketAPI } from '@binance/connector-typescript';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// test 币安api连接状态
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const callbacks = {
  open: (client: WebsocketAPI) => client.exchangeInfo(),
  close: () => console.debug('Disconnected from WebSocket server'),
  message: (data: string) => console.info(JSON.parse(data)),
};
const websocketAPIClient = new WebsocketAPI(API_KEY, API_SECRET, { callbacks });
setTimeout(() => websocketAPIClient.disconnect(), 20000);
