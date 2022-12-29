<script setup lang="ts">
import { useCommonStore } from '~/stores/common';

const router = useRouter();
const commonStore = useCommonStore();

const next = () => {
    if (!commonStore.authToken) router.push('/auth/login');
    else router.push('/main/example');
};

next();
</script>

<template>
    <div />
</template>

<route lang="yaml">
meta:
    layout: home
</route>
