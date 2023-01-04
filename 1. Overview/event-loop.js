console.log('Start');

setTimeout(() => {
	console.log('After Set Timeout');
}, 1500);

Promise.resolve(1)
.then((d) => {
	console.log('After Promise resolve');
});

console.log('End');