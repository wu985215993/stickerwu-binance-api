import { Module } from '@nestjs/common';
import { BinanceRestService } from './binance.rest.service';

@Module({
  providers: [BinanceRestService],
  exports: [BinanceRestService], // Export BinanceRestService to make it available for injection in other modules
})
export class BinanceSharedModule {}
