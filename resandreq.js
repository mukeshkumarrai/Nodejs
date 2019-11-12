const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {

        res.setHeader('content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My first Page</title></head>');
        res.write('<body><form action="/message" method="POST">');
        res.write('<input type="Text" name="msg" /><button type="submit" >Post</button> </form></body>');
        res.write('<br/>' + url + '')
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const postdata = Buffer.concat(body).toString();
            console.log(postdata);
            let msg = postdata.split('=')[1];
            fs.writeFileSync('reponse.txt', msg);
        });
        
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body>');
    res.write('<h1>Hello from NODE js serve</h1></body>');
    res.write('<br/>' + url + '')
    res.write('</html>');
    res.end();
});

server.listen(1000);