import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: servicesRef, isInView: servicesVisible } = useInView();

  const services = [
    {
      title: 'Ручная мойка',
      description: 'Бережная ручная мойка кузова специализированными средствами. Удаляем соль, реагенты, пыль, смолу без царапин на ЛКП.',
      features: ['Двухфазная мойка', 'Бесконтактная пена', 'Безопасные губки', 'Сушка микрофиброй'],
      price: 'от 500 ₽',
      duration: '20-40 мин'
    },
    {
      title: 'Химчистка салона',
      description: 'Глубокая очистка всех поверхностей салона. Работаем с кожей, тканью, алькантарой. Удаление пятен и запахов.',
      features: ['Чистка сидений', 'Потолок и двери', 'Багажник', 'Удаление запахов'],
      price: 'от 4 000 ₽',
      duration: '3-5 часов'
    },
    {
      title: 'Полировка кузова',
      description: 'Восстановление блеска лакокрасочного покрытия. Удаление мелких царапин, «паутинки» и потускнений.',
      features: ['Абразивная полировка', 'Финишная полировка', 'Восстановление блеска', 'Защитный слой'],
      price: 'от 5 000 ₽',
      duration: '3-6 часов'
    },
    {
      title: 'Обработка воском',
      description: 'Защитное восковое покрытие кузова. Защита от выгорания краски, сколов и коррозии. Эффект гидрофобности.',
      features: ['Защита ЛКП', 'Гидрофобный эффект', 'Блеск и глубина цвета', 'Защита на 2-3 месяца'],
      price: 'от 1 000 ₽',
      duration: '30-60 мин'
    },
    {
      title: 'Детейлинг',
      description: 'Комплексный уход за автомобилем с применением профессиональных составов. Полная очистка и защита всех поверхностей.',
      features: ['Детальная мойка', 'Очистка глиной', 'Обработка пластика', 'Защита резины'],
      price: 'от 3 000 ₽',
      duration: '2-4 часа'
    },
    {
      title: 'Чернение резины',
      description: 'Обработка шин и резиновых элементов специальным составом для насыщенного чёрного цвета и защиты.',
      features: ['Насыщенный цвет', 'Защита от растрескивания', 'Долгий эффект', 'Уход за пластиком'],
      price: 'от 300 ₽',
      duration: '10-15 мин'
    }
  ];

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
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-blue-200 card-hover group"
                onClick={() => setSelectedService(selectedService === i ? null : i)}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-700 font-semibold text-lg">{service.price}</span>
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
            href="tel:+79295884094" 
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+7 (929) 588-40-94</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
