import cron from 'node-cron';
import { coinsFuction } from './scraping-functions.js';

function initScheduledCoins() {
  //   const scheduledCoinsInvesFunction = cron.schedule('*/2 * * * *', async () => {
  //     console.log('coins scraping 2min');
  //     try {
  //       coinsFuction.scrapingCoinsInves();
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   });
  //   scheduledCoinsInvesFunction.start();

  const scheduledCoinsGeckoFunction = cron.schedule('*/5 * * * *', async () => {
    try {
      coinsFuction.scrapingCoinsGecko();
      console.log('coins');
    } catch (error) {
      console.log(error.message);
    }
  });
  scheduledCoinsGeckoFunction.start();

  // const scheduledCoinsGeckoUrlFunction = cron.schedule(
  //   '*/5 * * * *',
  //   async () => {
  //     console.log('coins scraping 5min url');
  //     try {
  //       coinsFuction.scrapingCoinsGeckoUrl();
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // );
  // scheduledCoinsGeckoUrlFunction.start();
}

export const coinsTask = {
  initScheduledCoins,
};
