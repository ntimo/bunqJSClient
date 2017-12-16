export default async (file: File) => {
    const fileReader = new FileReader();

    // start loading the file as binary
    fileReader.readAsArrayBuffer(file);

    // wrap the filereader callback in a promise
    return new Promise((resolve, reject) => {
        // resolve the output onload
        fileReader.onload = () => {
            const arrayBuffer: any = new Uint8Array(fileReader.result);
            const binaryString = String.fromCharCode(null, arrayBuffer);

            resolve(binaryString);
        };
    });
};
