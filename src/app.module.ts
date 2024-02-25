import { Module } from '@nestjs/common';
import { MarketModule } from './market/market.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './app.filter';

@Module({
  imports: [MarketModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
