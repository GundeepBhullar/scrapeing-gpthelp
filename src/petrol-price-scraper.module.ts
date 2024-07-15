import { Module } from '@nestjs/common';
import { PetrolPriceScraperController } from './petrol-price-scraper.controller';
import { PetrolPriceScraperService } from './petrol-price-scraper.service';

@Module({
  imports: [],
  controllers: [PetrolPriceScraperController],
  providers: [PetrolPriceScraperService],
})
export class AppModule {}
