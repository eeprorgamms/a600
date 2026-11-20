import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import {site, phoneHref, priceLabel} from '../config/site';

const Home = () => {
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: servicesRef, isInView: servicesVisible } = useInView();
  const { ref: advantagesRef, isInView: advantagesVisible } = useInView();

  const services = site.services.slice(0,4).map(item => ({title:item.title, price:priceLabel(item.price,true),icon:item.icon}));
  const advantages = site.advantages;

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
                Автомойка, детейлинг и PDR <span className="text-blue-700">{site.brand}</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Уход за автомобилем, полировка кузова и удаление вмятин без покраски. Позвоните, чтобы уточнить стоимость и свободное время.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contacts" 
                  className="px-8 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover shimmer text-center"
                >
                  Уточнить запись
                </Link>
                <Link 
                  to="/services" 
                  className="px-8 py-4 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:border-blue-700 hover:text-blue-700 transition-all card-hover text-center"
                >
                  Наши услуги
                </Link>
              </div>
            </div>
            <div className="relative parallax-container">
              <img
                src={site.images.hero} onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src=site.images.fallback; }}
                alt={`Уход за автомобилем — ${site.brand}`} loading="eager" decoding="async"
                className="rounded-2xl shadow-2xl card-hover w-full h-auto object-cover parallax-image"
                style={{ transform: 'translateY(0)' }}
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
              <Link key={i} to="/services" className="block bg-gray-50 rounded-xl p-6 card-hover group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{service.title}</h3>
                <p className="text-blue-700 font-semibold">{site.pricesVerified ? service.price : "Цена по запросу"}</p>
              </Link>
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

      {/* Подтверждённые дополнительные услуги без выдуманных цен */}
      {site.verifiedExtraServices.length > 0 && <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Дополнительные работы с кузовом</h2>
          <div className="grid gap-5 md:grid-cols-3">{site.verifiedExtraServices.map(item => <article key={item.title} className="bg-white rounded-xl p-6 shadow-sm"><h3 className="font-semibold text-lg mb-3">{item.title}</h3><p className="text-gray-600 mb-5">{item.description}</p><Link className="text-blue-700 underline" to="/contacts">Уточнить стоимость</Link></article>)}</div>
        </div>
      </section>}
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

      {/* Отзывы выводятся только по подтвержденным данным клиента. */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Отзывы клиентов</h2>
          <p className="text-gray-600 mb-6">Посмотрите реальные оценки и отзывы на независимой площадке.</p>
          {site.reviewUrl && <a href={site.reviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800">Читать отзывы на Яндекс Картах</a>}
          {site.verifiedReviews.length > 0 && <div className="grid gap-5 md:grid-cols-3 mt-8">{site.verifiedReviews.map((review,i) => <article key={i} className="bg-gray-50 rounded-xl p-5 text-left"><p className="text-gray-700 mb-3">«{review.text}»</p><p className="font-semibold">{review.name} · {review.rating}/5</p></article>)}</div>}
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

      {/* Подтверждённые бренды химии добавляются только после проверки. */}
      {site.verifiedBrands.length > 0 && <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Используемая автохимия</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {site.verifiedBrands.map(b => <article key={b.name} className="bg-white rounded-xl p-6 text-center"><h3 className="font-bold mb-2">{b.name}</h3><p className="text-sm text-gray-600">{b.desc}</p></article>)}
          </div>
        </div>
      </section>}

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
              href={phoneHref(site.contacts.phone)} 
              className="px-8 py-4 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-all btn-hover"
            >
              Позвонить: {site.contacts.phone}
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
