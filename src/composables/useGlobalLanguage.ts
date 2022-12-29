import type { DropdownOption } from 'naive-ui';
import type { Locales } from './i18n';
import { useCommonStore } from '~/stores/common';

export const useGlobalLanguage = () => {

    const options = ref<DropdownOption[]>([]);

    const handleSelect = async (key: Locales, option: DropdownOption) => {};

    return {
        options,
        handleSelect,
        locale: ref('zh-CN'),
    };
};
