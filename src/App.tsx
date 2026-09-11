import { useState, useEffect } from 'react';

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', car: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeWash, setActiveWash] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'services', 'pricing', 'about', 'gallery', 'reviews', 'contacts'];
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
      icon: '🚿',
      title: 'Ручная мойка',
      description: 'Бережная ручная мойка кузова специализированными средствами. Удаляем соль, реагенты, пыль, смолу без царапин на ЛКП.',
      features: ['Двухфазная мойка', 'Бесконтактная пена', 'Безопасные губки', 'Сушка микрофиброй'],
      price: 'от 500 ₽',
      duration: '20-40 мин'
    },
    {
      icon: '🧽',
      title: 'Химчистка салона',
      description: 'Глубокая очистка всех поверхностей салона. Работаем с кожей, тканью, алькантарой. Удаление пятен и запахов.',
      features: ['Чистка сидений', 'Потолок и двери', 'Багажник', 'Удаление запахов'],
      price: 'от 4 000 ₽',
      duration: '3-5 часов'
    },
    {
      icon: '✨',
      title: 'Полировка кузова',
      description: 'Восстановление блеска лакокрасочного покрытия. Удаление мелких царапин, «паутинки» и потускнений.',
      features: ['Абразивная полировка', 'Финишная полировка', 'Восстановление блеска', 'Защитный слой'],
      price: 'от 5 000 ₽',
      duration: '3-6 часов'
    },
    {
      icon: '🛡️',
      title: 'Обработка воском',
      description: 'Защитное восковое покрытие кузова. Защита от выгорания краски, сколов и коррозии. Эффект гидрофобности.',
      features: ['Защита ЛКП', 'Гидрофобный эффект', 'Блеск и глубина цвета', 'Защита на 2-3 месяца'],
      price: 'от 1 000 ₽',
      duration: '30-60 мин'
    },
    {
      icon: '🔧',
      title: 'Детейлинг',
      description: 'Комплексный уход за автомобилем с применением профессиональных составов. Полная очистка и защита всех поверхностей.',
      features: ['Детальная мойка', 'Очистка глиной', 'Обработка пластика', 'Защита резины'],
      price: 'от 3 000 ₽',
      duration: '2-4 часа'
    },
    {
      icon: '🖤',
      title: 'Чернение резины',
      description: 'Обработка шин и резиновых элементов специальным составом для насыщенного чёрного цвета и защиты.',
      features: ['Насыщенный цвет', 'Защита от растрескивания', 'Долгий эффект', 'Уход за пластиком'],
      price: 'от 300 ₽',
      duration: '10-15 мин'
    }
  ];

  const washPackages = [
    {
      name: 'Экспресс',
      price: '500 ₽',
      duration: '20 мин',
      features: ['Бесконтактная мойка кузова', 'Ополаскивание', 'Сушка кузова', 'Протирка стёкол'],
      popular: false
    },
    {
      name: 'Стандарт',
      price: '900 ₽',
      duration: '40 мин',
      features: ['Бесконтактная мойка', 'Ручная мойка губкой', 'Мойка дисков', 'Чернение резины', 'Протирка стёкол', 'Сушка микрофиброй'],
      popular: true
    },
    {
      name: 'Премиум',
      price: '1 500 ₽',
      duration: '1 час',
      features: ['Всё из «Стандарт»', 'Обработка воском', 'Обработка пластика салона', 'Ароматизатор', 'Защита резины', 'Протирка порогов'],
      popular: false
    },
    {
      name: 'Детейлинг',
      price: '3 000 ₽',
      duration: '2-3 часа',
      features: ['Всё из «Премиум»', 'Очистка глиной', 'Детальная мойка дисков', 'Обработка кожи/пластика', 'Защитное покрытие', 'Финальная проверка'],
      popular: false
    }
  ];

  const reviews = [
    {
      name: 'Артём К.',
      car: 'Toyota Camry',
      text: 'Моемся тут регулярно уже полгода. Всегда качественно, быстро и недорого. Ребята знают своё дело, кузов после мойки как новый!',
      rating: 5,
      date: '1 неделю назад'
    },
    {
      name: 'Елена М.',
      car: 'Kia Sportage',
      text: 'Делала химчистку салона после зимы. Результат потрясающий! Все пятна убрали, салон пахнет свежестью. Очень довольна!',
      rating: 5,
      date: '2 недели назад'
    },
    {
      name: 'Сергей В.',
      car: 'Hyundai Tucson',
      text: 'Отличный сервис! Полировка вернула машине заводской блеск. Цены адекватные, работают аккуратно. Рекомендую!',
      rating: 5,
      date: '3 недели назад'
    },
    {
      name: 'Ольга Д.',
      car: 'Volkswagen Polo',
      text: 'Приехала на комплексную мойку с воском. Машина блестит, вода скатывается каплями. Очень довольна результатом!',
      rating: 4,
      date: '1 месяц назад'
    }
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop', title: 'Полировка кузова' },
    { url: 'https://images.unsplash.com/photo-1605515298946-d0573716f0a5?w=600&h=400&fit=crop', title: 'Химчистка салона' },
    { url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&h=400&fit=crop', title: 'Ручная мойка' },
    { url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600&h=400&fit=crop', title: 'Детейлинг' },
    { url: 'https://images.unsplash.com/photo-1507136366951-c53783aee57a?w=600&h=400&fit=crop', title: 'Защитное покрытие' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', title: 'Восковая обработка' },
  ];

  const stats = [
    { number: '14', label: 'Часов работы в день' },
    { number: '7', label: 'Дней в неделю' },
    { number: '500+', label: 'Довольных клиентов' },
    { number: '4.0', label: 'Рейтинг на картах' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', phone: '', service: '', car: '', message: '' });
  };

  const navItems = [
    { id: 'services', label: 'Услуги' },
    { id: 'pricing', label: 'Цены' },
    { id: 'about', label: 'О нас' },
    { id: 'gallery', label: 'Работы' },
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-bold text-lg">
                A5
              </div>
              <span className="text-xl font-bold">А<span className="text-sky-400">500</span></span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-colors hover:text-sky-400 ${activeSection === item.id ? 'text-sky-400' : 'text-gray-300'}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:+79295884094" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
                <PhoneIcon />
                <span>+7 (929) 588-40-94</span>
              </a>
              <a href="#contacts" className="px-5 py-2.5 bg-gradient-to-r from-sky-400 to-blue-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-sky-500/25 transition-all">
                Записаться
              </a>
            </div>

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

        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900/98 backdrop-blur-lg border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-300 hover:text-sky-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a href="tel:+79295884094" className="flex items-center space-x-2 px-4 py-2 text-sky-400">
                <PhoneIcon />
                <span>+7 (929) 588-40-94</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/30 to-gray-950"></div>
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)'
          }}></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">Работаем ежедневно 09:00 — 23:00</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Автомойка
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">и детейлинг</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Ручная мойка, химчистка, полировка и обработка воском. 
            Бережный уход за вашим автомобилем с применением профессиональной автохимии. 
            Работаем до 23:00 без выходных!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#contacts" className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl text-lg font-bold text-white hover:shadow-xl hover:shadow-sky-500/30 transition-all transform hover:scale-105">
              Записаться на мойку
            </a>
            <a href="#pricing" className="px-8 py-4 glass rounded-xl text-lg font-medium text-white hover:bg-white/10 transition-all">
              Посмотреть цены →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

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
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Наши услуги</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Полный уход за <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">вашим авто</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              От экспресс-мойки до комплексного детейлинга — мы позаботимся о каждой детали вашего автомобиля
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group gradient-card rounded-2xl p-6 hover:border-sky-500/30 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]"
                onClick={() => setSelectedService(selectedService === i ? null : i)}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sky-400 font-bold text-lg">{service.price}</span>
                  <span className="text-xs text-gray-500 flex items-center space-x-1">
                    <ClockIcon />
                    <span>{service.duration}</span>
                  </span>
                </div>

                {selectedService === i && (
                  <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                    <a href="#contacts" className="inline-block mt-4 px-4 py-2 bg-sky-400/10 border border-sky-400/30 rounded-lg text-sky-400 text-sm font-medium hover:bg-sky-400/20 transition-colors">
                      Записаться →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Комплексы мойки</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Выберите <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">свой пакет</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Фиксированные цены без скрытых доплат. Точная стоимость зависит от класса автомобиля
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {washPackages.map((pkg, i) => (
              <div
                key={i}
                className={`gradient-card rounded-2xl p-6 relative overflow-hidden transition-all hover:transform hover:scale-[1.02] ${pkg.popular ? 'border-sky-500/50 ring-1 ring-sky-500/20' : 'hover:border-gray-600'}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-sky-400 to-blue-600 text-xs font-bold text-white rounded-bl-lg">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent mb-1">{pkg.price}</div>
                  <div className="text-xs text-gray-500">~ {pkg.duration}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center space-x-2 text-sm text-gray-300">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contacts" className={`block text-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${pkg.popular ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white hover:shadow-lg hover:shadow-sky-500/25' : 'border border-gray-600 hover:bg-white/5'}`}>
                  Выбрать
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">* Цены указаны для легковых автомобилей. Для внедорожников и минивэнов — наценка 20-30%</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">О нас</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
                Чистота и <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">забота</span> о вашем авто
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                <strong className="text-white">А500</strong> — это автомойка и детейлинг-центр на Боровском шоссе. Мы используем специализированные средства, которые бережно удаляют соль, химические реагенты, пыль, смолу и другие виды загрязнений.
              </p>
              <p className="text-gray-400 text-lg mb-8">
                Наши сотрудники применяют приспособления, которые <strong className="text-white">не оставляют царапин на ЛКП</strong>. Мы поможем подобрать автохимию для защиты кузова от выгорания краски, сколов и коррозии.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Работаем до 23:00',
                  'Без выходных',
                  'Профессиональная химия',
                  'Без царапин на ЛКП',
                  'Удобная парковка',
                  'м. Говорово — 0.7 км'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckIcon />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <a href="#contacts" className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-sky-500/25 transition-all">
                <span>Записаться на мойку</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/10">
                <img
                  src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=700&h=500&fit=crop"
                  alt="Автомойка А500"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xl">
                        💧
                      </div>
                      <div>
                        <div className="font-bold">Работаем до 23:00</div>
                        <div className="text-sm text-gray-400">Без выходных и перерывов</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 glass rounded-xl p-4 float-animation">
                <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">09-23</div>
                <div className="text-xs text-gray-400">часов работы</div>
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
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Наши работы</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Результат <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">говорит сам</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Посмотрите, как мы заботимся об автомобилях наших клиентов
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
                    <p className="text-sm text-gray-300">А500</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Отзывы</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Что говорят <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">клиенты</span>
            </h2>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <span className="text-gray-400 text-sm">4.0 — оценка на Яндекс.Картах</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((review, i) => (
              <div key={i} className="gradient-card rounded-2xl p-6 hover:border-sky-500/20 transition-all">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
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

      {/* Contact Section */}
      <section id="contacts" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Контакты</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Запишитесь <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">прямо сейчас</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Позвоните нам или оставьте заявку — мы подберём удобное время
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
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
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Услуга</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                    >
                      <option value="" className="bg-gray-900">Выберите услугу</option>
                      {services.map((s, i) => (
                        <option key={i} value={s.title} className="bg-gray-900">{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Марка авто</label>
                    <input
                      type="text"
                      value={formData.car}
                      onChange={e => setFormData({...formData, car: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all"
                      placeholder="Toyota Camry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Комментарий</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none transition-all resize-none"
                      placeholder="Удобное время, пожелания..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-sky-500/25 transition-all transform hover:scale-[1.02]"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Телефоны</h3>
                    <a href="tel:+79295884094" className="text-gray-400 hover:text-sky-400 transition-colors block">+7 (929) 588-40-94</a>
                    <a href="tel:+79299555587" className="text-gray-400 hover:text-sky-400 transition-colors block">+7 (929) 955-55-87</a>
                  </div>
                </div>
              </div>

              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400">
                    <LocationIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-gray-400">г. Москва, Боровское шоссе, 6к1</p>
                    <p className="text-sm text-gray-500 mt-1">м. Говорово — 0.7 км • ЗАО, Солнцево</p>
                  </div>
                </div>
              </div>

              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400">
                    <ClockIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Режим работы</h3>
                    <p className="text-gray-400">Пн — Вс: 09:00 — 23:00</p>
                    <p className="text-sm text-gray-500 mt-1">Без выходных и перерывов</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="gradient-card rounded-2xl overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.402218%2C55.659749&z=17&pt=37.402218,55.659749,pm2blm"
                  width="100%"
                  height="200"
                  frameBorder="0"
                  style={{ border: 0 }}
                  title="А500 на карте"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-cyan-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.2) 0%, transparent 50%)'
        }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Приезжайте <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">прямо сейчас!</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Работаем до 23:00 без выходных. Позвоните и мы подберём удобное время для мойки вашего автомобиля.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+79295884094" className="px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl text-lg font-bold text-white hover:shadow-xl hover:shadow-sky-500/30 transition-all transform hover:scale-105 pulse-glow flex items-center space-x-2">
              <PhoneIcon />
              <span>Позвонить</span>
            </a>
            <a href="#contacts" className="px-8 py-4 glass rounded-xl text-lg font-medium hover:bg-white/10 transition-all">
              Оставить заявку
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
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-bold text-lg">
                  A5
                </div>
                <span className="text-xl font-bold">А<span className="text-sky-400">500</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                Автомойка и детейлинг-центр на Боровском шоссе. Работаем ежедневно с 9:00 до 23:00.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-sky-400 transition-colors">Ручная мойка</a></li>
                <li><a href="#services" className="hover:text-sky-400 transition-colors">Химчистка</a></li>
                <li><a href="#services" className="hover:text-sky-400 transition-colors">Полировка</a></li>
                <li><a href="#services" className="hover:text-sky-400 transition-colors">Обработка воском</a></li>
                <li><a href="#services" className="hover:text-sky-400 transition-colors">Детейлинг</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-sky-400 transition-colors">Услуги</a></li>
                <li><a href="#pricing" className="hover:text-sky-400 transition-colors">Цены</a></li>
                <li><a href="#about" className="hover:text-sky-400 transition-colors">О нас</a></li>
                <li><a href="#reviews" className="hover:text-sky-400 transition-colors">Отзывы</a></li>
                <li><a href="#contacts" className="hover:text-sky-400 transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="tel:+79295884094" className="hover:text-sky-400 transition-colors">+7 (929) 588-40-94</a></li>
                <li><a href="tel:+79299555587" className="hover:text-sky-400 transition-colors">+7 (929) 955-55-87</a></li>
                <li>Боровское шоссе, 6к1</li>
                <li>м. Говорово</li>
                <li>Пн-Вс: 09:00 — 23:00</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">© 2024 А500 — Автомойка и детейлинг. Все права защищены.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://yandex.ru/maps/org/a500/73889912604/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-sky-400 transition-colors">Яндекс.Карты</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating call button */}
      <a
        href="tel:+79295884094"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-500/30 hover:scale-110 transition-transform"
      >
        <PhoneIcon />
      </a>
    </div>
  );
}

export default App;
