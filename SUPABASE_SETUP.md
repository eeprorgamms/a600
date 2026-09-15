# 📊 Инструкция по подключению базы данных Supabase

## Что такое Supabase?

Supabase — это бесплатная облачная база данных PostgreSQL с простым интерфейсом. Позволяет хранить заявки с сайта в облаке и получать к ним доступ с любого устройства.

**Бесплатный тариф включает:**
- 500 МБ базы данных
- 50,000 строк
- 1 ГБ хранилища
- Неограниченный API

---

## 🚀 Шаг 1: Регистрация в Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Нажмите **"Start your project"**
3. Войдите через GitHub или email
4. Нажмите **"New Project"**
5. Заполните:
   - **Name:** `a500-bookings`
   - **Database Password:** (придумайте пароль и сохраните!)
   - **Region:** `West EU (Ireland)` (ближе к Москве)
6. Нажмите **"Create new project"**
7. Подождите 1-2 минуты пока проект создастся

---

## 🗄️ Шаг 2: Создание таблицы заявок

1. В левом меню нажмите **"Table Editor"** (иконка таблицы)
2. Нажмите **"New Table"**
3. Заполните:
   - **Name:** `bookings`
   - Отключите **"Enable Row Level Security (RLS)"** (для простоты)
4. Добавьте колонки:

| Имя колонки | Тип | Настройки |
|-------------|-----|-----------|
| `id` | `uuid` | Primary Key, Default: `gen_random_uuid()` |
| `created_at` | `timestamptz` | Default: `now()` |
| `name` | `text` | - |
| `phone` | `text` | - |
| `service` | `text` | - |
| `car` | `text` | - |
| `message` | `text` | - |
| `status` | `text` | Default: `'new'` |

5. Нажмите **"Save"**

---

## 🔑 Шаг 3: Получение API ключей

1. В левом меню нажмите **"Project Settings"** (иконка шестерёнки)
2. Перейдите в **"API"**
3. Скопируйте:
   - **Project URL** (например: `https://xxxxx.supabase.co`)
   - **anon public key** (длинная строка)

---

## 💻 Шаг 4: Интеграция с сайтом

### 4.1. Установите Supabase клиент

```bash
npm install @supabase/supabase-js
```

### 4.2. Создайте файл конфигурации

Создайте файл `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

Замените `YOUR_SUPABASE_URL` и `YOUR_SUPABASE_ANON_KEY` на ваши значения.

### 4.3. Обновите сервис заявок

Замените содержимое `src/services/bookingService.ts`:

```typescript
import { supabase } from '../lib/supabase';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  car: string;
  message: string;
  created_at: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
}

// Получить все заявки
export const getBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Ошибка получения заявок:', error);
    return [];
  }
  
  return data || [];
};

// Добавить заявку
export const addBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'status'>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select();
  
  if (error) {
    console.error('Ошибка добавления заявки:', error);
    return null;
  }
  
  return data?.[0] || null;
};

// Обновить статус
export const updateBookingStatus = async (id: string, status: Booking['status']) => {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id);
  
  if (error) {
    console.error('Ошибка обновления статуса:', error);
  }
};

// Удалить заявку
export const deleteBooking = async (id: string) => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Ошибка удаления заявки:', error);
  }
};
```

### 4.4. Обновите компоненты

В файлах `src/pages/Contacts.tsx` и `src/pages/AdminPanel.tsx` замените вызовы функций на асинхронные:

```typescript
// Было:
addBooking(formData);

// Стало:
await addBooking(formData);
```

---

## 📱 Шаг 5: Настройка уведомлений (опционально)

### Email уведомления

1. В Supabase перейдите в **"Database"** → **"Triggers"**
2. Нажмите **"New Trigger"**
3. Выберите таблицу `bookings`
4. Выберите событие `INSERT`
5. Напишите функцию отправки email (используя Supabase Edge Functions)

### Telegram уведомления

Создайте Edge Function для отправки уведомлений в Telegram:

1. Перейдите в **"Edge Functions"**
2. Нажмите **"New Function"**
3. Напишите функцию отправки сообщения в Telegram

---

## 🔐 Безопасность

### Включите RLS (Row Level Security)

Для продакшена рекомендуется включить RLS:

1. Перейдите в **"Authentication"** → **"Policies"**
2. Выберите таблицу `bookings`
3. Добавьте политики:

**Для чтения (только для авторизованных):**
```sql
CREATE POLICY "Enable read for authenticated users"
ON bookings FOR SELECT
USING (auth.role() = 'authenticated');
```

**Для вставки (для всех):**
```sql
CREATE POLICY "Enable insert for everyone"
ON bookings FOR INSERT
WITH CHECK (true);
```

---

## 📊 Просмотр данных

### Через Supabase Dashboard

1. Перейдите в **"Table Editor"**
2. Выберите таблицу `bookings`
3. Видите все заявки в таблице

### Через ваш сайт

Перейдите на страницу `/admin` на вашем сайте.

---

## 💡 Дополнительные возможности

### 1. Экспорт данных

В Supabase можно экспортировать данные в CSV:
1. Перейдите в **"Table Editor"** → `bookings`
2. Нажмите **"..."** (три точки)
3. Выберите **"Export to CSV"**

### 2. Автоматические бэкапы

Supabase автоматически делает бэкапы каждый день.

### 3. Аналитика

Можно создать SQL-запросы для аналитики:

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
```

---

## 🆘 Решение проблем

### Ошибка "Failed to fetch"

Проверьте:
- Правильность URL и ключа в `src/lib/supabase.ts`
- CORS настройки в Supabase (Project Settings → API)

### Заявки не сохраняются

Проверьте:
- Структуру таблицы (все колонки должны быть)
- Логи в консоли браузера (F12)
- Логи в Supabase Dashboard

### Не могу войти в Supabase

- Восстановите пароль через email
- Проверьте, что проект активен

---

## 📞 Поддержка

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

---

## ✅ Чек-лист настройки

- [ ] Зарегистрироваться в Supabase
- [ ] Создать проект
- [ ] Создать таблицу `bookings`
- [ ] Получить URL и ключ API
- [ ] Установить `@supabase/supabase-js`
- [ ] Создать файл `src/lib/supabase.ts`
- [ ] Обновить `src/services/bookingService.ts`
- [ ] Обновить компоненты (Contacts, AdminPanel)
- [ ] Протестировать добавление заявки
- [ ] Протестировать просмотр в админ-панели
- [ ] (Опционально) Настроить уведомления

---

Готово! Теперь заявки будут сохраняться в облачной базе данных и доступны с любого устройства. 🎉
