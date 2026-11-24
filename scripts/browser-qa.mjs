/**
 * Optional browser regression suite, not required for production build.
 * Install only when needed:
 *   npm install --no-save --package-lock=false playwright
 *   npx playwright install chromium firefox webkit
 *   npm run dev
 *   node scripts/browser-qa.mjs
 */
let engines;
try {
  engines = await import('playwright');
} catch {
  console.error('Установите Playwright: npm install --no-save --package-lock=false playwright');
  process.exit(2);
}
const base = (process.env.BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const cases = [
  ['chromium', 'phone-320', 320, 568],
  ['chromium', 'android-412', 412, 915],
  ['chromium', 'tablet-768', 768, 1024],
  ['chromium', 'laptop-1366', 1366, 768],
  ['chromium', 'desktop-1920', 1920, 1080],
  ['chromium', 'wide-2560', 2560, 1440],
  ['webkit', 'iphone-390', 390, 844],
  ['webkit', 'ipad-820', 820, 1180],
  ['firefox', 'linux-1366', 1366, 768],
];
const routes = ['/', '/services', '/pricing', '/about', '/contacts'];
let passed = 0, failed = 0;

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
  passed++;
};

for (const [engine, device, width, height] of cases) {
  const browser = await engines[engine].launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  for (const route of routes) {
    try {
      const response = await page.goto(base + route, {waitUntil:'domcontentloaded',timeout:20_000});
      const info = await page.evaluate(() => {
        const header = document.querySelector('.a-header');
        const menu = document.querySelector('.a-menu-btn');
        return {
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          headerPosition: getComputedStyle(header).position,
          hasMenu: getComputedStyle(menu).display !== 'none',
          hasH1: !!document.querySelector('main h1')
        };
      });
      assert(response?.status() === 200, device + route + ': HTTP');
      assert(info.overflow <= 2, device + route + ': overflow ' + info.overflow);
      assert(info.headerPosition === 'fixed' && info.hasMenu, device + route + ': fixed menu');
      assert(info.hasH1, device + route + ': page heading');
      if (route === '/pricing') {
        const txt = (await page.locator('main').innerText()).replace(/\s/g, ' ');
        assert(txt.includes('1 800') && txt.includes('1 000'), device + ': pricing');
      }
      if (route === '/contacts') {
        const src = await page.locator('iframe').getAttribute('src');
        assert(src?.includes('73889912604'), device + ': correct Yandex organization');
        assert((await page.locator('a[href^="tel:"]').count()) > 0, device + ': call action');
      }
    } catch (error) {
      failed++; console.error('FAIL', device, route, String(error));
    }
  }
  try {
    await page.goto(base + '/', {waitUntil:'domcontentloaded'});
    await page.locator('.a-menu-btn').click();
    assert(await page.locator('.a-mobile-nav').isVisible(), device + ': menu opens');
    await page.keyboard.press('Escape');
    assert((await page.locator('.a-mobile-nav').count()) === 0, device + ': menu closes');
    await page.getByRole('button', {name:'Увеличить фото: Мойка автомобиля'}).click();
    assert(await page.getByRole('dialog').isVisible(), device + ': gallery lightbox');
    await page.keyboard.press('ArrowRight');
    assert((await page.getByRole('dialog').innerText()).includes('2 из 4'), device + ': gallery navigation');
    await page.keyboard.press('Escape');
    assert((await page.getByRole('dialog').count()) === 0, device + ': gallery closes');
  } catch (error) {
    failed++; console.error('FAIL', device, 'interactions', String(error));
  }
  if (pageErrors.length) {
    failed++; console.error('FAIL', device, 'JavaScript', pageErrors.slice(0, 5));
  }
  await browser.close();
}
console.log(JSON.stringify({passed,failed,devices:cases.length,routes:routes.length}));
if (failed) process.exitCode = 1;
