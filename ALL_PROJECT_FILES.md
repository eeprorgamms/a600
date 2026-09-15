# ВСЕ ФАЙЛЫ ПРОЕКТА А500

Скопируйте каждый файл и создайте его в соответствующей папке на GitHub.

---

## 📁 СТРУКТУРА ПАПОК

```
/
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
    │   └── Contacts.tsx
    └── hooks/
        └── useInView.ts
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
# Dependencies
node_modules/
package-lock.json

# Build output
dist/

# Environment variables
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
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

```ts
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

## 📄 ФАЙЛ 10: src/components/ScrollToTop.tsx

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

## 📄 ФАЙЛ 11: src/components/Loader.tsx

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

## 📄 ФАЙЛ 12: src/components/AnimatedCounter.tsx

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

## 📄 ФАЙЛ 13: src/components/FAQ.tsx

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

## 📄 ФАЙЛ 14: src/components/CostCalculator.tsx

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

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Тип автомобиля
        </label>
        <div className="grid grid-cols-3 gap-3">
          {carTypes.map(car => (
            <button
              key={car.id}
              onClick={() => setCarType(car.id)}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
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

      <div className="bg-white rounded-xl p-6 border-2 border-blue-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 font-medium">Итого:</span>
          <span className="text-3xl font-bold text-blue-700">{total.toLocaleString()} ₽</span>
        </div>
        <Link
          to="/contacts"
          className="block w-full text-center px-6 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
        >
          Записаться с этими услугами
        </Link>
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

## 📄 ФАЙЛ 15: src/components/BookingCalendar.tsx

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

## 📄 ФАЙЛ 16: src/components/Layout.tsx

Этот файл большой, поэтому я создам его отдельно. Откройте файл `src/components/Layout.tsx` в интерфейсе проекта и скопируйте его содержимое.

---

## 📄 ФАЙЛЫ 17-21: Страницы (Home, Services, Pricing, About, Contacts)

Эти файлы большие. Откройте каждый файл в интерфейсе проекта слева и скопируйте содержимое:

- `src/pages/Home.tsx`
- `src/pages/Services.tsx`
- `src/pages/Pricing.tsx`
- `src/pages/About.tsx`
- `src/pages/Contacts.tsx`

---

## 🚀 ИНСТРУКЦИЯ ПО ЗАГРУЗКЕ НА GITHUB

1. Создайте структуру папок как показано выше
2. Скопируйте содержимое каждого файла из этого документа
3. Загрузите на GitHub через веб-интерфейс
4. На Vercel установите:
   - Framework Preset: **Vite**
   - Build Command: **npm run build**
   - Output Directory: **dist**
   - Install Command: **npm install**
5. Нажмите Deploy

---

✅ Проект готов к деплою!
