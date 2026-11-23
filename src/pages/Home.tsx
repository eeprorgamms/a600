import { Link } from 'react-router-dom';
import { site, phoneHref } from '../config/site';

const offers = [
  {title: 'Комплексная мойка', description: 'Уход за кузовом и салоном', price: 'от 1 800 ₽', link: '/pricing'},
  {title: 'Детейлинг', description: 'Внимание к каждой поверхности', price: 'Индивидуально', link: '/services'},
  {title: 'Полировка кузова', description: 'Блеск и уход за лакокрасочным покрытием', price: 'Индивидуально', link: '/services'},
];

export default function Home() {
  return <>
    <section className="a-hero a-hero--home" aria-labelledby="home-headline">
      <img src={site.images.hero} alt="Спортивный автомобиль" className="a-hero__image"
        decoding="async" fetchPriority="high" onError={e => {e.currentTarget.onerror=null;e.currentTarget.src=site.images.fallback;}} />
      <div className="a-shell a-hero__content">
        <p className="a-eyebrow a-home-tag">А500 · Автомойка и детейлинг · Москва</p>
        <h1 id="home-headline" className="a-h1 a-home-title">ЧИСТОТА.<br /><span className="a-accent">В ДЕТАЛЯХ.</span></h1>
        <p className="a-lead">Комплексная мойка, уход за салоном и полировка кузова. Боровское шоссе, 6к1.</p>
        <div className="a-hero__actions">
          <Link className="a-btn a-btn--lime" to="/services">Посмотреть услуги <span className="a-arrow" aria-hidden="true">→</span></Link>
          <a className="a-btn a-btn--outline" href={phoneHref(site.contacts.phone)}>Записаться по телефону <span className="a-arrow" aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="a-shell a-hero__bottom"><span>А500 · Солнцево</span><Link to="/contacts" className="a-hero__route">Контакты и маршрут ↗</Link></div>
    </section>
    <section className="a-home-about a-cream" aria-labelledby="home-about-heading">
      <div className="a-shell a-home-about__grid a-reveal">
        <div>
          <span className="a-eyebrow">Автомойка А500</span>
          <h2 className="a-h2 a-h2--compact" id="home-about-heading">Ваш автомобиль.<br /><span className="a-accent">Наше внимание.</span></h2>
        </div>
        <div className="a-home-about__copy">
          <p>Мы находимся в Солнцево, на Боровском шоссе. Занимаемся мойкой автомобилей, уходом за салоном и полировкой кузова.</p>
          <p>Обсудим подходящую услугу, уточним стоимость и согласуем время посещения.</p>
          <Link className="a-text-link" to="/about">Подробнее об А500 ↗</Link>
        </div>
      </div>
    </section>
    <section className="a-home-services a-sage" aria-labelledby="home-services-heading">
      <div className="a-shell">
        <div className="a-home-services__head a-reveal">
          <div><span className="a-eyebrow">Что мы делаем</span><h2 className="a-h2 a-h2--compact" id="home-services-heading">Услуги и цены</h2></div>
          <Link className="a-text-link" to="/pricing">Весь прайс ↗</Link>
        </div>
        <div className="a-home-services__cards">
          {offers.map(item=><Link key={item.title} to={item.link} className="a-home-offer a-reveal">
            <div className="a-home-offer__top"><h3>{item.title}</h3><span aria-hidden="true">↗</span></div>
            <p>{item.description}</p>
            <span className="a-home-offer__price">{item.price}</span>
          </Link>)}
        </div>
      </div>
    </section>
    <section className="a-home-cta a-olive a-reveal">
      <div className="a-shell a-home-cta__inner">
        <div><span className="a-eyebrow">Ждём вас в А500</span><h2 className="a-h2 a-h2--compact">Загляните<br />к нам.</h2><p>{site.contacts.address}</p></div>
        <div className="a-home-cta__actions"><a href={phoneHref(site.contacts.phone)} className="a-btn a-btn--lime">Позвонить ↗</a><a href={site.contacts.mapUrl} target="_blank" rel="noopener noreferrer" className="a-btn a-btn--outline">Открыть карту ↗</a></div>
      </div>
    </section>
  </>;
}
