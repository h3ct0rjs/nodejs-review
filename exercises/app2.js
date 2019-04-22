const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url==='/'){
        console.log('You hit the root site ');
        res.write(req.url);
    }
    else if(req.url ==='/hector'){
        console.log('something');
        res.write(JSON.stringify([1,2,3]));
        res.end()
    }
    else{
        console.log(req.url);
        res.write(req.url);
    }
});

server.listen(3000);
console.log('Listening on Port 3000...');