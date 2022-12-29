import { useLoginRequests } from '~/pages/auth/login/modules/requests';
export const useFormState = createGlobalState(() => {
    const { formData, v$, resetForm } = useFormCreator({
        defaultData: {
            password: 'Chumi_123',
            username: 'admin',
            code: '',
            verCodeKey: '',
        },
        scope: Symbol('login-form'),
        rules: {},
    });

    return {
        v$,
        formData,
        resetForm,
    };
});

export const useForm = () => {
    const request = useLoginRequests();

    const { v$, formData, resetForm } = useFormState();

    const login = async () => {
        v$.value.$touch();
        if (!v$.value.$error) {
            await request.login({
                ...formData.value,
            });
        }
    };

    resetForm();

    return {
        formData,
        login: useThrottleFn(login, 1000),
        onLoginError: request.onLoginError,
    };
};
