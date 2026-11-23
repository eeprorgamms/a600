import { Link } from 'react-router-dom';
import { site, phoneHref } from '../config/site';

const services = [
  { title: 'Мойка кузова', detail: 'Опубликованный диапазон стоимости мойки кузова', price: '1 000–3 000 ₽' },
  { title: 'Химчистка салона', detail: 'Чистка сидений, пластика и текстиля', price: null },
  { title: 'Полировка кузова', detail: 'Коррекция и восстановление блеска ЛКП', price: null },
  { title: 'Детейлинг', detail: 'Комплексный уход за автомобилем', price: null },
  { title: 'Обработка воском', detail: 'Защитная обработка кузова', price: null },
] as const;

export default function Pricing() {
  return (
    <div className="a-page-section">
      <section className="a-intro a-cream a-intro--compact">
        <div className="a-shell">
          <span className="a-eyebrow">Прайс-лист</span>
          <h1 className="a-h1">Цены <span className="a-accent">на услуги</span></h1>
          <p className="a-lead">Стоимость зависит от типа автомобиля и выбранных работ. Для точного расчёта позвоните нам.</p>
        </div>
      </section>
      <section className="a-section a-cream a-section--prices">
        <div className="a-shell">
          <div className="a-pricing-feature a-reveal">
            <div><span className="a-eyebrow">Мойка автомобиля</span><h2>Комплексная мойка</h2><p>Наружная и внутренняя уборка. Состав работ согласовывается при обращении.</p></div>
            <div className="a-pricing-feature__side"><span>от <strong>1 800 ₽</strong></span><a href={phoneHref(site.contacts.phone)} className="a-btn a-btn--lime">Уточнить и записаться ↗</a></div>
          </div>
          <p className="a-pricing-note">Начальная стоимость комплексной мойки — по карточке А500 в Яндекс Картах. Мойка кузова — 1 000–3 000 ₽ по информации из карточки А500; другие услуги оцениваются индивидуально.</p>
          <div className="a-prices a-reveal">
            {services.map(item => (
              <div className="a-price-row" key={item.title}>
                <div><h3>{item.title}</h3><p>{item.detail}</p></div>
                <span className="a-price-row__price">{item.price ?? 'По запросу'}</span>
                <a className="a-btn a-btn--dark" href={phoneHref(site.contacts.phone)}>Уточнить ↗</a>
              </div>
            ))}
          </div>
          <div className="a-pricing-foot a-reveal">
            <div><h2 className="a-h2 a-h2--compact">Нужен расчёт?</h2><p className="a-lead">Обсудим автомобиль и стоимость подходящих работ.</p></div>
            <Link className="a-btn a-btn--dark" to="/contacts">Контакты и маршрут ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
