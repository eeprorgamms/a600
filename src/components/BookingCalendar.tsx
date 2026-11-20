import { useState } from 'react';

export interface PreferredSlot { date: string; time: string }
interface Props { onChange: (slot: PreferredSlot) => void }

/** Пожелание о времени, НЕ календарь свободных слотов. */
export default function BookingCalendar({ onChange }: Props) {
  const [selected, setSelected] = useState<PreferredSlot>({ date: '', time: '' });
  const now = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const value = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    return { value: `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`, label: value.getDate(), day: value.toLocaleDateString('ru-RU', {weekday:'short'}), month: value.toLocaleDateString('ru-RU', {month:'short'}) };
  });
  const times = ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
  const update = (next: PreferredSlot) => { setSelected(next); onChange(next); };
  return <div className="bg-white rounded-xl border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Предпочтительное время</h3>
    <p className="text-sm text-gray-600 mb-5">Время не бронируется автоматически. Администратор подтвердит возможность посещения после получения заявки.</p>
    <div className="grid grid-cols-7 gap-1 sm:gap-2" aria-label="Выберите желаемую дату">
      {dates.map((d,i)=><button type="button" key={d.value} aria-pressed={selected.date===d.value} onClick={()=>update({date:d.value,time:''})} className={`flex min-w-0 flex-col items-center rounded-lg p-1 sm:p-2 transition-colors ${selected.date===d.value?'bg-blue-700 text-white':'bg-gray-50 text-gray-700 hover:bg-blue-50'}`}>
        <span className="text-[10px] sm:text-xs">{d.day}</span><span className="text-base sm:text-lg font-semibold">{d.label}</span><span className="text-[10px]">{i===0?'Сегодня':d.month}</span>
      </button>)}
    </div>
    {selected.date && <div className="mt-5"><p className="text-sm font-medium text-gray-700 mb-3">Желаемое время (не свободные слоты)</p><div className="grid grid-cols-3 sm:grid-cols-4 gap-2">{times.map(time=><button type="button" key={time} aria-pressed={selected.time===time} onClick={()=>update({...selected,time})} className={`rounded-lg px-2 py-2 text-sm ${selected.time===time?'bg-blue-700 text-white':'bg-gray-50 text-gray-700 hover:bg-blue-50'}`}>{time}</button>)}</div></div>}
    {selected.date && <p className="text-sm mt-4 text-blue-700" role="status">Пожелание: {selected.date}{selected.time ? `, ${selected.time}` : ', время не выбрано'}</p>}
  </div>;
}
