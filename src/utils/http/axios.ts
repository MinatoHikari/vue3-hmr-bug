import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { ComputedRef } from 'vue';
import { httpErrorHandler } from '~/utils/http/handler';
import { i18nGlobal } from '~/main';
import { useAuthToken } from '~/utils/token';

export const initAxios = () => {
    const { authToken } = useAuthToken();
    axios.interceptors.response.use(
        (cnf) => {
            return cnf;
        },
        (error) => {
            httpErrorHandler(error);
            return error;
        },
    );
    axios.interceptors.request.use((cnf) => {
        if (!cnf.headers) cnf.headers = {};
        if (!cnf.headers['Accept-Language'])
            cnf.headers['Accept-Language'] = i18nGlobal.global.locale.value as unknown as string;
        if (!cnf.headers.Authorization && cnf.headers.Authorization !== null && authToken.value)
            cnf.headers.Authorization = `Bearer ${authToken.value}`;
        return cnf;
    });
};

export const setToken = async (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setLanguage = async (locale: string) => {
    axios.defaults.headers.common['Accept-Language'] = locale;
};
