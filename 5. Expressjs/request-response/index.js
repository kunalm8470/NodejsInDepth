const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.locals.commonText = 'Hello world';

    return next();
});

app.get('/books/:bookid', (req, res, next) => {
    console.log('Reference to express app via request object: ', req.app);
    console.log('Base url of the route: ', req.baseUrl);
    console.log('Is request stale ?', req.stale);
    console.log('Is request fresh ?', req.fresh);

    console.log('Read hostname of the current server by reading the HOST header: ', req.hostname);
    console.log('Get IP address of the client: ', req.ip);
    console.log('Read IP addresses from X-Forwarded-For header: ', req.ips);

    console.log('Original request url of the route: ', req.originalUrl);
    console.log('Route params: ', req.params);
    console.log('Query params: ', req.query);

    console.log('Current route: ', req.path);
    console.log('Scheme of the current api: ', req.protocol);

    console.log('Is SSL enabled ?', req.secure);
    console.log('Did request came from any Javascript library ($.ajax, fetch or XMLHttpRequest) ?', req.xhr);

    console.log('Read any header value: ', req.get('Accept'));

    console.log('_________________________________________________________');

    console.log('Reference to express app via response object: ', res.app);

    console.log('Read the data from res.locals: ', res.locals);

    res.status(200);

    res.end();
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
