# cc-grep

A TypeScript implementation of the Unix `grep` utility, built as a coding challenge.

## Usage

```bash
npx tsx src/index.ts [OPTIONS] PATTERN FILE...
```

## Options

| Flag | Description |
|------|-------------|
| `-r` | Recursively search directories |
| `-v` | Invert match — print lines that do NOT match |
| `-i` | Case-insensitive matching |

## Examples

```bash
# Basic search
npx tsx src/index.ts Nirvana rockbands.txt

# Case-insensitive
npx tsx src/index.ts -i nirvana rockbands.txt

# Invert match
npx tsx src/index.ts -v Madonna rockbands.txt

# Recursive directory search
npx tsx src/index.ts -r Nirvana .

# Regex patterns
npx tsx src/index.ts "\d" file.txt   # lines containing digits
npx tsx src/index.ts "\w" file.txt   # lines containing word characters
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | At least one match found |
| `1` | No matches found |
| `2` | Error (bad arguments, file not found, etc.) |

## Architecture

```
src/
  index.ts    — Argument parsing, flag extraction, orchestration
  searcher.ts — File streaming, directory traversal (searchFile, searchTarget, walkDirectory)
  matcher.ts  — Pattern matching logic (RegExp-based)
  types.ts    — GrepOptions interface
test/
  matcher.test.ts  — Unit tests for matcher
  searcher.test.ts — Integration tests using temporary files
```

## Running Tests

```bash
npm test
```
