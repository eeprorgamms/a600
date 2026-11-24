/** Единая конфигурация заказчика. Один клиент = отдельная копия проекта/деплой. */
// Локальный иллюстративный fallback, если изображение недоступно.
export const carFallback = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="740" viewBox="0 0 1080 740">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#091525"/><stop offset="1" stop-color="#1e3a70"/></linearGradient><linearGradient id="hood" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#8ca9d4"/><stop offset="0.5" stop-color="#364c6b"/><stop offset="1" stop-color="#0d1726"/></linearGradient><radialGradient id="glow"><stop stop-color="#8ac7ff" stop-opacity=".65"/><stop offset="1" stop-color="#8ac7ff" stop-opacity="0"/></radialGradient></defs>
<rect width="1080" height="740" fill="url(#bg)"/><path d="M0 610 1080 610M0 660 1080 660" stroke="#86b5ef" stroke-opacity=".17" stroke-width="2"/>
<ellipse cx="280" cy="515" rx="240" ry="180" fill="url(#glow)" opacity=".25"/><ellipse cx="800" cy="515" rx="240" ry="180" fill="url(#glow)" opacity=".25"/>
<path d="M120 470 Q155 420 270 412 L335 310 Q362 270 414 264 L675 264 Q729 268 752 310 L816 412 Q945 421 970 470 L1000 555 Q997 594 963 601 L126 601 Q95 590 100 553Z" fill="url(#hood)" stroke="#8fb5e2" stroke-opacity=".7" stroke-width="4"/>
<path d="M317 402 393 305 Q410 288 435 288 L648 288 Q670 289 686 307 L759 402 Z" fill="#081527" stroke="#7396c2" stroke-width="6"/>
<path d="M155 468 358 492 318 526 146 513 Z" fill="#d5f0ff"/><path d="M925 468 722 492 762 526 934 513 Z" fill="#d5f0ff"/>
<path d="M332 538 Q540 575 748 538" fill="none" stroke="#0a1425" stroke-width="26" stroke-linecap="round"/><path d="M350 557 732 557" stroke="#90b0d5" stroke-opacity=".32" stroke-width="2"/>
<circle cx="216" cy="594" r="47" fill="#081527"/><circle cx="854" cy="594" r="47" fill="#081527"/>
<path d="M110 620 Q540 686 970 620" fill="none" stroke="#9bcaff" stroke-opacity=".38" stroke-width="4"/><text x="540" y="125" font-family="Arial,sans-serif" font-size="25" text-anchor="middle" letter-spacing="10" fill="#d4e5fb">AUTO DETAILING</text>
</svg>`);

export const site = {
  brand: 'А500',
  tagline: 'Автомойка и детейлинг в Солнцево',
  color: { primary: '#246BFD', strong: '#1555D7' },
  contacts: {
    phone: '+7 (929) 588-40-94',
    phone2: '',
    address: 'Москва, Боровское шоссе, 6к1',
    district: 'Район Солнцево',
    landmark: 'Рядом с метро Говорово',
    hours: 'График работы уточняйте по телефону',
    mapUrl: 'https://yandex.ru/maps/org/a500/73889912604/',
    mapEmbed: 'https://yandex.ru/map-widget/v1/?oid=73889912604',
    whatsapp: '',
    telegram: '',
  },
  images: {
    hero: '/gallery/a500-4.webp',
    fallback: carFallback,
    gallery: [
      { url: '/gallery/a500-1.webp', title: 'Мойка автомобиля', alt: 'Автомобиль во время мойки' },
      { url: '/gallery/a500-2.webp', title: 'Уход за кузовом', alt: 'Автомобиль и уход за кузовом' },
      { url: '/gallery/a500-3.webp', title: 'Детали кузова', alt: 'Кузов автомобиля крупным планом' },
      { url: '/gallery/a500-4.webp', title: 'Автомобильный стиль', alt: 'Спортивный автомобиль' },
    ],
    about: '/gallery/a500-1.webp',
  },
  description: 'Автомойка А500 в Москве. Мойка кузова, химчистка салона и уход за автомобилем.',
  seo: {
    // Публичный адрес установки сайта задаётся через VITE_PUBLIC_SITE_URL
    baseUrl: import.meta.env.VITE_PUBLIC_SITE_URL || 'https://a600-tzk3.vercel.app',
    titleSuffix: 'Автомойка и детейлинг',
  },
  // Данные оператора заполняются только по подтверждённой информации от клиента.
  legal: { operatorName: '', inn: '', address: '', contactEmail: '', retentionDescription: '', processingProvider: '' },
  // Форма включается только при настройке защищённого серверного приёма заявок.
  leads: { endpoint: import.meta.env.VITE_LEAD_ENDPOINT || '', enabled: import.meta.env.VITE_LEAD_FORM_ENABLED === 'true' },
  reviewUrl: 'https://yandex.ru/maps/org/a500/73889912604/reviews/',
  faq: [
    {question:'Сколько времени занимает мойка?',answer:'Продолжительность зависит от автомобиля и выбранной программы. Уточните время при записи.'},
    {question:'Нужна ли предварительная запись?',answer:'Рекомендуем позвонить заранее: администратор подскажет, как согласовать посещение.'},
    {question:'Сколько стоит комплексная мойка?',answer:'Ориентировочная цена — от 1 800 ₽. Точная сумма зависит от категории автомобиля и выбранных работ.'},
    {question:'Как добраться?',answer:'Адрес и ссылка на маршрут указаны на странице контактов.'},
  ],
  advantages: [
    { title: 'Уход за кузовом', desc: 'Мойка автомобиля и уход за наружными поверхностями' },
    { title: 'Уход за салоном', desc: 'Химчистка и очистка внутренних поверхностей автомобиля' },
    { title: 'Уточнение стоимости', desc: 'Стоимость и объём работ можно обсудить по телефону до посещения' },
    { title: 'Удобное расположение', desc: 'Боровское шоссе, рядом с метро Говорово' },
  ],
  services: [
    { id: 'wash', title: 'Мойка кузова', description: 'Очистка наружных поверхностей автомобиля.', features: ['Мойка кузова', 'Очистка наружных поверхностей'] },
    { id: 'interior', title: 'Химчистка салона', description: 'Очистка внутренних поверхностей и обивки салона.', features: ['Чистка интерьера', 'Состав работ согласуется при обращении'] },
    { id: 'polish', title: 'Полировка кузова', description: 'Полировка лакокрасочного покрытия.', features: ['Полировка кузова', 'Объём работ зависит от состояния ЛКП'] },
    { id: 'detailing', title: 'Детейлинг', description: 'Комплексные работы по уходу за автомобилем.', features: ['Консультация по программе ухода', 'Согласование состава работ'] },
  ],
  // Публичные ориентиры по карточке организации, не гарантированный окончательный прайс.
  pricing: {
    complexWashFrom: 1800,
    bodyWashMin: 1000,
    bodyWashMax: 3000,
    note: 'Ориентировочные цены по открытой карточке А500 в Яндекс Картах. Уточняйте итоговую стоимость у администратора.',
    sourceUrl: 'https://yandex.com/maps/org/a500/73889912604/',
    checkedAt: '2026-11-24',
  },
};
export const phoneHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;
export const priceLabel = (amount: number, starting = false) => `${starting ? 'от ' : ''}${amount.toLocaleString('ru-RU')} ₽`;
