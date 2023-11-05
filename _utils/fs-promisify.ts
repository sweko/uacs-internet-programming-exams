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
    return data.split("\n");
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