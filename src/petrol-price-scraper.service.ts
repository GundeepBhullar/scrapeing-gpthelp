import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PetrolPriceScraperService {
  async scrapePetrolPrice(): Promise<string> {
    let browser;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        browser = await puppeteer.launch({
          headless: true,
          executablePath: puppeteer.executablePath(),
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--single-process',
            '--incognito',
            '--disable-client-side-phishing-detection',
            '--disable-software-rasterizer',
          ],
        });

        browser.on('disconnected', () => {
          console.log('Browser disconnected');
        });

        const page = await browser.newPage();
        await page.goto('https://www.goodreturns.in/petrol-price.html');

        await page.waitForTimeout(60000); // wait for 1 minute

        const petrolPriceElement = await page.$('div.petrol-price');
        const petrolPrice = await petrolPriceElement.evaluate(el => el.textContent);

        return petrolPrice.trim();
      } catch (error) {
        console.error(error);
        retryCount++;

        if (browser) {
          await browser.close();
        }

        if (retryCount < maxRetries) {
          console.log(`Retrying... (Attempt ${retryCount + 1} of ${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds before retrying
        } else {
          throw error;
        }
      }
    }
  }
}