import { useState, useEffect } from 'react';

// Icons as components
const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'services', 'about', 'gallery', 'pricing', 'reviews', 'contacts'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: '✨',
      title: 'Полировка кузова',
      description: 'Восстановление блеска и удаление царапин. Защитная полировка с применением профессиональных составов.',
      features: ['Удаление царапин', 'Восстановление блеска', 'Защитное покрытие', 'Гарантия 6 месяцев'],
      price: 'от 8 000 ₽',
      duration: '4-8 часов'
    },
    {
      icon: '🛡️',
      title: 'Керамическое покрытие',
      description: 'Нанесение керамического состава для долговременной защиты лакокрасочного покрытия.',
      features: ['Защита на 3 года', 'Гидрофобный эффект', 'UV-защита', 'Лёгкий уход'],
      price: 'от 15 000 ₽',
      duration: '1-2 дня'
    },
    {
      icon: '🧽',
      title: 'Химчистка салона',
      description: 'Глубокая очистка всех поверхностей салона с применением профессиональной химии.',
      features: ['Чистка кожи/ткани', 'Удаление запахов', 'Обработка пластика', 'Чистка потолка'],
      price: 'от 5 000 ₽',
      duration: '3-5 часов'
    },
    {
      icon: '🎬',
      title: 'Оклейка плёнкой',
      description: 'Защитная и декоративная оклейка кузова полиуретановой или виниловой плёнкой.',
      features: ['Защита от сколов', 'Смена цвета', 'Антигравий', 'Самовосстановление'],
      price: 'от 25 000 ₽',
      duration: '2-5 дней'
    },
    {
      icon: '💎',
      title: 'Детейлинг мойка',
      description: 'Бесконтактная и ручная мойка с полной обработкой всех элементов кузова.',
      features: ['Двухфазная мойка', 'Очистка дисков', 'Обработка шин', 'Сушка микрофиброй'],
      price: 'от 2 000 ₽',
      duration: '1-2 часа'
    },
    {
      icon: '🔧',
      title: 'Реставрация кожи',
      description: 'Восстановление и покраска кожаных элементов салона. Устранение потёртостей и трещин.',
      features: ['Покраска кожи', 'Устранение трещин', 'Восстановление цвета', 'Защитное покрытие'],
      price: 'от 6 000 ₽',
      duration: '3-6 часов'
    }
  ];

  const reviews = [
    {
      name: 'Алексей К.',
      car: 'BMW X5',
      text: 'Отдал машину на полировку и керамику. Результат превзошёл все ожидания! Машина выглядит как новая, даже лучше. Ребята — профессионалы своего дела.',
      rating: 5,
      date: '2 недели назад'
    },
    {
      name: 'Мария С.',
      car: 'Mercedes GLC',
      text: 'Делала химчистку салона после зимы. Салон как новый! Убрали все пятна, запах стал свежим. Очень довольна результатом и сервисом.',
      rating: 5,
      date: '1 месяц назад'
    },
    {
      name: 'Дмитрий В.',
      car: 'Porsche Cayenne',
      text: 'Оклеил весь кузов антигравийной плёнкой. Работа выполнена на высшем уровне, стыков не видно. Рекомендую всем!',
      rating: 5,
      date: '3 недели назад'
    },
    {
      name: 'Олег Н.',
      car: 'Audi Q7',
      text: 'Регулярно приезжаю на детейлинг мойку. Всегда отличное качество, внимательное отношение к деталям. Лучшая студия в городе!',
      rating: 5,
      date: '1 неделю назад'
    }
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop', title: 'Полировка BMW' },
    { url: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop', title: 'Керамика Mercedes' },
    { url: 'https://images.unsplash.com/photo-1605515298946-d0573716f0a5?w=600&h=400&fit=crop', title: 'Химчистка салона' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', title: 'Оклейка плёнкой' },
    { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop', title: 'Детейлинг Porsche' },
    { url: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop', title: 'Защитное покрытие' },
  ];

  const stats = [
    { number: '2500+', label: 'Довольных клиентов' },
    { number: '7', label: 'Лет опыта' },
    { number: '15', label: 'Мастеров' },
    { number: '98%', label: 'Рекомендуют нас' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: '', phone: '', service: '', message: '' });
  };

  const navItems = [
    { id: 'services', label: 'Услуги' },
    { id: 'about', label: 'О нас' },
    { id: 'gallery', label: 'Работы' },
    { id: 'pricing', label: 'Цены' },
    { id: 'reviews', label: 'Отзывы' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-950/95 backdrop-blur-lg shadow-lg shadow-black/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-lg">
                D
              </div>
              <span className="text-xl font-bold">Detail<span className="text-amber-400">Pro</span></span>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-colors hover:text-amber-400 ${activeSection === item.id ? 'text-amber-400' : 'text-gray-300'}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:+79991234567" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
                <PhoneIcon />
                <span>+7 (999) 123-45-67</span>
              </a>
              <a href="#contacts" className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg text-sm font-semibold text-black hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                Записаться
              </a>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-300">
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900/98 backdrop-blur-lg border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-300 hover:text-amber-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a href="tel:+79991234567" className="flex items-center space-x-2 px-4 py-2 text-amber-400">
                <PhoneIcon />
                <span>+7 (999) 123-45-67</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(245, 175, 25, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(241, 39, 17, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)'
          }}></div>
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">Работаем ежедневно с 9:00 до 21:00</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Премиальный детейлинг
            <br />
            <span className="text-gradient">вашего автомобиля</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Профессиональный уход за автомобилем с применением передовых технологий и материалов. 
            Вернём вашему авто первозданный вид и защитим его на годы.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#contacts" className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl text-lg font-bold text-black hover:shadow-xl hover:shadow-amber-500/30 transition-all transform hover:scale-105">
              Записаться онлайн
            </a>
            <a href="#services" className="px-8 py-4 glass rounded-xl text-lg font-medium text-white hover:bg-white/10 transition-all">
              Наши услуги →
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Наши услуги</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Полный спектр услуг <span className="text-gradient">детейлинга</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              От комплексной мойки до нанесения керамического покрытия — мы заботимся о каждой детали вашего автомобиля
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group gradient-card rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]"
                onClick={() => setSelectedService(selectedService === i ? null : i)}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-amber-400 font-bold text-lg">{service.price}</span>
                  <span className="text-xs text-gray-500 flex items-center space-x-1">
                    <ClockIcon />
                    <span>{service.duration}</span>
                  </span>
                </div>

                {selectedService === i && (
                  <div className="border-t border-gray-700 pt-4 mt-4 space-y-2 animate-[fadeIn_0.3s_ease-in]">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                    <a href="#contacts" className="inline-block mt-4 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-lg text-amber-400 text-sm font-medium hover:bg-amber-400/20 transition-colors">
                      Записаться →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">О нашей студии</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
                Мы создаём <span className="text-gradient">идеальные</span> автомобили
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                DetailPro — это команда профессионалов, влюблённых в своё дело. Мы работаем с 2017 года и за это время обслужили более 2500 автомобилей премиум-класса.
              </p>
              <p className="text-gray-400 text-lg mb-8">
                Наша студия оснащена современным оборудованием и использует только проверенные материалы от ведущих мировых производителей: Gyeon, Koch Chemie, SunTek, XPEL.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Сертифицированные мастера',
                  'Гарантия на все работы',
                  'Премиум материалы',
                  'Индивидуальный подход',
                  'Фото/видео отчёт',
                  'Трансфер клиента'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckIcon />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <a href="#contacts" className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl font-semibold text-black hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                <span>Связаться с нами</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
                <img
                  src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=700&h=500&fit=crop"
                  alt="Детейлинг студия"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl">
                        🏆
                      </div>
                      <div>
                        <div className="font-bold">Лучшая студия 2024</div>
                        <div className="text-sm text-gray-400">По версии AutoDetailing Awards</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-4 float-animation">
                <div className="text-2xl font-bold text-gradient">7+</div>
                <div className="text-xs text-gray-400">лет на рынке</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Портфолио</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Наши <span className="text-gradient">работы</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Каждый проект — это произведение искусства. Посмотрите результаты нашей работы
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[4/3]">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-bold text-lg">{img.title}</h3>
                    <p className="text-sm text-gray-300">DetailPro Studio</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Прайс-лист</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Прозрачные <span className="text-gradient">цены</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Фиксированные цены без скрытых доплат. Точная стоимость зависит от класса автомобиля
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="gradient-card rounded-2xl p-6 hover:border-gray-600 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Базовый</h3>
                <p className="text-gray-400 text-sm mb-4">Комплексный уход</p>
                <div className="text-4xl font-bold text-gradient">5 000 ₽</div>
              </div>
              <ul className="space-y-3 mb-8">
                {['Двухфазная мойка', 'Чернение шин', 'Обработка пластика', 'Пылесос салона', 'Протирка стёкол'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacts" className="block text-center px-4 py-3 border border-gray-600 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors">
                Выбрать
              </a>
            </div>

            {/* Premium */}
            <div className="gradient-card rounded-2xl p-6 border-amber-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-xs font-bold text-black rounded-bl-lg">
                ПОПУЛЯРНЫЙ
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Премиум</h3>
                <p className="text-gray-400 text-sm mb-4">Максимальная защита</p>
                <div className="text-4xl font-bold text-gradient">25 000 ₽</div>
              </div>
              <ul className="space-y-3 mb-8">
                {['Всё из пакета "Базовый"', 'Полировка кузова', 'Керамическое покрытие', 'Химчистка салона', 'Защита дисков', 'Гарантия 12 месяцев'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacts" className="block text-center px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl text-sm font-bold text-black hover:shadow-lg hover:shadow-amber-500/25 transition-all">
                Выбрать
              </a>
            </div>

            {/* VIP */}
            <div className="gradient-card rounded-2xl p-6 hover:border-gray-600 transition-all">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">VIP</h3>
                <p className="text-gray-400 text-sm mb-4">Полный детейлинг</p>
                <div className="text-4xl font-bold text-gradient">50 000 ₽</div>
              </div>
              <ul className="space-y-3 mb-8">
                {['Всё из пакета "Премиум"', 'Оклейка плёнкой PPF', 'Реставрация кожи', 'Детейлинг моторного отсека', 'Обработка керамикой дисков', 'Гарантия 36 месяцев'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contacts" className="block text-center px-4 py-3 border border-gray-600 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors">
                Выбрать
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Отзывы</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Что говорят <span className="text-gradient">клиенты</span>
            </h2>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <span className="text-gray-400 text-sm">4.9 из 5 — более 200 отзывов</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((review, i) => (
              <div key={i} className="gradient-card rounded-2xl p-6 hover:border-amber-500/20 transition-all">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-black text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.car}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Как мы работаем</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              4 простых <span className="text-gradient">шага</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Заявка', desc: 'Оставьте заявку на сайте или позвоните нам', icon: '📞' },
              { step: '02', title: 'Осмотр', desc: 'Проводим детальный осмотр и согласуем объём работ', icon: '🔍' },
              { step: '03', title: 'Работа', desc: 'Выполняем все работы с фото/видео отчётом', icon: '⚡' },
              { step: '04', title: 'Результат', desc: 'Принимаете работу и наслаждаетесь результатом', icon: '✨' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-amber-400 text-sm font-bold mb-2">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Контакты</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Запишитесь <span className="text-gradient">онлайн</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Оставьте заявку и мы свяжемся с вами в течение 15 минут
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="gradient-card rounded-2xl p-8">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-400">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                      placeholder="Александр"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Услуга</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                    >
                      <option value="" className="bg-gray-900">Выберите услугу</option>
                      {services.map((s, i) => (
                        <option key={i} value={s.title} className="bg-gray-900">{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Сообщение</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all resize-none"
                      placeholder="Марка авто, пожелания..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl font-bold text-black hover:shadow-lg hover:shadow-amber-500/25 transition-all transform hover:scale-[1.02]"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <a href="tel:+79991234567" className="text-gray-400 hover:text-amber-400 transition-colors">+7 (999) 123-45-67</a>
                    <p className="text-sm text-gray-500 mt-1">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
              </div>

              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                    <LocationIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-gray-400">г. Москва, ул. Автомобильная, д. 15</p>
                    <p className="text-sm text-gray-500 mt-1">Удобная парковка, 5 минут от метро</p>
                  </div>
                </div>
              </div>

              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                    <ClockIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Режим работы</h3>
                    <p className="text-gray-400">Пн-Пт: 9:00 — 21:00</p>
                    <p className="text-gray-400">Сб-Вс: 10:00 — 20:00</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="gradient-card rounded-2xl p-6">
                <h3 className="font-bold mb-4">Мы в соцсетях</h3>
                <div className="flex space-x-3">
                  {[
                    { name: 'Telegram', icon: '📱' },
                    { name: 'WhatsApp', icon: '💬' },
                    { name: 'Instagram', icon: '📷' },
                    { name: 'VK', icon: '🌐' },
                  ].map((social, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl hover:bg-amber-400/10 hover:scale-110 transition-all">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="gradient-card rounded-2xl overflow-hidden h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-2">📍</div>
                  <p className="text-sm text-gray-400">г. Москва, ул. Автомобильная, д. 15</p>
                  <a href="https://yandex.ru/maps" target="_blank" rel="noopener noreferrer" className="text-amber-400 text-sm hover:underline mt-1 inline-block">
                    Открыть на карте →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(245, 175, 25, 0.2) 0%, transparent 50%)'
        }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Готовы преобразить <span className="text-gradient">ваш автомобиль</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Запишитесь прямо сейчас и получите скидку 10% на первое посещение. 
            Количество мест ограничено!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contacts" className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl text-lg font-bold text-black hover:shadow-xl hover:shadow-amber-500/30 transition-all transform hover:scale-105 pulse-glow">
              Записаться со скидкой 10%
            </a>
            <a href="tel:+79991234567" className="px-8 py-4 glass rounded-xl text-lg font-medium hover:bg-white/10 transition-all flex items-center space-x-2">
              <PhoneIcon />
              <span>Позвонить</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-lg">
                  D
                </div>
                <span className="text-xl font-bold">Detail<span className="text-amber-400">Pro</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                Премиальная студия детейлинга автомобилей в Москве. Работаем с 2017 года.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Полировка</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Керамика</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Химчистка</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Оклейка</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-amber-400 transition-colors">О нас</a></li>
                <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Портфолио</a></li>
                <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Отзывы</a></li>
                <li><a href="#contacts" className="hover:text-amber-400 transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+7 (999) 123-45-67</li>
                <li>info@detailpro.ru</li>
                <li>г. Москва, ул. Автомобильная, 15</li>
                <li>Пн-Вс: 9:00 — 21:00</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">© 2024 DetailPro. Все права защищены.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">Оферта</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/79991234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-transform"
      >
        <span className="text-2xl">💬</span>
      </a>
    </div>
  );
}

export default App;
