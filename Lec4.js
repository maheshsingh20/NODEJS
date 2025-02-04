/*Extracting querry with URL*/

const fs = require('fs');
const http = require('http');
const url = require('url');

const content = fs.readFileSync('./Tempalte/Index.html', 'utf-8');
const productData = JSON.parse(fs.readFileSync('./Data/product.json', 'utf-8'));
const producthtml = fs.readFileSync('./Tempalte/Product.html', 'utf-8');

let product_array = productData.map((product) => {
    return producthtml.replace('{{%IMAGE%}}', product.productImage)
        .replace('{{%NAME%}}', product.name)
        .replace('{{%MODELNAME%}}', product.modelName)
        .replace('{{%MODELNO%}}', product.modelNumber)
        .replace('{{%SIZE%}}', product.size)
        .replace('{{%CAMERAS%}}', product.camera)
        .replace('{{%PRICE%}}', product.price)
        .replace('{{%COLOR%}}', product.color)
        .replace('{{%DESCRIPTION%}}', product.Description)
        .replace('{{%ID%}}', product.id);
});

const server = http.createServer((req, res) => {
    
    let {query, pathname:path} = url.parse(req.url, true);
    // console.log(az);

    if (path.toLocaleUpperCase() === '/' || path.toLocaleLowerCase() === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in home page'));
    } else if (path.toLocaleLowerCase() === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in About page'));
    } else if (path.toLocaleLowerCase() === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in Contact page'));
    } else if (path.toLocaleLowerCase() === '/products') {
        if(!query.id){
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content.replace('{{%CONTENT%}}', product_array.join('')));
        }else{
            res.end(`This is product with id = ${query.id}`);
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'Sorry, No Page exists'));
    }
});

const port = 3000;
const host = '127.0.0.1';
server.listen(port, host, () => {
    console.log(`Server started on port ${port} and hostname ${host}`);
});
