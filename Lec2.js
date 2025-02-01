/*creating a webserver*/


// const http = require('http');
// const fs = require('fs');
// const server=http.createServer((req,res)=>{
//     res.end('Hello from my side to server');
//     console.log('A request is made');
// });


// server.listen(3000,'127.0.0.1',()=>{
//     console.log('Server is listening on port 3000');
// })


const http=require('http');
const fs=require('fs');
const content=fs.readFileSync('./Tempalte/Index.html',"utf-8");
const server=http.createServer((req,res)=>{
    console.log("A new request is made");
    res.end(content);
})

server.listen(3000,'127.0.0.1',()=>{
    console.log("Server strarted");
})