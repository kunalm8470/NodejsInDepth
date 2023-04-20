const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Add the cookieParser middleware to our app pipeline
app.use(cookieParser());

app.get('/login', (req, res, next) => {
    // Set the expiry of the cookie
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    // Add a cookie
    res.cookie('isLoggedIn', true, {
        expires: expiryDate,
        secure: false,
        httpOnly: false, // Cookie can be mutated by browser
        domain: 'localhost',
        path: '/', // Cookie will be accessible everywhere
        sameSite: 'lax'
    });

    return res.status(200).json({
        message: 'You are now logged in!'
    });
});

app.get('/get-cookies', (req, res, next) => {
    // To get the cookie use req.cookie.cookieName
    console.log(req.cookie.isLoggedIn);

    return res.status(200).json(req.cookies);
});

app.get('/logout', (req, res, next) => {
    // To delete the cookie use res.clearCookie
    res.clearCookie('isLoggedIn');

    res.status(204);

    res.end();
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
