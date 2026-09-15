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
