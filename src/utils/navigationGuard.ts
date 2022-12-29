import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useCommonStore } from '~/stores/common';
import type { NavDataOrigin } from '~/utils/router';
import { useAuthToken } from '~/utils/token';

export interface RouteNavigationGuardConfig<T> {
    onSourceFetch: () => Promise<T>;
    sourceFormatter: (source: T) => Promise<NavDataOrigin[]>;
    routerAuth: (to: RouteLocationNormalized, source: NavDataOrigin[]) => Promise<boolean>;
    onAuthFailed: (type: 'session' | 'route') => void;
    onAuthSuccess: (to: RouteLocationNormalized) => void;
    excludeRoutes?: string[];
}

export enum AuthFailedType {
    Session = 'session',
    Route = 'route',
}

const sessionAuth = async () => {
    const { authToken } = useAuthToken();
    const commonStore = useCommonStore();
    if (authToken) {
        if (!commonStore.authToken) commonStore.setAuthToken(authToken.value);
        return true;
    }
    return false;
};

export const navigationGuard = async <T>(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
    config: RouteNavigationGuardConfig<T>,
) => {
    const commonStore = useCommonStore();

    const isSessionAuthSuccess = await sessionAuth();
    let isRouterAuthSuccess = false;

    if (isSessionAuthSuccess) {
        let formattedRouteData: NavDataOrigin[] = [];
        if (commonStore.formattedRoutes.length === 0) {
            const routeData = await config.onSourceFetch().catch((err) => {
                console.log(err);
                config.onAuthFailed(AuthFailedType.Session);
            });
            if (!routeData) return;
            formattedRouteData = await config.sourceFormatter(routeData);
            commonStore.formattedRoutes = formattedRouteData;
        } else {
            formattedRouteData = commonStore.formattedRoutes;
        }
        isRouterAuthSuccess = await config.routerAuth(to, formattedRouteData);
    } else config.onAuthFailed(AuthFailedType.Session);

    if (isRouterAuthSuccess || (config.excludeRoutes && config.excludeRoutes.includes(to.path)))
        config.onAuthSuccess(to);
    else config.onAuthFailed(AuthFailedType.Route);
};
