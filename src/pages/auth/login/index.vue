<template>
    <n-space justify="center" align="center">
        <n-card w-120 mt-20>7777</n-card>
    </n-space>
</template>

<script lang="ts" setup>
import { useVerifyCode } from '~/pages/auth/login/modules/useVerifyCode';

const { verifyCodeUrl, refreshVerifyCode } = useVerifyCode();
</script>

<style scoped></style>

<route lang="yaml">
meta:
    layout: auth
</route>
