/** Единая конфигурация заказчика. Один клиент = отдельная копия проекта/деплой. */
// Локальный иллюстративный fallback, если внешняя фотография недоступна.
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
    mapEmbed: 'https://yandex.ru/map-widget/v1/?ll=37.402218%2C55.659749&z=17&pt=37.402218,55.659749,pm2blm',
    whatsapp: '',
    telegram: '',
  },
  images: {
    // Внешние изображения рекомендуется заменить локальными фото с надлежащими правами на использование.
    hero: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=85&fit=crop', // Временный URL изображения; заменить локальным фото для стабильности
    fallback: carFallback,
    gallery: [] as Array<{url:string;alt:string}>,
    about: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=700&h=500&fit=crop',
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
  verifiedReviews: [] as Array<{name:string; text:string; rating:number; car?:string}>,
  verifiedBrands: [] as Array<{name:string;desc:string}>,
  faq: [
    {question:'Сколько времени занимает мойка?',answer:'Продолжительность зависит от автомобиля и выбранной программы. Уточните время при записи.'},
    {question:'Нужна ли предварительная запись?',answer:'Да, лучше позвонить заранее. Администратор подскажет доступное время и уточнит детали услуги.'},
    {question:'Сколько стоит комплексная мойка?',answer:'Комплексная мойка — от 1 800 ₽ по опубликованной карточке А500. Точная сумма зависит от автомобиля и программы.'},
    {question:'Как добраться?',answer:'Адрес и ссылка на маршрут указаны на странице контактов.'},
  ],
  advantages: [
    { title: 'Профессиональная автохимия', desc: 'Подбираем составы по типу покрытия и загрязнения' },
    { title: 'Бережная мойка', desc: 'Аккуратный уход за кузовом и салоном' },
    { title: 'Внимание к деталям', desc: 'Обсуждаем особенности автомобиля до начала работ' },
    { title: 'Удобное расположение', desc: 'Боровское шоссе, рядом с метро Говорово' },
  ],
  services: [
    { id: 'wash', title: 'Мойка кузова', icon: '🚘', price: 1000, duration: '', description: 'Очистка кузова автомобиля. Итоговая стоимость зависит от типа мойки и автомобиля.', features: ['Мойка кузова', 'Уход за наружными поверхностями'] },
    { id: 'interior', title: 'Химчистка салона', icon: '◈', price: 0, duration: '', description: 'Очистка элементов салона. Объём работ уточняется после осмотра.', features: ['Чистка сидений', 'Очистка элементов интерьера'] },
    { id: 'polish', title: 'Полировка кузова', icon: '✦', price: 0, duration: '', description: 'Работы по восстановлению внешнего вида лакокрасочного покрытия.', features: ['Оценка состояния ЛКП', 'Полировка кузова'] },
    { id: 'detailing', title: 'Детейлинг', icon: '◆', price: 0, duration: '', description: 'Комплексный уход за внешними и внутренними поверхностями автомобиля.', features: ['Подбор программы ухода', 'Согласование объёма работ'] },
  ],
  // Прайс скрыт, пока фактические цены не заданы.
  pricesVerified: false,
  verifiedPackage: { title: 'Комплексная мойка автомобиля', price: 1800, unit: 'от' },
  verifiedExtraServices: [] as Array<{title:string;description:string}>,
  packages: [
    {name: 'Экспресс', price: 500, duration: '20 мин', features: ['Бесконтактная мойка кузова', 'Ополаскивание', 'Сушка кузова', 'Протирка стёкол'], popular: false},
    {name: 'Стандарт', price: 900, duration: '40 мин', features: ['Бесконтактная мойка', 'Ручная мойка', 'Мойка дисков', 'Протирка стёкол', 'Сушка микрофиброй'], popular: true},
    {name: 'Премиум', price: 1500, duration: '1 час', features: ['Всё из «Стандарт»', 'Обработка воском', 'Обработка пластика салона', 'Протирка порогов'], popular: false},
    {name: 'Детейлинг', price: 3000, duration: '2–3 часа', features: ['Детальная мойка', 'Очистка дисков', 'Обработка пластика', 'Финальная проверка'], popular: false},
  ],
  carTypes: [
    { id: 'sedan', name: 'Седан', multiplier: 1 },
    { id: 'suv', name: 'Внедорожник', multiplier: 1.3 },
    { id: 'minivan', name: 'Минивэн', multiplier: 1.4 },
  ],
};
export const phoneHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;
export const priceLabel = (amount: number, starting = false) => `${starting ? 'от ' : ''}${amount.toLocaleString('ru-RU')} ₽`;
