import http from 'node:http';
import leadHandler from './lead-handler.mjs';
const port=Number(process.env.PORT||8080);
const server=http.createServer(async(req,res)=>{
 if(req.url!=='/leads'){res.writeHead(404);return res.end()}
 try {await leadHandler(req,res)}catch {if(!res.headersSent){res.writeHead(500,{'Content-Type':'application/json'});res.end('{"ok":false,"error":"Внутренняя ошибка"}')}else res.end()}
});
server.headersTimeout=10_000;
server.requestTimeout=12_000;
server.listen(port,'127.0.0.1',()=>console.log(`Lead receiver listening on localhost:${port}; requires HTTPS reverse proxy`));
