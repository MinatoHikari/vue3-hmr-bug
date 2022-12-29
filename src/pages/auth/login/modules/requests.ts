import { getRequest } from '~/utils/http/http';
import { useResponseHandler } from '~/utils/http/handler';

export interface LoginParams {
    username: string;
    password: string;
    verCodeKey: string;
    code: string;
}

export interface VerifyCodeResponse {
    img: string;
    verCodeKey: string;
}

export const useLoginRequests = () => {
    const { handler } = useResponseHandler();

    return {
        onLoginError: () => {},
        verifyCode: () => {
            const verifyCodeUrl = ref('');
            const verCodeKey = ref('');
            const refreshVerifyCode = () => Promise.resolve();

            return {
                verifyCodeUrl,
                verCodeKey,
                refreshVerifyCode,
            };
        },
    };
};
