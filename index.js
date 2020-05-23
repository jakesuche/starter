const fs = require('fs')
const http = require('http')
const url = require('url')



const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
     output = output.replace(/{%IMAGE%}/g, product.image)
     output = output.replace(/{%PRICE%}/g, product.price)
     output = output.replace(/{%FROM%}/g, product.from)
     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
     output = output.replace(/{%QUANTITY%}/g, product.quantity)
     output = output.replace(/{%DESCRIPTION%}/g, product.description)
     output = output.replace(/{%ID%}/g, product.id)
    
     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic') 
     return output;
} 

const replace2 = (temp, product) => {
    let output2 = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
        output2 = temp.replace(/{%IMAGE%}/g, product.image)
        output2 = temp.replace(/{%FROM%}/g, product.from)
        output2 = temp.replace(/{%QUANTITY%}/g, product.quantity)
        output2 = temp.replace(/{%PRODUCTNAME%}/g, product.nutrients)
        output2 = temp.replace(/{%PIRCE%}/g, product.price)
        output2 = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
        
}



// start

// const textIn = fs.readFileSync('./txt/input.txt','utf-8')

// console.log(textIn)

// const textOut = `This is what we know about the avodocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('writen')


// fs.readFile('./txt/start.txt', 'utf-8', function(err, data1){
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', function(err, data2){ 
//         console.log(data2)
//         fs.readFile('./txt/append.txt', 'utf-8', function(err,data3){
//             console.log(`${data1}: ${data3}`);
//             fs.writeFile('./txt/written.txt', `${data1}\n ${data3}`, function(err){
//                 console.log('file written')
//                 fs.readFile('./txt/written.txt', 'utf-8', function(err,data4){
//                     console.log('data 4'+ data4)
//                 }) 
//             } )
//         })
//     }) 
     
// });
// console.log('file read')

// stop

const templateOverview =fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const templateCard =fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const templateProduct =fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')

// data array has been passed as an object
// we are to loop through the array .. for each of them
// repalce the the place holder in the template with the actual data from the product argumented 
const dataObj = JSON.parse(data)


const server = http.createServer(function(req, res){
    const path = req.url
    console.log(url.parse(path, true))
    const {pathname, query} = url.parse(path, true)


    if(pathname === '/' || pathname === '/overview'){

        // dataObj was looped tru with .map() function 
        //.map() accept a callback function which gets an argument the current element
        // of the current loop
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join(' ')
        const output = templateOverview.replace('{%PRODUCT_CARD%}',cardsHtml)
        // console.log(cardsHtml)
        console.log(query)
        res.end(output)
    }
    else if (pathname === '/product'){
        
        
        const htmls = dataObj.map(el => replace2(templateProduct, el)).join('')
        res.end(output)

    }
    else if(pathname === '/api'){
       res.end(data)
    //    console.log(data)
       

    }
    else{
        res.writeHead(404,{
            'content-type':'text/html',
            'my-header':'this is my header'
        })
        res.end('<h1 style="background-color:red;">page not found<h1>')
    }
   
   
});



server.listen(2020, 'localhost', function(){
    console.log('app running on localhost:'+ 2020)
})

