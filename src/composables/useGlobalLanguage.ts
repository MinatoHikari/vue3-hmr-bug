import type { DropdownOption } from 'naive-ui';
import { useTypedI18n } from './i18n';
import type { Locales } from './i18n';
import { useCommonStore } from '~/stores/common';

export const useGlobalLanguage = () => {
    const commonStore = useCommonStore();
    const { t, locale, availableLocales } = useTypedI18n();

    const options = ref<DropdownOption[]>(
        availableLocales.map((i) => {
            return {
                key: i,
                value: i,
                label: i,
            };
        }),
    );

    const handleSelect = async (key: Locales, option: DropdownOption) => {
        locale.value = key;
        commonStore.locale = key;
    };

    return {
        t,
        options,
        handleSelect,
        locale,
    };
};
