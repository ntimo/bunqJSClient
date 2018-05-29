type ApiAdapterOptions = {
    axiosOptions?: any;
    ignoreVerification?: boolean;
    isEncrypted?: boolean;
    unauthenticated?: boolean;
    disableSigning?: boolean;
    file?: string | boolean;
};

export default ApiAdapterOptions;
