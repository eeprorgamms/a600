import { useState, useEffect } from 'react';

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
  const [scrollY, setScrollY] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', car: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: 'РУЧНАЯ МОЙКА',
      description: 'Бережная ручная мойка кузова специализированными средствами. Удаляем соль, реагенты, пыль, смолу без царапин на ЛКП.',
      features: ['Двухфазная мойка', 'Бесконтактная пена', 'Безопасные губки', 'Сушка микрофиброй'],
      price: '500₽',
      duration: '20-40 МИН'
    },
    {
      title: 'ХИМЧИСТКА САЛОНА',
      description: 'Глубокая очистка всех поверхностей салона. Работаем с кожей, тканью, алькантарой. Удаление пятен и запахов.',
      features: ['Чистка сидений', 'Потолок и двери', 'Багажник', 'Удаление запахов'],
      price: '4 000₽',
      duration: '3-5 ЧАСОВ'
    },
    {
      title: 'ПОЛИРОВКА',
      description: 'Восстановление блеска лакокрасочного покрытия. Удаление мелких царапин, «паутинки» и потускнений.',
      features: ['Абразивная полировка', 'Финишная полировка', 'Восстановление блеска', 'Защитный слой'],
      price: '5 000₽',
      duration: '3-6 ЧАСОВ'
    },
    {
      title: 'ВОСК',
      description: 'Защитное восковое покрытие кузова. Защита от выгорания краски, сколов и коррозии. Эффект гидрофобности.',
      features: ['Защита ЛКП', 'Гидрофобный эффект', 'Блеск и глубина цвета', 'Защита на 2-3 месяца'],
      price: '1 000₽',
      duration: '30-60 МИН'
    },
    {
      title: 'ДЕТЕЙЛИНГ',
      description: 'Комплексный уход за автомобилем с применением профессиональных составов. Полная очистка и защита всех поверхностей.',
      features: ['Детальная мойка', 'Очистка глиной', 'Обработка пластика', 'Защита резины'],
      price: '3 000₽',
      duration: '2-4 ЧАСА'
    },
    {
      title: 'ЧЕРНЕНИЕ',
      description: 'Обработка шин и резиновых элементов специальным составом для насыщенного чёрного цвета и защиты.',
      features: ['Насыщенный цвет', 'Защита от растрескивания', 'Долгий эффект', 'Уход за пластиком'],
      price: '300₽',
      duration: '10-15 МИН'
    }
  ];

  const washPackages = [
    {
      name: 'ЭКСПРЕСС',
      price: '500₽',
      duration: '20 МИН',
      features: ['Бесконтактная мойка кузова', 'Ополаскивание', 'Сушка кузова', 'Протирка стёкол'],
      color: 'bg-white'
    },
    {
      name: 'СТАНДАРТ',
      price: '900₽',
      duration: '40 МИН',
      features: ['Бесконтактная мойка', 'Ручная мойка губкой', 'Мойка дисков', 'Чернение резины', 'Протирка стёкол', 'Сушка микрофиброй'],
      color: 'bg-yellow-400'
    },
    {
      name: 'ПРЕМИУМ',
      price: '1 500₽',
      duration: '1 ЧАС',
      features: ['Всё из «Стандарт»', 'Обработка воском', 'Обработка пластика салона', 'Ароматизатор', 'Защита резины', 'Протирка порогов'],
      color: 'bg-white'
    },
    {
      name: 'ДЕТЕЙЛИНГ',
      price: '3 000₽',
      duration: '2-3 ЧАСА',
      features: ['Всё из «Премиум»', 'Очистка глиной', 'Детальная мойка дисков', 'Обработка кожи/пластика', 'Защитное покрытие', 'Финальная проверка'],
      color: 'bg-white'
    }
  ];

  const reviews = [
    {
      name: 'АРТЁМ К.',
      car: 'TOYOTA CAMRY',
      text: 'Моемся тут регулярно уже полгода. Всегда качественно, быстро и недорого. Ребята знают своё дело, кузов после мойки как новый!',
      rating: 5,
      date: '1 НЕДЕЛЮ НАЗАД'
    },
    {
      name: 'ЕЛЕНА М.',
      car: 'KIA SPORTAGE',
      text: 'Делала химчистку салона после зимы. Результат потрясающий! Все пятна убрали, салон пахнет свежестью. Очень довольна!',
      rating: 5,
      date: '2 НЕДЕЛИ НАЗАД'
    },
    {
      name: 'СЕРГЕЙ В.',
      car: 'HYUNDAI TUCSON',
      text: 'Отличный сервис! Полировка вернула машине заводской блеск. Цены адекватные, работают аккуратно. Рекомендую!',
      rating: 5,
      date: '3 НЕДЕЛИ НАЗАД'
    },
    {
      name: 'ОЛЬГА Д.',
      car: 'VOLKSWAGEN POLO',
      text: 'Приехала на комплексную мойку с воском. Машина блестит, вода скатывается каплями. Очень довольна результатом!',
      rating: 4,
      date: '1 МЕСЯЦ НАЗАД'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', phone: '', service: '', car: '', message: '' });
  };

  const navItems = [
    { id: 'services', label: 'УСЛУГИ' },
    { id: 'pricing', label: 'ЦЕНЫ' },
    { id: 'about', label: 'О НАС' },
    { id: 'reviews', label: 'ОТЗЫВЫ' },
    { id: 'contacts', label: 'КОНТАКТЫ' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-yellow-400 border-b-4 border-black' : 'bg-white border-b-4 border-black'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#hero" className="text-3xl font-black tracking-tight">
              А<span className="text-red-600">500</span>
            </a>

            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm font-bold uppercase hover:text-red-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:+79295884094" className="flex items-center space-x-2 text-sm font-bold">
                <PhoneIcon />
                <span>+7 (929) 588-40-94</span>
              </a>
              <a href="#contacts" className="px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-red-600 transition-colors">
                ЗАПИСАТЬСЯ
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-yellow-400 border-t-4 border-black">
            <div className="px-4 py-4 space-y-3">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 font-bold uppercase hover:text-red-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 bg-yellow-400 border-b-4 border-black">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Большой логотип А500 */}
          <div className="mb-8">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black leading-none tracking-tighter">
              <span className="inline-block bg-black text-white px-4 py-2 border-8 border-black">А</span>
              <span className="inline-block bg-red-600 text-white px-4 py-2 border-8 border-black ml-2">500</span>
            </h1>
            <div className="mt-6 bg-black text-yellow-400 py-4 px-8 inline-block border-4 border-black">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider">
                Автомойка · Детейлинг
              </p>
            </div>
          </div>
          
          <p className="text-xl sm:text-2xl font-bold max-w-3xl mx-auto mb-10 mt-8 bg-white p-6 border-4 border-black">
            РУЧНАЯ МОЙКА • ХИМЧИСТКА • ПОЛИРОВКА • ВОСК
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contacts" className="px-10 py-5 bg-black text-white text-xl font-black uppercase border-4 border-black hover:bg-red-600 transition-colors">
              ЗАПИСАТЬСЯ СЕЙЧАС
            </a>
            <a href="#pricing" className="px-10 py-5 bg-white text-black text-xl font-black uppercase border-4 border-black hover:bg-yellow-400 transition-colors">
              СМОТРЕТЬ ЦЕНЫ
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 bg-black text-white p-8 border-4 border-black">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase">
              НАШИ УСЛУГИ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group bg-white border-4 border-black p-6 hover:bg-yellow-400 transition-colors cursor-pointer"
                onClick={() => setSelectedService(selectedService === i ? null : i)}
              >
                <h3 className="text-2xl font-black mb-3 uppercase">{service.title}</h3>
                <p className="text-sm mb-4 font-bold">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4 bg-black text-white p-3">
                  <span className="font-black text-xl">{service.price}</span>
                  <span className="text-xs font-bold">{service.duration}</span>
                </div>

                {selectedService === i && (
                  <div className="border-t-4 border-black pt-4 mt-4 space-y-2">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-black flex items-center justify-center">
                          <CheckIcon />
                        </div>
                        <span className="text-sm font-bold">{feature}</span>
                      </div>
                    ))}
                    <a href="#contacts" className="inline-block mt-4 px-4 py-2 bg-red-600 text-white font-black uppercase border-4 border-black hover:bg-black transition-colors">
                      ЗАПИСАТЬСЯ
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-yellow-400 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 bg-black text-white p-8 border-4 border-black">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase">
              КОМПЛЕКСЫ МОЙКИ
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {washPackages.map((pkg, i) => (
              <div
                key={i}
                className={`${pkg.color} border-4 border-black p-6 relative ${i === 1 ? 'bg-yellow-400' : ''}`}
              >
                {i === 1 && (
                  <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 font-black text-sm uppercase border-4 border-black">
                    ХИТ
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-black mb-2 uppercase">{pkg.name}</h3>
                  <div className="text-4xl font-black mb-1">{pkg.price}</div>
                  <div className="text-xs font-bold">{pkg.duration}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center space-x-2 text-sm font-bold">
                      <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contacts" className="block text-center px-4 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-red-600 transition-colors">
                  ВЫБРАТЬ
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8 bg-black text-white p-8 border-4 border-black">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase">
                  О НАС
                </h2>
              </div>
              <p className="text-lg mb-6 font-bold">
                <strong className="bg-yellow-400 px-2">А500</strong> — это автомойка и детейлинг-центр на Боровском шоссе. Мы используем специализированные средства, которые бережно удаляют соль, химические реагенты, пыль, смолу и другие виды загрязнений.
              </p>
              <p className="text-lg mb-8 font-bold">
                Наши сотрудники применяют приспособления, которые <strong className="bg-red-600 text-white px-2">не оставляют царапин на ЛКП</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Профессиональная химия',
                  'Без царапин на ЛКП',
                  'Удобная парковка',
                  'м. Говорово — 0.7 км',
                  'Опытные мастера',
                  'Гарантия качества'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-yellow-400 p-3 border-4 border-black">
                    <div className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-sm font-bold">{item}</span>
                  </div>
                ))}
              </div>

              <a href="#contacts" className="inline-flex items-center space-x-2 px-8 py-4 bg-black text-white font-black uppercase border-4 border-black hover:bg-red-600 transition-colors">
                <span>ЗАПИСАТЬСЯ</span>
              </a>
            </div>

            <div className="relative">
              <div className="border-8 border-black">
                <img
                  src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=700&h=500&fit=crop"
                  alt="Автомойка А500"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-black text-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 bg-yellow-400 text-black p-8 border-4 border-yellow-400">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase">
              ОТЗЫВЫ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <a
                key={i}
                href="https://yandex.ru/maps/org/a500/73889912604/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black border-4 border-white hover:border-yellow-400 transition-colors p-6 block group"
              >
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="mb-4 font-bold">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-black">{review.name}</div>
                    <div className="text-xs font-bold">{review.car}</div>
                  </div>
                  <span className="text-xs font-bold">{review.date}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://yandex.ru/maps/org/a500/73889912604/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-yellow-400 text-black font-black uppercase border-4 border-yellow-400 hover:bg-white transition-colors"
            >
              <span>ВСЕ ОТЗЫВЫ НА ЯНДЕКС.КАРТАХ</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-20 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 bg-black text-white p-8 border-4 border-black">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase">
              КОНТАКТЫ
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="border-4 border-black p-8">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-3xl font-black mb-2 uppercase">ОТПРАВЛЕНО!</h3>
                  <p className="font-bold">МЫ СВЯЖЕМСЯ С ВАМИ</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-black mb-2 uppercase">Имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:border-red-600"
                      placeholder="АЛЕКСАНДР"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black mb-2 uppercase">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:border-red-600"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black mb-2 uppercase">Услуга</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:border-red-600"
                    >
                      <option value="">ВЫБЕРИТЕ УСЛУГУ</option>
                      {services.map((s, i) => (
                        <option key={i} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black mb-2 uppercase">Авто</label>
                    <input
                      type="text"
                      value={formData.car}
                      onChange={e => setFormData({...formData, car: e.target.value})}
                      className="w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:border-red-600"
                      placeholder="TOYOTA CAMRY"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-black text-white font-black uppercase border-4 border-black hover:bg-red-600 transition-colors"
                  >
                    ОТПРАВИТЬ ЗАЯВКУ
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="border-4 border-black p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 border-4 border-black flex items-center justify-center">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="font-black mb-1 uppercase">Телефоны</h3>
                    <a href="tel:+79295884094" className="font-bold block hover:text-red-600">+7 (929) 588-40-94</a>
                    <a href="tel:+79299555587" className="font-bold block hover:text-red-600">+7 (929) 955-55-87</a>
                  </div>
                </div>
              </div>

              <div className="border-4 border-black p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 border-4 border-black flex items-center justify-center">
                    <LocationIcon />
                  </div>
                  <div>
                    <h3 className="font-black mb-1 uppercase">Адрес</h3>
                    <p className="font-bold">Москва, Боровское шоссе, 6к1</p>
                    <p className="text-sm font-bold">м. Говорово — 0.7 км</p>
                  </div>
                </div>
              </div>

              <div className="border-4 border-black p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 border-4 border-black flex items-center justify-center">
                    <ClockIcon />
                  </div>
                  <div>
                    <h3 className="font-black mb-1 uppercase">Режим работы</h3>
                    <p className="font-bold">Пн — Вс: 09:00 — 23:00</p>
                    <p className="text-sm font-bold">Без выходных</p>
                  </div>
                </div>
              </div>

              <div className="border-4 border-black overflow-hidden">
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

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-black mb-4">
                А<span className="text-red-600">500</span>
              </div>
              <p className="text-sm font-bold">
                Автомойка и детейлинг-центр на Боровском шоссе.
              </p>
            </div>
            
            <div>
              <h4 className="font-black mb-4 uppercase">Услуги</h4>
              <ul className="space-y-2 text-sm font-bold">
                <li><a href="#services" className="hover:text-yellow-400">Ручная мойка</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Химчистка</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Полировка</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Воск</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black mb-4 uppercase">Навигация</h4>
              <ul className="space-y-2 text-sm font-bold">
                <li><a href="#services" className="hover:text-yellow-400">Услуги</a></li>
                <li><a href="#pricing" className="hover:text-yellow-400">Цены</a></li>
                <li><a href="#about" className="hover:text-yellow-400">О нас</a></li>
                <li><a href="#contacts" className="hover:text-yellow-400">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black mb-4 uppercase">Контакты</h4>
              <ul className="space-y-2 text-sm font-bold">
                <li><a href="tel:+79295884094" className="hover:text-yellow-400">+7 (929) 588-40-94</a></li>
                <li><a href="tel:+79299555587" className="hover:text-yellow-400">+7 (929) 955-55-87</a></li>
                <li>Боровское шоссе, 6к1</li>
                <li>м. Говорово</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t-4 border-yellow-400 pt-8 text-center">
            <p className="text-sm font-bold">© 2024 А500 — АВТОМОЙКА И ДЕТЕЙЛИНГ</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
