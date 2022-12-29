import type { NavDataOrigin } from '~/utils/router';
import { commonRequests } from '~/requests/common/common.request';
import { resHandler } from '~/utils/http/handler';
import { formatRoutes, routerMap } from '~/utils/router';
import { useAuthToken } from '~/utils/token';
import { useStorageLocale } from '~/utils/i18n';

export const useCommonStore = defineStore('common', () => {
    const { authToken } = useAuthToken();

    const { defaultLocale: locale } = useStorageLocale();

    const showMenu = ref(true);

    const formattedRoutes = ref<NavDataOrigin[]>([]);

    const currentRouteKey = ref('');

    const setAuthToken = async (token: string) => {
        authToken.value = token;
    };

    const clearAuth = async () => {
        authToken.value = '';
    };

    const reFetchRoutes = async () => {
        const response = await commonRequests.getRoutes();
        await resHandler(response, {
            onSuccess: ({ res }) => {
                routerMap.clear();
                formattedRoutes.value = formatRoutes(res);
            },
        });
    };

    return {
        authToken,
        setAuthToken,
        formattedRoutes,
        locale,
        reFetchRoutes,
        currentRouteKey,
        clearAuth,
        showMenu,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
