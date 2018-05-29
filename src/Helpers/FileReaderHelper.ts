import { arrayBufferToString } from "./Utils";

export default async (file: File): Promise<string> => {
    const fileReader = new FileReader();

    // start loading the file as binary
    fileReader.readAsArrayBuffer(file);

    // wrap the filereader callback in a promise
    return new Promise<string>(resolve => {
        // resolve the output onload
        fileReader.onload = () => {
            // turn regular arraybuffer into uint8 array buffer
            const arrayBuffer: Uint8Array = new Uint8Array(fileReader.result);

            // Turn arraybuffer into binary string
            const text: string = arrayBufferToString(arrayBuffer);

            resolve(text);
        };
    });
};
