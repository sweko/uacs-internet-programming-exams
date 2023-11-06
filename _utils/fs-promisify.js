"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFile = exports.copyDirectory = exports.exists = exports.readTextLines = exports.readTextFile = void 0;
const fs_1 = __importDefault(require("fs"));
const readTextFile = (path) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(path, "utf8", (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};
exports.readTextFile = readTextFile;
const readTextLines = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, exports.readTextFile)(path);
    return data.split("\n");
});
exports.readTextLines = readTextLines;
const exists = (path, folder) => {
    return new Promise((resolve, reject) => {
        fs_1.default.stat(path, (err, stats) => {
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
};
exports.exists = exists;
const copyDirectory = (source, destination) => {
    return new Promise((resolve, reject) => {
        fs_1.default.mkdir(destination, (err) => {
            if (err) {
                return reject(err);
            }
            fs_1.default.readdir(source, (err, files) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return reject(err);
                }
                for (const file of files) {
                    const sourcePath = `${source}\\${file}`;
                    const destinationPath = `${destination}\\${file}`;
                    // no support for recursive copy
                    yield (0, exports.copyFile)(sourcePath, destinationPath);
                }
                return resolve();
            }));
        });
    });
};
exports.copyDirectory = copyDirectory;
const copyFile = (source, destination) => {
    return new Promise((resolve, reject) => {
        fs_1.default.copyFile(source, destination, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
};
exports.copyFile = copyFile;
