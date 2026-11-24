/**
 * Deploy on a Russian-hosted Node runtime behind HTTPS reverse proxy, not on Vercel.
 * Sends to a separately-configured Russian-hosted lead receiver; disabled until configured.
 * No customer data is persisted by this function. A distributed rate limit is required
 * for robust production anti-spam; the instance Map below is only a second line of defence.
 */
const recent = new Map();
const text = (v, max) => typeof v === 'string' ? v.trim().slice(0,max) : '';
function json(res, status, data){res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.end(JSON.stringify(data));}
export default async function handler(req, res){
 res.setHeader('Allow','POST');
 res.setHeader('Access-Control-Allow-Origin',process.env.SITE_ORIGIN||'');
 res.setHeader('Vary','Origin');
 res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
 res.setHeader('Access-Control-Allow-Headers','Content-Type');
 if(req.method==='OPTIONS'){
  if(req.headers.origin!==process.env.SITE_ORIGIN)return json(res,403,{ok:false,error:'Источник не разрешён'});
  res.statusCode=204;return res.end();
 }
 if(req.method!=='POST')return json(res,405,{ok:false,error:'Метод не поддерживается'});
 if(req.headers.origin!==process.env.SITE_ORIGIN)return json(res,403,{ok:false,error:'Недопустимый источник'});
 const target=process.env.LEAD_WEBHOOK_URL;
 const allowedOrigin=process.env.SITE_ORIGIN;
 if(!target || !allowedOrigin || !process.env.LEAD_WEBHOOK_SECRET)return json(res,503,{ok:false,error:'Приём заявок не настроен'});
 if(req.headers.origin!==allowedOrigin)return json(res,403,{ok:false,error:'Недопустимый источник'});
 if(!String(req.headers['content-type']||'').toLowerCase().startsWith('application/json'))return json(res,415,{ok:false,error:'Ожидается JSON'});
 const length=Number(req.headers['content-length']||0);
 if(!Number.isFinite(length) || length>4096)return json(res,413,{ok:false,error:'Слишком большой запрос'});
 let data=req.body;
 if(data===undefined){
  const chunks=[];let length=0;
  for await(const chunk of req){length+=chunk.length;if(length>4096)return json(res,413,{ok:false,error:'Слишком большой запрос'});chunks.push(chunk)}
  try{data=JSON.parse(Buffer.concat(chunks).toString('utf-8'))}catch{return json(res,400,{ok:false,error:'Неверный JSON'})}
 }else if(typeof data==='string'){try{data=JSON.parse(data)}catch{return json(res,400,{ok:false,error:'Неверный JSON'})}}
 if(!data || typeof data!=='object' || Array.isArray(data) || JSON.stringify(data).length>4096)return json(res,400,{ok:false,error:'Неверные данные'});
 if(data.website)return json(res,200,{ok:true}); // Honeypot: automated spam is never delivered.
 const name=text(data.name,60),phone=text(data.phone,25),service=text(data.service,150),car=text(data.car,80),message=text(data.message,1000);
 const preferredDate=text(data.preferredDate,10),preferredTime=text(data.preferredTime,5);
 if(name.length<2 || !/^7\d{10}$/.test(phone.replace(/\D/g,'')) || data.consent!==true)return json(res,400,{ok:false,error:'Проверьте имя, телефон и согласие'});
 if(preferredDate && !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate))return json(res,400,{ok:false,error:'Неверная дата'});
 if(preferredTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(preferredTime))return json(res,400,{ok:false,error:'Неверное время'});
 if(!Number.isFinite(data.startedAt)||Date.now()-data.startedAt<2500||Date.now()-data.startedAt>86_400_000)return json(res,400,{ok:false,error:'Обновите страницу и повторите'});
 // Forwarded headers are trusted only from an explicitly configured reverse proxy.
 const remoteIp=String(req.socket?.remoteAddress||'unknown');
 const trustedProxies=new Set(String(process.env.TRUSTED_PROXY_IPS||'').split(',').map(value=>value.trim()).filter(Boolean));
 const forwardedIp=String(req.headers['x-forwarded-for']||'').split(',')[0].trim();
 const ip=trustedProxies.has(remoteIp) && /^[0-9a-fA-F:.]+$/.test(forwardedIp) ? forwardedIp : remoteIp;
 const now=Date.now();for(const [key,time] of recent){if(now-time>60_000)recent.delete(key)}
 if(recent.has(ip) || recent.size>=10_000)return json(res,429,{ok:false,error:'Повторите через минуту'});
 recent.set(ip,now);
 try{
  const url=new URL(target);
  if(url.protocol!=='https:'||url.username||url.password||!url.hostname)throw new Error('Webhook destination invalid');
  const resp=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.LEAD_WEBHOOK_SECRET}`},body:JSON.stringify({name,phone,service,car,message,preferredDate,preferredTime,receivedAt:new Date().toISOString()}),signal:AbortSignal.timeout(7000)});
  if(!resp.ok)throw new Error('Lead receiver refused');
  return json(res,200,{ok:true});
 }catch{recent.delete(ip);return json(res,502,{ok:false,error:'Доставка заявки недоступна'});}
}
