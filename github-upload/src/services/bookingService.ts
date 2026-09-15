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
