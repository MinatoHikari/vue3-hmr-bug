import type { MessageApi, MessageReactive } from 'naive-ui';
import { useMessage } from 'naive-ui';
import type { ComposerTranslation } from 'vue-i18n';
import type { AxiosError } from 'axios';
import type { FilteredRequestResult } from '~/utils/http/http';
import { useUserStore } from '~/stores/user';

export interface ResponseHandlerConfig<T, R = T, RT = void, RR = void> {
    onSuccess?: (params: HandledResponse<T>) => RT | PromiseLike<RT>;
    onError?: (params: HandledResponse<R>) => RR | PromiseLike<RR>;
    replaceDefaultErrHandler?: boolean;
    replaceDefaultSuccessHandler?: boolean;
    successMessage?: boolean | string;
    errMessage?: boolean | string;
    message?: MessageApi;
    t?: ComposerTranslation;
}

export interface HandledResponse<T> {
    res: T;
    code: number;
    msg?: string;
}

let message: MessageReactive | null = null;

const authErrorCallback = (code: number) => {
    const { logoutCb } = useUserStore();
    if (code === 40100) {
    }
};

const getMessage = (customMsg: boolean | string, msg?: string) => {
    if (typeof customMsg === 'boolean') return msg;
    return customMsg;
};

/**
 *  请求回调处理函数，默认返回 Promise<boolean> 表示成功失败
 *  如果 onSuccess 或 onError 有返回值, 则用 Promise 包裹其返回值并返回
 * @param requestResult 传入请求结果
 * @param config 可配置成功失败的回调函数、是否自动读取请求 message 并弹出, 可设置默认的 message 文本
 */
export const resHandler = async <T, R = T, RT = void, RR = void>(
    requestResult: FilteredRequestResult<T>,
    config?: ResponseHandlerConfig<T, R, RT, RR>,
) => {
    const { err, res, msg, code } = requestResult;
    const resolvedConfig = {
        replaceDefaultErrHandler: false,
        replaceDefaultSuccessHandler: false,
        successMessage: false,
        errMessage: true,
        ...config,
    };
    const {
        onSuccess,
        onError,
        replaceDefaultErrHandler,
        replaceDefaultSuccessHandler,
        errMessage,
        successMessage,
        message,
        t,
    } = resolvedConfig;
    // const existMessage = message ?? globalMessage;
    //
    // const existT = t ?? i18nGlobal.global.t;

    // if (err) {
    //     if (!replaceDefaultErrHandler) {
    //         if (errMessage) {
    //             existMessage.error(
    //                 getMessage(errMessage, msg) ?? existT('request.failed_placeholder'),
    //             );
    //         }
    //     }
    let onErrorRes: RR | false = false;
    //     if (onError) {
    //         onErrorRes = await onError({
    //             res: requestResult.res as R,
    //             code: requestResult.code,
    //             msg: requestResult.msg,
    //         });
    //     }
    //     if ([40100].includes(code)) {
    //         authErrorCallback(code);
    //     }
    return onErrorRes;
    // }
    // if (!replaceDefaultSuccessHandler) {
    //     successMessage &&
    //         existMessage.success(
    //             getMessage(successMessage, msg) ?? existT('request.success_placeholder'),
    //         );
    // }
    let onSuccessRes: RT | true = true;
    // if (onSuccess)
    //     onSuccessRes = await onSuccess({
    //         res: requestResult.res as T,
    //         code: requestResult.code,
    //         msg: requestResult.msg,
    //     });
    return onSuccessRes;
};

export const useResponseHandler = () => {
    const message = useMessage();
    return {
        handler: async <T, R = T>(
            requestResult: FilteredRequestResult<T>,
            config?: ResponseHandlerConfig<T, R>,
        ) => resHandler(requestResult, { message, ...config }),
    };
};

export const httpErrorHandler = (error: any) => {
    console.log(error);
    console.log(error.isAxiosError);
    if (error.isAxiosError) {
        const err = error as AxiosError;
        console.log(err.status);
    }
};
