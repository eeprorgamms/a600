import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import BookingCalendar, { type PreferredSlot } from '../components/BookingCalendar';
import {Link} from 'react-router-dom';
import {site,phoneHref} from '../config/site';
import MapEmbed from '../components/MapEmbed';

const Contacts = () => {
  const [preferred, setPreferred] = useState<PreferredSlot>({date:'',time:''});
  const formEnabled = site.leads.enabled && site.leads.endpoint.startsWith('https://') && Boolean(site.legal.operatorName && site.legal.contactEmail && site.legal.retentionDescription);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', car: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting,setSubmitting] = useState(false);
  const [submitError,setSubmitError] = useState('');
  const [consent,setConsent] = useState(false);
  const [honeypot,setHoneypot] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [rawDigits, setRawDigits] = useState(''); // "Чистые" цифры без форматирования
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: contentRef, isInView: contentVisible } = useInView();

  // Перенос только выбранных услуг (без персональных данных) из калькулятора
  useEffect(() => {
    let bookingData: string | null = null;
    try { bookingData = sessionStorage.getItem('a500_booking'); } catch { /* sandbox preview or disabled browser storage */ }
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
        try { sessionStorage.removeItem('a500_booking'); } catch { /* preview */ }
      } catch (error) {
        console.error('Ошибка чтения данных из localStorage:', error);
      }
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const digits=formData.phone.replace(/\D/g,'');
    if(formData.name.trim().length < 2 || digits.length !== 11 || digits[0] !== '7'){
      setSubmitError('Укажите имя и действительный номер телефона в формате +7.'); return;
    }
    if(!formEnabled){setSubmitError('Электронные заявки пока не подключены. Позвоните нам.');return;}
    if(!consent){setSubmitError('Подтвердите согласие перед отправкой.');return;}
    if(!site.legal.operatorName || !site.legal.contactEmail || !site.legal.retentionDescription){setSubmitError('Форма пока недоступна: сведения об операторе данных не заполнены. Позвоните нам.');return;}
    if(submitting)return;
    setSubmitting(true);
    try{
      const response=await fetch(site.leads.endpoint, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name:formData.name.trim(),phone:formData.phone,service:formData.service,car:formData.car,message:formData.message,preferredDate:preferred.date,preferredTime:preferred.time,consent,website:honeypot,startedAt})
      });
      const result = await response.json().catch(() => null);
      if(!response.ok || result?.ok !== true) throw new Error(response.status===503 ? 'Приём заявок пока не подключён. Позвоните по телефону, указанному на сайте.' : 'Заявка не доставлена. Попробуйте позже или позвоните нам.');
      setFormSubmitted(true);
      setFormData({name:'',phone:'',service:'',car:'',message:''});
      setConsent(false);setRawDigits('');setPreferred({date:'',time:''});
    }catch(error){setSubmitError(error instanceof Error ? error.message : 'Не удалось отправить заявку. Позвоните нам.');}
    finally{setSubmitting(false);}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Желаемое время посещения</h2>
              {formEnabled ? <BookingCalendar onChange={setPreferred} /> : <div className="bg-blue-50 rounded-xl p-6"><p className="text-gray-700 mb-4">Уточните свободное время напрямую по телефону. Онлайн-запись подключается после согласования сервиса заявок.</p><a href={phoneHref(site.contacts.phone)} className="inline-block rounded-lg bg-blue-700 px-5 py-3 text-white font-medium">Позвонить {site.contacts.phone}</a></div>}
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Или оставьте заявку</h2>
              
              {!formEnabled ? <div className="bg-gray-50 rounded-xl p-6"><p className="text-gray-700 mb-5">Форма пока не подключена к защищённому приёму заявок. Для связи используйте телефон.</p><a href={phoneHref(site.contacts.phone)} className="inline-flex rounded-lg bg-blue-700 px-5 py-3 text-white font-medium">Позвонить {site.contacts.phone}</a></div> : formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center scale-in visible">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-600">Мы получили обращение. Время посещения согласовывается отдельно.</p>
                  <button type="button" onClick={()=>setFormSubmitted(false)} className="mt-5 text-blue-700 underline">Отправить ещё одно обращение</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="hidden" aria-hidden="true"><label>Сайт<input type="text" autoComplete="off" tabIndex={-1} value={honeypot} onChange={e=>setHoneypot(e.target.value)} /></label></div>
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                    <input
                      id="lead-name" type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="Александр" maxLength={60} autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                    <input
                      id="lead-phone" type="tel"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="Введите номер телефона" inputMode="tel" autoComplete="tel" maxLength={18}
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-service" className="block text-sm font-medium text-gray-700 mb-2">Услуга</label>
                    <textarea id="lead-service"
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all resize-none"
                      placeholder="Ручная мойка, химчистка, полировка" maxLength={150}
                      rows={2}
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-car" className="block text-sm font-medium text-gray-700 mb-2">Марка авто</label>
                    <input
                      id="lead-car" type="text"
                      value={formData.car}
                      onChange={e => setFormData({...formData, car: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
                      placeholder="Toyota Camry" maxLength={80}
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-message" className="block text-sm font-medium text-gray-700 mb-2">Комментарий</label>
                    <textarea id="lead-message"
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all resize-none"
                      placeholder="Удобное время, пожелания..." maxLength={1000}
                    />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 h-4 w-4" />
                    <span>Даю согласие на обработку данных в целях ответа на обращение на условиях <Link to="/consent" className="text-blue-700 underline">согласия</Link>. Ознакомлен(а) с <Link to="/privacy" className="text-blue-700 underline">политикой обработки данных</Link>.</span>
                  </label>
                  <div role="alert" aria-live="polite" className="text-sm text-red-700">{submitError}</div>
                  <button type="submit" disabled={submitting} className="w-full px-6 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover disabled:opacity-60">
                    {submitting ? 'Отправляем…' : 'Отправить заявку'}
                  </button>
                  <p className="text-xs text-gray-500">Если форма недоступна, позвоните: <a className="text-blue-700 underline" href={phoneHref(site.contacts.phone)}>{site.contacts.phone}</a>. Отправка формы не означает подтверждения времени записи.</p>
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
                    <a href={phoneHref(site.contacts.phone)} className="block text-gray-600 hover:text-blue-700 transition-colors">{site.contacts.phone}</a>
                    {site.contacts.phone2 && <a href={phoneHref(site.contacts.phone2)} className="block text-gray-600 hover:text-blue-700 transition-colors">{site.contacts.phone2}</a>}
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
                      href={site.contacts.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {site.contacts.address}
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
                    <p className="text-gray-600">{site.contacts.hours}</p>
                    <p className="text-sm text-gray-500 mt-1">Актуальный режим работы уточняйте перед поездкой.</p>
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
                    <p className="text-gray-600">{site.contacts.landmark}</p>
                    <p className="text-sm text-gray-500 mt-1">Маршрут можно построить через Яндекс Карты.</p>
                  </div>
                </div>
              </div>

              {/* Карта загружается после действия посетителя, без скрытых запросов при открытии страницы */}
              <MapEmbed />
              <a 
                href={site.contacts.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-blue-700 hover:text-blue-800 hover:underline transition-colors font-medium text-sm"
              >
                Открыть страницу автомойки в Яндекс.Картах →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
