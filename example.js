const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${__dirname}/index.html`);
  await page.screenshot({path: `${__dirname}/example.png`});
  
  await browser.close();
})();
