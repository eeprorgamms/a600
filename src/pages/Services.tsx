import { useState } from 'react';
import { Link } from 'react-router-dom';
import { site, phoneHref } from '../config/site';

const extra = site.verifiedExtraServices;
export default function Services() {
  const [opened, setOpened] = useState<string | null>(null);
  return <>
    <section className="a-intro a-cream"><div className="a-shell">
      <div className="a-eyebrow">Наши направления</div>
      <h1 className="a-h1">Услуги<br /><span className="a-accent" style={{color:'#246BFD'}}>A500.</span></h1>
      <p className="a-lead">Мойка, уход за салоном, полировка и кузовные работы. Выбирайте нужную услугу — подробности и стоимость уточняйте по телефону.</p>
    </div></section>
    <section className="a-section a-sage">
      <div className="a-shell">
        <div className="a-eyebrow">Что входит в услуги</div>
        <h2 className="a-h2 a-h2--compact" style={{margin:'23px 0 55px'}}>Мойка, уход<br />и полировка.</h2>
        <div className="a-service-grid">
          {site.services.map((service,index) => <div className="a-service" key={service.id}>
            
            <h3 className="a-service__title">{service.title}</h3>
            <p className="a-service__desc">{service.description}</p>
            <div className="a-service__foot">
              <span>{site.pricesVerified ? 'от ' + service.price.toLocaleString('ru-RU') + ' ₽' : 'Цена по запросу'}</span>
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
    <section className="a-section a-olive">
      <div className="a-shell">
        <div className="a-eyebrow">Кузов и защита</div>
        <h2 className="a-h2" style={{margin:'24px 0 54px'}}>PDR и защита<br /><span className="a-accent">кузова.</span></h2>
        <div className="a-feature-list" style={{borderColor:'#48546A'}}>
          {extra.map((item,i)=><div className="a-feature" key={item.title} style={{borderColor:'#48546A'}}>
            
            <h3 style={{color:'var(--a-cream)'}}>{item.title}</h3>
            <p style={{color:'#B6C4D8'}}>{item.description}</p>
          </div>)}
        </div>
        <Link to="/contacts" className="a-btn a-btn--lime" style={{marginTop:48}}>Контакты и маршрут <span className="a-arrow">↗</span></Link>
      </div>
    </section>
  </>;
}
