import cron from 'node-cron';
import { newsScrap } from './scraping-functions.js';

function initScheduledNews() {
  const scheduledNewsFunction = cron.schedule('*/30 * * * *', async () => {
    console.log('newsES');
    await newsScrap.scrapingNewsInves();
  });
  scheduledNewsFunction.start();
  const scheduledNewsFunctionEn = cron.schedule('*/32 * * * *', async () => {
    console.log('newsEn');

    await newsScrap.scrapingNewsInvesEn();
  });
  scheduledNewsFunctionEn.start();
  const scheduledNewsFunctionBr = cron.schedule('*/34 * * * *', async () => {
    console.log('newsBr');
    await newsScrap.scrapingNewsInvesBr();
  });
  scheduledNewsFunctionBr.start();
}

export const newsTask = {
  initScheduledNews,
};
