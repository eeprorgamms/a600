import {createServer} from 'vite';
import {readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';

const origin = new URL(process.env.VITE_PUBLIC_SITE_URL || 'https://a600-tzk3.vercel.app').origin;
const pages = {
 '/': ['Главная','Автомойка, детейлинг и кузовные работы — контакты и услуги.'],
 '/services': ['Услуги','Уход за автомобилем, химчистка, полировка и удаление вмятин.'],
 '/pricing': ['Цены','Стоимость услуг автомойки и детейлинга: актуальные цены по запросу.'],
 '/about': ['О компании','О центре A500, услугах и расположении на Боровском шоссе.'],
 '/contacts': ['Контакты','Телефон, адрес, режим работы и маршрут до A500 в Москве.'],
};
const escape=(s)=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const vite=await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'});
try{
 const {render}=await vite.ssrLoadModule('/src/entry-server.tsx');
 const base=readFileSync('dist/index.html','utf8');
 for(const [path,[name,description]] of Object.entries(pages)){
  const title=`${name} — А500 | Автомойка и детейлинг`;
  const head=`<title>${escape(title)}</title>`;
  const desc=`<meta name="description" content="${escape(description)}" />`;
  const url=`${origin}${path}`;
  const content=render(path);
  let output=base.replace(/<title>.*?<\/title>/,head)
   .replace(/<meta name="description"[^>]+\/>/,desc)
   .replace('</head>',`<link rel="canonical" href="${escape(url)}" />\n<meta property="og:type" content="website" />\n<meta property="og:title" content="${escape(title)}" />\n<meta property="og:description" content="${escape(description)}" />\n<meta property="og:url" content="${escape(url)}" />\n</head>`)
   .replace('<div id="root"></div>',`<div id="root">${content}</div>`);
  writeFileSync(join('dist',path==='/'?'index.html':path.slice(1)+'.html'),output);
  console.log(`Prerendered ${path} (${content.length} chars)`);
 }
}finally{await vite.close()}
