const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth")
const readLineSync = require('readline-sync');
puppeteer.use(pluginStealth())
const cheerio = require('cheerio');
(async () => {
  const searchTerm = readLineSync.question('Type the cep or city ');
  console.log('Searching ' + searchTerm + '!');
    const args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ];

    const options = {
        args,
        headless: true,
        ignoreHTTPSErrors: true,
        userDataDir: './tmp'
    };

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  await page.goto('http://www.buscacep.correios.com.br/sistemas/buscacep/');
  await page.waitFor(1500);
  // await page.screenshot({path: './printscreens/home_page.png'});

  await page.evaluate((searchTerm) => {
    document.querySelector('#Geral > div > div > span:nth-child(3) > label > input').value = searchTerm;
    document.querySelector('#Geral > div > div > div.btnform > input').click();
  },searchTerm);
  
  await page.waitFor(1500);

  let content = await page.content();

  await page.screenshot({path: './printscreens/end_search.png'});

  const $ = cheerio.load(content);
  let objt = {};
  
  $('body > div.back > div.tabs > div:nth-child(2) > div > div > div.column2 > div.content > div.ctrlcontent > table > tbody > tr').next().each((index,tr)=>{
      objt[$(tr).find('td').eq(3).text()] =  {
          rua : $(tr).find('td').eq(0).text(),
          bairro : $(tr).find('td').eq(1).text(),
          cidade : $(tr).find('td').eq(2).text(),
          cep : $(tr).find('td').eq(3).text(),
      }
  })
      if(Object.keys(objt).length === 0){
        objt = {error: "Cep not found!"}
      }
  
  console.dir(objt, {depth: null});
  await browser.close();
})();