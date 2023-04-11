const { resolve4, resolve6 } = require('dns');

const hostname = 'google.com';

resolve4(hostname, (err, addresses) => {
    if (err) {
        console.error('Failed to lookup IPv4 address for hostname', err);
        return false;
    }

    console.log(`IPv4 of address of: ${hostname} - `, addresses);
});

resolve6(hostname, (err, addresses) => {
    if (err) {
        console.error('Failed to lookup IPv6 address for hostname', err);
        return false;
    }

    console.log(`IPv6 of address of: ${hostname} - `, addresses);
});
