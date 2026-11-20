import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {site} from '../config/site';
const pages: Record<string, {title:string;description:string}> = {
  '/': {title:'Главная',description:'Услуги автомойки и детейлинга, цены и запись.'},
  '/services': {title:'Услуги',description:'Ручная мойка, химчистка, полировка и уход за автомобилем.'},
  '/pricing': {title:'Цены',description:'Информация о стоимости услуг и расчёт по запросу.'},
  '/about': {title:'О компании',description:'Информация об автомойке и её услугах.'},
  '/contacts': {title:'Контакты и заявка',description:'Адрес, график работы, телефон и заявка на услуги.'},
  '/privacy': {title:'Персональные данные',description:'Сведения об обработке персональных данных.'},
  '/consent': {title:'Согласие на обработку данных',description:'Текст согласия на обработку персональных данных.'}
};
export default function PageMeta(){
 const {pathname}=useLocation();
 useEffect(()=>{
  const meta=pages[pathname] || {title:'Страница не найдена',description:'Запрошенная страница отсутствует.'};
  document.title=`${meta.title} — ${site.brand} | ${site.seo.titleSuffix}`;
  const upsert=(selector:string, tag:string, attrs:Record<string,string>)=>{
   let el=document.head.querySelector(selector) as HTMLElement | null;
   if(!el){el=document.createElement(tag);document.head.appendChild(el)}
   Object.entries(attrs).forEach(([key,value])=>el!.setAttribute(key,value));
  };
  upsert('meta[name="description"]','meta',{name:'description',content:`${meta.description} ${site.contacts.address}`});
  upsert('meta[property="og:title"]','meta',{property:'og:title',content:document.title});
  upsert('meta[property="og:description"]','meta',{property:'og:description',content:meta.description});
  upsert('meta[property="og:type"]','meta',{property:'og:type',content:'website'});
  if(site.seo.baseUrl){
    const url=site.seo.baseUrl.replace(/\/$/,'')+pathname;
    upsert('link[rel="canonical"]','link',{rel:'canonical',href:url});
    upsert('meta[property="og:url"]','meta',{property:'og:url',content:url});
  }
  document.documentElement.style.setProperty('--brand-primary',site.color.primary);
  document.documentElement.style.setProperty('--brand-strong',site.color.strong);
 },[pathname]);
 return null;
}
