const { createServer } = require('https');
const fs = require('fs');

const posts = [
    {
        id: 1,
        name: 'John Doe',
        age: 10
    },
    {
        id: 2,
        name: 'Jane Doe',
        age: 10
    }
];

const options = {
    key: fs.readFileSync(`${__dirname}\\server.key`),
    cert: fs.readFileSync(`${__dirname}\\server.crt`)
};

const server = createServer(options, (req, res) => {
    const { url, method } = req;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write(`
            <!DOCTYPE html>
            <html>
            <head>
            <title>Page Title</title>
            </head>
            <body>
            
            <h1>Root page</h1>
            
            </body>
            </html>
        `);

        res.end();
    }

    else if (url === '/posts' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.write(JSON.stringify(posts, null, 4));

        res.end();
    }

    else if (url === '/posts' && method === 'POST') {
        
        let requestBody = '';
        req.on('data', (chunk) => {
            requestBody += chunk.toString();
        });

        req.on('end', () => {
            const requestObj = JSON.parse(requestBody);

            posts.push(requestObj);

            res.writeHead(201, { 'Content-Type': 'application/json' });

            res.write(JSON.stringify(requestObj, null, 4));
    
            res.end();
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });

        res.write(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>Page Title</title>
        </head>
        <body>
        
        <h1 style="color: red;">Not found page</h1>
        
        </body>
        </html>
        `);

        res.end();
    }
});

const port = 3000;

// 127.0.0.1 -> IPv4
// ::1 -> IPv6
server.listen(port, () => {
    console.log(`Server started listening on port: ${port}`);
});
