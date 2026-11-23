import { site, phoneHref } from '../config/site';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const items = [
    ...site.services.map(service => ({title:service.title,description:service.description,price:service.price})),
    ...site.verifiedExtraServices.map(service => ({title:service.title,description:service.description,price:null as number | null})),
  ];
  return <>
    <section className="a-intro a-cream"><div className="a-shell">
      <span className="a-overline">02 / Стоимость работ</span>
      <h1 className="a-h1">Чёткий<br /><span className="a-accent" style={{color:'#246BFD'}}>подход.</span></h1>
      <p className="a-lead">Стоимость зависит от состояния автомобиля и объёма работ. Точную цену уточним после обсуждения вашей задачи.</p>
    </div></section>
    <section className="a-section a-cream">
      <div className="a-shell">
        <div className="a-split-head">
          <h2 className="a-h2 a-h2--compact">Услуги<br />и стоимость.</h2>
          <p className="a-lead">Ознакомьтесь с направлениями работ. Для индивидуального расчёта свяжитесь с нами по телефону.</p>
        </div>
        <div className="a-prices">
          {items.map((item,index) => <div className="a-price-row" key={item.title}>
            <span className="a-service__number">{String(index+1).padStart(2,'0')}</span>
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
            <span className="a-price-row__price">{site.pricesVerified && item.price !== null ? 'от ' + item.price.toLocaleString('ru-RU') + ' ₽' : 'По запросу'}</span>
            <a className="a-btn a-btn--dark" href={phoneHref(site.contacts.phone)} style={{minHeight:43,padding:'10px 15px',fontSize:10}}>Уточнить ↗</a>
          </div>)}
        </div>
      </div>
    </section>
    <section className="a-section a-olive a-final"><div className="a-shell a-final__inner">
      <div><div className="a-overline">Индивидуальный расчёт</div><h2 className="a-h2 a-h2--compact" style={{margin:'24px 0'}}>Обсудим<br /><span className="a-accent">ваш автомобиль.</span></h2><p className="a-lead">Поможем определиться с услугой, временем и стоимостью.</p></div>
      <div style={{display:'flex',flexWrap:'wrap',gap:12}}>
        <a className="a-btn a-btn--lime" href={phoneHref(site.contacts.phone)}>Позвонить <span className="a-arrow">↗</span></a>
        <Link className="a-btn a-btn--outline" to="/contacts">Контакты <span className="a-arrow">→</span></Link>
      </div>
    </div></section>
  </>;
}
