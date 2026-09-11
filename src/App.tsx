import { useState, useEffect } from 'react';

// Icons as components
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
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'services', 'about', 'gallery', 'advantages', 'reviews', 'contacts'];
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
      icon: '🛡️',
      title: 'Антигравийная плёнка',
      description: 'Оклейка кузова полиуретановой плёнкой Crystal, DELTA SKIN, UNION, NAR, VEGA, MOLECKULA, LLumar. Защита от сколов, реагентов и мелких повреждений.',
      features: ['Защита от сколов и царапин', 'Самовосстановление', 'Гарантия до 5 лет', 'Прозрачная или цветная'],
      price: 'от 160 000 ₽',
      duration: '3-7 дней'
    },
    {
      icon: '💎',
      title: 'Керамическое покрытие',
      description: 'Нанесение керамики Labocosmetica для долговременной защиты лакокрасочного покрытия с эффектом гидрофобности.',
      features: ['Защита на 2-3 года', 'Гидрофобный эффект', 'UV-защита', 'Зеркальный блеск'],
      price: 'от 25 000 ₽',
      duration: '1-2 дня'
    },
    {
      icon: '✨',
      title: 'Полировка кузова',
      description: 'Бережная полировка с индивидуальным подбором паст и кругов Koch Chemie. Устраняем до 99% царапин и «паутинки».',
      features: ['Удаление царапин', 'Восстановление блеска', 'Зеркальный эффект', 'Подготовка под керамику'],
      price: 'от 15 000 ₽',
      duration: '1-2 дня'
    },
    {
      icon: '🔧',
      title: 'Удаление вмятин PDR',
      description: 'Ремонт вмятин без покраски с сохранением заводского ЛКП. Восстанавливаем геометрию кузова профессиональным инструментом.',
      features: ['Сохранение ЛКП', 'Без шпаклёвки и покраски', 'Быстрый ремонт', 'От 15 минут'],
      price: 'от 3 000 ₽',
      duration: 'от 15 мин'
    },
    {
      icon: '🧽',
      title: 'Химчистка салона',
      description: 'Полное восстановление чистоты салона. Работаем с кожей, тканью, алькантарой. Удаление запахов, пятен и бактерий.',
      features: ['Чистка кожи/ткани/алькантары', 'Удаление запахов', 'Обработка пластика', 'Озонирование'],
      price: 'от 8 000 ₽',
      duration: '4-6 часов'
    },
    {
      icon: '🪟',
      title: 'Бронирование стёкол',
      description: 'Установка защитных антиударных плёнок ClearPlex для безопасности и долговечности лобового стекла.',
      features: ['Защита от сколов', 'Прозрачность 99%', 'UV-фильтр', 'Гарантия 3 года'],
      price: 'от 8 000 ₽',
      duration: '2-3 часа'
    },
    {
      icon: '🎨',
      title: 'Тонировка по ГОСТ',
      description: 'Установка сертифицированных плёнок на стёкла с аккуратной подрезкой и идеальной прозрачностью.',
      features: ['По ГОСТу', 'Премиум плёнки', 'Аккуратная подрезка', 'Гарантия'],
      price: 'от 5 000 ₽',
      duration: '2-3 часа'
    },
    {
      icon: '🪑',
      title: 'Ремонт интерьера',
      description: 'Перетяжка, покраска и восстановление элементов салона — руля, торпедо, сидений, кожи и пластика.',
      features: ['Перетяжка кожи', 'Покраска пластика', 'Реставрация руля', 'Восстановление цвета'],
      price: 'от 10 000 ₽',
      duration: '1-3 дня'
    },
    {
      icon: '🎨',
      title: 'Покраска авто',
      description: 'Кузовной ремонт и покраска отдельных элементов с точным подбором цвета и соблюдением технологий.',
      features: ['Подбор цвета', 'Локальная покраска', 'Качественные ЛКМ', 'Гарантия на работу'],
      price: 'от 15 000 ₽',
      duration: '2-5 дней'
    }
  ];

  const reviews = [
    {
      name: 'Александр М.',
      car: 'BMW M3',
      text: 'Оклеил весь кузов антигравийной плёнкой. Работа выполнена безупречно — стыков не видно, всё идеально. Машина как в броне! Рекомендую CityDetailing всем.',
      rating: 5,
      date: '2 недели назад'
    },
    {
      name: 'Дмитрий К.',
      car: 'Mercedes G63 AMG',
      text: 'Делал полировку и керамику. Результат превзошёл все ожидания! Кузов блестит как зеркало, вода скатывается каплями. Мастера — настоящие профессионалы.',
      rating: 5,
      date: '1 месяц назад'
    },
    {
      name: 'Олег В.',
      car: 'Zeekr 001',
      text: 'Обратился за удалением вмятины PDR. Сделали за час, даже не поверил что так быстро и качественно. Вмятина исчезла полностью, ЛКП не тронуто!',
      rating: 5,
      date: '3 недели назад'
    },
    {
      name: 'Марина С.',
      car: 'Mercedes AMG GT',
      text: 'Полная оклейка плёнкой + бронирование стёкол. Всё сделано на высшем уровне. Владимир лично контролирует каждую работу. Очень довольна!',
      rating: 5,
      date: '1 неделю назад'
    }
  ];

  const galleryImages = [
    { url: 'https://cdcar.ru/wp-content/uploads/2025/11/IMG_2248-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-scaled.webp', title: 'BMW M3 — оклейка' },
    { url: 'https://cdcar.ru/wp-content/uploads/2025/11/IMG_2206-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-scaled.webp', title: 'Mercedes G63 AMG' },
    { url: 'https://cdcar.ru/wp-content/uploads/2025/11/IMG_2252-scaled.webp', title: 'BMW Coupe — бронирование' },
    { url: 'https://cdcar.ru/wp-content/uploads/2025/11/IMG_2197-scaled.webp', title: 'Zeekr 001 — оклейка' },
    { url: 'https://cdcar.ru/wp-content/uploads/2025/11/IMG_2204-scaled.webp', title: 'Mercedes AMG GT' },
    { url: 'https://cdcar.ru/wp-content/uploads/2025/11/IMG_2275-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-scaled.webp', title: 'Dodge Ram 1500' },
  ];

  const stats = [
    { number: '10+', label: 'Лет опыта' },
    { number: '350 м²', label: 'Площадь студии' },
    { number: '5 лет', label: 'Гарантия на плёнку' },
    { number: '3+', label: 'Оклейки в неделю' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', phone: '', service: '', message: '' });
  };

  const navItems = [
    { id: 'services', label: 'Услуги' },
    { id: 'about', label: 'О нас' },
    { id: 'gallery', label: 'Работы' },
    { id: 'advantages', label: 'Преимущества' },
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-lg">
                CD
              </div>
              <span className="text-xl font-bold">City<span className="text-cyan-400">Detailing</span></span>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${activeSection === item.id ? 'text-cyan-400' : 'text-gray-300'}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:+79260935000" className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
                <PhoneIcon />
                <span>+7 (926) 093-50-00</span>
              </a>
              <a href="#contacts" className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
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
                  className="block px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a href="tel:+79260935000" className="flex items-center space-x-2 px-4 py-2 text-cyan-400">
                <PhoneIcon />
                <span>+7 (926) 093-50-00</span>
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
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
          }}></div>
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">Москва, Боровское шоссе 6к4 • м. Солнцево</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Сделаем авто
            <br />
            <span className="text-gradient-blue">лучше нового</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Полировка без разводов, чистый салон и защита кузова. 
            Оклейка антигравийной плёнкой, керамика, PDR и полный детейлинг с гарантией до 5 лет.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#contacts" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-lg font-bold text-white hover:shadow-xl hover:shadow-cyan-500/30 transition-all transform hover:scale-105">
              Записаться на детейлинг
            </a>
            <a href="#services" className="px-8 py-4 glass rounded-xl text-lg font-medium text-white hover:bg-white/10 transition-all">
              Наши услуги →
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl sm:text-4xl font-bold text-gradient-blue mb-1">{stat.number}</div>
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
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Наши услуги</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Полный спектр <span className="text-gradient-blue">детейлинга</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              От защиты кузова антигравийной плёнкой до ремонта вмятин без покраски — мы делаем всё, чтобы ваш автомобиль выглядел идеально
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group gradient-card rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02]"
                onClick={() => setSelectedService(selectedService === i ? null : i)}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-cyan-400 font-bold text-lg">{service.price}</span>
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
                    <a href="#contacts" className="inline-block mt-4 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-lg text-cyan-400 text-sm font-medium hover:bg-cyan-400/20 transition-colors">
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
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">О нашей студии</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
                Когда детали — <span className="text-gradient-blue">решают всё</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                <strong className="text-white">CityDetailing</strong> — это команда мастеров, которые по-настоящему любят автомобили. Мы не просто оказываем услуги, а возвращаем автомобилю ухоженный, свежий и дорогой вид.
              </p>
              <p className="text-gray-400 text-lg mb-6">
                Наша студия появилась из простой идеи: <strong className="text-white">делать всё так, как делали бы для себя</strong>. Без спешки, без компромиссов, только качественно и с уважением к деталям.
              </p>
              <p className="text-gray-400 text-lg mb-8">
                Мы используем только проверенные материалы: <strong className="text-white">Labocosmetica, Koch Chemie, 3D, Meguiar's</strong> и другие мировые бренды.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Студия 350+ м²',
                  'Гарантия до 5 лет',
                  'Премиум материалы',
                  'Опыт 10+ лет',
                  'Прозрачные цены',
                  'Фото/видео отчёт'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckIcon />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <a href="#contacts" className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                <span>Записаться на детейлинг</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
                <img
                  src="https://cdcar.ru/wp-content/uploads/2024/10/photo_19_2024-10-18_18-41-53.jpg"
                  alt="CityDetailing студия"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xl">
                        👨‍🔧
                      </div>
                      <div>
                        <div className="font-bold">Владимир — основатель</div>
                        <div className="text-sm text-gray-400">10+ лет в детейлинге</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-4 float-animation">
                <div className="text-2xl font-bold text-gradient-blue">10+</div>
                <div className="text-xs text-gray-400">лет опыта</div>
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
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Портфолио</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Наши <span className="text-gradient-blue">проекты</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Оклейка BMW M3, Mercedes G63 AMG, Zeekr, Dodge Ram и других премиальных автомобилей
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
                    <p className="text-sm text-gray-300">CityDetailing</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="https://vk.com/citydetailing_solncevo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all">
              <span>Больше работ в VK</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Преимущества</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Студия, где <span className="text-gradient-blue">качество</span> на первом месте
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏢', title: 'Премиальная студия 350+ м²', desc: 'Чистая профессиональная зона с правильным светом и оборудованием для детейлинга премиум-класса.' },
              { icon: '👨‍🔧', title: 'Сертифицированные мастера', desc: 'Опыт более 10 лет. Знаем, как работать с любыми марками авто и добиваться результата лучше нового.' },
              { icon: '📋', title: 'Гарантия на все работы', desc: 'Закрепляем качество документально. Гарантия от 6 до 12 месяцев в зависимости от услуги.' },
              { icon: '💰', title: 'Прозрачные цены', desc: 'Фиксированная стоимость. Никаких доплат и скрытых услуг. Честная итоговая цена по прайс-листу.' },
            ].map((item, i) => (
              <div key={i} className="gradient-card rounded-2xl p-6 text-center hover:border-cyan-500/20 transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Process */}
          <div className="mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
              Как мы <span className="text-gradient-blue">работаем</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Диагностика и мойка', desc: 'Трёхфазная мойка, очистка глиной, удаление битума. Измеряем толщину лака.', icon: '🔍' },
                { step: '02', title: 'Бережная полировка', desc: 'Подбираем пасты и круги Koch Chemie. Устраняем до 99% царапин.', icon: '✨' },
                { step: '03', title: 'Нанесение защиты', desc: 'Обезжириваем кузов. В стерильных условиях наносим керамику или плёнку.', icon: '🛡️' },
                { step: '04', title: 'Контроль и выдача', desc: 'Принимаем работу под инспекционным светом. Передаём авто с гарантией.', icon: '✅' },
              ].map((item, i) => (
                <div key={i} className="text-center p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-cyan-400 text-sm font-bold mb-2">{item.step}</div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Отзывы</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Что говорят <span className="text-gradient-blue">клиенты</span>
            </h2>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <span className="text-gray-400 text-sm">Рейтинг 5.0 на Яндекс.Картах</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reviews.map((review, i) => (
              <div key={i} className="gradient-card rounded-2xl p-6 hover:border-cyan-500/20 transition-all">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">
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

          <div className="text-center mt-10">
            <a href="https://yandex.ru/maps/org/siti_deteyling/58657986091/reviews/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all">
              <span>Все отзывы на Яндекс.Картах</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Частые <span className="text-gradient-blue">вопросы</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Что такое антигравийная защита?', a: 'Это установка на автомобиль специальной защитной полиуретановой плёнки, которая предохраняет кузов и фары от сколов, царапин и воздействия гравия. Срок службы до 7-8 лет.' },
              { q: 'Сколько времени занимает оклейка?', a: 'В среднем от 3 до 7 дней в зависимости от размера и сложности конструкции автомобиля. Мы не спешим в ущерб качеству.' },
              { q: 'Можно ли удалить плёнку без повреждения краски?', a: 'Да, плёнку можно удалить без повреждения краски автомобиля. Однако эту процедуру лучше доверить профессионалам.' },
              { q: 'Какая гарантия на работы?', a: 'На антигравийную плёнку — гарантия до 5 лет от производителя. На работы — гарантия 1 год. На керамику и полировку — от 6 до 12 месяцев.' },
              { q: 'Как ухаживать за антигравийной плёнкой?', a: 'Регулярная мойка мягкими средствами, избегание абразивных составов. Не используйте жёсткие губки и не трите плёнку слишком сильно.' },
            ].map((item, i) => (
              <details key={i} className="gradient-card rounded-xl overflow-hidden group">
                <summary className="px-6 py-4 cursor-pointer font-medium flex items-center justify-between hover:text-cyan-400 transition-colors">
                  {item.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-400 text-sm">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Контакты</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Запишитесь <span className="text-gradient-blue">онлайн</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Оставьте заявку и мы свяжемся с вами для оценки стоимости по фото
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
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Услуга</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
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
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all resize-none"
                      placeholder="Марка авто, пожелания..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-[1.02]"
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
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Телефон / WhatsApp / Telegram</h3>
                    <a href="tel:+79260935000" className="text-gray-400 hover:text-cyan-400 transition-colors text-lg">+7 (926) 093-50-00</a>
                    <p className="text-sm text-gray-500 mt-1">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
              </div>

              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                    <LocationIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-gray-400">г. Москва, Боровское шоссе, 6к4</p>
                    <p className="text-sm text-gray-500 mt-1">м. Солнцево / м. Говорово</p>
                  </div>
                </div>
              </div>

              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                    <ClockIcon />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Режим работы</h3>
                    <p className="text-gray-400">Пн-Вс: 9:00 — 21:00</p>
                    <p className="text-sm text-gray-500 mt-1">Без выходных</p>
                  </div>
                </div>
              </div>

              <div className="gradient-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:info@cdcar.ru" className="text-gray-400 hover:text-cyan-400 transition-colors">info@cdcar.ru</a>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="gradient-card rounded-2xl p-6">
                <h3 className="font-bold mb-4">Мы в соцсетях</h3>
                <div className="flex space-x-3">
                  <a href="https://t.me/Citydetailing" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl hover:bg-cyan-400/10 hover:scale-110 transition-all" title="Telegram">
                    📱
                  </a>
                  <a href="https://wa.me/79260935000" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl hover:bg-cyan-400/10 hover:scale-110 transition-all" title="WhatsApp">
                    💬
                  </a>
                  <a href="https://vk.com/citydetailing_solncevo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl hover:bg-cyan-400/10 hover:scale-110 transition-all" title="VK">
                    🌐
                  </a>
                  <a href="https://www.instagram.com/citydetailing_msk/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl hover:bg-cyan-400/10 hover:scale-110 transition-all" title="Instagram">
                    📷
                  </a>
                  <a href="https://www.youtube.com/channel/UCMhStElzTJadJCrMjQT6kog" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl hover:bg-cyan-400/10 hover:scale-110 transition-all" title="YouTube">
                    🎬
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="gradient-card rounded-2xl overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.402218%2C55.659749&z=16&pt=37.402218,55.659749,pm2blm"
                  width="100%"
                  height="200"
                  frameBorder="0"
                  style={{ border: 0 }}
                  title="CityDetailing на карте"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)'
        }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Готовы сделать авто <span className="text-gradient-blue">лучше нового</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Отправьте фото автомобиля — мы бесплатно оценим стоимость работ и подберём оптимальное решение для вашего авто.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/79260935000" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-lg font-bold text-white hover:shadow-xl hover:shadow-cyan-500/30 transition-all transform hover:scale-105 pulse-glow">
              Оценить по фото в WhatsApp
            </a>
            <a href="tel:+79260935000" className="px-8 py-4 glass rounded-xl text-lg font-medium hover:bg-white/10 transition-all flex items-center space-x-2">
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
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-lg">
                  CD
                </div>
                <span className="text-xl font-bold">City<span className="text-cyan-400">Detailing</span></span>
              </div>
              <p className="text-gray-400 text-sm">
                Премиальная студия детейлинга в Москве. Оклейка, полировка, керамика, PDR. Работаем с 2014 года.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">Антигравийная плёнка</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">Керамика</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">Полировка</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">PDR</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">Химчистка</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-cyan-400 transition-colors">О нас</a></li>
                <li><a href="#gallery" className="hover:text-cyan-400 transition-colors">Портфолио</a></li>
                <li><a href="#reviews" className="hover:text-cyan-400 transition-colors">Отзывы</a></li>
                <li><a href="#contacts" className="hover:text-cyan-400 transition-colors">Контакты</a></li>
                <li><a href="https://cdcar.ru" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Основной сайт</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="tel:+79260935000" className="hover:text-cyan-400 transition-colors">+7 (926) 093-50-00</a></li>
                <li><a href="mailto:info@cdcar.ru" className="hover:text-cyan-400 transition-colors">info@cdcar.ru</a></li>
                <li>Боровское шоссе, 6к4</li>
                <li>м. Солнцево / Говорово</li>
                <li>Пн-Вс: 9:00 — 21:00</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">© 2024 CityDetailing. Все права защищены.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://yandex.ru/maps/org/siti_deteyling/58657986091/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">Яндекс.Карты</a>
              <a href="https://vk.com/citydetailing_solncevo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">VK</a>
              <a href="https://t.me/Citydetailing" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">Telegram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/79260935000"
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
