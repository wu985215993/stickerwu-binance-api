import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { BinanceSharedModule } from '../binance/shared/binance.module'; // Import the shared module
import { MarketService } from './market.service';

@Module({
  imports: [BinanceSharedModule], // Import the shared module
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
