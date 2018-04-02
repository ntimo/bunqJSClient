export type FileReaderResult = {
    binaryString: string;
    arrayBuffer: Uint8Array;
};

export default async (file: File): Promise<FileReaderResult> => {
    const fileReader = new FileReader();

    // start loading the file as binary
    fileReader.readAsArrayBuffer(file);

    // wrap the filereader callback in a promise
    return new Promise<FileReaderResult>(resolve => {
        // resolve the output onload
        fileReader.onload = () => {
            const arrayBuffer: Uint8Array = new Uint8Array(fileReader.result);
            const binaryString = String.fromCharCode.apply(null, arrayBuffer);

            resolve({
                binaryString: binaryString,
                arrayBuffer: arrayBuffer
            });
        };
    });
};
