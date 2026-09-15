# 📋 Инструкция по использованию админ-панели

## 🔐 Доступ к админ-панели

Админ-панель доступна по адресу:
```
https://ваш-сайт.vercel.app/#/admin
```

**Важно:** Админ-панель не защищена паролем. Для продакшена рекомендуется добавить авторизацию.

---

## 📊 Что можно делать в админ-панели

### 1. Просмотр статистики

Вверху страницы отображается статистика:
- **Всего заявок** — общее количество
- **Новых** — заявки со статусом "Новая"
- **В работе** — заявки в обработке
- **Завершено** — выполненные заявки

### 2. Фильтрация заявок

Используйте кнопки для фильтрации:
- **Все** — показать все заявки
- **Новые** — только новые заявки
- **В работе** — только заявки в обработке
- **Завершено** — только завершенные заявки

### 3. Изменение статуса заявки

Для каждой заявки можно изменить статус:
1. Найдите заявку в списке
2. В выпадающем списке выберите новый статус:
   - **Новая** — заявка только что поступила
   - **В работе** — вы работаете над заявкой
   - **Завершена** — заявка выполнена
   - **Отменена** — заявка отменена

### 4. Удаление заявки

Чтобы удалить заявку:
1. Найдите заявку в списке
2. Нажмите кнопку **"Удалить"**
3. Подтвердите удаление

### 5. Экспорт в CSV

Чтобы выгрузить все заявки в Excel:
1. Нажмите кнопку **"Экспорт в CSV"** (зеленая кнопка справа)
2. Файл автоматически скачается
3. Откройте его в Excel или Google Sheets

**Формат CSV:**
- Дата
- Имя
- Телефон
- Услуга
- Автомобиль
- Сообщение
- Статус

---

## 📱 Как это работает

### Локальное хранилище (по умолчанию)

Заявки сохраняются в браузере пользователя:
- ✅ Работает сразу без настройки
- ✅ Данные хранятся в localStorage
- ❌ Данные доступны только на одном устройстве
- ❌ Данные удаляются при очистке браузера

### Supabase (облачная база)

Для хранения заявок в облаке:
1. Следуйте инструкции в файле `SUPABASE_SETUP.md`
2. Заявки будут доступны с любого устройства
3. Данные не потеряются

---

## 🔔 Уведомления о новых заявках

### Вариант 1: Telegram бот

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен бота
3. Узнайте свой Chat ID через [@userinfobot](https://t.me/userinfobot)
4. В файле `src/pages/Contacts.tsx` замените:
   ```typescript
   const TELEGRAM_BOT_TOKEN = 'ваш_токен';
   const TELEGRAM_CHAT_ID = 'ваш_chat_id';
   ```

### Вариант 2: Email уведомления

Настройте через Supabase (см. `SUPABASE_SETUP.md`)

---

## 🛡️ Защита админ-панели (опционально)

Для добавления пароля на админ-панель:

### Простой вариант (базовая авторизация)

Создайте файл `src/components/AdminAuth.tsx`:

```typescript
import { useState } from 'react';

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ваш_пароль') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Вход в админ-панель</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminAuth;
```

Обновите `src/App.tsx`:

```typescript
import AdminAuth from './components/AdminAuth';

// ...

<Route path="/admin" element={<AdminAuth><AdminPanel /></AdminAuth>} />
```

---

## 📈 Аналитика заявок

### SQL запросы для Supabase

Если используете Supabase, можно выполнять SQL запросы:

```sql
-- Количество заявок по дням
SELECT 
  DATE(created_at) as date,
  COUNT(*) as count
FROM bookings
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Популярные услуги
SELECT 
  service,
  COUNT(*) as count
FROM bookings
GROUP BY service
ORDER BY count DESC;

-- Заявки за последнюю неделю
SELECT *
FROM bookings
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

---

## 🐛 Решение проблем

### Заявки не сохраняются

1. Проверьте консоль браузера (F12)
2. Убедитесь, что localStorage не отключен
3. Проверьте, что форма отправляется (должно появиться сообщение "Заявка отправлена!")

### Админ-панель не показывает заявки

1. Обновите страницу (F5)
2. Проверьте, что заявки отправлены с того же устройства
3. Если используете Supabase — проверьте подключение

### Экспорт в CSV не работает

1. Разрешите скачивание файлов в браузере
2. Проверьте, что есть заявки для экспорта
3. Попробуйте другой браузер

---

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте консоль браузера (F12 → Console)
2. Проверьте логи в Supabase Dashboard (если используете)
3. Обратитесь за помощью

---

## ✅ Чек-лист

- [ ] Открыть админ-панель по адресу `/#/admin`
- [ ] Проверить, что заявки отображаются
- [ ] Протестировать изменение статуса
- [ ] Протестировать экспорт в CSV
- [ ] (Опционально) Настроить Telegram уведомления
- [ ] (Опционально) Добавить защиту паролем
- [ ] (Опционально) Подключить Supabase

---

Готово! Теперь вы можете управлять заявками через удобную админ-панель. 🎉
