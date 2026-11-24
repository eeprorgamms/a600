import { Link } from 'react-router';
import { site, phoneHref, priceLabel } from '../config/site';

const detailById: Record<string, string> = {
  wash: 'Мойка наружных поверхностей автомобиля.',
  interior: 'Очистка сидений и элементов интерьера.',
  polish: 'Уход за лакокрасочным покрытием.',
  detailing: 'Комплексный уход за кузовом и салоном.',
};

export default function Pricing() {
  const phone = phoneHref(site.contacts.phone);
  return (
    <div className="a-page-section">
      <section className="a-intro a-cream a-intro--compact">
        <div className="a-shell">
          <span className="a-eyebrow">Стоимость</span>
          <h1 className="a-h1">Цены <span className="a-accent">на услуги</span></h1>
          <p className="a-lead">Выберите подходящую услугу. Точную цену и время выполнения работ уточните по телефону.</p>
        </div>
      </section>
      <section className="a-section a-cream a-section--prices">
        <div className="a-shell">
          <div className="a-pricing-feature a-reveal">
            <div>
              <span className="a-eyebrow">Мойка автомобиля</span>
              <h2>Комплексная мойка</h2>
              <p>Уход за кузовом и салоном. Программа работ и стоимость зависят от автомобиля.</p>
            </div>
            <div className="a-pricing-feature__side">
              <span>ориентировочно от <strong>{priceLabel(site.pricing.complexWashFrom)}</strong></span>
              <a href={phone} className="a-btn a-btn--lime">Позвонить и уточнить ↗</a>
            </div>
          </div>
          <div className="a-pricing-note">{site.pricing.note} <a href={site.pricing.sourceUrl} target="_blank" rel="noopener noreferrer" className="a-source-link">Источник: Яндекс Карты</a> (проверено 24.11.2026).</div>
          <div className="a-prices a-reveal" aria-label="Перечень услуг">
            {site.services.map(service => (
              <div className="a-price-row" key={service.id}>
                <div>
                  <h3>{service.title}</h3>
                  <p>{detailById[service.id] ?? service.description}</p>
                </div>
                <span className="a-price-row__price">
                  {service.id === 'wash'
                    ? `${priceLabel(site.pricing.bodyWashMin)}–${priceLabel(site.pricing.bodyWashMax)}`
                    : 'По запросу'}
                </span>
                <a className="a-btn a-btn--dark" href={phone} aria-label={`Уточнить стоимость: ${service.title}`}>Уточнить ↗</a>
              </div>
            ))}
          </div>
          <div className="a-pricing-foot">
            <p className="a-lead">Не уверены, какая услуга нужна? Обсудите состояние автомобиля по телефону.</p>
            <Link to="/contacts" className="a-btn a-btn--dark">Телефон и маршрут ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
