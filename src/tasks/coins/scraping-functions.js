import fetch from 'node-fetch';
import playwright from 'playwright';
import * as cheerio from 'cheerio';
import fs from 'fs';
import { connectDatabase } from '../../database.js';
let coinsWel = [];

async function scrapingCoinsInves() {
  try {
    // Scan data scraping
    let response = await fetch('https://es.investing.com/crypto/'),
      html = await response.text();
    //Obtaining data for scraping
    const $ = cheerio.load(html);
    $('table tbody tr').each(async (i, el) => {
      const name = $(el).find('td.cryptoName').text().trim(),
        symbol = $(el).find('td.symb').text().trim(),
        price = $(el).find('td.price').text().trim();
      let coins = {
        id: i + 1,
        name,
        symbol,
        price,
      };
      // Save data scraping
      coinsWel.push(coins);
      const jsonCoins = JSON.stringify(coinsWel);
      await fs.writeFileSync('src/data/coins.json', jsonCoins, 'utf-8');
    });
  } catch (error) {
    console.log(error.message);
  }
}
async function scrapingCoinsGecko() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100page=1&sparkline=false'
    );
    const data = await response.json();
    const dataArray = [...data];
    const transcurrido = Date.now();
    const hoy = new Date(transcurrido);
    const browser = await playwright.chromium.launch(),
      page = await browser.newPage();
    await page.goto('https://www.coingecko.com/', {
      timeout: 0,
    });
    let result = [];

    const [coinsGrap] = await Promise.all([
      page.$$eval('table ', (all_items) => {
        let data = [];

        // Subtract data scraping
        all_items.forEach((coins) => {
          const imgGraph = coins.querySelectorAll(
            'tbody tr .text-center a img'
          );

          imgGraph.forEach((e) => {
            data.push(e.getAttribute('src'));
          });
        });

        return data;
      }),
    ]);
    dataArray.forEach((item, index) => {
      result.push({
        id: index + 1,
        name: item.name,
        image: item.image,
        symbol: item.symbol,
        search: `${item.name}${item.symbol}` /* 'BitcoinBTC' */,
        valor_dolar: `${item.current_price}`,
        cap_mercado: `${item.market_cap}`,
        vol24: `${item.total_volume}`,
        voltotal: `${item.total_volume}`,
        var24hour: `${item.ath_change_percentage}`,
        var7days: `${item.high_24h}`,
        // imagegrap: null,
        imagegrap: `${coinsGrap[index]}`,
        status: 'show',
        created_at: hoy.toISOString(),
        updated_at: item.last_updated,
      });
    });
    const db = await connectDatabase();
    let database = [...result];
    await db.collection('coins_daily').insertMany(database);

    await db.collection('coins_history').insertMany(database);
    await browser.close();
  } catch (error) {
    console.log(error.message);
  }
}
async function scrapingCoinsGeckoUrl() {
  console.log('----Obteniendo Coins Url----');
  try {
    const browser = await playwright.chromium.launch(),
      page = await browser.newPage();
    await page.goto('https://www.coingecko.com/es/all-cryptocurrencies', {
      timeout: 50000,
    });

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
        for (let i = 0; i < imgArray.length; i++) {
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
    await fs.writeFileSync('src/data/coins-all.json', jsonNews, 'utf-8');

    await browser.close();
  } catch (error) {
    console.error(error.message);
  }
}

export const coinsFuction = {
  scrapingCoinsInves,
  scrapingCoinsGecko,
  scrapingCoinsGeckoUrl,
};
