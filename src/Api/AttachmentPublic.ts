import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import FileReaderHelper from "../Helpers/FileReaderHelper";

export default class AttachmentPublic implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    public async post(file: File, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/attachment-public",
            "POST"
        );

        const fileReaderResults: string = await FileReaderHelper(file);

        // do the actual call
        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/attachment-public`,
                fileReaderResults,
                {
                    "Content-Type": file.type,
                    "X-Bunq-Attachment-Description": "Default description"
                },
                {
                    file: fileReaderResults
                }
            )
        );

        return response;
    }
}
