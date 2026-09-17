import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { findMatches } from '../src/matcher.js';

describe('Matcher', () => {
  it('should match empty pattern against any string', () => {
    const result = findMatches('Hello World', '');
    assert.strictEqual(result, true);
  });

  it('should return true when character exists in line', () => {
    const result = findMatches('Judas Priest', 'J');
    assert.strictEqual(result, true);
  });

  it('should return false when pattern is not found', () => {
    const result = findMatches('Judas Priest', 'Z');
    assert.strictEqual(result, false);
  });
});
