import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const Home = () => {
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: servicesRef, isInView: servicesVisible } = useInView();
  const { ref: advantagesRef, isInView: advantagesVisible } = useInView();

  const services = [
    { title: 'Ручная мойка', price: 'от 500 ₽', icon: '🚿' },
    { title: 'Химчистка салона', price: 'от 4 000 ₽', icon: '🧽' },
    { title: 'Полировка кузова', price: 'от 5 000 ₽', icon: '✨' },
    { title: 'Обработка воском', price: 'от 1 000 ₽', icon: '🛡️' },
  ];

  const advantages = [
    { title: 'Профессиональная химия', desc: 'Используем только проверенные средства' },
    { title: 'Без царапин', desc: 'Бережный уход за лакокрасочным покрытием' },
    { title: 'Опытные мастера', desc: 'Команда с многолетним опытом работы' },
    { title: 'Удобное расположение', desc: 'м. Говорово, 0.7 км, удобная парковка' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-20 lg:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 blob"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 blob" style={{ animationDelay: '2s' }}></div>
        
        <div ref={heroRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in ${heroVisible ? 'visible' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Автомойка и детейлинг <span className="text-blue-700">А500</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Профессиональный уход за вашим автомобилем. Ручная мойка, химчистка, полировка и обработка воском с применением качественной автохимии.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contacts" 
                  className="px-8 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover shimmer text-center"
                >
                  Записаться на мойку
                </Link>
                <Link 
                  to="/services" 
                  className="px-8 py-4 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-blue-700 hover:text-blue-700 transition-all card-hover text-center"
                >
                  Наши услуги
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=700&h=500&fit=crop"
                alt="Автомойка А500"
                className="rounded-2xl shadow-2xl card-hover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 max-w-xs card-hover">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Работаем ежедневно</div>
                    <div className="text-sm text-gray-500">09:00 — 23:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div ref={servicesRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${servicesVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Наши услуги</h2>
            <p className="text-lg text-gray-600">Полный спектр услуг по уходу за вашим автомобилем</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 card-hover cursor-pointer group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{service.title}</h3>
                <p className="text-blue-700 font-semibold">{service.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/services" 
              className="inline-flex items-center space-x-2 text-blue-700 font-medium hover:text-blue-800 transition-colors group"
            >
              <span>Все услуги</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div ref={advantagesRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${advantagesVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Почему выбирают нас</h2>
            <p className="text-lg text-gray-600">Мы заботимся о качестве и вашем комфорте</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm card-hover" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-600 gradient-animate">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Готовы записаться на мойку?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Позвоните нам или оставьте заявку — мы подберём удобное время
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+79295884094" 
              className="px-8 py-4 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-all btn-hover"
            >
              Позвонить: +7 (929) 588-40-94
            </a>
            <Link 
              to="/contacts" 
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg border-2 border-white hover:bg-blue-500 transition-all btn-hover"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
