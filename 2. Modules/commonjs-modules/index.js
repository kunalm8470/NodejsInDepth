const { add: addition, subtract: subtraction, multiply } = require('./calculator');
const test = require('./test');

const result1 = addition(1, 2);
const result2 = subtraction(1, 2);
const result3 = multiply(1, 2);

global.console.log(global.PI);

/*
    Global module is the counterpart for window
    in Node.js
*/
console.log('Global object', global);

/*
    __filename and __dirname doesn't work in REPL mode
    but only works in the modules
*/
console.log('Absolute file path for the current executing module', __filename);
console.log('Directory name for the current executing module', __dirname);

/*
    . -> dot is the current executing module
    and all the other modules will have absolute path
*/
console.log('Module id', module.id);

// Same as __filename
console.log('Absolute filename of the module', module.filename);

console.log('To check if a module has been loaded completely', test.isModuleLoaded());

/*
    To see the parent of this module
*/
console.log('To check the parents of the current executing module', module.parent);

/*
    To see the children of this module, will return
    list of currently imported modules as an array
*/
console.log('To check the children of the current executing module', module.children);
