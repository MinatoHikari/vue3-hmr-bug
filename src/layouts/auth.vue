<template>
    <div p="x-4 y-4">
        <n-grid :cols="1">
            <n-gi>
                <n-space justify="space-between">
                    <div>
                        <n-button
                            v-if="isDev"
                            quaternary
                            type="primary"
                            @click="$router.push('/docs')"
                        >
                            {{ $t('page.document.document') }}
                        </n-button>
                    </div>
                    <div>
                        <n-dropdown
                            placement="bottom-start"
                            trigger="click"
                            size="small"
                            :options="options"
                            @select="handleSelect"
                        >
                            <n-button quaternary>
                                <n-icon size="24">
                                    <i-carbon-language />
                                </n-icon>
                                <n-text ml-2>{{ locale }}</n-text>
                            </n-button>
                        </n-dropdown>
                    </div>
                </n-space>
            </n-gi>
        </n-grid>
        <div>
            <div px-4 py-10 text-gray-700 dark:text-gray-200 h-full>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { options, handleSelect, locale } = useGlobalLanguage();

const isDev = import.meta.env.MODE === 'development';
</script>
