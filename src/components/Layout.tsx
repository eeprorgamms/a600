import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/services', label: 'Услуги' },
    { path: '/pricing', label: 'Цены' },
    { path: '/about', label: 'О нас' },
    { path: '/contacts', label: 'Контакты' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-700 transition-colors">
            А<span className="text-blue-700">500</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(item.path) 
                    ? 'text-blue-700' 
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+79295884094" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+7 (929) 588-40-94</span>
            </a>
            <Link 
              to="/contacts" 
              className="px-5 py-2.5 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover"
            >
              Записаться
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <a href="tel:+79295884094" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+7 (929) 588-40-94</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              А<span className="text-blue-400">500</span>
            </div>
            <p className="text-sm text-gray-400">
              Автомойка и детейлинг-центр на Боровском шоссе. Профессиональный уход за вашим автомобилем.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Ручная мойка</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Химчистка</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Полировка</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Обработка воском</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Детейлинг</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Главная</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Услуги</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Цены</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">О нас</Link></li>
              <li><Link to="/contacts" className="hover:text-blue-400 transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="tel:+79295884094" className="hover:text-blue-400 transition-colors">+7 (929) 588-40-94</a></li>
              <li><a href="tel:+79299555587" className="hover:text-blue-400 transition-colors">+7 (929) 955-55-87</a></li>
              <li>Москва, Боровское шоссе, 6к1</li>
              <li>м. Говорово — 0.7 км</li>
              <li>Пн-Вс: 09:00 — 23:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">© 2024 А500. Все права защищены.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://yandex.ru/maps/org/a500/73889912604/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
              Яндекс.Карты
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
