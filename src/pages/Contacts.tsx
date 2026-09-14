import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', car: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: contentRef, isInView: contentVisible } = useInView();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', phone: '', service: '', car: '', message: '' });
  };

  const services = [
    'Ручная мойка',
    'Химчистка салона',
    'Полировка кузова',
    'Обработка воском',
    'Детейлинг',
    'Чернение резины'
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-16 relative overflow-hidden">
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 blob"></div>
        <div ref={heroRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in ${heroVisible ? 'visible' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Свяжитесь с нами любым удобным способом или оставьте заявку
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div ref={contentRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${contentVisible ? 'visible' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Оставить заявку</h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center scale-in visible">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-600">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="Александр"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Услуга</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                    >
                      <option value="">Выберите услугу</option>
                      {services.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Марка авто</label>
                    <input
                      type="text"
                      value={formData.car}
                      onChange={e => setFormData({...formData, car: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="Toyota Camry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Комментарий</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all resize-none"
                      placeholder="Удобное время, пожелания..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h2>

              <div className="bg-gray-50 rounded-xl p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Телефоны</h3>
                    <a href="tel:+79295884094" className="block text-gray-600 hover:text-blue-700 transition-colors">+7 (929) 588-40-94</a>
                    <a href="tel:+79299555587" className="block text-gray-600 hover:text-blue-700 transition-colors">+7 (929) 955-55-87</a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Адрес</h3>
                    <p className="text-gray-600">Москва, Боровское шоссе, 6к1</p>
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
                    <h3 className="font-semibold text-gray-900 mb-2">Режим работы</h3>
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
                    <h3 className="font-semibold text-gray-900 mb-2">Как добраться</h3>
                    <p className="text-gray-600">м. Говорово — 0.7 км</p>
                    <p className="text-sm text-gray-500 mt-1">Удобная парковка рядом</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-lg card-hover">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.402218%2C55.659749&z=17&pt=37.402218,55.659749,pm2blm"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  style={{ border: 0 }}
                  title="А500 на карте"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
