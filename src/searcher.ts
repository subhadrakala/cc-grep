import fs from "node:fs";
import * as readline from 'readline';
import { findMatches } from "./matcher.js";

export async function searchFile(fileName: string, searchString: string) :Promise<boolean> {

const fileStream = fs.createReadStream(fileName, "utf-8");
   
   const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
   });

   let flag = false;
   for await (const line of rl) {
       if (findMatches(line, searchString)) {
           flag = true;
           console.log(line);
       }
   }
   return flag;
}