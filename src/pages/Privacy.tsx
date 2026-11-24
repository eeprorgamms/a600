import {Link, Navigate} from 'react-router';
import {site} from '../config/site';
export default function Privacy(){
 const l=site.legal;
 if (!l.operatorName || !l.contactEmail || !l.retentionDescription) return <Navigate to="/contacts" replace />;
 return <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-gray-800">
  <p className="text-sm text-blue-700 mb-4"><Link to="/">Главная</Link> / Документы</p>
  <h1 className="text-3xl sm:text-4xl font-bold mb-6">Политика обработки персональных данных</h1>
  <div className="space-y-6 text-base leading-relaxed">
   <p><strong>Оператор:</strong> {l.operatorName}. {l.inn && <>ИНН: {l.inn}. </>}{l.address && <>Адрес: {l.address}. </>}Контакт: {l.contactEmail}.</p>
   <div><h2 className="text-xl font-semibold mb-2">1. Цели обработки</h2><p>Рассмотрение обращения посетителя, согласование стоимости и удобного времени оказания услуг и обратная связь по запросу пользователя.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">2. Категории данных</h2><p>Имя, контактный телефон, выбранная услуга, сведения об автомобиле и текст обращения, если посетитель указал их добровольно.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">3. Правовые основания</h2><p>Определяются оператором до запуска формы применительно к конкретной обработке. Для случаев, когда требуется согласие, оно оформляется отдельно.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">4. Хранение и безопасность</h2><p>{l.retentionDescription}</p>{l.processingProvider && <p>Привлечённый обработчик: {l.processingProvider}.</p>}</div>
   <div><h2 className="text-xl font-semibold mb-2">5. Права субъекта</h2><p>По вопросам обработки, уточнения или прекращения обработки данных можно обратиться к оператору по указанному контакту.</p></div>
   <div><h2 className="text-xl font-semibold mb-2">6. Аналитика и cookies</h2><p>Необязательная аналитика отключена. При изменении состава используемых сервисов порядок обработки данных подлежит пересмотру.</p></div>
  </div>
 </section>
}
