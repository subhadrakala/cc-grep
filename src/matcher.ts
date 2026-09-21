import type { GrepOptions } from "./types.js";

export function findMatches(line: string, searchString: string, options: GrepOptions): boolean {
    let returnValue = false;
    if (line.includes(searchString)) {
        returnValue = true;
    }
    if (options.invert) {
        returnValue = !returnValue;
    }
    return returnValue;
}