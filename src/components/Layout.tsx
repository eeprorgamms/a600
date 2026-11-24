import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { site, phoneHref } from '../config/site';
import ScrollToTop from './ScrollToTop';

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/pricing', label: 'Услуги и цены' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' },
];

function Brand() {
  return <span className="a-logo" aria-label={site.brand}>А<span>500</span></span>;
}

function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <header className="a-header">
    <div className="a-shell a-header__inner">
      <Link to="/" aria-label="А500 — главная"><Brand /></Link>
      <nav className="a-nav" aria-label="Основная навигация">
        {nav.map(item => <Link key={item.to} to={item.to} aria-current={location.pathname === item.to ? 'page' : undefined}>{item.label}</Link>)}
      </nav>
      <div className="a-header__contact">
        <a className="a-header__phone" href={phoneHref(site.contacts.phone)}>{site.contacts.phone}</a>
        <a className="a-btn a-btn--lime" href={phoneHref(site.contacts.phone)}>Позвонить <span className="a-arrow" aria-hidden="true">↗</span></a>
        <button type="button" className="a-menu-btn" onClick={() => setOpen(prev => !prev)}
          aria-expanded={open} aria-controls={open ? "a500-mobile-nav" : undefined} aria-label={open ? 'Закрыть меню' : 'Открыть меню'}>
          {open ? '✕' : '☰'}
        </button>
      </div>
    </div>
    {open && <button type="button" className="a-menu-backdrop" aria-label="Закрыть меню" onClick={() => setOpen(false)} />}
    {open && <nav id="a500-mobile-nav" className="a-mobile-nav" aria-label="Мобильная навигация">
      {nav.map(item => <Link key={item.to} to={item.to} aria-current={location.pathname === item.to ? 'page' : undefined}>{item.label}</Link>)}
      <a className="a-btn a-btn--lime" href={phoneHref(site.contacts.phone)}>Позвонить <span className="a-arrow" aria-hidden="true">↗</span></a>
    </nav>}
  </header>;
}

function Footer() {
  return <footer className="a-footer">
    <div className="a-shell">
      <div className="a-footer__grid">
        <div>
          <Link to="/" aria-label="А500 — главная"><Brand /></Link>
          <p style={{ maxWidth: 310, color: '#B7C2D4', lineHeight: 1.7, fontSize: 14, marginTop: 27 }}>{site.tagline}. Уход за автомобилем с вниманием к деталям.</p>
        </div>
        <div>
          <div className="a-footer__heading">Навигация</div>
          <div className="a-footer__links">{nav.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div>
        </div>
        <div>
          <div className="a-footer__heading">Направления</div>
          <div className="a-footer__links">
            <Link to="/pricing">Автомойка</Link>
            <Link to="/pricing">Детейлинг</Link>
            <Link to="/pricing">Химчистка салона</Link>
            <Link to="/pricing">Полировка</Link>
          </div>
        </div>
        <div>
          <div className="a-footer__heading">Контакты</div>
          <div className="a-footer__links">
            <a href={phoneHref(site.contacts.phone)}>{site.contacts.phone}</a>
            <a href={site.contacts.mapUrl} target="_blank" rel="noopener noreferrer">{site.contacts.address}</a>
            <Link to="/contacts">Как добраться ↗</Link>
          </div>
        </div>
      </div>
      <div className="a-footer__bottom"><span>© {new Date().getFullYear()} А500</span><span>Москва · Боровское шоссе, 6к1</span></div>
    </div>
  </footer>;
}

export default function Layout({ children }: {children: React.ReactNode}) {
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [location.pathname]);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.a-reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(node => node.classList.add('a-visible'));
      return;
    }
    document.documentElement.dataset.motion = 'enabled';
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('a-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.08 });
    items.forEach(node => observer.observe(node));
    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.motion;
    };
  }, [location.pathname]);

  return <div className="a-page">
    <a className="a-skip-link" href="#main-content">К содержимому</a>
    <div className="a-scroll-progress" aria-hidden="true" style={{ width: progress + '%' }} />
    <ScrollToTop />
    <Header />
    <main id="main-content" className="a-route-enter" key={location.pathname} tabIndex={-1}>{children}</main>
    <Footer />
  </div>;
}
