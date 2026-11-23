import { site, phoneHref } from '../config/site';

export default function About() {
  return <>
    <section className="a-intro a-olive">
      <div className="a-contours" aria-hidden="true" />
      <div className="a-shell" style={{position:'relative'}}>
        <span className="a-eyebrow">О компании</span>
        <h1 className="a-h1" style={{maxWidth:'15ch'}}>О компании<br /><span className="a-accent">детали.</span></h1>
        <p className="a-lead">А500 — автомойка и детейлинг-центр на Боровском шоссе в Москве. Мы уделяем внимание состоянию кузова и салона, а также особенностям каждого автомобиля.</p>
      </div>
    </section>
    <section className="a-photo-band">
      <img src={site.images.about} alt="Автомобиль в процессе ухода" loading="lazy" decoding="async"
        onError={event=>{event.currentTarget.onerror=null;event.currentTarget.src=site.images.fallback;}} />
    </section>
    <section className="a-section a-cream">
      <div className="a-shell">
        <div className="a-split-head">
          <div><div className="a-eyebrow">Наш подход</div><h2 className="a-h2" style={{marginTop:26}}>Хорошая работа<br />видна <span className="a-accent" style={{color:'#246BFD'}}>вблизи.</span></h2></div>
          <p className="a-lead">Уход за автомобилем — это последовательность точных действий, от оценки состояния поверхности до финальной проверки.</p>
        </div>
        <div className="a-feature-list">
          {site.advantages.map((item,i)=><div className="a-feature" key={item.title}>
            
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>)}
        </div>
      </div>
    </section>
    <section className="a-section a-sage">
      <div className="a-shell" style={{maxWidth:1030}}>
        <div className="a-eyebrow">Частые вопросы</div>
        <h2 className="a-h2 a-h2--compact" style={{margin:'24px 0 40px'}}>Полезно знать.</h2>
        <div className="a-faq">
          {site.faq.map((entry,i)=><details key={i}>
            <summary>{entry.question}</summary>
            <p>{entry.answer}</p>
          </details>)}
        </div>
      </div>
    </section>
    <section className="a-section a-olive a-final">
      <div className="a-shell a-final__inner">
        <div><span className="a-eyebrow">Связаться с А500</span><h2 className="a-h2 a-h2--compact" style={{margin:'24px 0'}}>Уточним<br /><span className="a-accent">все детали.</span></h2><p className="a-lead">Обсудите подходящий формат ухода с администратором.</p></div>
        <a href={phoneHref(site.contacts.phone)} className="a-btn a-btn--lime">Позвонить <span className="a-arrow">↗</span></a>
      </div>
    </section>
  </>;
}
