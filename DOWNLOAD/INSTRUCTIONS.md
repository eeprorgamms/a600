# 📦 Инструкция по загрузке файлов на GitHub и Vercel

## ✅ Все файлы проекта находятся в папке `DOWNLOAD/`

### Структура файлов:

```
DOWNLOAD/
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

## 🚀 Шаг 1: Загрузка на GitHub

### Вариант А: Через веб-интерфейс GitHub

1. Откройте ваш репозиторий на GitHub
2. Нажмите **"Add file"** → **"Upload files"**
3. Откройте папку `DOWNLOAD/` на вашем компьютере
4. **Выделите ВСЕ файлы и папки** (Ctrl+A)
5. **УБЕРИТЕ выделение с `node_modules/` и `dist/`** (если они есть)
6. Перетащите файлы в окно GitHub
7. Нажмите **"Commit changes"**

### Вариант Б: Через GitHub Desktop

1. Откройте GitHub Desktop
2. Выберите ваш репозиторий
3. Перетащите содержимое папки `DOWNLOAD/` в папку репозитория
4. Нажмите **"Commit to main"**
5. Нажмите **"Push origin"**

---

## 🌐 Шаг 2: Деплой на Vercel

1. Откройте [vercel.com](https://vercel.com)
2. Войдите через GitHub
3. Нажмите **"Import Project"**
4. Выберите ваш репозиторий
5. **ВАЖНО:** Установите настройки:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Нажмите **"Deploy"**
7. Подождите 1-2 минуты

---

## ✅ Шаг 3: Проверка

После деплоя Vercel даст вам ссылку вида:
```
https://ваш-проект.vercel.app
```

Откройте ссылку и проверьте:
- ✅ Все страницы работают
- ✅ Форма заявки отправляется
- ✅ Телефон форматируется автоматически
- ✅ Карта отображается
- ✅ Анимации работают
- ✅ На мобильном всё выглядит хорошо

---

## 🔧 Настройка Telegram (опционально)

Если хотите получать заявки в Telegram:

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен бота
3. Узнайте свой Chat ID через [@userinfobot](https://t.me/userinfobot)
4. Откройте файл `src/pages/Contacts.tsx`
5. Замените:
   ```typescript
   const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
   const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';
   ```
   на ваши значения
6. Запушьте изменения в GitHub
7. Vercel автоматически пересоберёт сайт

---

## 📝 Замена данных

Чтобы заменить данные (телефон, адрес, услуги и т.д.):

1. Откройте нужный файл в папке `DOWNLOAD/`
2. Найдите и замените данные
3. Запушьте изменения в GitHub
4. Vercel автоматически обновит сайт

**Основные файлы для замены данных:**
- `src/components/Layout.tsx` — телефоны в шапке и футере
- `src/pages/Home.tsx` — отзывы, бренды, химия
- `src/pages/Services.tsx` — список услуг
- `src/pages/Pricing.tsx` — пакеты и цены
- `src/pages/About.tsx` — описание компании
- `src/pages/Contacts.tsx` — контактная информация

---

## 🎯 Готово!

Ваш сайт готов к использованию! 🚀

Если что-то не работает — проверьте:
- Все ли файлы загружены на GitHub
- Правильные ли настройки на Vercel
- Нет ли ошибок в консоли браузера (F12)

Удачи! 💪
