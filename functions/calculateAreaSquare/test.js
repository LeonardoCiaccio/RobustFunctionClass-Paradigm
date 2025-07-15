
/**
 * Test suite for calculateAreaSquare (CCalculateAreaSquare paradigm)
 *
 * This script validates the correctness, robustness, and performance of the
 * calculateAreaSquare function and its underlying class. It covers:
 *   - Basic valid cases
 *   - Edge cases (invalid input, types, etc.)
 *   - Stress tests (large number of calls, random values)
 *
 * Each test prints PASSED or FAILED with details, and a summary is shown at the end.
 *
 * Usage: Run with Node.js in the same directory as FCalculateAreaSquare.js
 */

import { calculateAreaSquare as calcola } from './FCalculateAreaSquare.js';



// Simple assertion utility for reporting test results
let passed = 0, failed = 0;
function assert(desc, condition, details = '') {
    if (condition) {
        console.log(`PASSED: ${desc}`);
        passed++;
    } else {
        console.error(`FAILED: ${desc}${details ? ' | ' + details : ''}`);
        failed++;
    }
}


// --- Basic tests ---
// These should all succeed and return the correct area
let res;
res = calcola(5);
assert('Area of 5', res.isSuccess && res.result === 25, JSON.stringify(res));
res = calcola(10);
assert('Area of 10', res.isSuccess && res.result === 100, JSON.stringify(res));
res = calcola(1.5);
assert('Area of 1.5', res.isSuccess && Math.abs(res.result - 2.25) < 1e-9, JSON.stringify(res));
res = calcola(100);
assert('Area of 100', res.isSuccess && res.result === 10000, JSON.stringify(res));


// --- Edge cases ---
// All these should fail (isSuccess === false)
res = calcola(0);
assert('Area of 0 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(-5);
assert('Area of -5 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(NaN);
assert('Area of NaN (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(undefined);
assert('Area of undefined (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(null);
assert('Area of null (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola('10');
assert('Area of string "10" (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola({});
assert('Area of object (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola([]);
assert('Area of array (should fail)', !res.isSuccess, JSON.stringify(res));


// --- Stress test: many calls ---
// Checks correctness for a wide range of valid values
let stressOk = true;
for (let i = 1; i <= 1_000_000; i *= 10) {
    res = calcola(i);
    if (!res.isSuccess || res.result !== i * i) {
        stressOk = false;
        assert(`Stress test for side=${i}`, false, JSON.stringify(res));
    }
}
if (stressOk) assert('Stress test (many calls)', true);

// --- Stress test: random values ---
// Checks correctness for 1000 random positive values
let randomOk = true;
for (let i = 0; i < 1000; i++) {
    const side = Math.random() * 1000 + 0.0001; // always > 0
    res = calcola(side);
    if (!res.isSuccess || Math.abs(res.result - side * side) > 1e-9) {
        randomOk = false;
        assert(`Random test for side=${side}`, false, JSON.stringify(res));
    }
}
if (randomOk) assert('Random test (1000 random values)', true);


// --- Summary ---
console.log(`\nTest results: ${passed} PASSED, ${failed} FAILED`);