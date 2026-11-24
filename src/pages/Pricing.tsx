import { Link } from 'react-router';
import { site, phoneHref, priceLabel } from '../config/site';

const priceFor = (id: string) =>
  id === 'wash'
    ? `${priceLabel(site.pricing.bodyWashMin)}–${priceLabel(site.pricing.bodyWashMax)}`
    : 'По запросу';

export default function Pricing() {
  const phone = phoneHref(site.contacts.phone);
  return (
    <div className="a-page-section">
      <section className="a-intro a-cream a-intro--compact">
        <div className="a-shell">
          <span className="a-eyebrow">Автомойка А500</span>
          <h1 className="a-h1">УСЛУГИ <span className="a-accent">И ЦЕНЫ</span></h1>
          <p className="a-lead">Мойка, уход за салоном, полировка и детейлинг. Выберите услугу, посмотрите состав работ и уточните стоимость перед посещением.</p>
        </div>
      </section>
      <section className="a-section a-cream a-section--prices">
        <div className="a-shell">
          <div className="a-pricing-feature a-reveal">
            <div>
              <span className="a-eyebrow">Популярная услуга</span>
              <h2>КОМПЛЕКСНАЯ МОЙКА</h2>
              <p>Уход за кузовом и салоном. Состав работ согласовывается при обращении.</p>
            </div>
            <div className="a-pricing-feature__side">
              <span>Ориентировочно от <strong>{priceLabel(site.pricing.complexWashFrom)}</strong></span>
              <a href={phone} className="a-btn a-btn--lime">Уточнить и записаться ↗</a>
            </div>
          </div>
          <div className="a-pricing-note">{site.pricing.note} <a href={site.pricing.sourceUrl} target="_blank" rel="noopener noreferrer" className="a-source-link">Источник: Яндекс Карты</a>.</div>
          <div className="a-services-pricing-head">
            <span className="a-eyebrow">Основные направления</span>
            <h2 className="a-h2 a-h2--compact">ВЫБЕРИТЕ УСЛУГУ</h2>
          </div>
          <div className="a-prices a-reveal" aria-label="Услуги и ориентировочные цены">
            {site.services.map((service) => (
              <div className="a-price-row a-price-row--expandable" key={service.id}>
                <div className="a-price-row__main">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <details className="a-price-row__details">
                    <summary>Что входит в услугу</summary>
                    <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  </details>
                </div>
                <strong className="a-price-row__price">{priceFor(service.id)}</strong>
                <a className="a-btn a-btn--dark" href={phone} aria-label={`Уточнить стоимость услуги ${service.title}`}>Уточнить ↗</a>
              </div>
            ))}
          </div>
          <div className="a-pricing-foot">
            <p className="a-lead">Нужна другая программа ухода? Позвоните, чтобы обсудить автомобиль и подходящие работы.</p>
            <Link className="a-btn a-btn--dark" to="/contacts">Контакты и маршрут ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
