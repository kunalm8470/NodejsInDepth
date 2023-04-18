const express = require('express');
const path = require('path');

const app = express();

// Expose the entire public folder to the Internet
app.use('/staticAssets', express.static(path.join(__dirname, 'public')));

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
