import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site, phoneHref } from '../config/site';
import ScrollToTop from './ScrollToTop';

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/services', label: 'Услуги' },
  { to: '/pricing', label: 'Цены' },
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
          aria-expanded={open} aria-controls="a500-mobile-nav" aria-label={open ? 'Закрыть меню' : 'Открыть меню'}>
          {open ? '✕' : '☰'}
        </button>
      </div>
    </div>
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
          <p style={{ maxWidth: 310, color: '#c3c9bb', lineHeight: 1.7, fontSize: 14, marginTop: 27 }}>{site.tagline}. Уход за автомобилем с вниманием к деталям.</p>
        </div>
        <div>
          <div className="a-footer__heading">Навигация</div>
          <div className="a-footer__links">{nav.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div>
        </div>
        <div>
          <div className="a-footer__heading">Направления</div>
          <div className="a-footer__links">
            <Link to="/services">Автомойка</Link>
            <Link to="/services">Детейлинг</Link>
            <Link to="/services">PDR</Link>
            <Link to="/services">Полировка</Link>
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
  return <div className="a-page"><ScrollToTop /><Header /><main id="main-content">{children}</main><Footer /></div>;
}
