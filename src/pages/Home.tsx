import { Link } from 'react-router-dom';
import { site, phoneHref } from '../config/site';

const featured = [
  { title: 'Ручная мойка', description: 'Аккуратная очистка кузова и колёс.' },
  { title: 'Детейлинг', description: 'Комплексный уход за автомобилем.' },
  { title: 'Полировка кузова', description: 'Работа с лакокрасочным покрытием и блеском.' },
  { title: 'Удаление вмятин PDR', description: 'Кузовные работы без покраски, когда это технически возможно.' },
  { title: 'Химчистка салона', description: 'Бережная очистка интерьерных материалов.' },
  { title: 'Защитная плёнка', description: 'Оклейка для защиты наиболее уязвимых деталей.' },
];

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async"
    onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = site.images.fallback; }} />;
}

export default function Home() {
  return <>
    <section className="a-hero" aria-labelledby="home-headline">
      <Photo src={site.images.hero} alt="Автомобиль — детали кузова и профессиональный уход" className="a-hero__image" />
      <div className="a-contours" aria-hidden="true" />
      <div className="a-shell a-hero__content">
        <div className="a-overline" style={{ color: '#CDD7E5' }}>Автомойка / Детейлинг / PDR</div>
        <h1 id="home-headline" className="a-h1">Внимание<br />к каждой<br /><span className="a-accent">детали.</span></h1>
        <p className="a-lead">Уход за кузовом и салоном, полировка и удаление вмятин без покраски. Точная работа начинается с внимания к автомобилю.</p>
        <div className="a-hero__actions">
          <a className="a-btn a-btn--lime" href={phoneHref(site.contacts.phone)}>Позвонить <span className="a-arrow" aria-hidden="true">↗</span></a>
          <Link className="a-btn a-btn--outline" to="/services">Смотреть услуги <span className="a-arrow" aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="a-shell a-hero__bottom"><span>А500 · Москва</span><span>Боровское шоссе, 6к1</span></div>
    </section>

    <section className="a-section a-cream" aria-labelledby="services-headline">
      <div className="a-shell">
        <div className="a-split-head">
          <div><div className="a-overline">01 / Что мы делаем</div><h2 id="services-headline" className="a-h2" style={{ marginTop: 25 }}>Уход, которому<br />можно доверить<br /><span className="a-accent" style={{ color: '#246BFD' }}>детали.</span></h2></div>
          <p className="a-lead">От базовой мойки до точной работы с кузовом. Подбираем подходящий формат ухода под задачу и состояние автомобиля.</p>
        </div>
        <div className="a-service-grid">
          {featured.map((item, index) => <Link className="a-service" to="/services" key={item.title}>
            <span className="a-service__number">{String(index + 1).padStart(2, '0')} / 06</span>
            <h3 className="a-service__title">{item.title}</h3>
            <p className="a-service__desc">{item.description}</p>
            <span className="a-service__foot"><span>Подробнее</span><span className="a-arrow" aria-hidden="true">↗</span></span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="a-statement" aria-labelledby="pdr-heading">
      <div className="a-statement__copy">
        <span className="a-overline">02 / Точность</span>
        <h2 className="a-h2 a-h2--compact" id="pdr-heading" style={{ margin: '27px 0' }}>Форма<br />имеет<br /><span className="a-accent">значение.</span></h2>
        <p className="a-lead">Удаление вмятин без покраски (PDR) — технология локальной работы с металлом, применимость которой определяется после осмотра повреждения.</p>
        <Link className="a-btn a-btn--outline" style={{ alignSelf: 'flex-start', marginTop: 25 }} to="/services">О наших услугах <span className="a-arrow">→</span></Link>
        <div className="a-contours" aria-hidden="true" />
      </div>
      <div className="a-statement__visual">
        <Photo src={site.images.about} alt="Работа с поверхностью автомобиля" />
        <span className="a-statement__caption">Кузов / Полировка / PDR</span>
      </div>
    </section>

    <section className="a-section a-cream" aria-labelledby="process-heading">
      <div className="a-shell">
        <div className="a-overline">03 / Подход</div>
        <h2 id="process-heading" className="a-h2" style={{ maxWidth: 860, marginTop: 25 }}>Всё начинается<br />с <span className="a-accent" style={{ color: '#246BFD' }}>понимания.</span></h2>
        <div className="a-steps">
          {[['Консультация','Обсуждаем вашу задачу, особенности автомобиля и желаемый результат.'],['Оценка','Определяем объём работ, подходящие методы и ориентировочную стоимость.'],['Работа с авто','Выполняем согласованные процедуры и проверяем результат.']].map((item,i) => <div className="a-step" key={i}>
            <span className="a-step__num">{String(i + 1).padStart(2,'0')} / 03</span>
            <h3>{item[0]}</h3><p>{item[1]}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="a-section a-final a-olive" aria-labelledby="contact-heading">
      <div className="a-shell a-final__inner">
        <div>
          <div className="a-overline">04 / На связи</div>
          <h2 id="contact-heading" className="a-h2" style={{ margin: '28px 0 20px' }}>Твой автомобиль.<br /><span className="a-accent">Наше внимание.</span></h2>
          <p className="a-lead">Расскажите, что требуется автомобилю. Подскажем, с чего начать.</p>
        </div>
        <a className="a-btn a-btn--lime" href={phoneHref(site.contacts.phone)}>Позвонить <span className="a-arrow" aria-hidden="true">↗</span></a>
      </div>
    </section>
  </>;
}
