export default async (file: File) => {
    const fileReader = new FileReader();

    // start loading the file as binary
    fileReader.readAsBinaryString(file);

    // wrap the filereader callback in a promise
    return new Promise((resolve, reject) => {

        // resolve the output onload
        fileReader.onload = () => resolve(fileReader.result);

    });
};
