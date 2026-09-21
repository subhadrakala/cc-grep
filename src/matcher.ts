import type { GrepOptions } from "./types.js";

export function findMatches(line: string, searchString: string, options: GrepOptions): boolean {
    let returnValue = false;

    const regex = new RegExp(searchString)
    if (regex.test(line)) {
        returnValue = true;
    }

    if (options.invert) {
        returnValue = !returnValue;
    }
    return returnValue;
}