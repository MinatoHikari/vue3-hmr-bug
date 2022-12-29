import type { ComponentPublicInstance, Ref } from 'vue';

export interface CommonData {
    [key: string]: string | number | null;
}

export interface FunctionRefWrapperConfig {
    changeOnlyWhenVmExist?: boolean;
    callback?: (vm: ComponentPublicInstance | Element | null) => void;
}

export const functionRefWrapper = <T extends ComponentPublicInstance | null>(
    ref: Ref<T>,
    config: FunctionRefWrapperConfig = {
        changeOnlyWhenVmExist: false,
    },
) => {
    return (vm: ComponentPublicInstance | Element | null) => {
        const { changeOnlyWhenVmExist, callback } = config;
        if (!changeOnlyWhenVmExist || vm) ref.value = vm as T;
        callback && callback(vm);
    };
};
