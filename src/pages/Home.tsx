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
                src="https://image.qwenlm.ai/generated-images/2d30b727-802a-43ec-ae48-8538f2cf3f35/_result.png"
                alt="Lamborghini Aventador — детейлинг премиум автомобилей в А500"
                className="rounded-2xl shadow-2xl card-hover w-full h-auto object-cover"
              />
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

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Отзывы клиентов</h2>
            <p className="text-lg text-gray-600">Нажмите на отзыв, чтобы увидеть все на Яндекс.Картах</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Артём К.',
                car: 'Toyota Camry',
                text: 'Моемся тут регулярно уже полгода. Всегда качественно, быстро и недорого. Ребята знают своё дело!',
                rating: 5
              },
              {
                name: 'Елена М.',
                car: 'Kia Sportage',
                text: 'Делала химчистку салона после зимы. Результат потрясающий! Все пятна убрали, салон пахнет свежестью.',
                rating: 5
              },
              {
                name: 'Сергей В.',
                car: 'Hyundai Tucson',
                text: 'Отличный сервис! Полировка вернула машине заводской блеск. Цены адекватные, работают аккуратно.',
                rating: 5
              }
            ].map((review, i) => (
              <a
                key={i}
                href="https://yandex.ru/maps/org/a500/73889912604/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-xl p-6 card-hover group cursor-pointer block"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.car}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://yandex.ru/maps/org/a500/73889912604/reviews/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-700 font-medium hover:text-blue-800 transition-colors group"
            >
              <span>Все отзывы на Яндекс.Картах</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">С какими авто работаем</h2>
            <p className="text-lg text-gray-600">Профессиональный уход за автомобилями любых марок</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {['BMW', 'Mercedes', 'Audi', 'Toyota', 'Kia', 'Hyundai', 'Volkswagen', 'Porsche'].map((brand, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 flex items-center justify-center card-hover group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="text-lg font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chemistry Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Используемая химия</h2>
            <p className="text-lg text-gray-600">Работаем только с проверенными профессиональными брендами</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: 'Koch Chemie', desc: 'Профессиональная автохимия из Германии' },
              { name: 'Meguiar\'s', desc: 'Премиальные средства для ухода' },
              { name: '3D', desc: 'Инновационные составы для детейлинга' },
              { name: 'Labocosmetica', desc: 'Итальянская косметика для авто' },
            ].map((brand, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 text-center card-hover group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-blue-700">{brand.name[0]}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-gray-600">{brand.desc}</p>
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
