import { Controller, Get } from '@nestjs/common';
import { PetrolPriceScraperService } from './petrol-price-scraper.service';

@Controller('petrol-price')
export class PetrolPriceScraperController {
  constructor(private readonly petrolPriceScraperService: PetrolPriceScraperService) {}

  @Get()
  async getPetrolPrice(): Promise<string> {
    return this.petrolPriceScraperService.scrapePetrolPrice();
  }
}