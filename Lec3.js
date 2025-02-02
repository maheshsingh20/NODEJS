/*first converting JSON into js object then converting itno html code to render on server*/

const http = require('http');
const fs = require('fs');

const content = fs.readFileSync('./Tempalte/Index.html', "utf-8");
const productData = JSON.parse(fs.readFileSync('./Data/product.json', "utf-8"));
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
        .replace('{{%DESCRIPTION%}}',product.Description)
}).join('');

const server = http.createServer((req, res) => {
    let path = req.url.toLowerCase();

    if (path === '/' || path === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in home page'));
    } else if (path === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in About page'));
    } else if (path === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in Contact page'));
    } else if (path === '/products') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', product_array));
    } else if (path === '/api/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(productData));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'Sorry No Page exist'));
    }
});

const port = 3000;
const host = '127.0.0.1';
server.listen(port, host, () => {
    console.log(`Server is started at port ${port} and host ${host}`);
});
