const fs = require('fs');
const http = require('http');
const url = require('url');

const content = fs.readFileSync('./Template/Index.html', 'utf-8');
const productData = JSON.parse(fs.readFileSync('./Data/product.json', 'utf-8'));
const producthtml = fs.readFileSync('./Template/Product.html', 'utf-8');
const productdetail = fs.readFileSync('./Template/pdetail.html', 'utf-8');

function replaceHtml(template, product) {
    return template.replace('{{%IMAGE%}}', product.productImage)
        .replace('{{%NAME%}}', product.name)
        .replace('{{%MODELNAME%}}', product.modelName)
        .replace('{{%MODELNO%}}', product.modelNumber)
        .replace('{{%SIZE%}}', product.size)
        .replace('{{%CAMERAS%}}', product.camera)
        .replace('{{%PRICE%}}', product.price)
        .replace('{{%COLOR%}}', product.color)
        .replace('{{%DESCRIPTION%}}', product.Description)
        .replace('{{%ID%}}', product.id)
        .replace('{{%ROM%}}', product.ROM);
}

const server = http.createServer((req, res) => {
    let { query, pathname: path } = url.parse(req.url, true);

    if (path.toLowerCase() === '/' || path.toLowerCase() === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in home page'));
    } else if (path.toLowerCase() === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in About page'));
    } else if (path.toLowerCase() === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content.replace('{{%CONTENT%}}', 'You are in Contact page'));
    } else if (path.toLowerCase() === '/products') {
        if (!query.id) {
            let productArray = productData.map((product) => replaceHtml(producthtml, product));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content.replace('{{%CONTENT%}}', productArray.join('')));
        } else {
            let prod = productData.find((product) => product.id == query.id); // Find product by ID
            if (prod) {
                let prdDetail = replaceHtml(productdetail, prod);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content.replace('{{%CONTENT%}}', prdDetail));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content.replace('{{%CONTENT%}}', 'Product not found'));
            }
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
