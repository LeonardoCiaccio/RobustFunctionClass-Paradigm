
/**
 * Test suite for calculateAreaCircle (CCalculateAreaCircle paradigm)
 *
 * Questo script valida la correttezza, robustezza e performance della funzione
 * calculateAreaCircle e della relativa classe. Copre:
 *   - Casi base validi
 *   - Edge cases (input non validi, tipi, ecc.)
 *   - Stress test (molte chiamate, valori random)
 *
 * Ogni test stampa PASSED o FAILED con dettagli, e un riepilogo finale.
 *
 * Usage: Esegui con Node.js nella stessa cartella di FcalculateAreaCircle.js
 */

import { calculateAreaCircle as calcola } from './FcalculateAreaCircle.js';

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
res = calcola(1);
assert('Area circle 1', res.isSuccess && Math.abs(res.result - Math.PI) < 1e-9, JSON.stringify(res));
res = calcola(2);
assert('Area circle 2', res.isSuccess && Math.abs(res.result - 4 * Math.PI) < 1e-9, JSON.stringify(res));
res = calcola(10);
assert('Area circle 10', res.isSuccess && Math.abs(res.result - 100 * Math.PI) < 1e-9, JSON.stringify(res));
res = calcola(0.5);
assert('Area circle 0.5', res.isSuccess && Math.abs(res.result - 0.25 * Math.PI) < 1e-9, JSON.stringify(res));

// --- Edge cases ---
res = calcola(0);
assert('Area circle 0 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(-1);
assert('Area circle -1 (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(NaN);
assert('Area circle NaN (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(undefined);
assert('Area circle undefined (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola(null);
assert('Area circle null (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola('10');
assert('Area circle string "10" (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola({});
assert('Area circle object (should fail)', !res.isSuccess, JSON.stringify(res));
res = calcola([]);
assert('Area circle array (should fail)', !res.isSuccess, JSON.stringify(res));
// Funzione di confronto floating point relativa
function almostEqual(a, b, relTol = 1e-12) {
    return Math.abs(a - b) <= relTol * Math.max(Math.abs(a), Math.abs(b));
}

// --- Stress test: many calls ---
let stressOk = true;
for (let i = 1; i <= 1_000_000; i *= 10) {
    res = calcola(i);
    if (!res.isSuccess || !almostEqual(res.result, i * i * Math.PI)) {
        stressOk = false;
        assert(`Stress test for radius=${i}`, false, JSON.stringify(res));
    }
}
if (stressOk) assert('Stress test (many calls)', true);

// --- Stress test: random values ---
let randomOk = true;
for (let i = 0; i < 1000; i++) {
    const radius = Math.random() * 1000 + 0.0001;
    res = calcola(radius);
    if (!res.isSuccess || !almostEqual(res.result, radius * radius * Math.PI)) {
        randomOk = false;
        assert(`Random test for radius=${radius}`, false, JSON.stringify(res));
    }
}
if (randomOk) assert('Random test (1000 random values)', true);

console.log(`\nTest results: ${passed} PASSED, ${failed} FAILED`);
