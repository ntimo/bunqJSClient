"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileReaderHelper_1 = require("../Helpers/FileReaderHelper");
class AttachmentPublic {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    async post(file, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/attachment-public", "POST");
        const fileReaderResults = await FileReaderHelper_1.default(file);
        console.log(fileReaderResults);
        // do the actual call
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/attachment-public`, 
        // `http://localhost:3001`,
        fileReaderResults.binaryString, {
            "Content-Type": file.type,
            "X-Bunq-Attachment-Description": "Default description"
        }, {
            file: fileReaderResults.arrayBuffer
        }));
        throw new Error(response);
        // return response.Response[0].Uuid.uuid;
    }
}
exports.default = AttachmentPublic;
