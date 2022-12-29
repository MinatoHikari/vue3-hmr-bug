import { useCommonStore } from '~/stores/common';
import { router as globalRouter, i18nGlobal } from '~/main';
import { commonRequests } from '~/requests/common/common.request';
import { resHandler } from '~/utils/http/handler';
import { globalMessage } from '~/utils/discreteApi';

export const useUserStore = defineStore('user', () => {
    const commonStore = useCommonStore();
    const instanceRouter = useRouter();

    const logoutCb = async () => {
        const router = instanceRouter ?? globalRouter;
        console.log(instanceRouter ? 'instanceRouter' : 'globalRouter');
        await commonStore.clearAuth();
        await router.push('/auth/login');
        return globalMessage.success(i18nGlobal.global.t('auth.logout_success'));
    };

    const logout = async () => {
        if (!commonStore.authToken) {
            await logoutCb();
            return;
        }
        const res = await commonRequests.logout();
        const isSuccess = await resHandler(res);
        console.log(isSuccess);
        if (isSuccess) {
            await logoutCb();
        }
    };

    return {
        logout,
        logoutCb,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
