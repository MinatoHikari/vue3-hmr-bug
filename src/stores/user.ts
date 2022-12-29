import { useCommonStore } from '~/stores/common';
import { router as globalRouter } from '~/main';
import { commonRequests } from '~/requests/common/common.request';
import { resHandler } from '~/utils/http/handler';

export const useUserStore = defineStore('user', () => {
    const commonStore = useCommonStore();
    const instanceRouter = useRouter();

    const logoutCb = async () => {
        const router = instanceRouter ?? globalRouter;
        console.log(instanceRouter ? 'instanceRouter' : 'globalRouter');
        await commonStore.clearAuth();
        await router.push('/auth/login');
    };

    const logout = async () => {
        if (!commonStore.authToken) {
            await logoutCb();
            return;
        }
    };

    return {
        logout,
        logoutCb,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
