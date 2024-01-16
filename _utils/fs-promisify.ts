import fs from "fs";

export const readTextFile = (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err: any, data: string) => {
            if (err) { 
                return reject(err);
            }
            return resolve(data);
        });
    });
}

export const readTextLines = async (path: string): Promise<string[]> => {
    const data = await readTextFile(path);
    return data.split("\r\n");
}

export const isDirectory = (path: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                if (err.code === "ENOENT") {
                    return resolve(false);
                }
                return reject(err);
            }
            return resolve(stats.isDirectory());
        });
    });
}


export const exists = (path: string, folder: boolean): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                if (err.code === "ENOENT") {
                    return resolve(false);
                }
                return reject(err);
            }
            if (folder && !stats.isDirectory()) {
                return resolve(false);
            }
            if (!folder && !stats.isFile()) {
                return resolve(false);
            }
            return resolve(true);
        });
    });
}

export const copyDirectory = (source: string, destination: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.mkdir(destination, (err) => {
            if (err) {
                return reject(err);
            }
            fs.readdir(source, async (err, files) => {
                if (err) {
                    return reject(err);
                }
                for (const file of files) {
                    const sourcePath = `${source}\\${file}`;
                    const isFolder = await isDirectory(sourcePath);
                    if (isFolder) {
                        await copyDirectory(sourcePath, `${destination}\\${file}`);
                        continue;
                    }
                    const destinationPath = `${destination}\\${file}`;
                    await copyFile(sourcePath, destinationPath);
                }
                return resolve();
            });
        });
    });
}

export const copyFile = (source: string, destination: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.copyFile(source, destination, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}