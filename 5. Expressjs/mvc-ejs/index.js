const express = require('express');
const path = require('path');

const app = express();

// We are setting templating engine to ejs
app.set('view engine', 'ejs');

// Our views are located in views folder
app.set('views', path.join(`${__dirname}`, 'views'));

const posts = [
    {
        id: 1,
        title: 'Post 1'
    },
    {
        id: 2,
        title: 'Post 2'
    },
    {
        id: 3,
        title: 'Post 3'
    },
    {
        id: 4,
        title: 'Post 4'
    }
];

app.get('/', (req, res, next) => {
    return res.render('landing', {
        firstName: 'Kunal',
        isAdmin: false
    });
});

app.get('/posts', (req, res, next) => {
    return res.render('posts', {
        posts: posts
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
