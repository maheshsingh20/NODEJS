/*
R-Read
E-Eval
P-Print
L-Learn  




let a =20;
let b = 30;
let c = a+b;
console.log(c);


console.log("Hello World from node js");


Taking  input from terminal command line

const readline = require('readline');
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question("Enter your name: ",function(name){
    console.log("Hello "+name);
    rl.close();
})

rl.on('close',function(){
    console.log("Bye Bye");
    process.exit(0);
})





// reading a file synchronously

const fs= require('fs');
let content=fs.readFileSync('./Files/File1.txt','utf-8'); //Synchronous Read file means first it read all the content and then it will print the content, second line of execeution have to wait till first line of execution is completed
console.log(content);

let textt=`Data read from file: ${content}. \nDate created   ${new Date()}`;

let cont=fs.writeFileSync('./Files/File2.txt',textt);



// reading a file Asynchronously

let fs=require('fs');
let content=fs.readFile('./Files/File1.txt','utf-8',(err,date)=>{
    console.log(date);
});
console.log("I'm done");



*/

let fs = require('fs');

fs.readFile('./Files/File3.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading File3.txt:', err);
        return;
    }
    console.log(data);
    console.log('Executed outer loop');
    fs.readFile('./Files/File4.txt', 'utf-8', (err, data2) => {
        if (err) {
            console.error('Error reading File4.txt:', err);
            return; 
        }
        console.log(data2);
    })
});

console.log('Padh rha hoo');