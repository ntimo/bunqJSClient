import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import FileReaderHelper, {
    FileReaderResult
} from "../Helpers/FileReaderHelper";

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

        const fileReaderResults: FileReaderResult = await FileReaderHelper(
            file
        );

        console.log(fileReaderResults);

        // do the actual call
        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/attachment-public`,
                // `http://localhost:3001`,
                fileReaderResults.binaryString,
                {
                    "Content-Type": file.type,
                    "X-Bunq-Attachment-Description": "Default description"
                },
                {
                    file: fileReaderResults.arrayBuffer
                }
            )
        );

        throw new Error(response);
        // return response.Response[0].Uuid.uuid;
    }
}
