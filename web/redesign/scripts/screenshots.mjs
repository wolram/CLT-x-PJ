import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const pages = [
  { file: 'index.html',                   out: 'Telas/screen-landing.png' },
  { file: 'clt_x_cnpj_calculator.html',   out: 'Telas/screen-calculator.png' },
  { file: 'dashboard.html',               out: 'Telas/screen-dashboard.png' },
  { file: 'educational.html',             out: 'Telas/screen-educational.png' },
  { file: 'app_features_download.html',   out: 'Telas/screen-download.png' },
  { file: 'landing_page_reimagined.html', out: 'Telas/screen-landing-v2.png' },
];

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

for (const { file, out } of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`file://${resolve(root, file)}`, { waitUntil: 'networkidle0', timeout: 30000 });
  const outPath = resolve(root, out);
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`✓ ${file} → ${out}`);
  await page.close();
}

await browser.close();
console.log('Done.');
