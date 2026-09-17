export function findMatches(line: string, searchString: string) :boolean {
    if (line.includes(searchString)) {
       return true;
    }
    
    return false;
}