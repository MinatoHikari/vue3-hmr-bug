export const tokenScope = effectScope();

export const useAuthToken = createGlobalState(() => {
    const authToken = useStorage('authToken', ref(''), localStorage, {
        deep: true,
        writeDefaults: true,
        listenToStorageChanges: true,
    });

    return {
        authToken,
    };
});

export const initToken = () => {
    tokenScope.run(() => {
        const { authToken } = useAuthToken();

        console.log('initToken：', authToken.value);
    });
};
