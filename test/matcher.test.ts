import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { findMatches } from '../src/matcher.js';

describe('Matcher', () => {

  let options = {}

  it('should match empty pattern against any string', () => {
    const result = findMatches('Hello World', '', options);
    assert.strictEqual(result, true);
  });

  it('should return true when character exists in line', () => {
    const result = findMatches('Judas Priest', 'J', options);
    assert.strictEqual(result, true);
  });

  it('should return false when pattern is not found', () => {
    const result = findMatches('Judas Priest', 'Z', options);
    assert.strictEqual(result, false);
  });

  it('should return false when character exists in line with -v option', () => {
    options = { invert: true }
    const result = findMatches('Judas Priest', 'J', options);
    assert.strictEqual(result, false);
  });

  it('should return true when pattern is not found with -v option', () => {
    options = { invert: true }
    const result = findMatches('Judas Priest', 'Z', options);
    assert.strictEqual(result, true);
  });
});
