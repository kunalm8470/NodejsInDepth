const { parse, format } = require('url');

const googleUrl = `https://www.google.com/search?q=hello+world&rlz=1C1CHBF_enIN982IN982&oq=hello+world&aqs=chrome.0.0i433i512j46i340i433i512l3j0i131i433i512j0i512j46i199i465i512l2j46i512.1425j0j7&sourceid=chrome&ie=UTF-8`;

/*
    To parse the URL we use url.parse to a JavaScript object into follwing parts -
        1. scheme - http/https
        2. hostname - www.google.com
        3. path - /search
        4. queryparams - hello+world&rlz=1C1CHBF_enIN982IN982&oq=hello+world&aqs=chrome.0.0i433i512j46i340i433i512l3j0i131i433i512j0i512j46i199i465i512l2j46i512.1425j0j7&sourceid=chrome&ie=UTF-8
*/
const googleUrlParsedObj = parse(googleUrl, true);

/*
    To convert the object back to URL, we can use url.format
*/
console.log(format(googleUrlParsedObj));


/*
    To resolve URL(s) we use the WHATWG API(s)

    Parsing of Target URL is done using two ways:

    1. Preceded by forward slash("/") – It will replace whole path after domain of base URL.
    2. Not preceded by forward slash("/") – It will replace last word after forward slash("/") in path of base URL.
*/
const resolveUrl = (from, to) => {
    const resolvedUrl = new URL(to, new URL(from, 'resolve://'));

    if (resolvedUrl.protocol === 'resolve:') {
      // `from` is a relative URL.
      const { pathname, search, hash } = resolvedUrl;
      return pathname + search + hash;
    }
    
    return resolvedUrl.toString();
};

// Way 1) to address has preceding forward slash
console.log(resolveUrl('http://www.google.com/', '/one'));                  
console.log(resolveUrl('http://www.google.com/one/two/three', '/four'));
  
// Way 2) to address doesn't have preceding forward slash
console.log(resolveUrl('http://www.google.com/', 'one'));                  
console.log(resolveUrl('http://www.google.com/one/two/three', 'four'));
