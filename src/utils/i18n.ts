import { createI18n } from 'vue-i18n';
import type { App, Ref } from 'vue';

import type { Locales } from '~/composables/i18n';
import { commonRequests } from '~/requests/common/common.request';
import { resHandler } from '~/utils/http/handler';
import { useCommonStore } from '~/stores/common';

export const useStorageLocale = createGlobalState(() => {
    const defaultLocale = useStorage('locale', ref<Locales>('zh-CN'), localStorage, {
        deep: true,
        writeDefaults: true,
        listenToStorageChanges: true,
    }) as Ref<Locales>;

    return {
        defaultLocale,
    };
});

export const installI18n = ({ app }: { app: App<Element> }) => {
    const { defaultLocale } = useStorageLocale();

    console.log('defaultLocale:', defaultLocale.value);

    const i18n = createI18n({
        legacy: false,
        locale: unref(defaultLocale),
        messages: {},
        allowComposition: true,
    });

    app.use(i18n);

    return i18n;
};

const i18nScope = effectScope();

export const initI18nScope = () => {
    i18nScope.run(() => {
        const { defaultLocale: locale } = useStorageLocale();
        const store = useCommonStore();

        watch(locale, async (val) => {
            store.locale = val;

            if (store.authToken) {
                await store.reFetchRoutes();
            }
        });
    });
};
