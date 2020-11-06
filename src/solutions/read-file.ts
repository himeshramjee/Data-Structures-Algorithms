import path from "path";
import fs from "fs";
import readline from "readline";

export const readFromFile = (
    relativeFilePath: string, 
    fileEntries: Array<string>, 
    transform?: (line: string) => string
  ) : boolean => {
  if (!fileEntries) {
    fileEntries = new Array<string>();
  }

  // Resolve path, else it'll try and load the path relative to process.cwd
  relativeFilePath = path.resolve(__dirname, relativeFilePath);

  // Create the read interface
  const readInterface = readline.createInterface(
    fs.createReadStream(relativeFilePath), 
    process.stdout, 
    undefined, 
    false
  );

  // Read line by line
  readInterface.on("line", (line) => {
    if (transform) {
      fileEntries.push(transform(line));
    } else {
      fileEntries.push(line);
    }
    console.log(line);
  });

  return fileEntries.length > 0;
};