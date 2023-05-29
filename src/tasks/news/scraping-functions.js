import fs from 'fs';
import playwright from 'playwright';
import { connectDatabase } from '../../database.js';

// const jsonNews = fs.readFileSync('src/data/news.json', 'utf-8');
// let readNews = JSON.parse(jsonNews);

async function scrapingNewsInves() {
  try {
    console.log('scrapingNewsInves');
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://es.investing.com/news/cryptocurrency-news', {
      timeout: 0,
    });
    const news = await page.$$eval('.largeTitle', (all_items) => {
      const data = [],
        imagesArray = [],
        titlesArray = [],
        desArray = [],
        linkArticleArray = [],
        authorArray = [];
      let urlAdd = 'https://es.investing.com';

      all_items.forEach((newsi) => {
        const images = newsi.querySelectorAll('article>a>img');
        const titles = newsi.querySelectorAll('.textDiv>a');
        const description = newsi.querySelectorAll('.textDiv>p');
        const author = newsi.querySelectorAll('.articleDetails>span');

        images.forEach((e) => imagesArray.push(e.getAttribute('data-src')));
        titles.forEach((e) => {
          titlesArray.push(e.innerText);
          let link = e.getAttribute('href');
          if (link.indexOf('https') !== -1) {
            linkArticleArray.push(link);
          } else {
            linkArticleArray.push(`${urlAdd}${link}`);
          }
        });
        description.forEach((e) => desArray.push(e.innerText));
        author.forEach((e, index) => {
          if (index % 2 === 0) authorArray.push(e.innerText);
        });
      });
      const transcurrido = Date.now();
      const hoy = new Date(transcurrido);
      for (let i = 0; i < imagesArray.length; i++) {
        newsObject = {
          image: !imagesArray[i] ? null : imagesArray[i],
          title: titlesArray[i],
          description: desArray[i],
          link: linkArticleArray[i],
          autor: authorArray[i],
          content: desArray[i],
          lang: 'es',
          status: 'active',
          create_at: `${hoy.toISOString()}`,
          update_at: `${hoy.toISOString()}`,
        };
        data.push(newsObject);
      }
      return data;
    });
    const db = await connectDatabase();
    let database = [...news];
    await db.collection('articles').insertMany(database);
    await browser.close();
  } catch (error) {
    console.log('Error: ', error.message);
    console.log('not found');
  }
}
async function scrapingNewsInvesBr() {
  try {
    console.log('scrapingNewsInvesBr');
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://br.investing.com/news/cryptocurrency-news', {
      timeout: 0,
    });
    const news = await page.$$eval('.largeTitle', (all_items) => {
      const data = [],
        imagesArray = [],
        titlesArray = [],
        desArray = [],
        linkArticleArray = [],
        authorArray = [];
      let urlAdd = 'https://br.investing.com';

      all_items.forEach((newsi) => {
        const images = newsi.querySelectorAll('article>a>img');
        const titles = newsi.querySelectorAll('.textDiv>a');
        const description = newsi.querySelectorAll('.textDiv>p');
        const author = newsi.querySelectorAll('.articleDetails>span');

        images.forEach((e) => imagesArray.push(e.getAttribute('data-src')));
        titles.forEach((e) => {
          titlesArray.push(e.innerText);
          let link = e.getAttribute('href');
          if (link.indexOf('https') !== -1) {
            linkArticleArray.push(link);
          } else {
            linkArticleArray.push(`${urlAdd}${link}`);
          }
        });
        description.forEach((e) => desArray.push(e.innerText));
        author.forEach((e, index) => {
          if (index % 2 === 0) authorArray.push(e.innerText);
        });
      });
      const transcurrido = Date.now();
      const hoy = new Date(transcurrido);
      for (let i = 0; i < imagesArray.length; i++) {
        newsObject = {
          image: !imagesArray[i] ? null : imagesArray[i],
          title: titlesArray[i],
          description: desArray[i],
          link: linkArticleArray[i],
          autor: authorArray[i],
          content: desArray[i],
          lang: 'br',
          status: 'active',
          create_at: `${hoy.toISOString()}`,
          update_at: `${hoy.toISOString()}`,
        };
        data.push(newsObject);
      }
      return data;
    });
    const db = await connectDatabase();
    let database = [...news];
    await db.collection('articles').insertMany(database);
    await browser.close();
  } catch (error) {
    console.log('Error: ', error.message);
    console.log('not found');
  }
}
async function scrapingNewsInvesEn() {
  try {
    console.log('scrapingNewsInvesEn');
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://investing.com/news/cryptocurrency-news', {
      timeout: 0,
    });
    const news = await page.$$eval('.largeTitle', (all_items) => {
      const data = [],
        imagesArray = [],
        titlesArray = [],
        desArray = [],
        linkArticleArray = [],
        authorArray = [];
      let urlAdd = 'https://investing.com';

      all_items.forEach((newsi) => {
        const images = newsi.querySelectorAll('article>a>img');
        const titles = newsi.querySelectorAll('.textDiv>a');
        const description = newsi.querySelectorAll('.textDiv>p');
        const author = newsi.querySelectorAll('.articleDetails>span');

        images.forEach((e) => imagesArray.push(e.getAttribute('data-src')));
        titles.forEach((e) => {
          titlesArray.push(e.innerText);
          let link = e.getAttribute('href');
          if (link.indexOf('https') !== -1) {
            linkArticleArray.push(link);
          } else {
            linkArticleArray.push(`${urlAdd}${link}`);
          }
        });
        description.forEach((e) => desArray.push(e.innerText));
        author.forEach((e, index) => {
          if (index % 2 === 0) authorArray.push(e.innerText);
        });
      });
      const transcurrido = Date.now();
      const hoy = new Date(transcurrido);
      for (let i = 0; i < imagesArray.length; i++) {
        newsObject = {
          image: !imagesArray[i] ? null : imagesArray[i],
          title: titlesArray[i],
          description: desArray[i],
          link: linkArticleArray[i],
          autor: authorArray[i],
          content: desArray[i],
          lang: 'en',
          status: 'active',
          create_at: `${hoy.toISOString()}`,
          update_at: `${hoy.toISOString()}`,
        };
        data.push(newsObject);
      }
      return data;
    });
    const db = await connectDatabase();
    let database = [...news];
    await db.collection('articles').insertMany(database);
    await browser.close();
  } catch (error) {
    console.log('Error: ', error.message);
    console.log('not found');
  }
}
export const newsScrap = {
  scrapingNewsInves,
  scrapingNewsInvesBr,
  scrapingNewsInvesEn,
};
