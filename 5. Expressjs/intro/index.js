const express = require('express');

// Create a instance of our application
const app = express();

// Parse the request body in Javascript object
app.use(express.json());

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Hello world from Express.js'
    });
});

app.get('/books/:bookId', (req, res, next) => {
    console.log(req.params.bookId);
    console.log(req.query.author);

    res.status(200);

    res.end();
});

app.post('/books', (req, res, next) => {
    console.log(req.body);

    res.status(201);

    res.end();
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
