import { useFormState } from '~/pages/auth/login/modules/useForm';
import { useLoginRequests } from '~/pages/auth/login/modules/requests';

export const useVerifyCodeState = createGlobalState(() => {
    // const { formData } = useFormState();
    const request = useLoginRequests();

    const { verifyCodeUrl, refreshVerifyCode, verCodeKey } = request.verifyCode();

    watch(verCodeKey, (value) => {
        console.log(1);
    });

    return {
        verifyCodeUrl,
        refreshVerifyCode,
    };
});

export const useVerifyCode = () => {
    const { verifyCodeUrl, refreshVerifyCode } = useVerifyCodeState();

    refreshVerifyCode();

    return {
        verifyCodeUrl,
        refreshVerifyCode,
    };
};
