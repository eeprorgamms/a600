import { useInView } from '../hooks/useInView';

const About = () => {
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: contentRef, isInView: contentVisible } = useInView();
  const { ref: advantagesRef, isInView: advantagesVisible } = useInView();
  const { ref: statsRef, isInView: statsVisible } = useInView();

  const advantages = [
    { title: 'Профессиональная химия', desc: 'Используем только проверенные специализированные средства, которые бережно удаляют загрязнения' },
    { title: 'Без царапин на ЛКП', desc: 'Наши сотрудники применяют приспособления, которые не оставляют царапин на лакокрасочном покрытии' },
    { title: 'Опытные мастера', desc: 'Команда профессионалов с многолетним опытом работы в сфере детейлинга' },
    { title: 'Удобное расположение', desc: 'м. Говорово — 0.7 км, удобная парковка, работаем до 23:00 без выходных' },
    { title: 'Гарантия качества', desc: 'Мы уверены в результате и гарантируем качество выполненных работ' },
    { title: 'Индивидуальный подход', desc: 'Поможем подобрать оптимальный уход для вашего автомобиля' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-16 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 blob"></div>
        <div ref={heroRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in ${heroVisible ? 'visible' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">О нас</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Автомойка и детейлинг-центр А500 — профессиональный уход за вашим автомобилем
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div ref={contentRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${contentVisible ? 'visible' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Чистота и забота о вашем авто
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                <strong className="text-gray-900">А500</strong> — это автомойка и детейлинг-центр на Боровском шоссе. Мы используем специализированные средства, которые бережно удаляют соль, химические реагенты, пыль, смолу и другие виды загрязнений.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Наши сотрудники применяют приспособления, которые <strong className="text-gray-900">не оставляют царапин на ЛКП</strong>. Мы поможем подобрать автохимию для защиты кузова от выгорания краски, сколов и коррозии.
              </p>
              <p className="text-lg text-gray-600">
                Помимо мойки, здесь выполняют полировку, химчистку и чернение резины, а также предлагают услуги детейлинг-центра и обрабатывают кузов воском — всё для заботливых водителей!
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=700&h=500&fit=crop"
                alt="Автомойка А500"
                className="rounded-2xl shadow-lg card-hover"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-700 rounded-2xl opacity-20 blur-xl"></div>
            </div>
          </div>

          {/* Advantages */}
          <div ref={advantagesRef} className={`mb-12 fade-in ${advantagesVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Почему выбирают нас</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 card-hover group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-600 gradient-animate">
        <div ref={statsRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${statsVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">14</div>
              <div className="text-blue-200">Часов работы в день</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">7</div>
              <div className="text-blue-200">Дней в неделю</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.0</div>
              <div className="text-blue-200">Рейтинг на картах</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наше расположение</h2>
            <p className="text-lg text-gray-600">Удобно добраться на метро или автомобиле</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Адрес</h3>
                    <a 
                      href="https://yandex.ru/maps/org/a500/73889912604/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Москва, Боровское шоссе, 6к1
                    </a>
                    <p className="text-sm text-gray-500 mt-1">ЗАО, район Солнцево</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Режим работы</h3>
                    <p className="text-gray-600">Пн — Вс: 09:00 — 23:00</p>
                    <p className="text-sm text-gray-500 mt-1">Без выходных и перерывов</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Как добраться</h3>
                    <p className="text-gray-600">м. Говорово — 0.7 км</p>
                    <p className="text-sm text-gray-500 mt-1">Удобная парковка рядом</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg card-hover relative group">
              <a 
                href="https://yandex.ru/maps/org/a500/73889912604/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.402218%2C55.659749&z=17&pt=37.402218,55.659749,pm2blm"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  style={{ border: 0, pointerEvents: 'none' }}
                  title="А500 на карте"
                ></iframe>
                <div className="absolute inset-0 bg-blue-700/0 group-hover:bg-blue-700/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-lg shadow-lg font-medium text-blue-700 text-sm">
                    Открыть в Яндекс.Картах →
                  </div>
                </div>
              </a>
            </div>
            <a 
              href="https://yandex.ru/maps/org/a500/73889912604/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-blue-700 hover:text-blue-800 hover:underline transition-colors font-medium text-sm"
            >
              Открыть страницу А500 в Яндекс.Картах →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
