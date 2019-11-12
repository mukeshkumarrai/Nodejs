const http = require('http');

 

const server = http.createServer(( req, res) => {
res.setHeader('content-type','text/html');
res.write('<html>');
res.write('<head><title>My first Page</title></head>');
res.write('<body>Responce sent by server</body>');
res.write('</html>');
res.end();
});


server.listen(3000);