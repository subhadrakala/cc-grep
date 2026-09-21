import { searchTarget } from "./searcher.js";
import type { GrepOptions } from "./types.js";

async function main() {

    const args = process.argv.slice(2)

    if (args.length < 2) {
        process.exitCode = 2;
        console.error("Not enough parameters passed");
        return;
    }

    const flags = args.filter(arg => arg.startsWith('-'));
    const rest = args.filter(arg => !arg.startsWith('-'));

    const searchString = rest[0];
    const targets = rest.slice(1);

    if (targets.length == 0) {
        process.exitCode = 2;
        console.error("No search target provided");
        return;
    }

    if (searchString === undefined) {
        process.exitCode = 2;
        console.error('Please include a search string');
        return;
    }

    let flagAnyMatched = false;
    const options: GrepOptions = { invert: flags.includes('-v'), ignoreCase: flags.includes('-i') };
    for (let target of targets) {
        if (await searchTarget(target, searchString, options)) {
            flagAnyMatched = true;
        }
    }

    if (flagAnyMatched) {
        process.exitCode = 0;
    }
    else {
        process.exitCode = 1;
    }
}

await main();