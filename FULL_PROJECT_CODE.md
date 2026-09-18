# 🚗 ПОЛНЫЙ КОД ПРОЕКТА: Сайт автомойки А500

## 📋 Инструкция по использованию

### Способ 1: Скачать через интерфейс
Найдите кнопку **"Download"** / **"Скачать"** в интерфейсе этой платформы.

### Способ 2: Скопировать вручную
1. Скопируйте каждый файл из этого документа
2. Создайте файлы с соответствующими именами
3. Загрузите на GitHub
4. Задеплойте на Vercel

---

## 📁 Структура проекта

```
a500-carwash/
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json
├── .gitignore
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── Layout.tsx
    │   ├── ScrollToTop.tsx
    │   ├── Loader.tsx
    │   ├── AnimatedCounter.tsx
    │   ├── CostCalculator.tsx
    │   ├── BookingCalendar.tsx
    │   └── FAQ.tsx
    ├── pages/
    │   ├── Home.tsx
    │   ├── Services.tsx
    │   ├── Pricing.tsx
    │   ├── About.tsx
    │   ├── Contacts.tsx
    │   └── AdminPanel.tsx
    ├── hooks/
    │   └── useInView.ts
    └── services/
        └── bookingService.ts
```

---

## 📄 ФАЙЛ 1: index.html

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="А500 — автомойка и детейлинг-центр в Москве. Ручная мойка, химчистка, полировка, обработка воском. Боровское шоссе, 6к1. Тел: +7 (929) 588-40-94" />
    <meta name="keywords" content="автомойка, детейлинг, Москва, Солнцево, Боровское шоссе, ручная мойка, химчистка, полировка, воск" />
    <title>А500 — Автомойка и детейлинг в Москве | Боровское шоссе</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 📄 ФАЙЛ 2: package.json

```json
{
  "name": "a500-carwash",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.30.6"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.7.0",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3",
    "vite": "^6.4.3"
  }
}
```

---

## 📄 ФАЙЛ 3: vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
```

---

## 📄 ФАЙЛ 4: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src"]
}
```

---

## 📄 ФАЙЛ 5: .gitignore

```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
```

---

## 📄 ФАЙЛ 6: src/main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

---

## 📄 ФАЙЛ 7: src/App.tsx

```tsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contacts from './pages/Contacts';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
```

---

## 📄 ФАЙЛ 8: src/index.css

```css
@import "tailwindcss";

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
}

@layer components {
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .gradient-animate {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .blob {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    animation: blob 8s ease-in-out infinite;
  }

  @keyframes blob {
    0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
    50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
    75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
  }

  .btn-hover {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .btn-hover::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn-hover:hover::before {
    width: 300px;
    height: 300px;
  }

  .shimmer {
    position: relative;
    overflow: hidden;
  }

  .shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .parallax-container {
    perspective: 1000px;
    overflow: hidden;
  }

  .parallax-image {
    transition: transform 0.1s ease-out;
    will-change: transform;
  }

  .parallax-container:hover .parallax-image {
    transform: translateY(-20px) scale(1.02);
  }
}
```

---

## 📄 ФАЙЛ 9: src/hooks/useInView.ts

```typescript
import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}
```

---

## 📄 ФАЙЛ 10: src/services/bookingService.ts

```typescript
// Сервис для хранения заявок в localStorage
export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  car: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
}

const STORAGE_KEY = 'a500_bookings';

// Получить все заявки
export const getBookings = (): Booking[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ошибка чтения заявок:', error);
    return [];
  }
};

// Добавить заявку
export const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  const bookings = getBookings();
  bookings.unshift(newBooking); // Добавляем в начало
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

  return newBooking;
};

// Обновить статус заявки
export const updateBookingStatus = (id: string, status: Booking['status']): void => {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
};

// Удалить заявку
export const deleteBooking = (id: string): void => {
  const bookings = getBookings().filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

// Экспорт в CSV
export const exportToCSV = (): void => {
  const bookings = getBookings();
  
  if (bookings.length === 0) {
    alert('Нет заявок для экспорта');
    return;
  }

  const headers = ['Дата', 'Имя', 'Телефон', 'Услуга', 'Автомобиль', 'Сообщение', 'Статус'];
  const statusMap: Record<string, string> = {
    'new': 'Новая',
    'in_progress': 'В работе',
    'completed': 'Завершена',
    'cancelled': 'Отменена'
  };

  const rows = bookings.map(b => [
    new Date(b.createdAt).toLocaleString('ru-RU'),
    b.name,
    b.phone,
    b.service,
    b.car,
    b.message,
    statusMap[b.status] || b.status
  ]);

  const csvContent = [
    headers.join(';'),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
  ].join('\n');

  // Добавляем BOM для корректного отображения кириллицы в Excel
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `заявки_а500_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// Получить количество новых заявок
export const getNewBookingsCount = (): number => {
  return getBookings().filter(b => b.status === 'new').length;
};
```

---

## 📄 ФАЙЛ 11: src/components/ScrollToTop.tsx

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
```

---

## 📄 ФАЙЛ 12: src/components/Loader.tsx

```tsx
import { useState, useEffect } from 'react';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        <div className="relative mb-6">
          <div className="text-7xl md:text-8xl font-black tracking-tighter">
            <span className="inline-block animate-bounce bg-gradient-to-b from-gray-900 to-blue-700 bg-clip-text text-transparent" style={{ animationDelay: '0s' }}>А</span>
            <span className="inline-block animate-bounce bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>500</span>
          </div>
          
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm font-medium">Загрузка...</p>
      </div>
    </div>
  );
};

export default Loader;
```

---

## 📄 ФАЙЛ 13: src/components/AnimatedCounter.tsx

```tsx
import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
```

---

## 📄 ФАЙЛ 14: src/components/FAQ.tsx

```tsx
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
```

---

## 📄 ФАЙЛ 15: src/components/CostCalculator.tsx

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  name: string;
  price: number;
}

const CostCalculator = () => {
  const [carType, setCarType] = useState('sedan');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const carTypes = [
    { id: 'sedan', name: 'Седан', multiplier: 1 },
    { id: 'suv', name: 'Внедорожник', multiplier: 1.3 },
    { id: 'minivan', name: 'Минивэн', multiplier: 1.4 },
  ];

  const services: Service[] = [
    { id: 'wash', name: 'Ручная мойка', price: 500 },
    { id: 'interior', name: 'Химчистка салона', price: 4000 },
    { id: 'polish', name: 'Полировка кузова', price: 5000 },
    { id: 'wax', name: 'Обработка воском', price: 1000 },
    { id: 'detailing', name: 'Детейлинг', price: 3000 },
    { id: 'tires', name: 'Чернение резины', price: 300 },
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    const carMultiplier = carTypes.find(c => c.id === carType)?.multiplier || 1;
    const servicesTotal = selectedServices.reduce((sum, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);
    return Math.round(servicesTotal * carMultiplier);
  };

  const total = calculateTotal();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border border-blue-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Калькулятор стоимости
      </h3>

      {/* Car Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Тип автомобиля
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {carTypes.map(car => (
            <button
              key={car.id}
              onClick={() => setCarType(car.id)}
              className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                carType === car.id
                  ? 'bg-blue-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {car.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Выберите услуги
        </label>
        <div className="space-y-2">
          {services.map(service => (
            <label
              key={service.id}
              className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
                selectedServices.includes(service.id)
                  ? 'bg-blue-100 border-2 border-blue-700'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => toggleService(service.id)}
                  className="w-5 h-5 text-blue-700 rounded focus:ring-blue-500"
                />
                <span className="font-medium text-gray-900">{service.name}</span>
              </div>
              <span className="text-blue-700 font-semibold">{service.price} ₽</span>
            </label>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-white rounded-xl p-6 border-2 border-blue-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 font-medium">Итого:</span>
          <span className="text-3xl font-bold text-blue-700">{total.toLocaleString()} ₽</span>
        </div>
        <button
          onClick={() => {
            // Сохраняем выбранные услуги в localStorage
            const selectedServiceNames = selectedServices.map(id => {
              const service = services.find(s => s.id === id);
              return service?.name || '';
            }).filter(Boolean);
            
            localStorage.setItem('a500_booking', JSON.stringify({
              services: selectedServiceNames,
              carType: carType,
              total: total,
              timestamp: Date.now()
            }));
            
            // Переходим на страницу контактов
            window.location.href = '/#/contacts';
          }}
          className="block w-full text-center px-6 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
        >
          Записаться с этими услугами
        </button>
      </div>

      {selectedServices.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Выберите хотя бы одну услугу для расчёта стоимости
        </p>
      )}
    </div>
  );
};

export default CostCalculator;
```

---

## 📄 ФАЙЛ 16: src/components/BookingCalendar.tsx

```tsx
import { useState } from 'react';

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00'
  ];

  const formatDate = (date: Date) => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      full: `${date.getDate()} ${months[date.getMonth()]}`
    };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Выберите дату и время
      </h4>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Дата
        </label>
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date, index) => {
            const formatted = formatDate(date);
            const dateStr = date.toISOString().split('T')[0];
            const isSelected = selectedDate === dateStr;
            const isToday = index === 0;

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(dateStr)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span className="text-xs font-medium">{formatted.day}</span>
                <span className="text-lg font-bold">{formatted.date}</span>
                {isToday && (
                  <span className={`text-xs ${isSelected ? 'text-blue-200' : 'text-blue-700'}`}>
                    Сегодня
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Время
          </label>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTime === time
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Выбрано:</span>{' '}
            {formatDate(new Date(selectedDate)).full} в {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
```

---

## 📄 ФАЙЛ 17: src/components/Layout.tsx

```tsx
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ScrollToTop from './ScrollToTop';
import Loader from './Loader';

interface LayoutProps {
  children: React.ReactNode;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/services', label: 'Услуги' },
    { path: '/pricing', label: 'Цены' },
    { path: '/about', label: 'О нас' },
    { path: '/contacts', label: 'Контакты' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-700 transition-colors">
            А<span className="text-blue-700">500</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(item.path) 
                    ? 'text-blue-700' 
                    : 'text-gray-600 hover:text-blue-700'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+79295884094" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+7 (929) 588-40-94</span>
            </a>
            <Link 
              to="/contacts" 
              className="px-5 py-2.5 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover"
            >
              Записаться
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <a href="tel:+79295884094" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+7 (929) 588-40-94</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      <a
        href="https://wa.me/79295884094?text=Здравствуйте!%20Хочу%20записаться%20на%20мойку"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 transition-all"
        title="Написать в WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Написать в WhatsApp
        </span>
      </a>
      <a
        href="tel:+79295884094"
        className="group relative w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-700/30 hover:scale-110 transition-all"
        title="Позвонить"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Позвонить
        </span>
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              А<span className="text-blue-400">500</span>
            </div>
            <p className="text-sm text-gray-400">
              Автомойка и детейлинг-центр на Боровском шоссе. Профессиональный уход за вашим автомобилем.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Ручная мойка</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Химчистка</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Полировка</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Обработка воском</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Детейлинг</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Главная</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Услуги</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Цены</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">О нас</Link></li>
              <li><Link to="/contacts" className="hover:text-blue-400 transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="tel:+79295884094" className="hover:text-blue-400 transition-colors">+7 (929) 588-40-94</a></li>
              <li><a href="tel:+79299555587" className="hover:text-blue-400 transition-colors">+7 (929) 955-55-87</a></li>
              <li>
                <a 
                  href="https://yandex.ru/maps/org/a500/73889912604/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Москва, Боровское шоссе, 6к1
                </a>
              </li>
              <li>м. Говорово — 0.7 км</li>
              <li>Пн-Вс: 09:00 — 23:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">© 2024 А500. Все права защищены.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://yandex.ru/maps/org/a500/73889912604/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
              Яндекс.Карты
            </a>
            <a href="#/admin" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
              Админ-панель
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Loader />
      <ScrollToTop />
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Layout;
```

---

## 📄 ФАЙЛ 18: src/pages/Home.tsx

```tsx
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import AnimatedCounter from '../components/AnimatedCounter';

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
            <div className="relative parallax-container">
              <img
                src="https://image.qwenlm.ai/generated-images/2d30b727-802a-43ec-ae48-8538f2cf3f35/_result.png"
                alt="Lamborghini Aventador — детейлинг премиум автомобилей в А500"
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
```

---

## 📄 ФАЙЛ 19: src/pages/Services.tsx

```tsx
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
```

---

## 📄 ФАЙЛ 20: src/pages/Pricing.tsx

```tsx
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import CostCalculator from '../components/CostCalculator';

const Pricing = () => {
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: packagesRef, isInView: packagesVisible } = useInView();

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
      <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-16 relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 blob"></div>
        <div ref={heroRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in ${heroVisible ? 'visible' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Цены</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Прозрачные цены без скрытых доплат. Точная стоимость зависит от класса автомобиля
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-white">
        <div ref={packagesRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${packagesVisible ? 'visible' : ''}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Комплексы мойки</h2>
            <p className="text-gray-600">Выберите подходящий пакет услуг</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-xl p-6 border-2 transition-all card-hover ${
                  pkg.popular
                    ? 'border-blue-700 bg-blue-50 relative scale-105'
                    : 'border-gray-200 bg-white'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
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
                  className={`block text-center px-4 py-3 rounded-lg font-medium transition-all btn-hover ${
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

      {/* Cost Calculator */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CostCalculator />
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Дополнительные услуги</h2>
            <p className="text-gray-600">Отдельные услуги по уходу за автомобилем</p>
          </div>

          <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden">
            {additionalServices.map((service, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-6 hover:bg-white transition-colors ${
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
              className="px-8 py-4 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all btn-hover"
            >
              Позвонить
            </a>
            <Link
              to="/contacts"
              className="px-8 py-4 bg-white text-blue-700 font-medium rounded-lg border-2 border-blue-700 hover:bg-blue-50 transition-all"
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
```

---

## 📄 ФАЙЛ 21: src/pages/About.tsx

```tsx
import { useInView } from '../hooks/useInView';
import FAQ from '../components/FAQ';
import AnimatedCounter from '../components/AnimatedCounter';

const About = () => {
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: contentRef, isInView: contentVisible } = useInView();
  const { ref: advantagesRef, isInView: advantagesVisible } = useInView();
  const { ref: statsRef, isInView: statsVisible } = useInView();

  const advantages = [
    { title: 'Профессиональная химия', desc: 'Используем только проверенные специализированные средства, которые бережно удаляют загрязнения' },
    { title: 'Без царапин на ЛКП', desc: 'Наши сотрудники применяют приспособления, которые не оставляют царапин на лакокрасочном покрытии' },
    { title: 'Опытные мастера', desc: 'Команда профессионалов с многолетним опытом работы в сфере детейлинга' },
    { title: 'Удобное расположение', desc: 'м. Говорово — 0.7 км, удобная парковка, работаем до 23:00 без выходных' },
    { title: 'Гарантия качества', desc: 'Мы уверены в результате и гарантируем качество выполненных работ' },
    { title: 'Индивидуальный подход', desc: 'Поможем подобрать оптимальный уход для вашего автомобиля' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-16 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 blob"></div>
        <div ref={heroRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in ${heroVisible ? 'visible' : ''}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">О нас</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Автомойка и детейлинг-центр А500 — профессиональный уход за вашим автомобилем
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div ref={contentRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${contentVisible ? 'visible' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Чистота и забота о вашем авто
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                <strong className="text-gray-900">А500</strong> — это автомойка и детейлинг-центр на Боровском шоссе. Мы используем специализированные средства, которые бережно удаляют соль, химические реагенты, пыль, смолу и другие виды загрязнений.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Наши сотрудники применяют приспособления, которые <strong className="text-gray-900">не оставляют царапин на ЛКП</strong>. Мы поможем подобрать автохимию для защиты кузова от выгорания краски, сколов и коррозии.
              </p>
              <p className="text-lg text-gray-600">
                Помимо мойки, здесь выполняют полировку, химчистку и чернение резины, а также предлагают услуги детейлинг-центра и обрабатывают кузов воском — всё для заботливых водителей!
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=700&h=500&fit=crop"
                alt="Автомойка А500"
                className="rounded-2xl shadow-lg card-hover"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-700 rounded-2xl opacity-20 blur-xl"></div>
            </div>
          </div>

          {/* Advantages */}
          <div ref={advantagesRef} className={`mb-12 fade-in ${advantagesVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Почему выбирают нас</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6 card-hover group" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-600 gradient-animate">
        <div ref={statsRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in ${statsVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={14} suffix="" />
              </div>
              <div className="text-blue-200">Часов работы в день</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={7} suffix="" />
              </div>
              <div className="text-blue-200">Дней в неделю</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-blue-200">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={4} suffix=".0" />
              </div>
              <div className="text-blue-200">Рейтинг на картах</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
            <p className="text-lg text-gray-600">Ответы на популярные вопросы наших клиентов</p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наше расположение</h2>
            <p className="text-lg text-gray-600">Удобно добраться на метро или автомобиле</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Адрес</h3>
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

              <div className="bg-white rounded-xl p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Режим работы</h3>
                    <p className="text-gray-600">Пн — Вс: 09:00 — 23:00</p>
                    <p className="text-sm text-gray-500 mt-1">Без выходных и перерывов</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 card-hover">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Как добраться</h3>
                    <p className="text-gray-600">м. Говорово — 0.7 км</p>
                    <p className="text-sm text-gray-500 mt-1">Удобная парковка рядом</p>
                  </div>
                </div>
              </div>
            </div>

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
                  height="400"
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
      </section>
    </div>
  );
};

export default About;
```

---

## 📄 ФАЙЛ 22: src/pages/Contacts.tsx

```tsx
import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import BookingCalendar from '../components/BookingCalendar';
import { addBooking } from '../services/bookingService';

const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', car: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [rawDigits, setRawDigits] = useState('');
  const { ref: heroRef, isInView: heroVisible } = useInView();
  const { ref: contentRef, isInView: contentVisible } = useInView();

  // Читаем данные из localStorage при загрузке страницы
  useEffect(() => {
    const bookingData = localStorage.getItem('a500_booking');
    if (bookingData) {
      try {
        const data = JSON.parse(bookingData);
        if (data.timestamp && Date.now() - data.timestamp < 3600000) {
          if (data.services && data.services.length > 0) {
            setFormData(prev => ({
              ...prev,
              service: data.services.join(', '),
              message: `Расчёт из калькулятора: ${data.total.toLocaleString()} ₽`
            }));
          }
        }
        localStorage.removeItem('a500_booking');
      } catch (error) {
        console.error('Ошибка чтения данных из localStorage:', error);
      }
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Сохраняем заявку в базу данных
    addBooking({
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      car: formData.car,
      message: formData.message
    });
    
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
    
    if (inputValue === '') {
      setRawDigits('');
      setFormData({...formData, phone: ''});
      return;
    }
    
    const prevFormatted = formData.phone;
    const isDeleting = inputValue.length < prevFormatted.length;
    
    if (isDeleting) {
      const newRaw = rawDigits.slice(0, -1);
      
      if (newRaw.length === 0) {
        setRawDigits('');
        setFormData({...formData, phone: ''});
        return;
      }
      
      setRawDigits(newRaw);
      setFormData({...formData, phone: formatDigits(newRaw)});
      return;
    }
    
    const inputDigits = inputValue.replace(/\D/g, '');
    let newDigits = inputDigits;
    
    if (newDigits.length > 0) {
      if (newDigits[0] === '8') {
        newDigits = '7' + newDigits.slice(1);
      } else if (newDigits[0] !== '7') {
        newDigits = '7' + newDigits;
      }
    }
    
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
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
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
```

---

## 📄 ФАЙЛ 23: src/pages/AdminPanel.tsx

```tsx
import { useState, useEffect } from 'react';
import { getBookings, updateBookingStatus, deleteBooking, exportToCSV } from '../services/bookingService';

interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  car: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
}

const AdminPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    try {
      const data = getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
      setBookings([]);
    }
  }, []);

  const loadBookings = () => {
    try {
      const data = getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    }
  };

  const handleStatusChange = (id: string, status: Booking['status']) => {
    try {
      updateBookingStatus(id, status);
      loadBookings();
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить заявку?')) {
      try {
        deleteBooking(id);
        loadBookings();
      } catch (error) {
        console.error('Ошибка удаления заявки:', error);
      }
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const statusColors: Record<string, string> = {
    'new': 'bg-blue-100 text-blue-800',
    'in_progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  const statusLabels: Record<string, string> = {
    'new': 'Новая',
    'in_progress': 'В работе',
    'completed': 'Завершена',
    'cancelled': 'Отменена'
  };

  const stats = {
    total: bookings.length,
    new: bookings.filter(b => b.status === 'new').length,
    inProgress: bookings.filter(b => b.status === 'in_progress').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель управления заявками</h1>
            <p className="text-gray-600">Управление заявками с сайта А500</p>
          </div>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            На главную
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600 mt-1">Всего заявок</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-700">{stats.new}</div>
            <div className="text-sm text-blue-600 mt-1">Новых</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-yellow-700">{stats.inProgress}</div>
            <div className="text-sm text-yellow-600 mt-1">В работе</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-green-700">{stats.completed}</div>
            <div className="text-sm text-green-600 mt-1">Завершено</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Все ({bookings.length})
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'new' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Новые ({stats.new})
              </button>
              <button
                onClick={() => setFilter('in_progress')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'in_progress' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                В работе ({stats.inProgress})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'completed' ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Завершено ({stats.completed})
              </button>
            </div>
            <button
              onClick={() => {
                try {
                  exportToCSV();
                } catch (error) {
                  console.error('Ошибка экспорта:', error);
                  alert('Ошибка при экспорте заявок');
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Экспорт в CSV
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Заявок нет</h3>
              <p className="text-gray-600">Здесь будут отображаться заявки с сайта</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{booking.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                        {statusLabels[booking.status]}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Телефон:</span>
                        <a href={`tel:${booking.phone}`} className="ml-2 text-blue-700 hover:underline">
                          {booking.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-gray-500">Автомобиль:</span>
                        <span className="ml-2 text-gray-900">{booking.car || 'Не указан'}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-500">Услуга:</span>
                        <span className="ml-2 text-gray-900">{booking.service || 'Не выбрана'}</span>
                      </div>
                      {booking.message && (
                        <div className="md:col-span-2">
                          <span className="text-gray-500">Сообщение:</span>
                          <p className="mt-1 text-gray-700 bg-gray-50 rounded-lg p-3">{booking.message}</p>
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <span className="text-gray-500">Дата:</span>
                        <span className="ml-2 text-gray-600">
                          {new Date(booking.createdAt).toLocaleString('ru-RU')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:min-w-[200px]">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">Новая</option>
                      <option value="in_progress">В работе</option>
                      <option value="completed">Завершена</option>
                      <option value="cancelled">Отменена</option>
                    </select>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
```

---

## 🎉 ГОТОВО!

Все файлы проекта собраны в одном документе. Теперь вы можете:

1. **Скопировать** этот файл целиком
2. **Создать** файлы с соответствующими именами
3. **Загрузить** на GitHub
4. **Задеплоить** на Vercel

**Спасибо за работу! Удачи с проектом!** 🚀✨
