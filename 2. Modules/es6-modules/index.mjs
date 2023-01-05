import { add, subtract } from './calculator.mjs'; // Import selective (Destructuring)
import * as test from './test.mjs'; // Import everything (Wildcard)
import { sum } from './test2.mjs'; // Default module import

const result1 = add(1, 2);
const result2 = subtract(1, 2);
