"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
exports.default = async (file) => {
    const fileReader = new FileReader();
    // start loading the file as binary
    fileReader.readAsArrayBuffer(file);
    // wrap the filereader callback in a promise
    return new Promise(resolve => {
        // resolve the output onload
        fileReader.onload = () => {
            // turn regular arraybuffer into uint8 array buffer
            const arrayBuffer = new Uint8Array(fileReader.result);
            // Turn arraybuffer into binary string
            const text = Utils_1.arrayBufferToString(arrayBuffer);
            resolve(text);
        };
    });
};
