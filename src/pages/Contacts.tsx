import { Link } from 'react-router-dom';
import { site, phoneHref } from '../config/site';

export default function Contacts() {
  return <>
    <section className="a-intro a-cream">
      <div className="a-shell">
        <span className="a-overline">04 / Связаться с нами</span>
        <h1 className="a-h1">Давайте<br /><span className="a-accent" style={{color:'#246BFD'}}>на связи.</span></h1>
        <p className="a-lead">Обсудим услуги, стоимость и удобное время посещения. Позвоните нам или найдите нас на карте.</p>
      </div>
    </section>
    <section className="a-section a-cream">
      <div className="a-shell">
        <div className="a-contact-grid">
          <div>
            <div className="a-contact-block">
              <span>01 / Телефон</span>
              <a href={phoneHref(site.contacts.phone)}>{site.contacts.phone}</a>
              <p className="a-small" style={{color:'#667487',marginTop:15}}>Для консультации, оценки стоимости и согласования посещения.</p>
            </div>
            <div className="a-contact-block">
              <span>02 / Адрес</span>
              <strong>{site.contacts.address}</strong>
              <p className="a-small" style={{color:'#667487',marginTop:15}}>{site.contacts.district}. {site.contacts.landmark}</p>
            </div>
          </div>
          <div>
            <div className="a-contact-block">
              <span>03 / Режим работы</span>
              <strong>{site.contacts.hours}</strong>
              <p className="a-small" style={{color:'#667487',marginTop:15}}>Перед посещением рекомендуем уточнить время по телефону.</p>
            </div>
            <div className="a-contact-block">
              <span>04 / Маршрут</span>
              <strong>Найдите<br />нас на карте.</strong>
              <a style={{marginTop:23,display:'inline-flex'}} href={site.contacts.mapUrl} target="_blank" rel="noopener noreferrer" className="a-btn a-btn--dark">Открыть Яндекс Карты <span className="a-arrow">↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="a-olive a-section--tight">
      <div className="a-shell">
        <div className="a-overline">Где находится А500</div>
        <h2 className="a-h2 a-h2--compact" style={{margin:'24px 0 38px'}}>Боровское шоссе,<br /><span className="a-accent">6к1.</span></h2>
        <div className="a-map">
          <iframe title="Расположение А500 на Яндекс Картах" src={site.contacts.mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
        </div>
        <div style={{marginTop:26,display:'flex',flexWrap:'wrap',gap:14}}>
          <a className="a-btn a-btn--lime" href={site.contacts.mapUrl} target="_blank" rel="noopener noreferrer">Построить маршрут <span className="a-arrow">↗</span></a>
          <a className="a-btn a-btn--outline" href={phoneHref(site.contacts.phone)}>Позвонить <span className="a-arrow">↗</span></a>
        </div>
      </div>
    </section>
    <section className="a-section a-cream"><div className="a-shell">
      <div className="a-split-head">
        <div><span className="a-overline">Перед посещением</span><h2 className="a-h2 a-h2--compact" style={{marginTop:24}}>Обсудим<br />вашу задачу.</h2></div>
        <div><p className="a-lead">Подскажем, какие работы могут подойти для вашего автомобиля, и согласуем удобный способ связи.</p><Link to="/services" className="a-text-link" style={{display:'inline-block',marginTop:15}}>Посмотреть услуги ↗</Link></div>
      </div>
    </div></section>
  </>;
}
