const print = (msg) => {
    console.log(msg);
};

const isModuleLoaded = () => {
    return module.loaded;
};

module.exports = {
    print,
    isModuleLoaded
};
