import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import {site, priceLabel, phoneHref} from '../config/site';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: servicesRef, isInView: servicesVisible } = useInView();

  const services = site.services.map(item => ({...item, price: priceLabel(item.price, true)}));

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-16 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 blob"></div>
        <div ref={heroRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in ${heroVisible ? 'visible' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Наши услуги</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Полный спектр услуг по уходу за вашим автомобилем — от экспресс-мойки до комплексного детейлинга
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div ref={servicesRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${servicesVisible ? 'visible' : ''}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-200 card-hover group"
                
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <button type="button" className="text-left text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors" aria-expanded={selectedService === i} onClick={() => setSelectedService(selectedService === i ? null : i)}>{service.title} <span aria-hidden="true">{selectedService === i ? "−" : "+"}</span></button>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-700 font-semibold text-lg">{site.pricesVerified ? service.price : "Цена по запросу"}</span>
                  <span className="text-xs text-gray-500">{service.duration}</span>
                </div>

                {selectedService === i && (
                  <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    <Link 
                      to="/contacts" 
                      className="inline-block mt-4 px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover"
                    >
                      Записаться
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          {site.verifiedExtraServices.length > 0 && <><h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Кузовные работы</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{site.verifiedExtraServices.map(extra=><article key={extra.title} className="rounded-xl p-6 bg-blue-50"><h3 className="text-lg font-semibold mb-3">{extra.title}</h3><p className="text-gray-700 text-sm mb-5">{extra.description}</p><Link to="/contacts" className="text-blue-700 underline">Узнать стоимость</Link></article>)}</div></>}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Не знаете, что выбрать?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Позвоните нам — мы поможем подобрать оптимальную услугу для вашего автомобиля
          </p>
          <a 
            href={phoneHref(site.contacts.phone)} 
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{site.contacts.phone}</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
