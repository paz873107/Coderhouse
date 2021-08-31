import fs from 'fs'
const fsPromises = fs.promises

// Use fs.readFile() method to read the file
function readFile(filePath: string) {
    return fsPromises.readFile(filePath, 'utf8')
};

// Use fs.writeFile() method to write the file
function writeFile(writefile: String, filePath: string) {
    return fsPromises.writeFile(filePath, writefile, "utf8")
};

export { readFile, writeFile }