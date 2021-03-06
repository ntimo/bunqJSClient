import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import CounterpartyAlias from "../Types/CounterpartyAlias";
import {
    ShareInviteBankInquiryPostOptions,
    ShareInviteBankInquiryPostShareDetail,
    ShareInviteBankInquiryPostStatus
} from "../Types/ShareInviteBankInquiry";

export default class ShareInviteBankInquiry implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async get(
        userId: number,
        accountId: number,
        shareInviteBankInquiryId: number,
        options: PaginationOptions = {
            count: 200,
            newer_id: false,
            older_id: false
        }
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/share-invite-bank-inquiry",
            "GET"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${accountId}/share-invite-bank-inquiry/${shareInviteBankInquiryId}`
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        accountId: number,
        options: PaginationOptions = {
            count: 200,
            newer_id: false,
            older_id: false
        }
    ) {
        const params: any = {};

        if (options.count !== undefined) {
            params.count = options.count;
        }
        if (options.newer_id !== false && options.newer_id !== undefined) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false && options.older_id !== undefined) {
            params.older_id = options.older_id;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/share-invite-bank-inquiry",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${accountId}/share-invite-bank-inquiry`,
                {},
                {
                    axiosOptions: {
                        params: params
                    }
                }
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteBankInquiryPostShareDetail} shareDetail
     * @param {ShareInviteBankInquiryPostStatus} status
     * @param {ShareInviteBankInquiryPostOptions} options
     * @returns {Promise<any>}
     */
    public async post(
        userId: number,
        monetaryAccountId: number,
        counterpartyAlias: CounterpartyAlias,
        shareDetail: ShareInviteBankInquiryPostShareDetail,
        status: ShareInviteBankInquiryPostStatus = "PENDING",
        options: ShareInviteBankInquiryPostOptions = {
            share_type: "STANDARD"
        }
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/share-invite-bank-inquiry",
            "POST"
        );

        const postData: any = {
            counter_user_alias: counterpartyAlias,
            share_detail: shareDetail,
            status: status
        };

        if (options.share_type) {
            postData.share_type = options.share_type;
        }
        if (options.start_date) {
            postData.start_date = options.start_date;
        }
        if (options.end_date) {
            postData.end_date = options.end_date;
        }

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-bank-inquiry`,
                postData
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteBankInquiryPostShareDetail} shareDetail
     * @param {ShareInviteBankInquiryPostStatus} status
     * @param {ShareInviteBankInquiryPostOptions} options
     * @returns {Promise<any>}
     */
    public async put(
        userId: number,
        monetaryAccountId: number,
        shareInviteBankInquiryId: number,
        counterpartyAlias: CounterpartyAlias,
        shareDetail: ShareInviteBankInquiryPostShareDetail,
        status: ShareInviteBankInquiryPostStatus = "PENDING",
        options: ShareInviteBankInquiryPostOptions = {
            share_type: "STANDARD"
        }
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/share-invite-bank-inquiry",
            "PUT"
        );

        const postData: any = {
            counter_user_alias: counterpartyAlias,
            share_detail: shareDetail,
            status: status
        };

        if (options.share_type) {
            postData.share_type = options.share_type;
        }
        if (options.start_date) {
            postData.start_date = options.start_date;
        }
        if (options.end_date) {
            postData.end_date = options.end_date;
        }

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-bank-inquiry/${shareInviteBankInquiryId}`,
                postData
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} shareInviteBankInquiryId
     * @param {ShareInviteBankInquiryPostStatus} status
     * @returns {Promise<any>}
     */
    public async putStatus(
        userId: number,
        monetaryAccountId: number,
        shareInviteBankInquiryId: number,
        status: ShareInviteBankInquiryPostStatus
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/share-invite-bank-inquiry",
            "PUT"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-bank-inquiry/${shareInviteBankInquiryId}`,
                {
                    status: status
                }
            )
        );

        return response.Response;
    }
}
