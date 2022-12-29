<template>
    <main p="x4 y10" text="center teal-700 dark:gray-200">
        <n-result size="large" status="404" title="404">
            <template #footer>
                <n-button type="primary" m="3 t8" @click="router.back()"></n-button>
            </template>
        </n-result>
    </main>
</template>

<script setup lang="ts">
import { useCommonStore } from '~/stores/common';

const router = useRouter();
const commonStore = useCommonStore();
</script>

<route lang="yaml">
meta:
    layout: default
</route>
