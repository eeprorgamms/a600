import { Link } from 'react-router-dom';

const Pricing = () => {
  const packages = [
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

  const additionalServices = [
    { name: 'Химчистка салона', price: 'от 4 000 ₽' },
    { name: 'Полировка кузова', price: 'от 5 000 ₽' },
    { name: 'Обработка воском', price: 'от 1 000 ₽' },
    { name: 'Чернение резины', price: 'от 300 ₽' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Цены</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Прозрачные цены без скрытых доплат. Точная стоимость зависит от класса автомобиля
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Комплексы мойки</h2>
            <p className="text-gray-600">Выберите подходящий пакет услуг</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-xl p-6 border-2 transition-all hover:shadow-lg ${
                  pkg.popular
                    ? 'border-blue-700 bg-blue-50 relative'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-4 py-1 rounded-full text-xs font-semibold">
                    Популярный
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-700 mb-1">{pkg.price}</div>
                  <div className="text-sm text-gray-500">~ {pkg.duration}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start space-x-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacts"
                  className={`block text-center px-4 py-3 rounded-lg font-medium transition-colors ${
                    pkg.popular
                      ? 'bg-blue-700 text-white hover:bg-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Выбрать
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">* Цены указаны для легковых автомобилей. Для внедорожников и минивэнов — наценка 20-30%</p>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Дополнительные услуги</h2>
            <p className="text-gray-600">Отдельные услуги по уходу за автомобилем</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {additionalServices.map((service, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-6 ${
                  i !== additionalServices.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-gray-900 font-medium">{service.name}</span>
                <span className="text-blue-700 font-semibold">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Остались вопросы?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Свяжитесь с нами — мы рассчитаем точную стоимость для вашего автомобиля
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+79295884094"
              className="px-8 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
            >
              Позвонить
            </a>
            <Link
              to="/contacts"
              className="px-8 py-4 bg-white text-blue-700 font-medium rounded-lg border-2 border-blue-700 hover:bg-blue-50 transition-colors"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
