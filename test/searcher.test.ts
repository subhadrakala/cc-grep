import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { searchTarget } from '../src/searcher.js';

let tempFile: string;


describe('Search', () => {

    before(() => {
        const tempDir = path.join(os.tmpdir(), 'cc-grep-test');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        tempFile = path.join(tempDir, 'temp.txt');
        fs.writeFileSync(tempFile, 'Hello\nWorld\nTest');
    })

    after(() => {
        const tempDir = path.join(os.tmpdir(), 'cc-grep-test');
        fs.rmSync(tempDir, { recursive: true });
    })

    it('should search for a string in a file', async () => {
        const result = await searchTarget(tempFile, "Hello", () => { });
        assert.strictEqual(result, true);
    });

    it('should search for a string not in the file', async () => {
        const result = await searchTarget(tempFile, 'ABCD', () => { });
        assert.strictEqual(result, false);
    });
})