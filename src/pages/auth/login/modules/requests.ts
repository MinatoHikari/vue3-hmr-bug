import { useVDR } from 'v-demi-request';
import { baseUrl, getRequest, useApis } from '~/utils/http/http';
import { useResponseHandler } from '~/utils/http/handler';
import { useCommonStore } from '~/stores/common';

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
    const { postRequest } = useApis();
    const { handler } = useResponseHandler();
    const commonStore = useCommonStore();
    const router = useRouter();
    const errHook = createEventHook();
    const { t } = useTypedI18n();

    return {
        login: async (data: LoginParams) => {
            const result = await postRequest<LoginParams, string>(
                `${baseUrl}`,
                { ...data },
                {
                    headers: {
                        Authorization: null,
                    },
                },
            );
            return await handler(result, {
                onSuccess: ({ res }) => {
                    commonStore.setAuthToken(res);
                    router.push('/main/example');
                },
                onError: () => {
                    errHook.trigger({});
                },
                successMessage: t('request.auth.login_success'),
            });
        },
        onLoginError: errHook.on,
        verifyCode: () => {
            const verifyCodeUrl = ref('');
            const verCodeKey = ref('');
            const { onSuccess, send: refreshVerifyCode } = useVDR(
                `${baseUrl}`,
                (url: string) => getRequest<undefined, VerifyCodeResponse>(url),
                {
                    immediate: false,
                },
            );
            onSuccess((param) => {
                handler(param, {
                    onSuccess: ({ res }) => {
                        verifyCodeUrl.value = `data:image/jpg;base64,${res.img}`;
                        verCodeKey.value = res.verCodeKey ?? '';
                    },
                });
            });
            return {
                verifyCodeUrl,
                verCodeKey,
                refreshVerifyCode,
            };
        },
    };
};
