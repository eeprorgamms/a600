import { useState } from 'react';
import { Link } from 'react-router';
import { site, phoneHref, priceLabel } from '../config/site';

export default function Services() {
  const [opened, setOpened] = useState<string | null>(null);
  return <>
    <section className="a-intro a-cream"><div className="a-shell">
      <div className="a-eyebrow">Наши направления</div>
      <h1 className="a-h1">Услуги<br /><span className="a-accent" style={{color:'#246BFD'}}>A500.</span></h1>
      <p className="a-lead">Мойка кузова, химчистка салона, полировка и детейлинг. Уточните стоимость и время выполнения работ по телефону.</p>
    </div></section>
    <section className="a-section a-sage">
      <div className="a-shell">
        <div className="a-eyebrow">Что входит в услуги</div>
        <h2 className="a-h2 a-h2--compact" style={{margin:'23px 0 55px'}}>Мойка, уход<br />и полировка.</h2>
        <div className="a-service-grid">
          {site.services.map((service) => <div className="a-service" key={service.id}>
            
            <h3 className="a-service__title">{service.title}</h3>
            <p className="a-service__desc">{service.description}</p>
            <div className="a-service__foot">
              <span>{service.id === 'wash' ? `Ориентир: ${priceLabel(site.pricing.bodyWashMin)}–${priceLabel(site.pricing.bodyWashMax)}` : 'Стоимость по запросу'}</span>
              <button type="button" aria-expanded={opened === service.id} onClick={() => setOpened(opened === service.id ? null : service.id)}
                style={{border:0,background:'none',fontSize:12,fontWeight:850,textTransform:'uppercase',letterSpacing:'.08em',cursor:'pointer'}}>{opened===service.id ? 'Скрыть −' : 'Состав +'}</button>
            </div>
            {opened === service.id && <div style={{width:'100%',paddingTop:18,borderTop:'1px solid #C3CEDB',marginTop:18}}>
              <ul style={{margin:'0 0 22px',paddingLeft:20,fontSize:14,lineHeight:1.8}}>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              <a className="a-text-link" href={phoneHref(site.contacts.phone)}>Уточнить детали ↗</a>
            </div>}
          </div>)}
        </div>
      </div>
    </section>
    <section className="a-section a-olive a-final">
      <div className="a-shell a-final__inner">
        <div className="a-reveal">
          <span className="a-eyebrow">А500 · Москва</span>
          <h2 className="a-h2 a-h2--compact" style={{margin:'22px 0'}}>Комплексная мойка<br /><span className="a-accent">{priceLabel(site.pricing.complexWashFrom, true)}</span></h2>
          <p className="a-lead">Уточните программу мойки и свободное время по телефону.</p>
        </div>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <a href={phoneHref(site.contacts.phone)} className="a-btn a-btn--lime">Записаться ↗</a>
          <Link to="/pricing" className="a-btn a-btn--outline">Прайс ↗</Link>
        </div>
      </div>
    </section>
  </>;
}
