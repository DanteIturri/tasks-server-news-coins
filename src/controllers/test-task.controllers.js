import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import playwright from 'playwright';
// import fs from 'fs';
import { connectDatabase } from '../database.js';
// const jsonCoins = fs.readFileSync('src/data/coins.json', 'utf-8');
// const jsonNews = fs.readFileSync('src/data/news.json', 'utf-8');
// let readNews = JSON.parse(jsonNews);
// let readCoins = JSON.parse(jsonCoins);
// let coinsWel = [];

// export const getCoinsGecko = async (req, res) => {
//   console.log('----Obteniendo Coins Api----');
//   try {
//     const response = await fetch(
//       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
//     );
//     const data = await response.json();
//     const dataArray = [...data];
//     const transcurrido = Date.now();
//     const hoy = new Date(transcurrido);
//     const result = [];
//     const browser = await playwright.chromium.launch(),
//       page = await browser.newPage();
//     await page.goto('https://www.coingecko.com/');

//     const [coinsGrap] = await Promise.all([
//       page.$$eval('table ', (all_items) => {
//         let data = [];

//         // Subtract data scraping
//         all_items.forEach((coins) => {
//           const imgGraph = coins.querySelectorAll(
//             'tbody tr .text-center a img'
//           );

//           imgGraph.forEach((e) => {
//             data.push(e.getAttribute('src'));
//           });
//         });

//         return data;
//       }),
//     ]);

//     console.log(coinsGrap.length);
//     dataArray.forEach((item, index) => {
//       result.push({
//         id: index + 1,
//         name: item.name,
//         image: item.image,
//         symbol: item.symbol,
//         search: `${item.name}${item.symbol}` /* 'BitcoinBTC' */,
//         valor_dolar: `${item.current_price}`,
//         cap_mercado: `${item.market_cap}`,
//         vol24: `${item.total_volume}`,
//         voltotal: `${item.total_volume}`,
//         var24hour: `${item.high_24h}`,
//         var7days: `${item.high_24h}`,
//         imagegrap: coinsGrap[index],
//         status: 'show',
//         created_at: hoy.toISOString(),
//         updated_at: item.last_updated,
//       });
//     });

//     const jsonCoins = JSON.stringify(result);
//     fs.writeFileSync('src/data/coins-all.json', jsonCoins, 'utf-8');

//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

/* Get Coins */
// export const getCoinsGeckoURL = async (req, res) => {
//   try {
//     // Scan data scraping
//     let response = await fetch('https://es.investing.com/crypto/'),
//       html = await response.text();
//     //Obtaining data for scraping
//     const $ = cheerio.load(html);
//     $('table tbody tr').each(async (i, el) => {
//       const name = $(el).find('td.cryptoName').text().trim(),
//         symbol = $(el).find('td.symb').text().trim(),
//         price = $(el).find('td.price').text().trim();
//       let coins = {
//         id: i + 1,
//         name,
//         symbol,
//         price,
//       };
//       // Save data scraping
//       coinsWel.push(coins);
//       const jsonCoins = JSON.stringify(coinsWel);
//       fs.writeFileSync('src/data/coins.json', jsonCoins, 'utf-8');
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

/* Get News */
// export const getNewCointelegraph = async (req, res) => {
//   try {
//     const browser = await playwright.chromium.launch(),
//       page = await browser.newPage();
//     await page.goto('https://es.cointelegraph.com/tags/bitcoin');

//     const [news] = await Promise.all([
//       page.$$eval('.posts-listing', (all_items) => {
//         let data = [],
//           url = 'https://es.cointelegraph.com',
//           imagesArray = [],
//           titlesArray = [],
//           desArray = [],
//           linkArticleArray = [],
//           authorArray = [];
//         // Subtract data scraping
//         all_items.forEach((news) => {
//           const images = news.querySelectorAll('.lazy-image>img'),
//             titles = news.querySelectorAll('.post-card-inline__title'),
//             description = news.querySelectorAll('.post-card-inline__text'),
//             linkArticle = news.querySelectorAll('.post-card-inline__header>a'),
//             author = news.querySelectorAll('.post-card-inline__author>a');

//           images.forEach((e) => imagesArray.push(e.getAttribute('src')));
//           titles.forEach((e) => titlesArray.push(e.innerText));
//           description.forEach((e) => desArray.push(e.innerText));
//           linkArticle.forEach((e) =>
//             linkArticleArray.push(e.getAttribute('href'))
//           );
//           author.forEach((e) => {
//             let text = e.innerText.replace(' ', '');
//             authorArray.push(text);
//           });
//         });
//         // Create object for push Data
//         for (let i = 0; i < 2; i++) {
//           newsObject = {
//             id: i + 1,
//             image: !imagesArray[i] ? null : imagesArray[i],
//             title: titlesArray[i],
//             description: desArray[i],
//             linkArticle: `${url}${linkArticleArray[i]}`,
//             author: authorArray[i],
//           };
//           data.push(newsObject);
//         }

//         return data;
//       }),
//     ]);

//     // let newsData = [...news],
//     //   k = 0;
//     // for (let i = 0; i < news.length; i++) {
//     //   k = 0;
//     //   for (let j = 0; j < readNews.length; j++) {
//     //     if (news[i].title !== readNews[j].title) {
//     //       k++;
//     //       if (k === readNews.length) newsData.push(news[i]);
//     //     }
//     //   }
//     // }

//     // if (result !== []) {
//     //   const jsonNews = JSON.stringify(readNews.concat(result));
//     //   await fs.writeFileSync('src/data/news.json', jsonNews, 'utf-8');
//     // }
//     // let length = readNews.length;
//     // if (length == 0) {
//     //   const jsonNews = JSON.stringify(readNews.concat(news));
//     //   await fs.writeFileSync('src/data/news.json', jsonNews, 'utf-8');
//     // }

//     res.json(JSON.parse(jsonNews));
//     await browser.close();
//   } catch (error) {
//     console.error(error.message);
//     res.json(`Error: ${error.message}`);
//   }
// };
/* News 2 */
export const getNewInvesting = async (req, res) => {
  try {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://es.investing.com/news/cryptocurrency-news');

    const [news] = await Promise.all([
      page.$$eval('.largeTitle', (all_items) => {
        const data = [],
          url = 'https://es.investing.com';
        let imagesArray = [],
          titlesArray = [],
          desArray = [],
          linkArticleArray = [],
          authorArray = [];

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
              linkArticleArray.push(`${url}${link}`);
            }
          });
          description.forEach((e) => desArray.push(e.innerText));
          author.forEach((e, index) => {
            if (index % 2 === 0) authorArray.push(e.innerText);
          });
        });

        for (let i = 0; i < imagesArray.length; i++) {
          newsObject = {
            id: i + 1,
            image: !imagesArray[i] ? null : imagesArray[i],
            title: titlesArray[i],
            description: desArray[i],
            linkArticle: linkArticleArray[i],
            author: authorArray[i],
          };
          data.push(newsObject);
        }
        return data;
      }),
    ]);
    const db = await connectDatabase();

    let database = [...news];
    await db.collection('articles').insertMany(database);
    // let newsData = [],
    //   k = 0;
    // for (let i = 0; i < news.length; i++) {
    //   k = 0;
    //   for (let j = 0; j < readNews.length; j++) {
    //     if (news[i].title !== readNews[j].title) {
    //       k++;
    //       if (k === readNews.length) newsData.push(news[i]);
    //     }
    //   }
    // }

    // if (newsData !== []) {
    //   const jsonNews = JSON.stringify(readNews.concat(newsData));
    //   await fs.writeFileSync('src/data/news.json', jsonNews, 'utf-8');
    // }
    // let length = readNews.length;
    // if (length == 0) {
    //   const jsonNews = JSON.stringify(readNews.concat(news));
    //   await fs.writeFileSync('src/data/news.json', jsonNews, 'utf-8');
    // }

    res.json(result);
    await browser.close();
  } catch (error) {}
};

export const getCoinsGeckoUrlAll = async (req, res) => {
  try {
    const browser = await playwright.chromium.launch(),
      page = await browser.newPage();
    await page.goto('https://www.coingecko.com/es/all-cryptocurrencies');

    const [coins] = await Promise.all([
      page.$$eval('table', (all_items) => {
        let data = [],
          idArray = [],
          symbolArray = [],
          imgArray = [],
          nameArray = [],
          currentArray = [];

        // Subtract data scraping
        all_items.forEach((coinsi) => {
          const id = coinsi.querySelectorAll('tbody>tr>.table-number');
          const symbol = coinsi.querySelectorAll('.font-normal');
          const image = coinsi.querySelectorAll('.coin-icon>img');
          const name = coinsi.querySelectorAll('.center>a>span.tw-hidden');
          const current_price = coinsi.querySelectorAll('.price>a>span');

          id.forEach((e) => idArray.push(e.innerText));
          symbol.forEach((e) => symbolArray.push(e.innerText));
          name.forEach((e) => nameArray.push(e.innerText));
          image.forEach((e) => imgArray.push(e.getAttribute('src')));
          current_price.forEach((e) =>
            currentArray.push(e.getAttribute('data-price-previous'))
          );
        });

        // Create object for push Data
        for (let i = 0; i < 299; i++) {
          coinsObject = {
            id: idArray[i],
            symbol: symbolArray[i],
            name: nameArray[i],
            image: imgArray[i],
            current_price: currentArray[i],
          };
          data.push(coinsObject);
        }

        return data;
      }),
    ]);

    const jsonNews = JSON.stringify(coins);
    console.log(jsonNews);
    await fs.writeFileSync('src/data/coins-all.json', jsonNews, 'utf-8');

    res.json(coins);
    await browser.close();
  } catch (error) {
    console.error(error.message);
    res.json(`Error: ${error.message}`);
  }
};
