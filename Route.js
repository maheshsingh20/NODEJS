const http=require('http');
const fs=require('fs');


const content=fs.readFileSync('./Tempalte/Index.html',"utf-8");


const server=http.createServer((req,res)=>{
    let path=req.url;
    if(path==='/'|| path.toLocaleLowerCase()=='/home'){
        res.end(content.replace('{{%CONTENT%}}','You are in home page')); 
    }else if(path==='/About'){
        res.end(content.replace('{{%CONTENT%}}','You are in About page')); 
    }else if(path==='/Contact'){
        res.end(content.replace('{{%CONTENT%}}','You are in Contact page')); 
    }else{
        res.writeHead(404);
        res.end(content.replace('{{%CONTENT%}}','Sorry No Page exist'));
    }
})




const port=3000;
const host='127.0.0.1';
server.listen(port,host,()=>{
    console.log(`Server is started at port ${port} and host ${host}`);
})