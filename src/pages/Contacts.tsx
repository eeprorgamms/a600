import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import BookingCalendar from '../components/BookingCalendar';

const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', car: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [rawDigits, setRawDigits] = useState(''); // "Чистые" цифры без форматирования
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: contentRef, isInView: contentVisible } = useInView();

  // Читаем данные из localStorage при загрузке страницы
  useEffect(() => {
    const bookingData = localStorage.getItem('a500_booking');
    if (bookingData) {
      try {
        const data = JSON.parse(bookingData);
        // Проверяем, что данные не устарели (не старше 1 часа)
        if (data.timestamp && Date.now() - data.timestamp < 3600000) {
          // Заполняем поле услуги списком выбранных услуг
          if (data.services && data.services.length > 0) {
            setFormData(prev => ({
              ...prev,
              service: data.services.join(', '),
              message: `Расчёт из калькулятора: ${data.total.toLocaleString()} ₽`
            }));
          }
        }
        // Очищаем localStorage после использования
        localStorage.removeItem('a500_booking');
      } catch (error) {
        console.error('Ошибка чтения данных из localStorage:', error);
      }
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare message for Telegram
    const message = `🚗 Новая заявка с сайта А500\n\n` +
      `👤 Имя: ${formData.name}\n` +
      `📱 Телефон: ${formData.phone}\n` +
      `🔧 Услуга: ${formData.service}\n` +
      `🚙 Автомобиль: ${formData.car}\n` +
      `💬 Сообщение: ${formData.message || 'Не указано'}`;

    // Send to Telegram (replace with your bot token and chat ID)
    const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
    const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
    
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });
    } catch (error) {
      console.log('Telegram notification skipped (demo mode)');
    }

    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', phone: '', service: '', car: '', message: '' });
    setRawDigits('');
  };

  // Форматирует чистые цифры в красивый вид
  const formatDigits = (digits: string): string => {
    if (digits.length === 0) return '';
    
    let formatted = '+7';
    if (digits.length > 1) {
      formatted += ' (' + digits.slice(1, 4);
    }
    if (digits.length >= 4) {
      formatted += ') ' + digits.slice(4, 7);
    }
    if (digits.length >= 7) {
      formatted += '-' + digits.slice(7, 9);
    }
    if (digits.length >= 9) {
      formatted += '-' + digits.slice(9, 11);
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Если поле полностью пустое — очищаем всё
    if (inputValue === '') {
      setRawDigits('');
      setFormData({...formData, phone: ''});
      return;
    }
    
    // Получаем предыдущее отформатированное значение
    const prevFormatted = formData.phone;
    
    // Определяем: пользователь ввёл или стёр?
    // Сравниваем длину строки (включая форматирование)
    const isDeleting = inputValue.length < prevFormatted.length;
    
    if (isDeleting) {
      // СТИРАНИЕ: убираем последнюю цифру из rawDigits
      const newRaw = rawDigits.slice(0, -1);
      
      // Если не осталось цифр — очищаем полностью
      if (newRaw.length === 0) {
        setRawDigits('');
        setFormData({...formData, phone: ''});
        return;
      }
      
      setRawDigits(newRaw);
      setFormData({...formData, phone: formatDigits(newRaw)});
      return;
    }
    
    // ВВОД: извлекаем цифры из inputValue
    const inputDigits = inputValue.replace(/\D/g, '');
    let newDigits = inputDigits;
    
    // Нормализуем первую цифру
    if (newDigits.length > 0) {
      if (newDigits[0] === '8') {
        newDigits = '7' + newDigits.slice(1);
      } else if (newDigits[0] !== '7') {
        newDigits = '7' + newDigits;
      }
    }
    
    // Ограничиваем до 11 цифр
    newDigits = newDigits.slice(0, 11);
    
    setRawDigits(newDigits);
    setFormData({...formData, phone: formatDigits(newDigits)});
  };



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
            {/* Booking Calendar */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Онлайн-запись</h2>
              <BookingCalendar />
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Или оставьте заявку</h2>
              
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="Александр"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="Введите номер телефона"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Услуга</label>
                    <textarea
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all resize-none"
                      placeholder="Ручная мойка, Химчистка салона, Полировка кузова"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Марка авто</label>
                    <input
                      type="text"
                      value={formData.car}
                      onChange={e => setFormData({...formData, car: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="Toyota Camry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Комментарий</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all resize-none"
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
                    height="250"
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
        </div>
      </section>
    </div>
  );
};

export default Contacts;
