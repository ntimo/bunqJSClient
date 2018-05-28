type ApiAdapterOptions = {
    axiosOptions?: any;
    ignoreVerification?: boolean;
    isEncrypted?: boolean;
    unauthenticated?: boolean;
    disableSigning?: boolean;
    file?: Uint8Array | boolean;
};

export default ApiAdapterOptions;
