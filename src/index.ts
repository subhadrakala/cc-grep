import fs from "node:fs";
import { searchFile

 } from "./searcher.js";
async function main() {

    const args = process.argv.slice(2)
    
    if (args.length < 2 ) {
        process.exitCode = 2;
        console.error("Not enough parameters passed");
        return;
    }

    const searchString = args[0];
    const fileName = args[1];

    if (searchString === undefined) {
        process.exitCode = 2;
        console.error('Please include a search string');
        return;
    }

   if (!fileName || !fs.existsSync(fileName)) {
        process.exitCode = 2;
        console.error("Please enter a valid file");
        return;
   }
        
   if (await searchFile(fileName, searchString)) {
        process.exitCode = 0;
   }
   else {
        process.exitCode = 1;
   }

}

await main();