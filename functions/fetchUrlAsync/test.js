
/**
 * Test suite for fetchUrlAsync (CFetchUrlAsync paradigm)
 *
 * Questo script valida la correttezza, robustezza e performance della funzione
 * fetchUrlAsync e della relativa classe. Copre:
 *   - Casi base validi
 *   - Errori HTTP (status diversi da 200)
 *   - Edge cases (input non validi)
 *   - Stress test (molte chiamate parallele)
 *
 * Ogni test stampa PASSED o FAILED con dettagli, e un riepilogo finale.
 *
 * Usage: Esegui con Node.js nella stessa cartella di FfetchUrlAsync.js
 */

import { fetchUrlAsync } from './FfetchUrlAsync.js';

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

async function runTests() {
    // --- Basic tests ---
    let res;
    res = await fetchUrlAsync('https://www.example.com');
    assert('Fetch example.com (should succeed)', res.isSuccess && typeof res.result === 'string' && res.result.length > 0, JSON.stringify(res));

    // --- HTTP error tests ---
    res = await fetchUrlAsync('https://httpstat.us/404');
    assert(
        'Fetch 404 (should fail)',
        !res.isSuccess && (res.message.includes('404') || res.message.includes('fetch failed')),
        JSON.stringify(res)
    );
    res = await fetchUrlAsync('https://httpstat.us/500');
    assert(
        'Fetch 500 (should fail)',
        !res.isSuccess && (res.message.includes('500') || res.message.includes('fetch failed')),
        JSON.stringify(res)
    );

    // --- Edge cases ---
    res = await fetchUrlAsync('notaurl');
    assert('Invalid URL (should fail)', !res.isSuccess, JSON.stringify(res));
    res = await fetchUrlAsync('');
    assert('Empty URL (should fail)', !res.isSuccess, JSON.stringify(res));
    res = await fetchUrlAsync(null);
    assert('Null URL (should fail)', !res.isSuccess, JSON.stringify(res));
    res = await fetchUrlAsync(undefined);
    assert('Undefined URL (should fail)', !res.isSuccess, JSON.stringify(res));
    res = await fetchUrlAsync({});
    assert('Object as URL (should fail)', !res.isSuccess, JSON.stringify(res));

    // --- Stress test: many parallel calls (only to a valid URL) ---
    const urls = Array(20).fill('https://www.example.com');
    const results = await Promise.all(urls.map(u => fetchUrlAsync(u)));
    const allOk = results.every(r => r.isSuccess && typeof r.result === 'string' && r.result.length > 0);
    assert('Stress test (20 parallel fetches)', allOk);

    // --- Stress test: many sequential calls (only to a valid URL) ---
    let seqOk = true;
    for (let i = 0; i < 10; i++) {
        res = await fetchUrlAsync('https://www.example.com');
        if (!res.isSuccess || typeof res.result !== 'string' || res.result.length === 0) {
            seqOk = false;
            assert(`Sequential fetch #${i + 1}`, false, JSON.stringify(res));
        }
    }
    if (seqOk) assert('Stress test (10 sequential fetches)', true);

    // --- Summary ---
    console.log(`\nTest results: ${passed} PASSED, ${failed} FAILED`);
}

runTests();
