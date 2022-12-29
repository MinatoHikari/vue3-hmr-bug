<template>
    <n-space justify="center" align="center">
        <n-card w-120 mt-20>
            213dad
            <div text-center font-bold text-2xl>{{ $t('auth.login') }}</div>
            <div text-left>
                <n-form-item :label="$t('auth.username')">
                    <n-input
                        v-model:value="formData.username"
                        type="text"
                        :placeholder="$t('auth.username_placeholder')"
                        @keyup.enter="login"
                    />
                </n-form-item>
                <n-form-item :label="$t('auth.password')">
                    <n-input
                        v-model:value="formData.password"
                        type="password"
                        show-password-on="mousedown"
                        :placeholder="$t('auth.password_placeholder')"
                        @keyup.enter="login"
                    />
                </n-form-item>
                <n-form-item :label="$t('auth.code')">
                    <n-input
                        v-model:value="formData.code"
                        :placeholder="$t('auth.code_placeholder')"
                        @keyup.enter="login"
                    />
                </n-form-item>
            </div>
            <div text-center>
                <n-image
                    preview-disabled
                    cursor-pointer
                    width="150"
                    :src="verifyCodeUrl"
                    @click="refreshVerifyCode"
                />
            </div>
            <n-space justify="center">
                <n-button m-4 w-20 type="info" ghost @click="login">
                    {{ $t('button.confirm') }}
                </n-button>
            </n-space>
        </n-card>
    </n-space>
</template>

<script lang="ts" setup>
import Cookie from 'js-cookie';
import { useForm } from '~/pages/auth/login/modules/useForm';
import { useVerifyCode } from '~/pages/auth/login/modules/useVerifyCode';

const { formData, login, onLoginError } = useForm();

const { verifyCodeUrl, refreshVerifyCode } = useVerifyCode();

onLoginError(() => {
    refreshVerifyCode();
});
</script>

<style scoped></style>

<route lang="yaml">
meta:
    layout: auth
</route>
