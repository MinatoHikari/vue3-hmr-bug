import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { useLoadingBar } from 'naive-ui';
import type { LoadingBarApiInjection } from 'naive-ui/es/loading-bar/src/LoadingBarProvider';
import { getForm } from '~/utils/format';

export const baseUrl = '/api';

export interface LangParams {
    lang: string;
}

type RequestConfig = AxiosRequestConfig & { progressBar?: LoadingBarApiInjection };

export interface FormExtraParams {
    withIndex?: boolean;
    addEmpty?: boolean;
}

export interface RequestResult {
    code: number;
    message: string;
    data: any;
}

export interface FilteredRequestResult<T> {
    res: T | null;
    err: string | null | boolean;
    code: number;
    msg?: string;
}

const baseRequest = <T = Record<string, any>>(
    config: RequestConfig,
): Promise<FilteredRequestResult<T>> => {
    const progressBar = config.progressBar;
    progressBar?.start();
    return axios(config)
        .then((res) => {
            return res.data as RequestResult;
        })
        .then((data) => {
            if (data.code === 20000) {
                progressBar?.finish();
                return {
                    res: data.data as T,
                    err: null,
                    msg: data.message,
                    code: data.code,
                };
            } else {
                progressBar?.error();
                return {
                    res: (data.data as T) ?? null,
                    err: data.message ?? true,
                    msg: data.message,
                    code: data.code,
                };
            }
        });
};

export const request = <T = Record<string, any>>(
    url: string,
    config: Omit<RequestConfig, 'url'>,
) => {
    return baseRequest<T>({
        url,
        ...config,
    });
};

export const getRequest = <T = Record<string, unknown>, R = Record<string, any>>(
    url: string,
    data?: T,
    config?: Omit<RequestConfig, 'url' | 'method' | 'params'>,
) => {
    return baseRequest<R>({
        url,
        method: 'get',
        params: data,
        ...config,
    });
};

export const deleteRequest = <T extends Record<string, unknown>, R = Record<string, any>>(
    url: string,
    data: T,
    config?: Omit<RequestConfig, 'url' | 'params' | 'method'>,
) => {
    return baseRequest<R>({
        url,
        method: 'delete',
        params: data,
        ...config,
    });
};

export const postRequest = <T = Record<string, unknown>, R = Record<string, any>>(
    url: string,
    data?: T,
    config?: Omit<RequestConfig, 'url' | 'data' | 'method'>,
) => {
    return baseRequest<R>({
        url,
        method: 'post',
        data,
        ...config,
    });
};

export const postForm = <T extends Record<string, unknown>, R = Record<string, any>>(
    url: string,
    data: T,
    config: Omit<RequestConfig & FormExtraParams, 'url' | 'data' | 'method'> = {},
) => {
    const form = getForm(data, config.withIndex, config.addEmpty);
    delete config.addEmpty;
    delete config.withIndex;
    return baseRequest<R>({
        url,
        method: 'post',
        data: form,
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
            ...config.headers,
        },
    });
};

export const putRequest = <T extends Record<string, unknown>, R = Record<string, any>>(
    url: string,
    data: T,
    config?: Omit<RequestConfig, 'url' | 'data' | 'method'>,
) => {
    return baseRequest<R>({
        url,
        method: 'put',
        data,
        ...config,
    });
};

export const putForm = <T extends Record<string, unknown>, R = Record<string, any>>(
    url: string,
    data: T,
    config: Omit<RequestConfig & FormExtraParams, 'url' | 'data' | 'method'> = {},
) => {
    const form = getForm(data, config.withIndex, config.addEmpty);
    delete config.addEmpty;
    delete config.withIndex;
    return baseRequest<R>({
        url,
        method: 'put',
        data: form,
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
            ...config.headers,
        },
    });
};

export const useApis = () => {
    const loadingBar = useLoadingBar();

    return {
        getRequest: <T = Record<string, unknown> & LangParams, R = Record<string, any>>(
            url: string,
            data?: T,
            config?: Omit<RequestConfig, 'url' | 'method' | 'params'>,
        ) => {
            return getRequest<Record<string, unknown>, R>(
                url,
                { ...data },
                {
                    progressBar: loadingBar,
                    ...config,
                },
            );
        },
        postRequest: <T = Record<string, unknown> & LangParams, R = Record<string, any>>(
            url: string,
            data?: T,
            config?: Omit<RequestConfig, 'url' | 'method' | 'data'>,
        ) => {
            return postRequest<Record<string, unknown>, R>(
                url,
                { ...data },
                {
                    progressBar: loadingBar,
                    ...config,
                },
            );
        },
    };
};
