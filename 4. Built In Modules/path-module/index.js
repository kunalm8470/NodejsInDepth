const path = require('path');

// path.noramalize function will evaluate all relative paths
// like . or .. and if duplicate slashes are there it will remove it.

const relativePath = 'users/test/../../image.png';
console.log('Normalized path: ', path.normalize(relativePath));

console.log('Normalized path: ', path.normalize('..//src'));

// If we want to get absolute path from relative path
// we can use path.resolve(<relativePath>)

console.log('Absolute path from relative path: ', path.resolve(`${__dirname}\\index.js`));

// To get the name of directory/folder, we can use path.dirname()
console.log('To get the name of directory/folder: ', path.dirname(__dirname));

// To get file name from a relative path, we can use path.basename()
console.log('To get file name from a relative path: ', path.basename(`${__dirname}\\index.js`));

// To get file extension from a relative path, we can use path.extname()
console.log('To get file extension from a relative path: ', path.extname(`${__dirname}\\index.js`));

// To get the OS's seperator we use path.sep
// For windows OS it will be backslash (\)
// For unix based OS's (MacOS/Linux) it will be forward slash (/)
console.log('To get the OS\'s seperator', path.sep);

// To get the path delimiter of the current OS we use path.delimiter
// For Windows it is semi colon (;)
// For unix based OS's (MacOS/Linux) it is colon (:)
// E.g: In windows OS - path: C:\\ProgramFiles\\Chrome.exe;C:\\ProgramFiles\\Firefox.exe
console.log('To get the path delimiter of the current OS: ', path.delimiter);