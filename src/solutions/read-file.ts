import path from "path";
import fs from "fs";

export const readFromFile = (
    relativeFilePath: string, 
    fileEntries: Array<string>, 
    transform?: (line: string) => string[]
  ) : boolean => {
  if (!fileEntries) {
    fileEntries = new Array<string>();
  }

  // Resolve path, else it'll try and load the path relative to process.cwd
  relativeFilePath = path.resolve(__dirname, relativeFilePath);

  const fileContent = fs.readFileSync(relativeFilePath, 'utf-8');
  fileContent.split("\n").map((line) => {
    if (line.trimLeft().startsWith("#") || line.trimLeft().startsWith("//")) {
      return;
    }

    if (transform) {
      let transformedEntryItems = transform(line);
      
      transformedEntryItems.map((item) => {
        fileEntries.push(item);
      });
    } else {
      fileEntries.push(line);
    }
  });

  return fileEntries.length > 0;
};

export const splitEntry = (entry: string, delimeter: string = " "): string[] => {
  let transformedEntries: string[] = [];

  entry.split(delimeter).map((item) => {
    item = item.trim();
    if (item.length === 0) {
      return;
    }
    transformedEntries.push(item);
  });
  
  return transformedEntries;
}