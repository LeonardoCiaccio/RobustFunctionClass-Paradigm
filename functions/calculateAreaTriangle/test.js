
/**
 * Test suite for calculateAreaTriangle (CCalculateAreaTriangle paradigm)
 *
 * Questo script valida la correttezza, robustezza e performance della funzione
 * calculateAreaTriangle e della relativa classe. Copre:
 *   - Casi base validi
 *   - Edge cases (input non validi, tipi, ecc.)
 *   - Stress test (molte chiamate, valori random)
 *
 * Ogni test stampa PASSED o FAILED con dettagli, e un riepilogo finale.
 *
 * Usage: Esegui con Node.js nella stessa cartella di FCalculateAreaTriangle.js
 */

import { calculateAreaTriangle as calcola } from './FCalculateAreaTriangle.js';

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
let res;
res = calcola(10, 5);
assert('Area triangle 10,5', res.isSuccess && res.result === 25, JSON.stringify(res));
res = calcola(3, 4);
assert('Area triangle 3,4', res.isSuccess && res.result === 6, JSON.stringify(res));
res = calcola(1.5, 2);
assert('Area triangle 1.5,2', res.isSuccess && Math.abs(res.result - 1.5) < 1e-9, JSON.stringify(res));
res = calcola(100, 200);
assert('Area triangle 100,200', res.isSuccess && res.result === 10000, JSON.stringify(res));

// --- Edge cases ---
res = calcola(0, 5);
assert('Area triangle 0,5 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(5, 0);
assert('Area triangle 5,0 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(-1, 2);
assert('Area triangle -1,2 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(2, -1);
assert('Area triangle 2,-1 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(NaN, 2);
assert('Area triangle NaN,2 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(2, NaN);
assert('Area triangle 2,NaN (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(undefined, 2);
assert('Area triangle undefined,2 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(2, undefined);
assert('Area triangle 2,undefined (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(null, 2);
assert('Area triangle null,2 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(2, null);
assert('Area triangle 2,null (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola('10', 2);
assert('Area triangle string "10",2 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(2, '10');
assert('Area triangle 2,string "10" (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola({}, 2);
assert('Area triangle object,2 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(2, {});
assert('Area triangle 2,object (should fail)', !res.isSuccess, JSON.stringify(res));

// --- Stress test: many calls ---
let stressOk = true;
for (let i = 1; i <= 1_000_000; i *= 10) {
    res = calcola(i, i + 1);
    if (!res.isSuccess || res.result !== (i * (i + 1)) / 2) {
        stressOk = false;
        assert(`Stress test for base=${i}, height=${i + 1}`, false, JSON.stringify(res));
    }
}
if (stressOk) assert('Stress test (many calls)', true);

// --- Stress test: random values ---
let randomOk = true;
for (let i = 0; i < 1000; i++) {
    const base = Math.random() * 1000 + 0.0001;
    const height = Math.random() * 1000 + 0.0001;
    res = calcola(base, height);
    if (!res.isSuccess || Math.abs(res.result - (base * height) / 2) > 1e-9) {
        randomOk = false;
        assert(`Random test for base=${base}, height=${height}`, false, JSON.stringify(res));
    }
}
if (randomOk) assert('Random test (1000 random values)', true);

console.log(`\nTest results: ${passed} PASSED, ${failed} FAILED`);
