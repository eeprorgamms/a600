import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'Сколько времени занимает мойка?',
      answer: 'Экспресс-мойка — 20 минут, стандартная — 40 минут, премиум — 1 час, комплексный детейлинг — 2-3 часа.'
    },
    {
      question: 'Нужна ли предварительная запись?',
      answer: 'Запись желательна, но не обязательна. Мы работаем без перерывов с 9:00 до 23:00, поэтому всегда найдём время для вас.'
    },
    {
      question: 'Какие способы оплаты вы принимаете?',
      answer: 'Принимаем наличные, банковские карты (Visa, MasterCard, МИР), переводы по СБП и на расчётный счёт.'
    },
    {
      question: 'Даёте ли гарантию на работы?',
      answer: 'Да, мы даём гарантию на все выполненные работы. Срок гарантии зависит от типа услуги — от 1 месяца до 1 года.'
    },
    {
      question: 'Сколько стоит мойка внедорожника?',
      answer: 'Стоимость мойки внедорожника на 20-30% выше базовой. Стандартная мойка внедорожника — от 1 100 ₽, премиум — от 1 800 ₽.'
    },
    {
      question: 'Можно ли ждать во время мойки?',
      answer: 'Да, у нас есть комфортная зона ожидания с Wi-Fi, кофе и телевизорами. Вы можете наблюдать за процессом мойки.'
    },
    {
      question: 'Используете ли вы безопасную химию?',
      answer: 'Мы используем только профессиональную сертифицированную автохимию от ведущих мировых брендов: Koch Chemie, Meguiar\'s, 3D, Labocosmetica. Все средства безопасны для ЛКП.'
    },
    {
      question: 'Можно ли приехать без записи?',
      answer: 'Конечно! Мы работаем в порядке живой очереди. Однако запись гарантирует вам обслуживание в выбранное время без ожидания.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {faqItems.map((item, index) => (
        <div key={index} className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-semibold text-gray-900">{item.question}</span>
            <svg
              className={`w-5 h-5 text-blue-700 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-4 text-gray-600">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
