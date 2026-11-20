import {Link} from 'react-router-dom';
import {site} from '../config/site';
export default function Privacy(){
 const l=site.legal;
 return <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-gray-800">
  <p className="text-sm text-blue-700 mb-4"><Link to="/">Главная</Link> / Документы</p>
  <h1 className="text-3xl sm:text-4xl font-bold mb-6">Политика обработки персональных данных</h1>
  {!l.operatorName || !l.contactEmail || !l.retentionDescription ? <div role="alert" className="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-8"><strong>Демонстрационный документ — не готов к публикации.</strong><p className="mt-2">До сбора заявок необходимо установить оператора, цели, основания и сроки обработки, контакт, инфраструктуру и другие сведения по фактическим процессам компании.</p></div>:null}
  <div className="space-y-6 text-base leading-relaxed">
   <p><strong>Оператор:</strong> {l.operatorName || '[указать наименование/ФИО оператора]'}; <strong>ИНН:</strong> {l.inn || '[при наличии]'}; <strong>адрес:</strong> {l.address || '[указать адрес]'}; <strong>контакт:</strong> {l.contactEmail || '[указать email]' }.</p>
   <div><h2 className="text-xl font-semibold mb-2">1. Цели обработки</h2><p>Рассмотрение обращения посетителя, согласование стоимости и удобного времени оказания услуг и обратная связь по запросу пользователя.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">2. Категории данных</h2><p>Имя, контактный телефон, выбранная услуга, сведения об автомобиле и текст обращения, если посетитель указал их добровольно.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">3. Правовые основания</h2><p>Определяются оператором до запуска формы применительно к конкретной обработке. Для случаев, когда требуется согласие, оно оформляется отдельно.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">4. Хранение и безопасность</h2><p>{l.retentionDescription || '[Указать сроки хранения, основания прекращения обработки и порядок уничтожения данных.]'}</p><p>Привлечённый обработчик: {l.processingProvider || '[указать, если есть]'}. Приём заявок и базы данных должны размещаться с учётом требований законодательства РФ.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">5. Права субъекта</h2><p>По вопросам обработки, уточнения или прекращения обработки данных можно обратиться к оператору по указанному контакту.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">6. Аналитика и cookies</h2><p>В стандартной версии сайта необязательная аналитика не включена. Техническое использование данных браузера ограничено работой интерфейса; при подключении дополнительных средств необходимо обновить этот раздел и настроить применимые механизмы согласия.</p></div>
  </div>
 </section>
}
