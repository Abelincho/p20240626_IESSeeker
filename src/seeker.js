import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import { message } from 'telegraf/filters';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, './.env');

process.loadEnvFile(envPath);

const { COMP_INFO } = process.env;
let targetInfo;

const seek = async () => {
    let message = `Error: Info not found ${new Date().toLocaleString()}`;
    // setup 
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
  
    // Web objetivo
    await page.goto('https://www.iessanandres.com/inicio');
  
    // Scraping
    const selector = '#h\\.77bdfeb419c72136_4 div div p'; // Reemplaza con tu selector CSS
    await page.waitForSelector(selector);

    // Obtener el elemento
    const elemento = await page.$(selector);
    targetInfo = await elemento.textContent();
    COMP_INFO === targetInfo ? 
        message = `There is no changes ${new Date().toLocaleString()}`
        : message = 'Some content has changed ' + new Date().toLocaleString();
  
    // Cerrar el navegador
    await browser.close();
    return message;
}


export default seek;