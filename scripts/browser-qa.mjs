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
const routes = ['/', '/pricing', '/about', '/contacts'];
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
      const response = await page.goto(base + route, {waitUntil:'load',timeout:20_000});
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
    await page.goto(base + '/', {waitUntil:'load'});
    await page.locator('.a-menu-btn').click();
    assert(await page.locator('.a-mobile-nav').isVisible(), device + ': menu opens');
    await page.keyboard.press('Escape');
    assert((await page.locator('.a-mobile-nav').count()) === 0, device + ': menu closes');
    for (let i = 1; i <= 4; i++) {
      const photo = await page.request.get(base + '/gallery/a500-' + i + '.webp');
      assert(photo.ok() && photo.headers()['content-type']?.includes('image/webp'), device + ': local photo ' + i);
    }
    await page.getByRole('button', {name:'Открыть фотографию: Мойка автомобиля'}).click();
    assert(await page.getByRole('dialog').isVisible(), device + ': gallery lightbox');
    assert(await page.locator('body > .a-lightbox').count() === 1, device + ': lightbox portal attached to body');
    assert(await page.locator('.a-lightbox').evaluate(node => { const rect=node.getBoundingClientRect(); return rect.top >= -2 && rect.left >= -2 && rect.width >= window.innerWidth-2 && rect.height >= window.innerHeight-2; }), device + ': lightbox fully covers the current viewport');
    assert(await page.getByRole('dialog').locator('img').evaluate(img => img.complete && img.naturalWidth > 0), device + ': gallery image actually loaded');
    await page.keyboard.press('ArrowRight');
    assert((await page.getByRole('dialog').innerText()).includes('2 из 4'), device + ': gallery navigation');
    await page.keyboard.press('Escape');
    assert((await page.getByRole('dialog').count()) === 0, device + ': gallery closes');
  } catch (error) {
    failed++; console.error('FAIL', device, 'interactions', String(error));
  }
  try { await page.goto(base + '/services', {waitUntil:'load'}); await page.waitForURL('**/pricing', {timeout:5000}); assert(new URL(page.url()).pathname === '/pricing', device + ': legacy services redirect'); } catch (e) {failed++; console.error('FAIL',device,'redirect',String(e));}
  if (pageErrors.length) {
    failed++; console.error('FAIL', device, 'JavaScript', pageErrors.slice(0, 5));
  }
  await browser.close();
}
console.log(JSON.stringify({passed,failed,devices:cases.length,routes:routes.length}));
if (failed) process.exitCode = 1;
