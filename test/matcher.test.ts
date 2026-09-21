import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { findMatches } from '../src/matcher.js';

describe('Matcher', () => {

  it('should match empty pattern against any string', () => {
    const options = {}
    const result = findMatches('Hello World', '', options);
    assert.strictEqual(result, true);
  });

  it('should return true when character exists in line', () => {
    const options = {}
    const result = findMatches('Judas Priest', 'J', options);
    assert.strictEqual(result, true);
  });

  it('should return false when pattern is not found', () => {
    const options = {}
    const result = findMatches('Judas Priest', 'Z', options);
    assert.strictEqual(result, false);
  });

  it('should return false when character exists in line with -v option', () => {
    const options = { invert: true }
    const result = findMatches('Judas Priest', 'J', options);
    assert.strictEqual(result, false);
  });

  it('should return true when pattern is not found with -v option', () => {
    const options = { invert: true }
    const result = findMatches('Judas Priest', 'Z', options);
    assert.strictEqual(result, true);
  });

  it('should return true when pattern is found with -d option', () => {
    const options = {}
    const result = findMatches('1234', '\\d', options);
    assert.strictEqual(result, true);
  });

  it('should return true when character exists in line with -i option', () => {
    const options = { ignoreCase: true }
    const result = findMatches('Judas Priest', 'j', options);
    assert.strictEqual(result, true);
  });

});
