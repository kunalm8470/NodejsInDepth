const { stringify, parse } = require('querystring');

/*
    Given we have a JavaScript object,
    We can stringify it into query params using querystring.stringify
    
*/
const queryParamsObj = {
    page: 1,
    limit: 10,
    role: [
        'Admin',
        'Manager',
        'Tech Support'
    ]
};

const queryParams = stringify(queryParamsObj);

console.log('Query param string', queryParams);

/*
    Given we have a query param string `?page=1&limit=10&role=Admin&role=Manager&role=Tech%20Support`
    we can parse it into a JavaScript object using querystring.parse
*/
const parsedQueryParams = parse(queryParams);

debugger;