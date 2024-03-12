// const fs = require('fs')
// const url = require('url')
// const http = require('http')

// const myServer = http.createServer((req: any, res: any) => {//what type is req and res

//     if (req.url == "/favicon.ico") return res.end();

//     const log = `${Date.now()} : ${req.url} New Request is received \n`
//     const myUrl = url.parse(req.url,true)
//     console.log(myUrl);
    

//         fs.appendFile('./nodejs/server/log.txt', log, (err: Error, data: string) => {
//             switch (myUrl.pathname) {
//                 case '/':
//                     res.end("Hello from Server again")
//                     break;
//                 case '/about':
//                     const userName = myUrl.query.name
//                     res.end(`${userName} I am full stack dev`)
//                     break;
//                 case '/search':
//                     const search = myUrl.query.search_query
//                     res.end(`${search}`)
//                 default:
//                     res.end('404 not found!')
//             }
//         })
// });

// myServer.listen(8000, () => console.log('Server started !'));



//express

const express = require('express');
const http = require('http');

const app = express();

app.get('/', (req:any, res:any) => {
    res.send('Hello World!');
});
app.get('/about', (req:any, res:any) => {
    res.send('About us !');
});
app.get('/details', (req:any, res:any) => {
    res.send(`Hi ${req.query.name}... Your age is ${req.query.age}`);
});

app.listen(8000, () => console.log('Server started !'));