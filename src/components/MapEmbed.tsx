import {useState} from 'react';
import {site} from '../config/site';
export default function MapEmbed(){
 const [show,setShow]=useState(false);
 return <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 min-h-[250px]">
  {show ? <iframe src={site.contacts.mapEmbed} width="100%" height="250" title={`Местоположение ${site.brand} на Яндекс Картах`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{border:0}}/> : <div className="bg-blue-50 p-6 min-h-[250px] flex flex-col items-center justify-center text-center"><p className="text-gray-800 font-medium mb-2">{site.contacts.address}</p><p className="text-sm text-gray-600 mb-5">При открытии интерактивной карты браузер обращается к сервису Яндекса.</p><button type="button" onClick={()=>setShow(true)} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg">Показать карту</button></div>}
 </div>;
}
