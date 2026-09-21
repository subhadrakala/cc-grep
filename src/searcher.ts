import fs from "node:fs";
import * as readline from 'readline';
import { findMatches } from "./matcher.js";
import path from "node:path";
import type { GrepOptions } from "./types.js";

export async function searchFile(fileName: string, searchString: string, options: GrepOptions, writer: (line: string) => void = console.log): Promise<boolean> {

    if (!fs.statSync(fileName).isFile()) {
        console.error(`'${fileName}' is not a file`);
        return false;
    }
    const fileStream = fs.createReadStream(fileName, "utf-8");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let flag = false;
    for await (const line of rl) {
        if (findMatches(line, searchString, options)) {
            flag = true;
            writer(line);
        }
    }
    return flag;
}

export async function searchTarget(target: string, searchString: string, options: GrepOptions, writer: (line: string) => void = console.log): Promise<boolean> {
    let flag = false;
    if (fs.statSync(target).isDirectory()) {
        flag = await walkDirectory(target, searchString, options, writer);
    }
    else if (fs.statSync(target).isFile()) {
        flag = await searchFile(target, searchString, options, writer);
    }
    else {
        process.exitCode = 2;
        console.error(`'${target}' is not a file or directory`);
    }
    return flag;

}

export async function walkDirectory(directory: string, searchString: string, options: GrepOptions, writer: (line: string) => void = console.log): Promise<boolean> {

    const contents = fs.readdirSync(directory, { withFileTypes: true });

    let flag = false;
    let filePath: string;
    for (const content of contents) {
        filePath = path.join(directory, content.name);
        const result = await searchTarget(filePath, searchString, options, (line) => console.log(`${filePath}:${line}`));
        flag = flag || result;

    }
    return flag;
}