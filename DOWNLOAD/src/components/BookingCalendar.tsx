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
