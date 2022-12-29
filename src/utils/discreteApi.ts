import { createDiscreteApi } from 'naive-ui';

export const {
    message: globalMessage,
    notification,
    dialog,
    loadingBar: globalLoadingBar,
} = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar']);
