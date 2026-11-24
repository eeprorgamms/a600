import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const config = read('src/config/site.ts');
const vercel = JSON.parse(read('vercel.json'));
const csp = vercel.headers.flatMap(item => item.headers).find(item => item.key === 'Content-Security-Policy')?.value ?? '';

assert.equal(vercel.git?.deploymentEnabled, false, 'Auto deployment must remain disabled');
for (const header of ['Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Cross-Origin-Opener-Policy']) {
  assert(vercel.headers.some(rule => rule.headers.some(item => item.key === header)), 'Missing security header: ' + header);
}
for (const directive of ["script-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "base-uri 'self'", "upgrade-insecure-requests"]) {
  assert(csp.includes(directive), 'Missing Content Security Policy directive: ' + directive);
}
assert(!csp.includes("'unsafe-eval'"), 'Unsafe eval is disallowed');
assert(config.includes("phone: '+7 (929) 588-40-94'"), 'Check A500 business phone');
assert(config.includes('oid=73889912604'), 'Map widget must use the A500 organization ID');
assert(config.includes("complexWashFrom: 1800"), 'Missing published complex wash price');
assert(config.includes("bodyWashMin: 1000") && config.includes("bodyWashMax: 3000"), 'Missing published wash price band');
assert(!/^\s*packages:\s*\[/m.test(config), 'Invented legacy pricing packages must not be kept');
assert(!/^\s*verifiedReviews:/m.test(config), 'Do not publish invented reviews');
for (const path of ['src/pages/Home.tsx', 'src/pages/Pricing.tsx', 'src/pages/About.tsx', 'src/pages/Contacts.tsx']) {
  assert(existsSync(new URL('../' + path, import.meta.url)), 'Missing page: ' + path);
}
for (const path of ['src/pages/Home.tsx', 'src/pages/Pricing.tsx']) {
  assert(read(path).includes('site.pricing.'), 'Price values should be centralized in: ' + path);
}
assert(read('src/pages/Home.tsx').includes('<Gallery />'), 'Homepage gallery is missing');
assert(!read('src/pages/Home.tsx').includes('a-home-tag'), 'Remove distracting hero overline');
assert(read('src/components/Layout.tsx').includes('Услуги и цены'), 'Single services and prices navigation missing');
assert(vercel.redirects?.some(route => route.source === '/services' && route.destination === '/pricing'), 'Old services path must redirect');
assert(!config.includes('images.unsplash.com'), 'Photo URLs should be local, not dependent on Unsplash');
assert(read('src/components/Gallery.tsx').includes('Реальные фотографии на Яндекс Картах'), 'Official photo link missing');
assert(read('src/a500-theme.css').includes('.a-header{position:fixed'), 'Fixed navigation is missing');
assert(!/dangerouslySetInnerHTML\s*=/.test(read('src/components/Gallery.tsx')), 'Untrusted HTML must not be rendered');

console.log('A500 static checks passed: data, prices, pages, gallery, navigation, security headers.');
