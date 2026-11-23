import { Link } from 'react-router-dom';
import { site, phoneHref } from '../config/site';

export default function Home() {
  return (
    <section className="a-hero a-hero--home" aria-labelledby="home-headline">
      <img
        src={site.images.hero}
        alt="Автомобиль в детейлинг-центре"
        className="a-hero__image"
        decoding="async"
        fetchPriority="high"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = site.images.fallback;
        }}
      />
      <div className="a-shell a-hero__content">
        <p className="a-eyebrow">Автомойка · Детейлинг · PDR</p>
        <h1 id="home-headline" className="a-h1">
          АВТОМОЙКА<br />
          И <span className="a-accent">ДЕТЕЙЛИНГ</span><br />
          A500
        </h1>
        <p className="a-lead">
          Мойка, полировка, уход за салоном и удаление вмятин без покраски.
          Москва, Боровское шоссе, 6к1.
        </p>
        <div className="a-hero__actions">
          <Link className="a-btn a-btn--lime" to="/services">Наши услуги <span className="a-arrow" aria-hidden="true">→</span></Link>
          <a className="a-btn a-btn--outline" href={phoneHref(site.contacts.phone)}>Позвонить <span className="a-arrow" aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="a-shell a-hero__bottom">
        <span>Москва · Солнцево</span>
        <Link to="/contacts" className="a-hero__route">Как добраться →</Link>
      </div>
    </section>
  );
}
