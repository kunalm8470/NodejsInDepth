const express = require('express');
const cors = require('cors');

// Create a instance of our application
const app = express();

// Parse the request body in Javascript object
app.use(express.json());

// Add the cors module to the middleware
app.use(cors());

// Custom middleware
app.use((req, res, next) => {
    console.log('Logged in custom middleware!');

    throw new Error('Threw error from custom middleware');

    next();
});

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

// Exception handling middleware
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: `Internal server error happened: ${err.message}`
    });
});

// No route matches, come to this final route
app.use('*', (req, res, next) => {
    return res.status(404).json({
        message: `Route not found: ${req.path.originalUrl}`
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
