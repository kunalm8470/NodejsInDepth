const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};

const divide = (a, b) => {
    return a / b;
};

global.PI = 3.14159;

console.log('Module id', module.id);

module.exports = {
    add,
    subtract,
    multiply,
    divide
};
