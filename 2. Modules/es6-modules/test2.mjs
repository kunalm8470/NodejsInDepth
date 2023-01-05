const sum = (a, b) => {
    return a + b;
};

// Won't be exported
const someFn = () => {

};

// Exporting as default module
// will limit to export only one function or one property
export default sum;
