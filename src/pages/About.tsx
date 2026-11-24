import { site, phoneHref } from '../config/site';

export default function About() {
  return <>
    <section className="a-intro a-olive">
      <div className="a-contours" aria-hidden="true" />
      <div className="a-shell" style={{position:'relative'}}>
        <span className="a-eyebrow">О компании</span>
        <h1 className="a-h1" style={{maxWidth:'15ch'}}>ЗНАКОМЬТЕСЬ:<br /><span className="a-accent">А500.</span></h1>
        <p className="a-lead">А500 — автомойка и детейлинг-центр на Боровском шоссе в Москве. Мы уделяем внимание состоянию кузова и салона, а также особенностям каждого автомобиля.</p>
      </div>
    </section>
    <section className="a-section--tight a-cream" aria-label="Фирменный блок А500">
      <div className="a-shell">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'24px',padding:'clamp(28px,5vw,56px)',border:'1px solid #CED6E2',borderRadius:'10px',background:'#FFFFFF'}}>
          <div>
            <span className="a-eyebrow" style={{color:'#687589',marginBottom:'14px'}}>Фирменный стиль</span>
            <div style={{fontFamily:'var(--a-body)',fontSize:'clamp(56px,9vw,108px)',lineHeight:1,fontWeight:800,letterSpacing:'-.075em',color:'#111318'}}>А<span style={{color:'#246BFD'}}>500</span></div>
          </div>
          <p style={{maxWidth:'330px',margin:0,fontSize:'clamp(15px,1.5vw,19px)',lineHeight:1.65,color:'#414D5C'}}>Внимание к деталям.<br />Чистота в каждом решении.</p>
        </div>
      </div>
    </section>
    <section className="a-section a-cream">
      <div className="a-shell">
        <div className="a-split-head">
          <div><div className="a-eyebrow">Наш подход</div><h2 className="a-h2" style={{marginTop:26}}>НАШИ<br /><span className="a-accent" style={{color:'#246BFD'}}>ПРИНЦИПЫ.</span></h2></div>
          <p className="a-lead">Уход за автомобилем — это последовательность точных действий, от оценки состояния поверхности до финальной проверки.</p>
        </div>
        <div className="a-feature-list">
          {site.advantages.map((item)=><div className="a-feature" key={item.title}>
            
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>)}
        </div>
      </div>
    </section>
    <section className="a-section a-sage">
      <div className="a-shell" style={{maxWidth:1030}}>
        <div className="a-eyebrow">Частые вопросы</div>
        <h2 className="a-h2 a-h2--compact" style={{margin:'24px 0 40px'}}>ОТВЕТЫ НА ВОПРОСЫ.</h2>
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
        <div><span className="a-eyebrow">Связаться с А500</span><h2 className="a-h2 a-h2--compact" style={{margin:'24px 0'}}>СВЯЖИТЕСЬ<br /><span className="a-accent">С НАМИ.</span></h2><p className="a-lead">Обсудите подходящий формат ухода с администратором.</p></div>
        <a href={phoneHref(site.contacts.phone)} className="a-btn a-btn--lime">Позвонить <span className="a-arrow">↗</span></a>
      </div>
    </section>
  </>;
}
