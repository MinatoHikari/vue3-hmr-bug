<template>
    <n-message-provider>
        <main font-sans text="gray-700 dark:gray-200">
            <n-config-provider
                :locale="localeObj['zh-CN'].lang"
                :date-locale="localeObj['zh-CN'].date"
                :theme-overrides="theme"
            >
                <component :is="isDev ? NThemeEditor : 'div-container'">
                    <n-loading-bar-provider>
                        <n-message-provider>
                            <router-view />
                        </n-message-provider>
                    </n-loading-bar-provider>
                </component>
            </n-config-provider>
        </main>
    </n-message-provider>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { NThemeEditor, dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui';
import theme from './styles/naive-ui-theme-overrides.json';
type Locales = 'zh-CN' | 'en-US';
const localeObj = shallowRef({
    'zh-CN': {
        lang: zhCN,
        date: dateZhCN,
    },
    'en-US': {
        lang: enUS,
        date: dateEnUS,
    },
});

const isDev = import.meta.env.MODE === 'development';
</script>
