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
