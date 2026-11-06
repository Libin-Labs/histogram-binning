import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('histogram bins include every sample', () => {
  const b = api.histogram([0, 1, 2, 3, 4], 'sqrt');
  assert.equal(
    b.reduce((n, x) => n + x.count, 0),
    5,
  );
});
test('maximum belongs to final bin', () => {
  const b = api.histogram([0, 1, 3], 'sturges');
  assert.equal(b.at(-1).count, 1);
});
test('constant data uses one bin', () => {
  assert.deepEqual(api.histogram([4, 4, 4]), [{ lower: 4, upper: 4, count: 3 }]);
});
test('Freedman-Diaconis rule returns bins', () => {
  assert.ok(
    api.histogram(
      Array.from({ length: 50 }, (_, i) => i),
      'fd',
    ).length > 0,
  );
});
test('supports one observation', () => {
  assert.deepEqual(api.histogram([7]), [{ lower: 7, upper: 7, count: 1 }]);
});
test('rejects empty samples and unknown rule', () => {
  assert.throws(() => api.histogram([]), RangeError);
  assert.throws(() => api.histogram([1, 1], 'invalid'), TypeError);
});
